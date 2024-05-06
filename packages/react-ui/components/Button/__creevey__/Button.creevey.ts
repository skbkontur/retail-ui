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
        origin: this.browser.findElement({ css: 'button' }),
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
        origin: this.browser.findElement({ css: 'button' }),
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
      .click(this.browser.findElement({ css: 'button' }))
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('clicked');
  });

  test('tabPress', async function () {
    await this.browser
      .actions({
        bridge: true,
      })
      .sendKeys(this.keys.TAB)
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('tabPress');
  });
};

const combinationTest = () => {
  test('simple', async function () {
    const nextPageButton = () => this.browser.findElement({ css: '#next-page' });
    const element = () => this.browser.findElement({ css: '[data-comp-name~="ComponentTable"]' });
    const page1 = await element().takeScreenshot();
    await this.browser.actions({ bridge: true }).click(nextPageButton()).perform();
    const page2 = await element().takeScreenshot();
    await this.browser.actions({ bridge: true }).click(nextPageButton()).perform();
    const page3 = await element().takeScreenshot();
    await this.browser.actions({ bridge: true }).click(nextPageButton()).perform();
    const page4 = await element().takeScreenshot();
    await this.browser.actions({ bridge: true }).click(nextPageButton()).perform();
    const page5 = await element().takeScreenshot();
    await this.expect({
      'page - 1': page1,
      'page - 2': page2,
      'page - 3': page3,
      'page - 4': page4,
      'page - 5': page5,
    }).to.matchImages();
  });
};

kind('Button', () => {
  story('PlaygroundDefault', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'story-skip-0': { in: ['ie11', 'ie118px', 'ie11Flat8px', 'ie11Dark'], tests: 'hover' },

        // TODO @Khlutkova fix after update browsers
        'story-skip-1': {
          in: ['chrome8px', 'chromeFlat8px', 'chrome', 'chromeDark'],
          tests: ['hover', 'pressed', 'clicked'],
        },
      },
    });

    buttonTests();
  });
  story('PlaygroundDisabled', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'story-skip-0': { in: ['ie11', 'ie118px', 'ie11Flat8px', 'ie11Dark'], tests: 'hover' },

        // TODO @Khlutkova fix after update browsers
        'story-skip-1': {
          in: ['chrome8px', 'chromeFlat8px', 'chrome', 'chromeDark'],
          tests: ['hover', 'pressed', 'clicked'],
        },
      },
    });

    buttonTests();
  });

  story('UseLink', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'story-skip-0': { in: ['ie11', 'ie118px', 'ie11Flat8px', 'ie11Dark'], tests: 'hover' },

        // TODO @Khlutkova fix after update browsers
        'story-skip-1': {
          in: ['chrome8px', 'chromeFlat8px', 'chrome', 'chromeDark'],
          tests: ['hover', 'pressed', 'clicked', 'tabPress'],
        },
      },
    });

    buttonTests();
  });

  story('UseLinkWithIcon', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'story-skip-0': { in: ['ie11', 'ie118px', 'ie11Flat8px', 'ie11Dark'], tests: 'hover' },

        // TODO @Khlutkova fix after update browsers
        'story-skip-1': {
          in: ['chrome8px', 'chromeFlat8px', 'chrome', 'chromeDark'],
          tests: ['hover', 'pressed', 'clicked', 'tabPress'],
        },
      },
    });

    buttonTests();
  });

  story('MultilineTextWithLinkButton', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'story-skip-0': { in: ['ie11', 'ie118px', 'ie11Flat8px', 'ie11Dark'], tests: 'hover' },

        // TODO @Khlutkova fix after update browsers
        'story-skip-1': {
          in: ['chrome8px', 'chromeFlat8px', 'chrome', 'chromeDark'],
          tests: ['hover', 'pressed', 'clicked'],
        },
      },
    });

    buttonTests();
  });

  story('WithError', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'story-skip-0': { in: ['ie11', 'ie118px', 'ie11Flat8px', 'ie11Dark'], tests: 'hover' },
        'story-skip-1': { in: ['chrome', 'chrome8px', 'chromeDark'], tests: ['pressed', 'clicked'] },

        // TODO @Khlutkova fix after update browsers
        'story-skip-2': {
          in: ['chrome8px', 'chromeFlat8px', 'chrome', 'chromeDark'],
          tests: ['hover', 'pressed', 'clicked'],
        },
      },
    });

    buttonTests();
  });

  story('ArrowWithError', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'story-skip-0': { in: ['ie11', 'ie118px', 'ie11Flat8px', 'ie11Dark'], tests: 'hover' },
        'story-skip-1': { in: ['chrome', 'chrome8px', 'chromeDark'], tests: ['pressed', 'clicked'] },

        // TODO @Khlutkova fix after update browsers
        'story-skip-2': {
          in: ['chrome8px', 'chromeFlat8px', 'chrome', 'chromeDark'],
          tests: ['hover', 'pressed', 'clicked'],
        },
      },
    });

    buttonTests();
  });

  story('DefaultCombinations', () => {
    combinationTest();
  });

  story('CombinationsWithWarning', () => {
    combinationTest();
  });

  story('CombinationsWithError', () => {
    combinationTest();
  });

  story('CombinationsWithFocus', () => {
    combinationTest();
  });

  story('LoadingCombinations', () => {
    combinationTest();
  });

  story('DisabledCombinations', () => {
    combinationTest();
  });

  story('ActiveCombinations', () => {
    combinationTest();
  });

  story('CheckedCombinations', () => {
    combinationTest();
  });

  story('CheckedDisabledCombinations', () => {
    combinationTest();
  });
});
