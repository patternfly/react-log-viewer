const path = require('path');
const fs = require('fs-extra');
const glob = require('glob');
const camelcase = require('camel-case');

/**
 * @param {string} cssString - CSS string
 */
function getCSSClasses(cssString) {
  return cssString.match(/(\.)(?!\d)([^\s.,{[>+~#:)]*)(?![^{]*})/g);
}

/**
 * @param {string} className - Class name
 */
function formatClassName(className) {
  return camelcase(className.replace(/pf-(v6-)?((c|l|m|u|is|has)-)?/g, ''));
}

/**
 * @param {string} className - Class name
 */
function isModifier(className) {
  return Boolean(className && className.startsWith) && className.startsWith('.pf-m-');
}

/**
 * @param {string} cssString - CSS string
 */
function getClassMaps(cssString) {
  const res = {};
  const distinctClasses = new Set(getCSSClasses(cssString));

  distinctClasses.forEach((className) => {
    const key = formatClassName(className);
    const value = className.replace('.', '').trim();
    if (isModifier(className)) {
      res.modifiers = res.modifiers || {};
      res.modifiers[key] = value;
    } else {
      res[key] = value;
    }
  });

  const ordered = {};
  Object.keys(res)
    .sort()
    .forEach((key) => (ordered[key] = res[key]));

  return ordered;
}

/**
 * @returns {any} Map of file names to classMaps
 */
function generateClassMaps() {
  const cssFiles = glob.sync('src/**/*.css', {
    absolute: true
  });

  const res = {};
  cssFiles
    .map((file) => path.resolve(file)) // Normalize path for Windows
    .forEach((file) => {
      res[file] = getClassMaps(fs.readFileSync(file, 'utf8'));
    });

  return res;
}

module.exports = {
  generateClassMaps
};
