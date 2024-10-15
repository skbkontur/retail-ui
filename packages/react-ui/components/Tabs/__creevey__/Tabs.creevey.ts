import { story, kind, test } from 'creevey';

import { delay } from '../../../lib/utils';

const tabsSimpleTests = () => {
  test('move focus forward', async function () {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: '[data-comp-name~="Tab"]:nth-child(1)' }))
      .perform();
    await this.browser
      .actions({
        bridge: true,
      })
      .sendKeys(this.keys.ARROW_RIGHT)
      .pause(500)
      .sendKeys(this.keys.ARROW_DOWN)
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('move focus forward');
  });
  test('move focus backward', async function () {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: '[data-comp-name~="Tab"]:nth-child(3)' }))
      .perform();
    await delay(1000);
    await this.browser
      .actions({
        bridge: true,
      })
      .sendKeys(this.keys.ARROW_LEFT)
      .perform();
    await delay(1000);
    await this.browser
      .actions({
        bridge: true,
      })
      .sendKeys(this.keys.ARROW_UP)
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('move focus backward');
  });
  test('reset focus after click', async function () {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: '[data-comp-name~="Tab"]:nth-child(1)' }))
      .perform();
    await this.browser
      .actions({
        bridge: true,
      })
      .sendKeys(this.keys.ARROW_RIGHT)
      .pause(500)
      .click(this.browser.findElement({ css: '[data-comp-name~="Tab"]:nth-child(3)' }))
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('reset focus after click');
  });
};
const tabsTests = () => {
  test('plain', async function () {
    await this.expect(await this.takeScreenshot()).to.matchImage('plain');
  });

  test('hovered', async function () {
    await this.browser
      .actions({
        bridge: true,
      })
      .move({
        origin: this.browser.findElement({ css: '[data-comp-name~="Tab"]:nth-child(2)' }),
      })
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('hovered');
  });

  test('clicked', async function () {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: '[data-comp-name~="Tab"]:nth-child(2)' }))
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('clicked');
  });

  test('mouseLeave', async function () {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: '[data-comp-name~="Tab"]:nth-child(2)' }))
      .move({
        origin: this.browser.findElement({ css: 'body' }),
      })
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('mouseLeave');
  });

  test('focused', async function () {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: '[data-comp-name~="Tab"]:nth-child(2)' }))
      .move({
        origin: this.browser.findElement({ css: 'body' }),
      })
      .click(this.browser.findElement({ css: '[data-comp-name~="Tab"]:nth-child(2)' }))
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('focused');
  });

  test('tabPress', async function () {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: '[data-comp-name~="Tab"]:nth-child(2)' }))
      .perform();
    await delay(1000);
    await this.browser
      .actions({
        bridge: true,
      })
      .sendKeys(this.keys.TAB)
      .perform();
    await delay(1000);
    await this.expect(await this.takeScreenshot()).to.matchImage('tabPress');
  });

  test('enterPress', async function () {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: '[data-comp-name~="Tab"]:nth-child(2)' }))
      .perform();
    await delay(1000);
    await this.browser
      .actions({
        bridge: true,
      })
      .sendKeys(this.keys.TAB)
      .perform();
    await delay(1000);
    await this.browser
      .actions({
        bridge: true,
      })
      .sendKeys(this.keys.ENTER)
      .perform();
    await delay(1000);
    await this.expect(await this.takeScreenshot()).to.matchImage('enterPress');
  });
};

kind('Tabs', () => {
  story('WithDisabledTab', () => {
    tabsTests();
  });
  story('Simple', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'hover does not work in chrome': {
          in: ['chrome2022', 'chrome2022Dark'],
          tests: ['hovered'],
        },
      },
    });

    tabsTests();
    tabsSimpleTests();
  });
  story('SimpleMedium', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'hover does not work in chrome': {
          in: ['chrome2022', 'chrome2022Dark'],
          tests: ['hovered'],
        },
      },
    });

    tabsTests();
    tabsSimpleTests();
  });
  story('SimpleSmall', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'hover does not work in chrome': {
          in: ['chrome2022', 'chrome2022Dark'],
          tests: ['hovered'],
        },
      },
    });

    tabsTests();
    tabsSimpleTests();
  });
  story('Vertical', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'hover does not work in chrome': {
          in: ['chrome2022', 'chrome2022Dark'],
          tests: ['hovered', 'enterPress'],
        },
      },
    });
    tabsTests();
  });
  story('VerticalMedium', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'hover does not work in chrome': {
          in: ['chrome2022', 'chrome2022Dark'],
          tests: ['hovered', 'enterPress'],
        },
      },
    });
    tabsTests();
  });
  story('VerticalSmall', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'hover does not work in chrome': {
          in: ['chrome2022', 'chrome2022Dark'],
          tests: ['hovered', 'enterPress'],
        },
      },
    });
    tabsTests();
  });
});
