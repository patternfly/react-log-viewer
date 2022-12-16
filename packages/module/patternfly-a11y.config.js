const { fullscreenRoutes } = require('@patternfly/documentation-framework/routes');

/**
 * Wait for a selector before running axe
 *
 * @param page page from puppeteer
 */
async function waitFor(page) {
  await page.waitForSelector('#root > *');
}

const urls = Object.keys(fullscreenRoutes)
  .map((key) => (fullscreenRoutes[key].isFullscreenOnly ? key : fullscreenRoutes[key].path.replace(/\/react$/, '')))
  .reduce((result, item) => (result.includes(item) ? result : [...result, item]), []);

module.exports = {
  prefix: 'http://localhost:5000',
  waitFor,
  crawl: false,
  urls: [...urls],
  ignoreRules: [
    'color-contrast',
    'landmark-no-duplicate-main',
    'landmark-main-is-top-level',
    'scrollable-region-focusable'
  ].join(','),
  ignoreIncomplete: true
};
