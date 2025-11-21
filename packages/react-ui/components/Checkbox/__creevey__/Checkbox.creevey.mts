import { story, kind, test } from 'creevey';

import 'creevey/playwright';
import { tid } from '../../__creevey__/helpers.mjs';

const checkboxTests = () => {
  test('idle', async (context) => {
    await context.matchImage(await context.takeScreenshot(), 'idle');
  });

  test('hovered', async (context) => {
    const page = context.webdriver;
    await page.locator(tid('test-checkbox')).hover();
    await page.waitForTimeout(1000);
    await context.matchImage(await context.takeScreenshot(), 'hovered');
  });

  test('pressed', async (context) => {
    const page = context.webdriver;
    await page.locator(tid('test-checkbox')).hover();
    await page.mouse.down();
    await page.waitForTimeout(1000);
    await page.mouse.up();
  });

  test('clicked', async (context) => {
    const page = context.webdriver;
    await page.locator(tid('test-checkbox')).click();
    await context.matchImage(await context.takeScreenshot(), 'clicked');
  });

  test('tabPress', async (context) => {
    const page = context.webdriver;
    await page.locator(tid('test-checkbox')).click();
    await page.locator('body').click();
    await page.keyboard.press('Tab');
    await page.waitForTimeout(1000);
    await context.matchImage(await context.takeScreenshot(), 'tabPress');
  });

  test('spacePress', async (context) => {
    const page = context.webdriver;
    await page.locator(tid('test-checkbox')).click();
    await page.locator('body').click();
    await page.keyboard.press('Tab');
    await page.waitForTimeout(1000);
    await page.keyboard.press('Space');
    await page.waitForTimeout(1000);
    await context.matchImage(await context.takeScreenshot(), 'spacePress');
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
    test('idle', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'idle');
    });

    test('hovered', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('test-checkbox')).hover();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'hovered');
    });

    test('pressed', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('test-checkbox')).hover();
      await page.mouse.down();
      await page.waitForTimeout(1000);
      await page.mouse.up();
    });
  });

  story('Indeterminate', () => {
    test('plain', async (context) => {
      const page = context.webdriver;
      const element = page.locator('#screenshot-capture');
      await page.waitForTimeout(1000);
      await context.matchImage(await element.screenshot(), 'plain');
    });

    test('hovered', async (context) => {
      const page = context.webdriver;
      const element = page.locator('#screenshot-capture');
      await page.locator('label').hover();
      await page.waitForTimeout(1000);
      await context.matchImage(await element.screenshot(), 'hovered');
    });

    test('tabPress', async (context) => {
      const page = context.webdriver;
      const element = page.locator('#screenshot-capture');
      await page.keyboard.press('Tab');
      await page.waitForTimeout(1000);
      await context.matchImage(await element.screenshot(), 'tabPress');
    });

    test('clicked', async (context) => {
      const page = context.webdriver;
      const element = page.locator('#screenshot-capture');
      await page.locator('label').click();
      await page.waitForTimeout(1000);
      await context.matchImage(await element.screenshot(), 'clicked');
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
    test('plain', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'plain');
    });

    test('tabPress', async (context) => {
      const page = context.webdriver;
      await page.keyboard.press('Tab');
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'tabPress');
    });
  });

  story('CheckboxLabelSelectionWithPressedShift', () => {
    test('plain', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'plain');
    });

    test('selected with pressed shift', async (context) => {
      const page = context.webdriver;
      const checkbox = page.locator(tid('Checkbox__root'));
      await page.keyboard.down('Shift');
      await checkbox.click();
      await context.matchImage(await context.takeScreenshot(), 'selected with pressed shift');
      await page.keyboard.up('Shift');
    });
  });
});
