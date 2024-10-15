import { story, kind, test } from 'creevey';

const buttonTests = () => {
  test('idle', async function () {
    await this.expect(await this.takeScreenshot()).to.matchImage('idle');
  });

  test('hover', async function () {
    await this.browser
      .actions({
        bridge: true,
      })
      .move({
        origin: this.browser.findElement({ css: '[data-tid~="test-button"]' }),
      })
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('hover');
  });

  test('pressed', async function () {
    await this.browser
      .actions({
        bridge: true,
      })
      .move({
        origin: this.browser.findElement({ css: '[data-tid~="test-button"]' }),
      })
      .press()
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('pressed');
    await this.browser
      .actions({
        bridge: true,
      })
      .release()
      .perform();
  });

  test('clicked', async function () {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: '[data-tid~="test-button"]' }))
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('clicked');
  });

  test('tabPress', async function () {
    await this.browser
      .actions({
        bridge: true,
      })
      .sendKeys(this.keys.TAB)
      .pause(500)
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('tabPress');
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

    test('hover', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .move({
          origin: this.browser.findElement({ css: '[data-tid~="test-button"]' }),
        })
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('hover');
    });

    test('pressed', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .move({
          origin: this.browser.findElement({ css: '[data-tid~="test-button"]' }),
        })
        .press()
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('pressed');
      await this.browser
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

    test('hover', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .move({
          origin: this.browser.findElement({
            css: '[data-tid~="test-button"]',
          }),
        })
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('hover');
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

    test('hover', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .move({
          origin: this.browser.findElement({
            css: '[data-tid~="test-button"]',
          }),
        })
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('hover');
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

    test('hover', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .move({
          origin: this.browser.findElement({
            css: '[data-tid~="test-button"]',
          }),
        })
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('hover');
    });

    test('pressed', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .move({
          origin: this.browser.findElement({ css: '[data-tid~="test-button"]' }),
        })
        .press()
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('pressed');
      await this.browser
        .actions({
          bridge: true,
        })
        .release()
        .perform();
    });
  });
});
