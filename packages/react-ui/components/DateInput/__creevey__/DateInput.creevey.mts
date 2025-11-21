import { story, kind, test } from 'creevey';
import 'creevey/playwright';

kind('DateInput', () => {
  story('Simple', () => {
    test('idle', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'idle');
    });

    test('focus', async (context) => {
      const page = context.webdriver;
      await page.evaluate(() => {
        const input = window.document.querySelector("[data-tid~='DateInput__root']");
        if (input instanceof HTMLElement) {
          input.focus();
        }
      });
      await context.matchImage(await context.takeScreenshot(), 'focus');
    });
  });

  story('Disabled', () => {
    test('idle', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'idle');
    });

    test('focus', async (context) => {
      const page = context.webdriver;
      await page.evaluate(() => {
        const input = window.document.querySelector("[data-tid~='DateInput__root']");
        if (input instanceof HTMLElement) {
          input.focus();
        }
      });
      await context.matchImage(await context.takeScreenshot(), 'focus');
    });
  });

  story('WithWidth', () => {
    test('idle', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'idle');
    });

    test('focus', async (context) => {
      const page = context.webdriver;
      await page.evaluate(() => {
        const input = window.document.querySelector("[data-tid~='DateInput__root']");
        if (input instanceof HTMLElement) {
          input.focus();
        }
      });
      await context.matchImage(await context.takeScreenshot(), 'focus');
    });
  });

  story('BlurAlwaysAfterChange', () => {
    test('value not changed', async (context) => {
      const page = context.webdriver;
      await page.evaluate(() => {
        const input = window.document.querySelector("[data-tid~='DateInput__root']");
        if (input instanceof HTMLElement) {
          input.focus();
        }
      });
      await page.locator('body').click();
      await page.waitForTimeout(500);
      await context.matchImage(await context.takeScreenshot(), 'value not changed');
    });

    test('value changed', async (context) => {
      const page = context.webdriver;
      await page.evaluate(() => {
        const input = window.document.querySelector("[data-tid~='DateInput__root']");
        if (input instanceof HTMLElement) {
          input.focus();
        }
      });
      await page.keyboard.type('12');
      await page.locator('body').click();
      await page.waitForTimeout(500);
      await context.matchImage(await context.takeScreenshot(), 'value changed');
    });

    test('value restored', async (context) => {
      const page = context.webdriver;
      await page.evaluate(() => {
        const input = window.document.querySelector("[data-tid~='DateInput__root']");
        if (input instanceof HTMLElement) {
          input.focus();
        }
      });
      await page.keyboard.press('Numpad1');
      await page.locator('body').click();
      await page.evaluate(() => {
        const input = window.document.querySelector("[data-tid~='DateInput__root']");
        if (input instanceof HTMLElement) {
          input.blur();
        }
      });
      await context.matchImage(await context.takeScreenshot(), 'value restored');
    });
  });

  story('WithNoValue', () => {
    test('idle', async (context) => {
      await context.matchImage(await context.takeScreenshot());
    });

    test('focused', async (context) => {
      const page = context.webdriver;
      await page.evaluate(() => {
        const input = window.document.querySelector("[data-tid~='DateInput__root']");
        if (input instanceof HTMLElement) {
          input.focus();
        }
      });
      await context.matchImage(await context.takeScreenshot());
    });
  });

  story('WithError', () => {
    test('focused', async (context) => {
      const plain = await context.takeScreenshot();
      const page = context.webdriver;
      await page.keyboard.press('Tab'); // focus on input
      await page.waitForTimeout(1000);
      const focused = await context.takeScreenshot();
      await context.matchImages({ plain, focused });
    });
  });

  story('ShouldSetFocusOnPlaceholderClick', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'chrome only': { in: /^(?!\bchrome2022\b)/ } } });

    test('focused', async (context) => {
      const page = context.webdriver;
      await page.keyboard.press('Tab'); // focus on input
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot());
    });
  });
});
