import { story, kind, test } from 'creevey';
import { Key } from 'selenium-webdriver';

import { delay } from '../../../lib/delay.mjs';

kind('Tooltip', () => {
  story('FocusTooltip', () => {
    test('01 - plain', async (context) => {
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), '01 - plain');
    });

    test('02 - focus', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .sendKeys(Key.TAB)
        .pause(500)
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), '02 - focus');
    });

    test('03 - blur', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .sendKeys(Key.TAB)
        .perform(); // NOTE In FF next Tab key event will focus browser tab that fail next tests
      // Possible solution add focus trap element inside all stories as a decorator
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: 'body' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), '03 - blur');
    });
  });

  story('FocusTooltipNativeInput', () => {
    test('01 - plain', async (context) => {
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), '01 - plain');
    });

    test('02 - focus', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: 'input' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), '02 - focus');
    });

    test('03 - blur', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: 'input' }))
        .perform();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: 'body' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), '03 - blur');
    });
  });

  story('TooltipWithExternalDynamicContent', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'story-skip-1': { in: 'chrome2022', tests: ['06 - changes left position if does not fit'] },
      },
    });
    test('01 - plain', async (context) => {
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), '01 - plain');
    });

    test('02 - changes top position if does not fit', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '#Container-0 button' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), '02 - changes top position if does not fit');
    });

    test('03 - does not change position back on shrink', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '#Container-0 button' }))
        .pause(100)
        .click(context.webdriver.findElement({ css: '#Container-0 button' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), '03 - does not change position back on shrink');
    });

    test('04 - does not change top position if fits', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '#Container-1 button' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), '04 - does not change top position if fits');
    });

    test('05 - does not change position on shrink', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '#Container-1 button' }))
        .perform();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '#Container-1 button' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), '05 - does not change position on shrink');
    });

    test('06 - changes left position if does not fit', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '#Container-2 button' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), '06 - changes left position if does not fit');
    });

    test('07 - does not change position back on shrink', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '#Container-2 button' }))
        .perform();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '#Container-2 button' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), '07 - does not change position back on shrink');
    });

    test('08 - does not change bottom position if fits', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '#Container-3 button' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), '08 - does not change bottom position if fits');
    });

    test('09 - does not change position on shrink', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '#Container-3 button' }))
        .pause(100)
        .click(context.webdriver.findElement({ css: '#Container-3 button' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), '09 - does not change position on shrink');
    });

    test('10 - does not change bottom position if does not fit', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '#Container-4 button' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), '10 - does not change bottom position if does not fit');
    });

    test('11 - does not change position on shrink', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '#Container-4 button' }))
        .pause(100)
        .click(context.webdriver.findElement({ css: '#Container-4 button' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), '11 - does not change position on shrink');
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

    test('focus and types', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: 'input' }))
        .sendKeys('Hi')
        .perform();
      await delay(2000);
      await context.matchImage(await context.takeScreenshot(), 'focus and types');
    });

    test('clear input', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: 'input' }))
        .sendKeys('Hi')
        .sendKeys(Key.BACK_SPACE, Key.BACK_SPACE)
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'clear input');
    });
  });

  story('DynamicTriggersStory', ({ setStoryParameters }) => {
    setStoryParameters({
      captureElement: '[data-comp-name~="TestTooltip"]',
    });

    test('without trigger', async (context) => {
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'without trigger');
    });

    test('hover - mouseEnter', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '#hover' }))
        .move({
          origin: context.webdriver.findElement({ css: '[type="button"]' }),
        })
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'hover - mouseEnter');
    });

    test('hover - mouseLeave', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '#hover' }))
        .move({
          origin: context.webdriver.findElement({ css: '[type="button"]' }),
        })
        .pause(500)
        .perform();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .move({
          origin: context.webdriver.findElement({ css: 'body' }),
        })
        .pause(500)
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'hover - mouseLeave');
    });

    test('click - click anchor', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '#click' }))
        .click(context.webdriver.findElement({ css: '[type="button"]' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'click - click anchor');
    });

    test('click - click outside', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '#click' }))
        .click(context.webdriver.findElement({ css: '[type="button"]' }))
        .click(context.webdriver.findElement({ css: 'body' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'click - click outside');
    });

    test('focus - focus', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '#focus' }))
        .perform();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[type="button"]' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'focus - focus');
    });

    test('focus - blur', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '#focus' }))
        .click(context.webdriver.findElement({ css: '[type="button"]' }))
        .click(context.webdriver.findElement({ css: 'body' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'focus - blur');
    });

    test('opened', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '#opened' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'opened');
    });

    test('closed', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '#opened' }))
        .click(context.webdriver.findElement({ css: '#closed' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'closed');
    });

    test('hover&focus - mouseEnter', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '#hover_focus' }))
        .move({
          origin: context.webdriver.findElement({ css: '[type="button"]' }),
        })
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'hover&focus - mouseEnter');
    });

    test('hover&focus - mouseLeave', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '#hover_focus' }))
        .move({
          origin: context.webdriver.findElement({ css: '[type="button"]' }),
        })
        .move({
          origin: context.webdriver.findElement({ css: 'body' }),
        })
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'hover&focus - mouseLeave');
    });

    test('hover&focus - focus', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '#hover_focus' }))
        .click(context.webdriver.findElement({ css: '[type="button"]' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'hover&focus - focus');
    });

    test('hover&focus - focus - mouseLeave', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '#hover_focus' }))
        .click(context.webdriver.findElement({ css: '[type="button"]' }))
        .move({
          origin: context.webdriver.findElement({ css: 'body' }),
        })
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'hover&focus - focus - mouseLeave');
    });

    test('hover&focus - blur', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '#hover_focus' }))
        .click(context.webdriver.findElement({ css: '[type="button"]' }))
        .pause(100)
        .sendKeys(Key.TAB)
        .click(context.webdriver.findElement({ css: 'body' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'hover&focus - blur');
    });
  });

  story('RenderInFirstAvailablePosition', () => {
    test('render in available position', async (context) => {
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: '[type="button"]' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'render in available position');
    });

    test('relocate on new available position', async (context) => {
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: '[type="button"]' }))
        .perform();
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: '[type="button"]' }))
        .perform();
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: '[type="button"]' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'relocate on new available position');
    });
  });

  story('TooltipWithManualControl', () => {
    test('call show', async (context) => {
      const btns = await context.webdriver.findElements({ css: '[type="button"]' });
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(btns[0])
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'call show');
    });

    test('call hide after show', async (context) => {
      const btns = await context.webdriver.findElements({ css: '[type="button"]' });
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(btns[0])
        .click(btns[1])
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'call hide after show');
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

    test('hover by dynamic anchor', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .move({ x: 0, y: 0 })
        .move({ origin: context.webdriver.findElement({ css: '[data-tid~="tooltip_anchor_1"]' }) })
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'hover by dynamic anchor');
    });
  });
});
