import 'creevey/playwright';
import { kind, story, test } from 'creevey';
import type { Page } from 'playwright-core';

import { tid, waitForAnimationFrame, waitForByTid } from '../../__creevey__/helpers.mjs';

const waitForVisualState = async (page: Page) => {
  await waitForAnimationFrame(page);
  await page.waitForTimeout(500);
};

kind('TimePicker', () => {
  story('States', () => {
    test('idle', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'idle');
    });

    test('focused empty', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('TimePicker__input')).first().click();
      await waitForVisualState(page);
      await context.matchImage(await context.takeScreenshot(), 'focused empty');
    });

    test('focused with value', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('TimePicker__input')).filter({ hasText: /\d/ }).first().click();
      await waitForVisualState(page);
      await context.matchImage(await context.takeScreenshot(), 'focused with value');
    });
  });

  story('Items', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: null });

    test('opened', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('TimePicker__input')).first().click();
      await waitForByTid(page, 'TimePicker__popup');
      await waitForVisualState(page);
      await context.matchImage(await context.takeScreenshot(), 'opened');
    });

    test('keyboard navigation', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('TimePicker__input')).first().click();
      await waitForByTid(page, 'TimePicker__popup');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await waitForVisualState(page);
      await context.matchImage(await context.takeScreenshot(), 'keyboard navigation');
    });
  });

  story('ItemsWithInfo', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: null });

    test('opened', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('TimePicker__input')).first().click();
      await waitForByTid(page, 'TimePicker__popup');
      await waitForVisualState(page);
      await context.matchImage(await context.takeScreenshot(), 'opened');
    });
  });

  story('DisabledItems', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: null });

    test('opened', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('TimePicker__input')).first().click();
      await waitForByTid(page, 'TimePicker__popup');
      await waitForVisualState(page);
      await context.matchImage(await context.takeScreenshot(), 'opened');
    });
  });

  story('ItemsWithMinMax', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: null });

    test('opened', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('TimePicker__input')).first().click();
      await waitForByTid(page, 'TimePicker__popup');
      await waitForVisualState(page);
      await context.matchImage(await context.takeScreenshot(), 'opened');
    });
  });

  story('RightIconAndSuffix', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: null });

    test('idle', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'idle');
    });
  });
});
