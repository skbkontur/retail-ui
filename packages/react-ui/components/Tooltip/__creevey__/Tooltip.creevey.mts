import { story, kind, test } from 'creevey';
import 'creevey/playwright';

import { tid, waitForPopup } from '../../__creevey__/helpers.mjs';

kind('Tooltip', () => {
  story('FocusTooltip', () => {
    test('01 - plain', async (context) => {
      const page = context.webdriver;
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), '01 - plain');
    });

    test('02 - focus', async (context) => {
      const page = context.webdriver;
      await page.keyboard.press('Tab');
      await waitForPopup(page);
      await context.matchImage(await context.takeScreenshot(), '02 - focus');
    });

    test('03 - blur', async (context) => {
      const page = context.webdriver;
      await page.keyboard.press('Tab'); // NOTE In FF next Tab key event will focus browser tab that fail next tests
      // Possible solution add focus trap element inside all stories as a decorator
      await page.locator('body').click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), '03 - blur');
    });
  });

  story('FocusTooltipNativeInput', () => {
    test('01 - plain', async (context) => {
      const page = context.webdriver;
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), '01 - plain');
    });

    test('02 - focus', async (context) => {
      const page = context.webdriver;
      await page.locator('input').click();
      await waitForPopup(page);
      await context.matchImage(await context.takeScreenshot(), '02 - focus');
    });

    test('03 - blur', async (context) => {
      const page = context.webdriver;
      await page.locator('input').click();
      await page.locator('body').click();
      await page.waitForTimeout(1000);
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
      const page = context.webdriver;
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), '01 - plain');
    });

    test('02 - changes top position if does not fit', async (context) => {
      const page = context.webdriver;
      await page.locator('#Container-0 button').click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), '02 - changes top position if does not fit');
    });

    test('03 - does not change position back on shrink', async (context) => {
      const page = context.webdriver;
      await page.locator('#Container-0 button').click();
      await page.waitForTimeout(100);
      await page.locator('#Container-0 button').click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), '03 - does not change position back on shrink');
    });

    test('04 - does not change top position if fits', async (context) => {
      const page = context.webdriver;
      await page.locator('#Container-1 button').click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), '04 - does not change top position if fits');
    });

    test('05 - does not change position on shrink', async (context) => {
      const page = context.webdriver;
      await page.locator('#Container-1 button').click();
      await page.locator('#Container-1 button').click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), '05 - does not change position on shrink');
    });

    test('06 - changes left position if does not fit', async (context) => {
      const page = context.webdriver;
      await page.locator('#Container-2 button').click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), '06 - changes left position if does not fit');
    });

    test('07 - does not change position back on shrink', async (context) => {
      const page = context.webdriver;
      await page.locator('#Container-2 button').click();
      await page.locator('#Container-2 button').click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), '07 - does not change position back on shrink');
    });

    test('08 - does not change bottom position if fits', async (context) => {
      const page = context.webdriver;
      await page.locator('#Container-3 button').click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), '08 - does not change bottom position if fits');
    });

    test('09 - does not change position on shrink', async (context) => {
      const page = context.webdriver;
      await page.locator('#Container-3 button').click();
      await page.waitForTimeout(100);
      await page.locator('#Container-3 button').click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), '09 - does not change position on shrink');
    });

    test('10 - does not change bottom position if does not fit', async (context) => {
      const page = context.webdriver;
      await page.locator('#Container-4 button').click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), '10 - does not change bottom position if does not fit');
    });

    test('11 - does not change position on shrink', async (context) => {
      const page = context.webdriver;
      await page.locator('#Container-4 button').click();
      await page.waitForTimeout(100);
      await page.locator('#Container-4 button').click();
      await page.waitForTimeout(1000);
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
      const page = context.webdriver;
      await page.locator('input').click();
      await page.keyboard.type('Hi');
      await waitForPopup(page);
      await context.matchImage(await context.takeScreenshot(), 'focus and types');
    });

    test('clear input', async (context) => {
      const page = context.webdriver;
      await page.locator('input').click();
      await page.keyboard.type('Hi');
      await page.keyboard.press('Backspace');
      await page.keyboard.press('Backspace');
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'clear input');
    });
  });

  story('DynamicTriggersStory', ({ setStoryParameters }) => {
    setStoryParameters({
      captureElement: '[data-tid~="TestTooltip"]',
    });

    test('without trigger', async (context) => {
      const page = context.webdriver;
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'without trigger');
    });

    test('hover - mouseEnter', async (context) => {
      const page = context.webdriver;
      await page.locator('#hover').click();
      await page.locator('[type="button"]').hover();
      await waitForPopup(page);
      await context.matchImage(await context.takeScreenshot(), 'hover - mouseEnter');
    });

    test('hover - mouseLeave', async (context) => {
      const page = context.webdriver;
      await page.locator('#hover').click();
      await page.locator('[type="button"]').hover();
      await page.waitForTimeout(500);
      await page.locator('body').hover();
      await page.waitForTimeout(500);
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'hover - mouseLeave');
    });

    test('click - click anchor', async (context) => {
      const page = context.webdriver;
      await page.locator('#click').click();
      await page.locator('[type="button"]').click();
      await waitForPopup(page);
      await context.matchImage(await context.takeScreenshot(), 'click - click anchor');
    });

    test('click - click outside', async (context) => {
      const page = context.webdriver;
      await page.locator('#click').click();
      await page.locator('[type="button"]').click();
      await page.locator('body').click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'click - click outside');
    });

    test('focus - focus', async (context) => {
      const page = context.webdriver;
      await page.locator('#focus').click();
      await page.locator('[type="button"]').click();
      await waitForPopup(page);
      await context.matchImage(await context.takeScreenshot(), 'focus - focus');
    });

    test('focus - blur', async (context) => {
      const page = context.webdriver;
      await page.locator('#focus').click();
      await page.locator('[type="button"]').click();
      await page.locator('body').click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'focus - blur');
    });

    test('opened', async (context) => {
      const page = context.webdriver;
      await page.locator('#opened').click();
      await waitForPopup(page);
      await context.matchImage(await context.takeScreenshot(), 'opened');
    });

    test('closed', async (context) => {
      const page = context.webdriver;
      await page.locator('#opened').click();
      await page.locator('#closed').click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'closed');
    });

    test('hover&focus - mouseEnter', async (context) => {
      const page = context.webdriver;
      await page.locator('#hover_focus').click();
      await page.locator('[type="button"]').hover();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'hover&focus - mouseEnter');
    });

    test('hover&focus - mouseLeave', async (context) => {
      const page = context.webdriver;
      await page.locator('#hover_focus').click();
      await page.locator('[type="button"]').hover();
      await page.locator('body').hover();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'hover&focus - mouseLeave');
    });

    test('hover&focus - focus', async (context) => {
      const page = context.webdriver;
      await page.locator('#hover_focus').click();
      await page.locator('[type="button"]').click();
      await waitForPopup(page);
      await context.matchImage(await context.takeScreenshot(), 'hover&focus - focus');
    });

    test('hover&focus - focus - mouseLeave', async (context) => {
      const page = context.webdriver;
      await page.locator('#hover_focus').click();
      await page.locator('[type="button"]').click();
      await page.locator('body').hover();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'hover&focus - focus - mouseLeave');
    });

    test('hover&focus - blur', async (context) => {
      const page = context.webdriver;
      await page.locator('#hover_focus').click();
      await page.locator('[type="button"]').click();
      await page.waitForTimeout(100);
      await page.keyboard.press('Tab');
      await page.locator('body').click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'hover&focus - blur');
    });
  });

  story('RenderInFirstAvailablePosition', () => {
    test('render in available position', async (context) => {
      const page = context.webdriver;
      await page.locator('[type="button"]').click();
      await waitForPopup(page);
      await context.matchImage(await context.takeScreenshot(), 'render in available position');
    });

    test('relocate on new available position', async (context) => {
      const page = context.webdriver;
      await page.locator('[type="button"]').click();
      await page.locator('[type="button"]').click();
      await page.locator('[type="button"]').click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'relocate on new available position');
    });
  });

  story('TooltipWithManualControl', () => {
    test('call show', async (context) => {
      const page = context.webdriver;
      const btns = page.locator('[type="button"]');
      await btns.nth(0).click();
      await waitForPopup(page);
      await context.matchImage(await context.takeScreenshot(), 'call show');
    });

    test('call hide after show', async (context) => {
      const page = context.webdriver;
      const btns = page.locator('[type="button"]');
      await btns.nth(0).click();
      await btns.nth(1).click();
      await page.waitForTimeout(1000);
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
      const page = context.webdriver;
      await page.mouse.move(0, 0);
      await page.locator(tid('tooltip_anchor_1')).hover();
      await waitForPopup(page);
      await context.matchImage(await context.takeScreenshot(), 'hover by dynamic anchor');
    });
  });
});
