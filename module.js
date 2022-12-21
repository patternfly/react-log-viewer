const fse = require('fs-extra');
const glob = require('glob');
const path = require('path');

const root = process.cwd();

const sourceFiles = glob
  .sync(`${root}/src/*/`)
  .map((name) => name.replace(/\/$/, ''));
  
const indexTypings = glob.sync(`${root}/src/index.d.ts`);

async function copyTypings(files, dest) {
  const cmds = [];
  files.forEach((file) => {
    const fileName = file.split('/').pop();
    cmds.push(fse.copyFile(file, `${dest}/${fileName}`));
  });
  return Promise.all(cmds);
}

async function createPackage(file) {
  const fileName = file.split('/').pop();
  const esmSource = glob.sync(`${root}/esm/${fileName}/**/index.js`)[0];
  /**
   * Prevent creating package.json for directories with no JS files (like CSS directories)
   */
  if (!esmSource) {
    return;
  }

  const destFile = `${path.resolve(root, file.split('/src/').pop())}/package.json`;

  const esmRelative = path.relative(file.replace('/src', ''), esmSource);
  const content = {
    main: 'index.js',
    module: esmRelative,
  };
  const typings = glob.sync(`${root}/src/${fileName}/*.d.ts`);
  let cmds = [];
  content.typings = 'index.d.ts';
  cmds.push(copyTypings(typings, `${root}/${fileName}`));
  cmds.push(fse.writeJSON(destFile, content));
  return Promise.all(cmds);
}

async function generatePackages(files) {
  const cmds = files.map((file) => createPackage(file));
  return Promise.all(cmds);
}

async function run(files) {
  try {
    await generatePackages(files);
    if (indexTypings.length === 1) {
      copyTypings(indexTypings, root);
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

run(sourceFiles);