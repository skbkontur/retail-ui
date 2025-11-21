import { story, kind, test } from 'creevey';

import 'creevey/playwright';
import { tid } from '../../__creevey__/helpers.mjs';

const buttonTests = () => {
  test('idle', async (context) => {
    await context.matchImage(await context.takeScreenshot(), 'idle');
  });

  test('hover', async (context) => {
    const page = context.webdriver;
    await page.locator(tid('test-button')).hover();
    await context.matchImage(await context.takeScreenshot(), 'hover');
  });

  test('pressed', async (context) => {
    const page = context.webdriver;
    await page.locator(tid('test-button')).hover();
    await page.mouse.down();
    await context.matchImage(await context.takeScreenshot(), 'pressed');
    await page.mouse.up();
  });

  test('clicked', async (context) => {
    const page = context.webdriver;
    await page.locator(tid('test-button')).click();
    await context.matchImage(await context.takeScreenshot(), 'clicked');
  });

  test('tabPress', async (context) => {
    const page = context.webdriver;
    await page.keyboard.press('Tab');
    await page.waitForTimeout(500);
    await context.matchImage(await context.takeScreenshot(), 'tabPress');
  });
};

kind('Button', () => {
  story('PlaygroundDefault', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'hover does not work in chrome': {
          in: ['chrome2022', 'chrome2022Dark'],
          tests: ['hover', 'pressed', 'clicked'],
        },
        'focus goes out of page and breaks other tests': { in: /firefox/, tests: 'tabPress' },
      },
    });

    buttonTests();
  });

  story('PlaygroundDisabled', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'focus goes out of page and breaks other tests': {
          in: /firefox/,
          tests: 'tabPress',
        },
        'hover does not work in chrome': {
          in: ['chrome2022', 'chrome2022Dark'],
          tests: ['hover', 'pressed', 'clicked'],
        },
      },
    });

    buttonTests();
  });

  story('ButtonAsLinkIconColor', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'focus goes out of page and breaks other tests': {
          tests: ['pressed', 'clicked', 'tabPress'],
        },
        'hover does not work in chrome': {
          in: /^(?!\b(firefox.*)\b)/,
          tests: ['hover'],
        },
      },
    });

    buttonTests();
  });

  story('BtnTextBgHoverActive', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'hover does not work in chrome & only 22 dark theme needed': {
          in: /^(?!\bfirefox2022Dark?\b)/,
        },
      },
    });

    test('hover', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('test-button')).hover();
      await context.matchImage(await context.takeScreenshot(), 'hover');
    });

    test('pressed', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('test-button')).hover();
      await page.mouse.down();
      await context.matchImage(await context.takeScreenshot(), 'pressed');
      await page.mouse.up();
    });
  });

  story('IconAndTextHoverColor', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'hover does not work in chrome': {
          in: /^(?!\bfirefox(2022)?\b)/,
        },
      },
    });

    test('hover', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('test-button')).hover();
      await context.matchImage(await context.takeScreenshot(), 'hover');
    });
  });

  story('HoverTextColor', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'hover does not work in chrome': {
          in: /^(?!\bfirefox(2022)?\b)/,
        },
      },
    });

    test('hover', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('test-button')).hover();
      await context.matchImage(await context.takeScreenshot(), 'hover');
    });
  });
  story('ArrowDisabled', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: true,
    });
  });
  story('UnusedPropValues', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'chrome default and 2022': { in: /^(?!\bchrome(2022)?\b)/ } },
    });
  });

  story('BtnBacklessBgHoverActive', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'hover does not work in chrome & only 22 dark theme needed': {
          in: /^(?!\bfirefox2022Dark?\b)/,
        },
      },
    });

    test('hover', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('test-button')).hover();
      await context.matchImage(await context.takeScreenshot(), 'hover');
    });

    test('pressed', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('test-button')).hover();
      await page.mouse.down();
      await context.matchImage(await context.takeScreenshot(), 'pressed');
      await page.mouse.up();
    });
  });
});
