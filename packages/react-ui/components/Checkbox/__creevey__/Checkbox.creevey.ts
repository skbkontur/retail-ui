import { story, kind, test } from 'creevey';

import { delay } from '../../../lib/utils';

const checkboxTests = () => {
  test('idle', async function () {
    await this.expect(await this.takeScreenshot()).to.matchImage('idle');
  });

  test('hovered', async function () {
    await this.browser
      .actions({
        bridge: true,
      })
      .move({
        origin: this.browser.findElement({
          css: '[data-tid~="test-checkbox"]',
        }),
      })
      .perform();
    await delay(1000);
    await this.expect(await this.takeScreenshot()).to.matchImage('hovered');
  });

  test('pressed', async function () {
    await this.browser
      .actions({
        bridge: true,
      })
      .move({
        origin: this.browser.findElement({
          css: '[data-tid~="test-checkbox"]',
        }),
      })
      .press()
      .pause(1000)
      .release()
      .perform();
  });

  test('clicked', async function () {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: '[data-tid~="test-checkbox"]' }))
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('clicked');
  });

  test('tabPress', async function () {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: '[data-tid~="test-checkbox"]' }))
      .perform();
    await this.browser
      .actions({
        bridge: true,
      })
      .move({ origin: this.browser.findElement({ css: 'body' }) })
      .press()
      .release()
      .sendKeys(this.keys.TAB)
      .perform();
    await delay(1000);
    await this.expect(await this.takeScreenshot()).to.matchImage('tabPress');
  });

  test('spacePress', async function () {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: '[data-tid~="test-checkbox"]' }))
      .perform();
    await this.browser
      .actions({
        bridge: true,
      })
      .move({ origin: this.browser.findElement({ css: 'body' }) })
      .press()
      .release()
      .sendKeys(this.keys.TAB)
      .pause(1000)
      .sendKeys(this.keys.SPACE)
      .perform();
    await delay(1000);
    await this.expect(await this.takeScreenshot()).to.matchImage('spacePress');
  });
};

kind('Checkbox', () => {
  story('Plain', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'hover does not work in chrome': {
          in: ['chrome2022', 'chrome2022Dark'],
          tests: ['hovered', 'pressed', 'clicked'],
        },
        flaky: {
          in: /^\bfirefox2022/,
          tests: ['clicked'],
        },
      },
    });

    checkboxTests();
  });

  story('Checked', () => {
    test('idle', async function () {
      await this.expect(await this.takeScreenshot()).to.matchImage('idle');
    });

    test('hovered', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .move({
          origin: this.browser.findElement({
            css: '[data-tid~="test-checkbox"]',
          }),
        })
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('hovered');
    });

    test('pressed', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .move({
          origin: this.browser.findElement({
            css: '[data-tid~="test-checkbox"]',
          }),
        })
        .press()
        .pause(1000)
        .release()
        .perform();
    });
  });

  story('Indeterminate', () => {
    test('plain', async function () {
      const element = await this.browser.findElement({
        css: '#screenshot-capture',
      });
      await delay(1000);
      await this.expect(await element.takeScreenshot()).to.matchImage('plain');
    });

    test('hovered', async function () {
      const element = await this.browser.findElement({
        css: '#screenshot-capture',
      });
      await this.browser
        .actions({
          bridge: true,
        })
        .move({
          origin: this.browser.findElement({ css: 'label' }),
        })
        .perform();
      await delay(1000);
      await this.expect(await element.takeScreenshot()).to.matchImage('hovered');
    });

    test('tabPress', async function () {
      const element = await this.browser.findElement({
        css: '#screenshot-capture',
      });
      await this.browser
        .actions({
          bridge: true,
        })
        .sendKeys(this.keys.TAB)
        .perform();
      await delay(1000);
      await this.expect(await element.takeScreenshot()).to.matchImage('tabPress');
    });

    test('clicked', async function () {
      const element = await this.browser.findElement({
        css: '#screenshot-capture',
      });
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: 'label' }))
        .perform();
      await delay(1000);
      await this.expect(await element.takeScreenshot()).to.matchImage('clicked');
    });
  });

  story('Highlighted', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        flaky: {
          in: ['firefox2022', 'firefox2022Dark'],
          tests: ['tabPress'],
        },
      },
    });
    test('plain', async function () {
      await this.expect(await this.takeScreenshot()).to.matchImage('plain');
    });

    test('tabPress', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .sendKeys(this.keys.TAB)
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('tabPress');
    });
  });

  story('CheckboxLabelSelectionWithPressedShift', () => {
    test('plain', async function () {
      await this.expect(await this.takeScreenshot()).to.matchImage('plain');
    });

    test('selected with pressed shift', async function () {
      const checkbox = await this.browser.findElement({
        css: '[data-comp-name~="Checkbox"]',
      });
      await this.browser.actions({ bridge: true }).keyDown(this.keys.SHIFT).click(checkbox).perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('selected with pressed shift');
      await this.browser.actions({ bridge: true }).keyUp(this.keys.SHIFT).perform();
    });
  });
});
