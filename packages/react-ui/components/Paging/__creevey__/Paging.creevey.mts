import { story, kind, test } from 'creevey';
import 'creevey/playwright';

import { tid } from '../../__creevey__/helpers.mjs';

kind('Paging', () => {
  story('GoToAbsensePageStory', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'hover does not work in chrome': {
          in: ['chrome2022', 'chrome2022Dark'],
          tests: ['hover', 'Move to page by Ender'],
        },
        flaky: {
          in: ['firefox2022', 'firefox2022Dark'],
          tests: ['Move focus right', 'Move to page by Ender'],
        },
      },
    });

    test('plain', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'plain');
    });

    test('hover', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('Paging__pageLinkWrapper')).first().hover();
      await context.matchImage(await context.takeScreenshot(), 'hover');
    });

    test('change page by number', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('Paging__pageLinkWrapper')).first().click();
      await context.matchImage(await context.takeScreenshot(), 'change page by number');
    });

    test('change page by forwardLink', async (context) => {
      // NOTE Firefox bug if click send right after click from previous test it results as double click
      const page = context.webdriver;
      await page.waitForTimeout(500);
      await page.locator(tid('Paging__forwardLink')).click();
      await context.matchImage(await context.takeScreenshot(), 'change page by forwardLink');
    });

    test('focused', async (context) => {
      // NOTE Firefox bug if click send right after click from previous test it results as double click
      const page = context.webdriver;
      await page.waitForTimeout(500);
      const firstPage = page.locator(tid('Paging__pageLinkWrapper')).first();
      await firstPage.click();
      await page.waitForTimeout(300);
      // Убеждаемся, что элемент получил фокус
      await firstPage.evaluate((el: HTMLElement) => {
        if (document.activeElement !== el) {
          el.focus();
        }
      });
      // Ждем стабилизации визуального состояния фокуса
      await page.waitForTimeout(300);
      await context.matchImage(await context.takeScreenshot(), 'focused');
    });

    test('Move focus right', async (context) => {
      const page = context.webdriver;
      const firstPage = page.locator(tid('Paging__pageLinkWrapper')).first();
      await firstPage.click();
      await page.waitForTimeout(300);
      // Убеждаемся, что элемент получил фокус
      await firstPage.evaluate((el: HTMLElement) => {
        if (document.activeElement !== el) {
          el.focus();
        }
      });
      await page.waitForTimeout(200);
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(500);
      await context.matchImage(await context.takeScreenshot(), 'Move focus right');
    });

    test('Move to page by Ender', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('Paging__pageLinkWrapper')).first().click();
      await page.waitForTimeout(100);
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(100);
      await page.keyboard.press('Enter');
      await context.matchImage(await context.takeScreenshot(), 'Move to page by Ender');
    });
  });
});
