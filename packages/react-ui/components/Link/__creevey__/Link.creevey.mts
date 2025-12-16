import { story, kind, test } from 'creevey';
import 'creevey/playwright';

const focusedLinkTest = () => {
  test('tab press', async (context) => {
    const page = context.webdriver;
    await page.keyboard.press('Tab');
    await page.waitForTimeout(2000);
    await context.matchImage(await context.takeScreenshot(), 'tabPress');
    await page.locator('[data-tid="Link__root"]').first().hover();
    await page.waitForTimeout(2000);
    await context.matchImage(await context.takeScreenshot(), 'tabPressHovered');
  });
};
const linkTests = () => {
  test('idle', async (context) => {
    await context.matchImage(await context.takeScreenshot(), 'idle');
  });

  test('hover', async (context) => {
    const page = context.webdriver;
    await page.locator('[data-tid="Link__root"]').first().hover();
    await context.matchImage(await context.takeScreenshot(), 'hover');
  });
};

const focusedStyledLinkTest = () => {
  test('tab press', async (context) => {
    const page = context.webdriver;
    await page.locator('[data-tid="Link__root"]').first().hover();
    await page.waitForTimeout(1000);
    await context.matchImage(await context.takeScreenshot(), 'hovered');
    await page.keyboard.press('Tab');
    await page.locator('[data-tid="Link__root"]').first().hover();
    await page.waitForTimeout(1000);
    await context.matchImage(await context.takeScreenshot(), 'tabPressHovered');
  });
};

kind('Link', () => {
  story('Simple', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'hover does not work in chrome': {
          in: ['chrome2022', 'chrome2022Dark'],
          tests: ['hover'],
        },
      },
    });

    linkTests();
  });

  story('WithIcon', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'hover does not work in chrome': {
          in: ['chrome2022', 'chrome2022Dark'],
          tests: ['hover'],
        },
      },
    });

    linkTests();
    focusedLinkTest();
  });

  story('Danger', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'hover does not work in chrome': {
          in: ['chrome2022', 'chrome2022Dark'],
          tests: ['hover'],
        },
      },
    });

    linkTests();
  });

  story('Grayed', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'hover does not work in chrome': {
          in: ['chrome2022', 'chrome2022Dark'],
          tests: ['hover'],
        },
      },
    });

    linkTests();
  });

  story('Disabled', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'hover does not work in chrome': {
          in: ['chrome2022', 'chrome2022Dark'],
          tests: ['hover'],
        },
      },
    });

    linkTests();
  });

  story('Loading', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'hover does not work in chrome': {
          in: ['chrome2022', 'chrome2022Dark'],
          tests: ['hover'],
        },
      },
    });

    linkTests();
  });

  story('FocusedStyledLink', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { flacky: { in: /^(?!\b(firefox2022)\b)/ } } });

    focusedStyledLinkTest();
  });

  story('HintOnDisabledLink', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: null });

    test('hover', async (context) => {
      const page = context.webdriver;
      await page.locator('[data-tid="Link__root"]').hover();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'open');
    });
  });
});
