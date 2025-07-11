import { story, kind, test } from 'creevey';
import { Key } from 'selenium-webdriver';

import { delay } from '../../../lib/delay';

const focusedLinkTest = () => {
  test('tab press', async (context) => {
    await context.webdriver
      .actions({
        bridge: true,
      })
      .sendKeys(Key.TAB)
      .perform();
    await delay(2000);
    await context.matchImage(await context.takeScreenshot(), 'tabPress');
    await context.webdriver
      .actions({
        bridge: true,
      })
      .move({
        origin: context.webdriver.findElement({ css: 'a' }),
      })
      .perform();
    await delay(2000);
    await context.matchImage(await context.takeScreenshot(), 'tabPressHovered');
  });
};
const linkTests = () => {
  test('idle', async (context) => {
    await context.matchImage(await context.takeScreenshot(), 'idle');
  });

  test('hover', async (context) => {
    await context.webdriver
      .actions({
        bridge: true,
      })
      .move({
        origin: context.webdriver.findElement({ css: 'a' }),
      })
      .perform();
    await context.matchImage(await context.takeScreenshot(), 'hover');
  });
};

const focusedStyledLinkTest = () => {
  test('tab press', async (context) => {
    await context.webdriver
      .actions({
        bridge: true,
      })
      .move({
        origin: context.webdriver.findElement({ css: 'a' }),
      })
      .perform();
    await delay(1000);
    await context.matchImage(await context.takeScreenshot(), 'hovered');
    await context.webdriver
      .actions({
        bridge: true,
      })
      .sendKeys(Key.TAB)
      .perform();
    await context.webdriver
      .actions({
        bridge: true,
      })
      .move({
        origin: context.webdriver.findElement({ css: 'a' }),
      })
      .perform();
    await delay(1000);
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
});
