import { story, kind, test } from 'creevey';
import { Key } from 'selenium-webdriver';

import { delay } from '../../../lib/delay';
import { CustomComboBoxDataTids } from '../../../internal/CustomComboBox/tids';

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

    test('plain', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'plain');
    });

    test('opened', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="InputLikeText"]' }))
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'opened');
    });

    test('hovered', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="InputLikeText"]' }))
        .perform();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .move({
          origin: context.webdriver.findElement({
            css: '[data-comp-name~="MenuItem"]:nth-of-type(4)',
          }),
        })
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'hovered');
    });

    test('selected', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="InputLikeText"]' }))
        .perform();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .move({
          origin: context.webdriver.findElement({
            css: '[data-comp-name~="MenuItem"]:nth-of-type(4)',
          }),
        })
        .perform();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .press()
        .release()
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'selected');
    });

    test('search result', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="InputLikeText"]' }))
        .perform();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .sendKeys('Second')
        .perform();
      await delay(500);
      await context.matchImage(await context.takeScreenshot(), 'search result');
    });

    test('selcted', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="InputLikeText"]' }))
        .perform();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .sendKeys('Second')
        .pause(1000)
        .sendKeys(Key.ENTER)
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'selcted');
    });

    test('opened again', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="InputLikeText"]' }))
        .perform();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .sendKeys('Second')
        .pause(1000)
        .sendKeys(Key.ENTER)
        .perform();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="Input"]' }))
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'opened again');
    });

    test('search result_0', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="InputLikeText"]' }))
        .perform();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .sendKeys('Такого точно нету')
        .perform();
      await delay(500);
      await context.matchImage(await context.takeScreenshot(), 'search result_0');
    });

    test('select', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="InputLikeText"]' }))
        .perform();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .sendKeys(Key.ARROW_DOWN)
        .sendKeys(Key.ARROW_DOWN)
        .sendKeys(Key.ARROW_DOWN)
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'select');
    });

    test('submit', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="InputLikeText"]' }))
        .pause(1000)
        .sendKeys(Key.ARROW_DOWN)
        .sendKeys(Key.ARROW_DOWN)
        .sendKeys(Key.ARROW_DOWN)
        .sendKeys(Key.ENTER)
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'submit');
    });

    test('select_1', async (context) => {
      await delay(1000);
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="InputLikeText"]' }))
        .pause(500)
        .sendKeys('Second')
        .pause(500)
        .move({ origin: context.webdriver.findElement({ css: 'body' }) })
        .pause(1000)
        .press()
        .release()
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'select_1');
    });

    test('selected_2', async (context) => {
      await delay(1000);
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="InputLikeText"]' }))
        .pause(1000)
        .sendKeys('Second')
        .pause(500)
        .perform();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: 'body' }))
        .perform();
      await delay(1000);
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="InputLikeText"]' }))
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'selected_2');
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

    test('plain', async (context) => {
      const element = await context.webdriver.findElement({
        css: '[data-tid="container"]',
      });
      await context.matchImage(await element.takeScreenshot(), 'plain');
    });

    test('opened', async (context) => {
      const element = await context.webdriver.findElement({
        css: '[data-tid="container"]',
      });
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="InputLikeText"]' }))
        .perform();
      await context.matchImage(await element.takeScreenshot(), 'opened');
    });

    test('hovered', async (context) => {
      const element = await context.webdriver.findElement({
        css: '[data-tid="container"]',
      });
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="InputLikeText"]' }))
        .perform();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .move({
          origin: context.webdriver.findElement({
            css: '[data-comp-name~="MenuItem"]:nth-of-type(4)',
          }),
        })
        .perform();
      await context.matchImage(await element.takeScreenshot(), 'hovered');
    });

    test('selected', async (context) => {
      const element = await context.webdriver.findElement({
        css: '[data-tid="container"]',
      });
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="InputLikeText"]' }))
        .perform();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .move({
          origin: context.webdriver.findElement({
            css: '[data-comp-name~="MenuItem"]:nth-of-type(4)',
          }),
        })
        .perform();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .press()
        .release()
        .perform();
      await context.matchImage(await element.takeScreenshot(), 'selected');
    });
  });

  story('AlwaysReject', () => {
    test('opened', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="InputLikeText"]' }))
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'opened');
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

    test('plain', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'plain');
    });

    test('with error', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: "[data-comp-name~='Toggle']" }))
        .perform();
      await delay(200);
      await context.matchImage(await context.takeScreenshot(), 'with error');
    });

    test('plain again', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: "[data-comp-name~='Toggle']" }))
        .pause(200)
        .click(context.webdriver.findElement({ css: "[data-comp-name~='Toggle']" }))
        .perform();
      await delay(200);
      await context.matchImage(await context.takeScreenshot(), 'plain again');
    });
  });

  story('WithExternalValue', () => {
    test('initial value', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'initial value');
    });

    test('reset value', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid="resetBtn"]' }))
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'reset value');
    });

    test('set value', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid="resetBtn"]' }))
        .click(context.webdriver.findElement({ css: '[data-tid="setValueBtn"]' }))
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'set value');
    });
  });

  story('FocusFlow', () => {
    test('before', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'before');
    });

    test('after Enter on Item', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .sendKeys(Key.ENTER)
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'after Enter on Item');
    });

    test('after tab to the next field', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .sendKeys(Key.ENTER)
        .perform();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .sendKeys(Key.TAB)
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'after tab to the next field');
    });
  });

  story('WithTooltip', () => {
    test('show and hide Tooltip', async (context) => {
      const body = await context.webdriver.findElement({ css: 'body' });
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: '[data-tid="InputLikeText__input"]' }))
        .perform();
      await delay(1000);
      const showTooltip = await body.takeScreenshot();
      await context.webdriver.actions({ bridge: true }).click(body).pause(1000).perform();
      const hideTooltip = await body.takeScreenshot();
      await context.matchImages({ showTooltip, hideTooltip });
    });
  });

  story('MobileSimple', () => {
    test('opened', async (context) => {
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: `[data-tid~="${CustomComboBoxDataTids.comboBoxView}"]` }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.webdriver.takeScreenshot(), 'opened');
    });
  });

  story('WithManualPosition', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'no themes': { in: /^(?!\b(chrome2022|firefox2022)\b)/ } },
    });

    test('opened top with portal', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="InputLikeText"]' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'opened top with portal');
    });

    test('opened bottom with portal', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid~="pos"]' }))
        .pause(1000)
        .click(context.webdriver.findElement({ css: '[data-comp-name~="InputLikeText"]' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'opened bottom with portal');
    });

    test('opened top without portal', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid~="portal"]' }))
        .pause(1000)
        .click(context.webdriver.findElement({ css: '[data-comp-name~="InputLikeText"]' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'opened top without portal');
    });

    test('opened bottom without portal', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid~="portal"]' }))
        .perform();
      await delay(1000);
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid~="pos"]' }))
        .perform();
      await delay(1000);
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="InputLikeText"]' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'opened bottom without portal');
    });
  });

  story('Size', () => {
    test('clicked all', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid="open-all"]' }))
        .perform();
      await delay(500);
      await context.webdriver.executeScript(function () {
        const containers = document.querySelectorAll('[data-tid~="ScrollContainer__inner"]');
        for (let i = 0; i < containers.length; i++) {
          containers[i].scrollTop += 300;
        }
      });
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'ClickedAll');
    });
  });
});
