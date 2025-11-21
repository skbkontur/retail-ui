import { story, kind, test } from 'creevey';
import 'creevey/playwright';

import { tid } from '../../__creevey__/helpers.mjs';

kind('Dropdown', () => {
  story('SimpleDropdown', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'hover does not work in chrome': { in: ['chrome2022', 'chrome2022Dark'], tests: ['MenuItem hover'] },
      },
    });

    test('idle', async (context) => {
      const page = context.webdriver;
      const element = page.locator('.dropdown-test-container');
      await page.waitForTimeout(1000);
      await context.matchImage(await element.screenshot(), 'idle');
    });

    test('clicked', async (context) => {
      const page = context.webdriver;
      const element = page.locator('.dropdown-test-container');
      await page.locator(tid('Dropdown__root')).click();
      await page.waitForTimeout(1000);
      await context.matchImage(await element.screenshot(), 'clicked');
    });

    test('MenuItem hover', async (context) => {
      const page = context.webdriver;
      const element = page.locator('.dropdown-test-container');
      await page.locator(tid('Dropdown__root')).click();
      await page.locator(tid('MenuItem__root')).hover();
      await page.waitForTimeout(1000);
      await context.matchImage(await element.screenshot(), 'MenuItem hover');
    });

    test('selected item', async (context) => {
      const page = context.webdriver;
      const element = page.locator('.dropdown-test-container');
      await page.locator(tid('Dropdown__root')).click();
      await page.locator(tid('MenuItem__root')).click();
      await page.waitForTimeout(1000);
      await context.matchImage(await element.screenshot(), 'selected item');
    });
  });

  story('WithMenuItemIcon', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: '.dropdown-test-container' });

    test('clicked', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('Dropdown__root')).click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'clicked');
    });
  });

  story('InsideScrollableContainer', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: '.dropdown-test-container' });

    test('scrolled', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('Dropdown__root')).click();
      const opened = await context.takeScreenshot();
      await page.evaluate(() => {
        const scrollContainer = window.document.querySelector('.dropdown-test-container') as HTMLElement;
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      });
      const scrolled = await context.takeScreenshot();
      await context.matchImages({ opened, scrolled });
    });
  });

  story('WithCustomSelectTheme', () => {
    test('clicked', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('Dropdown__root')).click();
      await context.matchImage(await context.takeScreenshot(), 'clicked');
    });
  });

  story('WithManualPosition', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'no themes': { in: /^(?!\b(chrome2022|firefox2022)\b)/ } } });

    test('opened top with portal', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('Dropdown__root')).click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'opened top with portal');
    });

    test('opened bottom with portal', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('pos')).click();
      await page.waitForTimeout(1000);
      await page.locator(tid('Dropdown__root')).click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'opened bottom with portal');
    });

    test('opened top without portal', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('portal')).click();
      await page.waitForTimeout(1000);
      await page.locator(tid('Dropdown__root')).click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'opened top without portal');
    });

    test('opened bottom without portal', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('portal')).click();
      await page.waitForTimeout(1000);
      await page.locator(tid('pos')).click();
      await page.waitForTimeout(1000);
      await page.locator(tid('Dropdown__root')).click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'opened bottom without portal');
    });
  });

  story('Size', () => {
    test('clicked all', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('open-all')).click();
      await page.waitForTimeout(500);
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'ClickedAll');
    });
  });
});
