import { story, kind, test } from 'creevey';

import { delay } from '../../../lib/utils';
import { CustomComboBoxDataTids } from '../../../internal/CustomComboBox';

kind('ComboBox', () => {
  story('SimpleComboboxStory', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'hover does not work in chrome': {
          in: ['chrome2022', 'chrome2022Dark'],
          tests: ['hovered'],
        },
      },
    });

    test('plain', async function () {
      await this.expect(await this.takeScreenshot()).to.matchImage('plain');
    });

    test('opened', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="InputLikeText"]' }))
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('opened');
    });

    test('hovered', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="InputLikeText"]' }))
        .perform();
      await this.browser
        .actions({
          bridge: true,
        })
        .move({
          origin: this.browser.findElement({
            css: '[data-comp-name~="MenuItem"]:nth-of-type(4)',
          }),
        })
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('hovered');
    });

    test('selected', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="InputLikeText"]' }))
        .perform();
      await this.browser
        .actions({
          bridge: true,
        })
        .move({
          origin: this.browser.findElement({
            css: '[data-comp-name~="MenuItem"]:nth-of-type(4)',
          }),
        })
        .perform();
      await this.browser
        .actions({
          bridge: true,
        })
        .press()
        .release()
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('selected');
    });

    test('search result', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="InputLikeText"]' }))
        .perform();
      await this.browser
        .actions({
          bridge: true,
        })
        .sendKeys('Second')
        .perform();
      await delay(500);
      await this.expect(await this.takeScreenshot()).to.matchImage('search result');
    });

    test('selcted', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="InputLikeText"]' }))
        .perform();
      await this.browser
        .actions({
          bridge: true,
        })
        .sendKeys('Second')
        .pause(1000)
        .sendKeys(this.keys.ENTER)
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('selcted');
    });

    test('opened again', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="InputLikeText"]' }))
        .perform();
      await this.browser
        .actions({
          bridge: true,
        })
        .sendKeys('Second')
        .pause(1000)
        .sendKeys(this.keys.ENTER)
        .perform();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="Input"]' }))
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('opened again');
    });

    test('search result_0', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="InputLikeText"]' }))
        .perform();
      await this.browser
        .actions({
          bridge: true,
        })
        .sendKeys('Такого точно нету')
        .perform();
      await delay(500);
      await this.expect(await this.takeScreenshot()).to.matchImage('search result_0');
    });

    test('select', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="InputLikeText"]' }))
        .perform();
      await this.browser
        .actions({
          bridge: true,
        })
        .sendKeys(this.keys.ARROW_DOWN)
        .sendKeys(this.keys.ARROW_DOWN)
        .sendKeys(this.keys.ARROW_DOWN)
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('select');
    });

    test('submit', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="InputLikeText"]' }))
        .pause(1000)
        .sendKeys(this.keys.ARROW_DOWN)
        .sendKeys(this.keys.ARROW_DOWN)
        .sendKeys(this.keys.ARROW_DOWN)
        .sendKeys(this.keys.ENTER)
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('submit');
    });

    test('select_1', async function () {
      await delay(1000);
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="InputLikeText"]' }))
        .pause(500)
        .sendKeys('Second')
        .pause(500)
        .move({ origin: this.browser.findElement({ css: 'body' }) })
        .pause(1000)
        .press()
        .release()
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('select_1');
    });

    test('selected_2', async function () {
      await delay(1000);
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="InputLikeText"]' }))
        .pause(1000)
        .sendKeys('Second')
        .pause(500)
        .perform();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: 'body' }))
        .perform();
      await delay(1000);
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="InputLikeText"]' }))
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('selected_2');
    });
  });

  story('OpenToTop', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'hover does not work in chrome': {
          in: ['chrome2022', 'chrome2022Dark'],
          tests: ['hovered'],
        },
      },
    });

    test('plain', async function () {
      const element = await this.browser.findElement({
        css: '[data-tid="container"]',
      });
      await this.expect(await element.takeScreenshot()).to.matchImage('plain');
    });

    test('opened', async function () {
      const element = await this.browser.findElement({
        css: '[data-tid="container"]',
      });
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="InputLikeText"]' }))
        .perform();
      await this.expect(await element.takeScreenshot()).to.matchImage('opened');
    });

    test('hovered', async function () {
      const element = await this.browser.findElement({
        css: '[data-tid="container"]',
      });
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="InputLikeText"]' }))
        .perform();
      await this.browser
        .actions({
          bridge: true,
        })
        .move({
          origin: this.browser.findElement({
            css: '[data-comp-name~="MenuItem"]:nth-of-type(4)',
          }),
        })
        .perform();
      await this.expect(await element.takeScreenshot()).to.matchImage('hovered');
    });

    test('selected', async function () {
      const element = await this.browser.findElement({
        css: '[data-tid="container"]',
      });
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="InputLikeText"]' }))
        .perform();
      await this.browser
        .actions({
          bridge: true,
        })
        .move({
          origin: this.browser.findElement({
            css: '[data-comp-name~="MenuItem"]:nth-of-type(4)',
          }),
        })
        .perform();
      await this.browser
        .actions({
          bridge: true,
        })
        .press()
        .release()
        .perform();
      await this.expect(await element.takeScreenshot()).to.matchImage('selected');
    });
  });

  story('AlwaysReject', () => {
    test('opened', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="InputLikeText"]' }))
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('opened');
    });
  });

  story('ToogleError', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        flaky: {
          in: ['chrome2022', 'chrome2022Dark'],
          tests: ['plain again', 'with error'],
        },
      },
    });

    test('plain', async function () {
      await this.expect(await this.takeScreenshot()).to.matchImage('plain');
    });

    test('with error', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: "[data-comp-name~='Toggle']" }))
        .perform();
      await delay(200);
      await this.expect(await this.takeScreenshot()).to.matchImage('with error');
    });

    test('plain again', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: "[data-comp-name~='Toggle']" }))
        .pause(200)
        .click(this.browser.findElement({ css: "[data-comp-name~='Toggle']" }))
        .perform();
      await delay(200);
      await this.expect(await this.takeScreenshot()).to.matchImage('plain again');
    });
  });

  story('WithExternalValue', () => {
    test('initial value', async function () {
      await this.expect(await this.takeScreenshot()).to.matchImage('initial value');
    });

    test('reset value', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid="resetBtn"]' }))
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('reset value');
    });

    test('set value', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid="resetBtn"]' }))
        .click(this.browser.findElement({ css: '[data-tid="setValueBtn"]' }))
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('set value');
    });
  });

  story('FocusFlow', () => {
    test('before', async function () {
      await this.expect(await this.takeScreenshot()).to.matchImage('before');
    });

    test('after Enter on Item', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .sendKeys(this.keys.ENTER)
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('after Enter on Item');
    });

    test('after tab to the next field', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .sendKeys(this.keys.ENTER)
        .perform();
      await this.browser
        .actions({
          bridge: true,
        })
        .sendKeys(this.keys.TAB)
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('after tab to the next field');
    });
  });

  story('WithTooltip', () => {
    test('show and hide Tooltip', async function () {
      const body = await this.browser.findElement({ css: 'body' });
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '[data-tid="InputLikeText__input"]' }))
        .perform();
      await delay(1000);
      const showTooltip = await body.takeScreenshot();
      await this.browser.actions({ bridge: true }).click(body).pause(1000).perform();
      const hideTooltip = await body.takeScreenshot();
      await this.expect({ showTooltip, hideTooltip }).to.matchImages();
    });
  });

  story('MobileSimple', () => {
    test('opened', async function () {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: `[data-tid~="${CustomComboBoxDataTids.comboBoxView}"]` }))
        .perform();
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('opened');
    });
  });

  story('WithManualPosition', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'no themes': { in: /^(?!\b(chrome2022|firefox2022)\b)/ } },
    });

    test('opened top with portal', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="InputLikeText"]' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('opened top with portal');
    });

    test('opened bottom with portal', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid~="pos"]' }))
        .pause(1000)
        .click(this.browser.findElement({ css: '[data-comp-name~="InputLikeText"]' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('opened bottom with portal');
    });

    test('opened top without portal', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid~="portal"]' }))
        .pause(1000)
        .click(this.browser.findElement({ css: '[data-comp-name~="InputLikeText"]' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('opened top without portal');
    });

    test('opened bottom without portal', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid~="portal"]' }))
        .perform();
      await delay(1000);
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid~="pos"]' }))
        .perform();
      await delay(1000);
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="InputLikeText"]' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('opened bottom without portal');
    });
  });

  story('Size', () => {
    test('clicked all', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid="open-all"]' }))
        .perform();
      await delay(500);
      await this.browser.executeScript(function () {
        const containers = document.querySelectorAll('[data-tid~="ScrollContainer__inner"]');
        for (let i = 0; i < containers.length; i++) {
          containers[i].scrollTop += 300;
        }
      });
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('ClickedAll');
    });
  });
});
