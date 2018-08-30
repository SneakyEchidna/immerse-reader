const puppeteer = require('puppeteer');
const Rx = require('rxjs');

const pendingItems = new Rx.Subject();
const { log, error } = console;
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
    // slowMo: 5,
  });
  const url = 'https://en.oxforddictionaries.com/';
  const BUTTON_SELECTOR = 'div.searchMain > form > fieldset > button';
  const INPUT_SELECTOR = '#query';
  const page = await browser.newPage();
  // const defSelector = 'section.gramb>.semb>li>.trg>p>span.ind';
  // const derivateSelector = 'p.derivative_of'
  // const noWordsFound = 'div.no-exact-matches'
  await page.goto(url, { waitUntil: 'load' });
  log('Parser is loaded');
  pendingItems.subscribe(({ word, callback }) => {
    getDefinition(word)
      .then(result => callback(result))
      .catch((reason) => {
        error(reason);
      });
  });

  async function getDefinition(word) {
    await page.click(INPUT_SELECTOR);
    await page.click(INPUT_SELECTOR, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.keyboard.type(word);
    await page.click(BUTTON_SELECTOR);
    const parsePage = async () => {
      try {
        await page.waitForSelector(
          'section.gramb>.semb>li>.trg>p>span.ind, p.derivative_of, div.crossReference',
          { timeout: 5000 },
        );
      } catch (e) {
        return null;
      }
      try {
        await page.waitForSelector('section.gramb>.semb>li>.trg>p>span.ind', { timeout: 10 });
      } catch (e) {
        const ErrMsg = await page.evaluate((sel) => {
          const element = document.querySelector(sel);
          return element ? element.innerHTML : null;
        }, 'p.derivative_of');
        if (ErrMsg) {
          await page.click('p.derivative_of > a');
          await parsePage();
        } else {
          const SErrMsg = await page.evaluate((sel) => {
            const element = document.querySelector(sel);
            return element ? element.innerHTML : null;
          }, 'div.crossReference');
          if (SErrMsg) {
            await page.click('div.crossReference > a');
            await parsePage();
          }
        }
      }
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
    };
    return parsePage();
  }
};
module.exports = { scrape, addWord };
