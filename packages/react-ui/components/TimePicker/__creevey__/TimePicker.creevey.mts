import 'creevey/playwright';
import { kind, story, test } from 'creevey';
import type { Page } from 'playwright-core';

import { tid, waitForAnimationFrame, waitForByTid } from '../../__creevey__/helpers.mjs';

const waitForVisualState = async (page: Page) => {
  await waitForAnimationFrame(page);
  await page.waitForTimeout(500);
};

// The emulation has to be installed before the DOM is built, so it goes through an init script.
// Init scripts outlive the test, so the caller gets a way to remove it and to bring the shared
// browser session back to its usual state.
const emulateTouchDevice = async (page: Page) => {
  const initScript = await page.addInitScript(() => {
    Object.defineProperty(window.navigator, 'userAgent', {
      configurable: true,
      value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148',
    });
    Object.defineProperty(Element.prototype, 'ontouchstart', {
      configurable: true,
      value: null,
    });
  });
  await page.reload();

  return async () => {
    await initScript.dispose();
    await page.reload();
  };
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

  story('ItemsWithSeconds', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: '.timepicker-test-container' });

    test('opened', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('TimePicker__input')).first().click();
      await waitForByTid(page, 'TimePicker__popup');
      await waitForVisualState(page);
      await context.matchImage(await context.takeScreenshot(), 'opened');
    });

    test('filtered by seconds', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('TimePicker__input')).first().click();
      await waitForByTid(page, 'TimePicker__popup');
      await page.keyboard.type('09003');
      await waitForVisualState(page);
      await context.matchImage(await context.takeScreenshot(), 'filtered by seconds');
    });

    test('opened with selected value', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('TimePicker__input')).filter({ hasText: /\d/ }).first().click();
      await waitForByTid(page, 'TimePicker__popup');
      await waitForVisualState(page);
      await context.matchImage(await context.takeScreenshot(), 'opened with selected value');
    });
  });

  story('Items', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: '.timepicker-test-container' });

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
    setStoryParameters({ captureElement: '.timepicker-test-container' });

    test('opened', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('TimePicker__input')).first().click();
      await waitForByTid(page, 'TimePicker__popup');
      await waitForVisualState(page);
      await context.matchImage(await context.takeScreenshot(), 'opened');
    });
  });

  story('DisabledItems', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: '.timepicker-test-container' });

    test('opened', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('TimePicker__input')).first().click();
      await waitForByTid(page, 'TimePicker__popup');
      await waitForVisualState(page);
      await context.matchImage(await context.takeScreenshot(), 'opened');
    });
  });

  story('ItemsWithMinMax', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: '.timepicker-test-container' });

    test('opened', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('TimePicker__input')).first().click();
      await waitForByTid(page, 'TimePicker__popup');
      await waitForVisualState(page);
      await context.matchImage(await context.takeScreenshot(), 'opened');
    });
  });

  story('RenderItem', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: '.timepicker-test-container' });

    test('opened', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('TimePicker__input')).click();
      await waitForByTid(page, 'TimePicker__popup');
      await waitForVisualState(page);
      await context.matchImage(await context.takeScreenshot(), 'opened');
    });
  });

  story('Loader', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: '.timepicker-test-container' });

    test('opened', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('TimePicker__input')).click();
      await waitForByTid(page, 'TimePicker__loading');
      await waitForVisualState(page);
      await context.matchImage(await context.takeScreenshot(), 'opened');
    });
  });

  story('InputLoader', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: '.timepicker-test-container' });

    test('loading with items', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('TimePicker__input')).click();
      await waitForByTid(page, 'TimePicker__popup');
      await page.locator(tid('TimePicker__item')).first().waitFor();
      await page.keyboard.press('1');
      await waitForByTid(page, 'TimePicker__inputLoading');
      await waitForVisualState(page);
      await context.matchImage(await context.takeScreenshot(), 'loading with items');
    });
  });

  story('ExtendedItems', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: '.timepicker-test-container' });

    test('opened', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('TimePicker__input')).first().click();
      await waitForByTid(page, 'TimePicker__popup');
      await waitForVisualState(page);
      await context.matchImage(await context.takeScreenshot(), 'opened');
    });
  });

  // Меню здесь не раскрывается, поэтому истории хватает съёмки по её содержимому.
  story('RightIconAndSuffix', () => {
    test('idle', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'idle');
    });
  });

  story('RightIconAndSuffixEmpty', () => {
    test('idle', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'idle');
    });
  });

  story('MobileTimePicker', ({ setStoryParameters }) => {
    setStoryParameters({
      captureElement: null,
      skip: { 'only mobile': { in: /^(?!\b(chromeMobile)\b)/ } },
    });

    test('opened', async (context) => {
      const page = context.webdriver;
      const stopTouchEmulation = await emulateTouchDevice(page);

      try {
        await page.locator(tid('TimePicker__input')).first().click();
        await waitForByTid(page, 'TimePicker__mobilePopup');
        await waitForVisualState(page);
        await context.matchImage(await context.takeScreenshot(), 'opened');
      } finally {
        await stopTouchEmulation();
      }
    });
  });

  story('MobileTimePickerFiltering', ({ setStoryParameters }) => {
    setStoryParameters({
      captureElement: null,
      skip: { 'only mobile': { in: /^(?!\b(chromeMobile)\b)/ } },
    });

    test('filtered by typing', async (context) => {
      const page = context.webdriver;
      const stopTouchEmulation = await emulateTouchDevice(page);

      try {
        await page.locator(tid('TimePicker__input')).click();
        await waitForByTid(page, 'TimePicker__mobilePopup');
        await page.locator(tid('TimePicker__mobileInput')).click();
        await page.keyboard.press('1');
        await page.locator(tid('TimePicker__item')).first().waitFor();
        await waitForVisualState(page);
        await context.matchImage(await context.takeScreenshot(), 'filtered by typing');
      } finally {
        await stopTouchEmulation();
      }
    });
  });
});
