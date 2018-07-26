const puppeteer = require('puppeteer');

const scrape = async (text) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    // slowMo: 100,
  });
  const url = 'https://en.oxforddictionaries.com/';
  const BUTTON_SELECTOR = 'div.searchMain > form > fieldset > button';
  const INPUT_SELECTOR = '#query';
  const results = [];
  const page = await browser.newPage();

  page.on('console', e => console.log(e));
  await page.goto(url);
  // await page.goto(url, { waitUntil: 'networkidle0' });
  results.push(await getDefinition(text));
  // results.push(await getDefinition('fall'));
  // results.push(await getDefinition('creeper'));
  browser.close();
  return results;

  async function getDefinition(word) {
    await page.click(INPUT_SELECTOR);
    await page.click(INPUT_SELECTOR, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.keyboard.type(word);
    await page.click(BUTTON_SELECTOR);
    await page.waitForNavigation();
    const result = await page.evaluate(() => {
      const def = document.querySelectorAll('section.gramb>.semb>li>.trg>p>span.ind');
      const defs = Array.prototype.reduce.call(
        def,
        (acc, e) => {
          acc.push(e.innerText);
          return acc;
        },
        [],
      );
      return defs;
    });
    return result;
  }
};
module.exports = scrape;
// scrape('hell of a').then(value => {
//   console.log(value);
// });
