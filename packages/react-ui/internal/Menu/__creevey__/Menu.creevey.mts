import { story, kind, test } from 'creevey';
import 'creevey/playwright';

import { tid } from '../../../components/__creevey__/helpers.mjs';

kind('Menu', () => {
  story('WithMaxHeight', ({ setStoryParameters }) => {
    setStoryParameters({
      captureElement: '[data-tid="menu-container"]',
      skip: {
        flacky: { in: ['chrome2022'] },
      },
    });

    test('idle', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'idle');
    });

    test('moved up from top to the last Item', async (context) => {
      const page = context.webdriver;
      await page.locator('#move-up').click();
      await context.matchImage(await context.takeScreenshot(), 'moved up from top to the last Item');
    });

    test('moved up from bottom to the first Item', async (context) => {
      const page = context.webdriver;
      await page.locator('#move-up').click();
      await page.locator('#move-up').click();
      await page.locator('#move-up').click();
      await context.matchImage(await context.takeScreenshot(), 'moved up from bottom to the first Item');
    });

    test('moved down from top to the last Item', async (context) => {
      const page = context.webdriver;
      await page.locator('#move-up').click();
      await page.locator('#move-up').click();
      await page.locator('#move-up').click();
      await page.locator('#move-down').click();
      await page.locator('#move-down').click();
      await context.matchImage(await context.takeScreenshot(), 'moved down from top to the last Item');
    });

    test('moved down from bottom to the first Item', async (context) => {
      const page = context.webdriver;
      await page.locator('#move-up').click();
      await page.locator('#move-up').click();
      await page.locator('#move-up').click();
      await page.locator('#move-down').click();
      await page.locator('#move-down').click();
      await page.locator('#move-down').click();
      await context.matchImage(await context.takeScreenshot(), 'moved down from bottom to the first Item');
    });
  });

  story('WithDisabledMenuItem', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'hover does not work in chrome': { in: ['chrome2022', 'chrome2022Dark'], tests: ['mouseenter'] },
      },
    });

    test('mouseenter', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('menuitem-notdisabled')).click();
      await context.matchImage(await context.takeScreenshot(), 'mouseenter');
    });
  });
  story('WithItemsWithIconsWithoutTextAlignment', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'themes dont affect logic': { in: /^(?!\bchrome2022\b)/ } },
    });
  });
});
