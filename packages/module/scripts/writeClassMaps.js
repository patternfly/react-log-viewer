const { join, basename, relative, dirname } = require('path');
const { outputFileSync, copyFileSync, ensureDirSync } = require('fs-extra');
const { generateClassMaps } = require('./generateClassMaps');

const writeTsExport = (file, classMap, outDir) =>
  outputFileSync(
    join(outDir, file.replace(/.css$/, '.ts')),
    `
import './${basename(file, '.css.js')}';
export default ${JSON.stringify(classMap, null, 2)};
`.trim()
  );

/**
 * @param {any} classMaps Map of file names to classMaps
 */
function writeClassMaps(classMaps) {
  Object.entries(classMaps).forEach(([file, classMap]) => {
    const packageBase = dirname(require.resolve('@patternfly/react-log-viewer/package.json'));
    const relativeFilePath = relative(packageBase, file);

    // write the export map in TS and put it in src, from here TS will compile it to the different module types at build time
    writeTsExport(relativeFilePath, classMap, packageBase);

    // copy the css file itself over to dist so that they can be easily imported since TS won't do that
    const cssFileName = basename(file);
    const distDir = join(packageBase, 'dist');
    const cssDistDir = join(distDir, 'css');
    ensureDirSync(cssDistDir);
    copyFileSync(file, join(cssDistDir, cssFileName));

    // create css files for each exported module to reference since TS won't do that either
    const fileDir = dirname(relativeFilePath).replace('src/', '');
    const cssDistEsmDir = join(distDir, 'esm', fileDir);
    const cssDistCjsDir = join(distDir, 'js', fileDir);
    const cssDistDirs = [cssDistEsmDir, cssDistCjsDir];
    cssDistDirs.forEach((dir) => {
      ensureDirSync(dir);
      copyFileSync(file, join(dir, cssFileName));
    });
  });

  // eslint-disable-next-line no-console
  console.log('Wrote', Object.keys(classMaps).length * 3, 'CSS-in-JS files');
}

writeClassMaps(generateClassMaps());
