import { story, kind, test } from 'creevey';

import { delay } from '../../../lib/utils';

kind('Tooltip', () => {
  story('FocusTooltip', () => {
    test('01 - plain', async function () {
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('01 - plain');
    });

    test('02 - focus', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .sendKeys(this.keys.TAB)
        .pause(500)
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('02 - focus');
    });

    test('03 - blur', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .sendKeys(this.keys.TAB)
        .perform(); // NOTE In FF next Tab key event will focus browser tab that fail next tests
      // Possible solution add focus trap element inside all stories as a decorator
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: 'body' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('03 - blur');
    });
  });

  story('FocusTooltipNativeInput', () => {
    test('01 - plain', async function () {
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('01 - plain');
    });

    test('02 - focus', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: 'input' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('02 - focus');
    });

    test('03 - blur', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: 'input' }))
        .perform();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: 'body' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('03 - blur');
    });
  });

  story('TooltipWithExternalDynamicContent', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'story-skip-1': { in: 'chrome2022', tests: ['06 - changes left position if does not fit'] },
      },
    });
    test('01 - plain', async function () {
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('01 - plain');
    });

    test('02 - changes top position if does not fit', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#Container-0 button' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('02 - changes top position if does not fit');
    });

    test('03 - does not change position back on shrink', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#Container-0 button' }))
        .pause(100)
        .click(this.browser.findElement({ css: '#Container-0 button' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('03 - does not change position back on shrink');
    });

    test('04 - does not change top position if fits', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#Container-1 button' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('04 - does not change top position if fits');
    });

    test('05 - does not change position on shrink', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#Container-1 button' }))
        .perform();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#Container-1 button' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('05 - does not change position on shrink');
    });

    test('06 - changes left position if does not fit', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#Container-2 button' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('06 - changes left position if does not fit');
    });

    test('07 - does not change position back on shrink', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#Container-2 button' }))
        .perform();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#Container-2 button' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('07 - does not change position back on shrink');
    });

    test('08 - does not change bottom position if fits', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#Container-3 button' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('08 - does not change bottom position if fits');
    });

    test('09 - does not change position on shrink', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#Container-3 button' }))
        .pause(100)
        .click(this.browser.findElement({ css: '#Container-3 button' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('09 - does not change position on shrink');
    });

    test('10 - does not change bottom position if does not fit', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#Container-4 button' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage(
        '10 - does not change bottom position if does not fit',
      );
    });

    test('11 - does not change position on shrink', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#Container-4 button' }))
        .pause(100)
        .click(this.browser.findElement({ css: '#Container-4 button' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('11 - does not change position on shrink');
    });
  });

  story('TooltipWithInputAndSwitchableContent', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        // TODO @Khlutkova fix after update browsers
        'story-skip-0': {
          in: ['firefox2022', 'firefox2022Dark', 'chrome2022Dark'],
          tests: ['focus and types', 'clear input'],
        },
      },
    });

    test('focus and types', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: 'input' }))
        .sendKeys('Hi')
        .perform();
      await delay(2000);
      await this.expect(await this.takeScreenshot()).to.matchImage('focus and types');
    });

    test('clear input', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: 'input' }))
        .sendKeys('Hi')
        .sendKeys(this.keys.BACK_SPACE, this.keys.BACK_SPACE)
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('clear input');
    });
  });

  story('DynamicTriggersStory', ({ setStoryParameters }) => {
    setStoryParameters({
      captureElement: '[data-comp-name~="TestTooltip"]',
    });

    test('without trigger', async function () {
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('without trigger');
    });

    test('hover - mouseEnter', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#hover' }))
        .move({
          origin: this.browser.findElement({ css: '[type="button"]' }),
        })
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('hover - mouseEnter');
    });

    test('hover - mouseLeave', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#hover' }))
        .move({
          origin: this.browser.findElement({ css: '[type="button"]' }),
        })
        .pause(500)
        .perform();
      await this.browser
        .actions({
          bridge: true,
        })
        .move({
          origin: this.browser.findElement({ css: 'body' }),
        })
        .pause(500)
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('hover - mouseLeave');
    });

    test('click - click anchor', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#click' }))
        .click(this.browser.findElement({ css: '[type="button"]' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('click - click anchor');
    });

    test('click - click outside', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#click' }))
        .click(this.browser.findElement({ css: '[type="button"]' }))
        .click(this.browser.findElement({ css: 'body' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('click - click outside');
    });

    test('focus - focus', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#focus' }))
        .perform();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[type="button"]' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('focus - focus');
    });

    test('focus - blur', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#focus' }))
        .click(this.browser.findElement({ css: '[type="button"]' }))
        .click(this.browser.findElement({ css: 'body' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('focus - blur');
    });

    test('opened', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#opened' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('opened');
    });

    test('closed', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#opened' }))
        .click(this.browser.findElement({ css: '#closed' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('closed');
    });

    test('hover&focus - mouseEnter', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#hover_focus' }))
        .move({
          origin: this.browser.findElement({ css: '[type="button"]' }),
        })
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('hover&focus - mouseEnter');
    });

    test('hover&focus - mouseLeave', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#hover_focus' }))
        .move({
          origin: this.browser.findElement({ css: '[type="button"]' }),
        })
        .move({
          origin: this.browser.findElement({ css: 'body' }),
        })
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('hover&focus - mouseLeave');
    });

    test('hover&focus - focus', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#hover_focus' }))
        .click(this.browser.findElement({ css: '[type="button"]' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('hover&focus - focus');
    });

    test('hover&focus - focus - mouseLeave', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#hover_focus' }))
        .click(this.browser.findElement({ css: '[type="button"]' }))
        .move({
          origin: this.browser.findElement({ css: 'body' }),
        })
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('hover&focus - focus - mouseLeave');
    });

    test('hover&focus - blur', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#hover_focus' }))
        .click(this.browser.findElement({ css: '[type="button"]' }))
        .pause(100)
        .sendKeys(this.keys.TAB)
        .click(this.browser.findElement({ css: 'body' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('hover&focus - blur');
    });
  });

  story('RenderInFirstAvailablePosition', () => {
    test('render in available position', async function () {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '[type="button"]' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('render in available position');
    });

    test('relocate on new available position', async function () {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '[type="button"]' }))
        .perform();
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '[type="button"]' }))
        .perform();
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '[type="button"]' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('relocate on new available position');
    });
  });

  story('TooltipWithManualControl', () => {
    test('call show', async function () {
      const btns = await this.browser.findElements({ css: '[type="button"]' });
      await this.browser
        .actions({
          bridge: true,
        })
        .click(btns[0])
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('call show');
    });

    test('call hide after show', async function () {
      const btns = await this.browser.findElements({ css: '[type="button"]' });
      await this.browser
        .actions({
          bridge: true,
        })
        .click(btns[0])
        .click(btns[1])
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('call hide after show');
    });
  });

  story('TooltipWithAnchor', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'themes do not affect logic': {
          in: /firefox/,
          tests: ['hover by dynamic anchor'],
        },
      },
    });

    test('hover by dynamic anchor', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .move({ x: 0, y: 0 })
        .move({ origin: this.browser.findElement({ css: '[data-tid~="tooltip_anchor_1"]' }) })
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('hover by dynamic anchor');
    });
  });
});
