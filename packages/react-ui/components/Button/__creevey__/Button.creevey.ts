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
        'story-skip-0': {
          in: ['ie11', 'ie118px', 'ie11Flat8px', 'ie11Dark'],
          tests: 'hover',
        },
        'story-skip-1': {
          in: ['chrome8px', 'chromeFlat8px', 'chrome', 'chromeDark'],
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
        'story-skip-0': {
          in: ['ie11', 'ie118px', 'ie11Flat8px', 'ie11Dark'],
          tests: 'hover',
        },
        'focus goes out of page and breaks other tests': {
          in: /firefox/,
          tests: 'tabPress',
        },
        'story-skip-2': {
          in: ['chrome8px', 'chromeFlat8px', 'chrome', 'chromeDark'],
          tests: ['hover', 'pressed', 'clicked'],
        },
      },
    });

    buttonTests();
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
      skip: { 'not 2022': { in: /2022/ } },
    });
  });
  story('UnusedPropValues', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'chrome default and 2022': { in: /^(?!\bchrome(2022)?\b)/ } },
    });
  });
});
