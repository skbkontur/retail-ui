import { story, kind, test } from 'creevey';
import 'creevey/playwright';

import { tid } from '../../__creevey__/helpers.mjs';

kind('CurrencyInput', () => {
  story('SampleStory', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'flacky visible(?!) cursor': {
          in: ['chromeDark'],
          tests: ['Focus', 'Input value', 'External focus and input'],
        },
        'flaky pixels in the bottom left corner': {
          in: ['chrome2022'],
          tests: ['External focus and input'],
        },
      },
    });

    test('Plain', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'Plain');
    });

    test('Focus', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('CurrencyInput__root') + ' input').click();
      await context.matchImage(await context.takeScreenshot(), 'Focus');
    });

    test('Input value', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('CurrencyInput__root') + ' input').click();
      await page.keyboard.type('1');
      await page.waitForTimeout(500);
      await page.keyboard.type('2');
      await page.waitForTimeout(500);
      await page.keyboard.type('3');
      await page.waitForTimeout(500);
      await page.keyboard.type('4');
      await page.waitForTimeout(500);
      await context.matchImage(await context.takeScreenshot(), 'Input value');
    });

    test('External focus and input', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('focus-input')).click();
      await page.keyboard.type('1');
      await page.waitForTimeout(500);
      await page.keyboard.type('2');
      await page.waitForTimeout(500);
      await page.keyboard.type('3');
      await page.waitForTimeout(500);
      await page.keyboard.type('4');
      await page.waitForTimeout(500);
      await context.matchImage(await context.takeScreenshot(), 'External focus and input');
    });
  });
});
