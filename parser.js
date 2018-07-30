const puppeteer = require('puppeteer');
const Rx = require('rxjs');

const pendingItems = new Rx.Subject();

const addWord = (word, callback) => {
  pendingItems.next({
    word,
    callback,
  });
};
const scrape = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    // slowMo: 100,
  });
  const url = 'https://en.oxforddictionaries.com/';
  const BUTTON_SELECTOR = 'div.searchMain > form > fieldset > button';
  const INPUT_SELECTOR = '#query';
  const page = await browser.newPage();

  page.on('console', e => console.log(e));
  await page.goto(url, { waitUntil: 'load' });
  console.log('Parser is loaded');
  pendingItems.subscribe(({ word, callback }) => {
    getDefinition(word)
      .then(result => callback(result))
      .catch((reason) => {
        console.error(reason);
      });
  });

  async function getDefinition(word) {
    await page.click(INPUT_SELECTOR);
    await page.click(INPUT_SELECTOR, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.keyboard.type(word);
    await page.click(BUTTON_SELECTOR);
    console.log('entered request');
    await page.waitForSelector('section.gramb>.semb>li>.trg>p>span.ind');
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
module.exports = { scrape, addWord };
