import { story, kind, test } from 'creevey';
import { Key } from 'selenium-webdriver';

const buttonTests = () => {
  test('idle', async (context) => {
    await context.matchImage(await context.takeScreenshot(), 'idle');
  });

  test('hover', async (context) => {
    await context.webdriver
      .actions({
        bridge: true,
      })
      .move({
        origin: context.webdriver.findElement({ css: '[data-tid~="test-button"]' }),
      })
      .perform();
    await context.matchImage(await context.takeScreenshot(), 'hover');
  });

  test('pressed', async (context) => {
    await context.webdriver
      .actions({
        bridge: true,
      })
      .move({
        origin: context.webdriver.findElement({ css: '[data-tid~="test-button"]' }),
      })
      .press()
      .perform();
    await context.matchImage(await context.takeScreenshot(), 'pressed');
    await context.webdriver
      .actions({
        bridge: true,
      })
      .release()
      .perform();
  });

  test('clicked', async (context) => {
    await context.webdriver
      .actions({
        bridge: true,
      })
      .click(context.webdriver.findElement({ css: '[data-tid~="test-button"]' }))
      .perform();
    await context.matchImage(await context.takeScreenshot(), 'clicked');
  });

  test('tabPress', async (context) => {
    await context.webdriver
      .actions({
        bridge: true,
      })
      .sendKeys(Key.TAB)
      .pause(500)
      .perform();
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
      await context.webdriver
        .actions({
          bridge: true,
        })
        .move({
          origin: context.webdriver.findElement({ css: '[data-tid~="test-button"]' }),
        })
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'hover');
    });

    test('pressed', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .move({
          origin: context.webdriver.findElement({ css: '[data-tid~="test-button"]' }),
        })
        .press()
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'pressed');
      await context.webdriver
        .actions({
          bridge: true,
        })
        .release()
        .perform();
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
      await context.webdriver
        .actions({
          bridge: true,
        })
        .move({
          origin: context.webdriver.findElement({
            css: '[data-tid~="test-button"]',
          }),
        })
        .perform();
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
      await context.webdriver
        .actions({
          bridge: true,
        })
        .move({
          origin: context.webdriver.findElement({
            css: '[data-tid~="test-button"]',
          }),
        })
        .perform();
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
      await context.webdriver
        .actions({
          bridge: true,
        })
        .move({
          origin: context.webdriver.findElement({
            css: '[data-tid~="test-button"]',
          }),
        })
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'hover');
    });

    test('pressed', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .move({
          origin: context.webdriver.findElement({ css: '[data-tid~="test-button"]' }),
        })
        .press()
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'pressed');
      await context.webdriver
        .actions({
          bridge: true,
        })
        .release()
        .perform();
    });
  });
});
