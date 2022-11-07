import { story, kind, test } from 'creevey';

const kebabTests = () => {
  test('plain', async function () {
    await this.expect(await this.takeScreenshot()).to.matchImage('plain');
  });

  test('hovered', async function () {
    await this.browser
      .actions({
        bridge: true,
      })
      .move({
        origin: this.browser.findElement({ css: '[data-comp-name~="Kebab"]' }),
      })
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('hovered');
  });

  test('clicked', async function () {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: '[data-comp-name~="Kebab"]' }))
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('clicked');
  });

  test('clickedOnButton2ndTime', async function () {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: '[data-comp-name~="Kebab"]' }))
      .click(this.browser.findElement({ css: '[data-comp-name~="Kebab"]' }))
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('clickedOnButton2ndTime');
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

  test('enterPress', async function () {
    await this.browser
      .actions({
        bridge: true,
      })
      .sendKeys(this.keys.TAB)
      .sendKeys(this.keys.ENTER)
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('enterPress');
  });

  test('escapePress', async function () {
    await this.browser
      .actions({
        bridge: true,
      })
      .sendKeys(this.keys.TAB)
      .sendKeys(this.keys.ENTER)
      .perform();
    await this.browser
      .actions({
        bridge: true,
      })
      .sendKeys(this.keys.ESCAPE)
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('escapePress');
  });
};

kind('Kebab', () => {
  story('Small', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'story-skip-0': { in: ['ie11', 'ie118px', 'ie11Flat8px', 'ie11Dark'], tests: 'hovered' },

        // TODO @Khlutkova fix after update browsers
        'story-skip-1': {
          in: ['chrome8px', 'chromeFlat8px', 'chrome', 'chromeDark'],
          tests: ['hovered', 'clickedOnButton2ndTime'],
        },
      },
    });

    kebabTests();
  });

  story('Medium', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'story-skip-0': { in: ['ie11', 'ie118px', 'ie11Flat8px', 'ie11Dark'], tests: 'hovered' },

        // TODO @Khlutkova fix after update browsers
        'story-skip-1': {
          in: ['chrome8px', 'chromeFlat8px', 'chrome', 'chromeDark'],
          tests: ['hovered', 'clickedOnButton2ndTime'],
        },
      },
    });

    kebabTests();
  });

  story('Large', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'story-skip-0': { in: ['ie11', 'ie118px', 'ie11Flat8px', 'ie11Dark'], tests: 'hovered' },

        // TODO @Khlutkova fix after update browsers
        'story-skip-1': {
          in: ['chrome8px', 'chromeFlat8px', 'chrome', 'chromeDark'],
          tests: ['hovered', 'clickedOnButton2ndTime'],
        },
      },
    });

    kebabTests();
  });
});
