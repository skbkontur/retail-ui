import { story, kind, test } from 'creevey';
import 'creevey/playwright';

import { tid } from '../../__creevey__/helpers.mjs';

kind('Toggle', () => {
  story('Plain', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        flaky: { in: /chrome2022(Dark)?/, tests: ['pressed', 'clicked'] },
      },
    });

    test('plain', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'plain');
    });

    test('pressed', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('Toggle__root')).hover();
      await page.mouse.down();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'pressed');
    });

    test('clicked', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('Toggle__root')).click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'clicked');
    });
  });

  story('DisabledWithTooltip', () => {
    test('pressed', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('Toggle__root')).hover();
      await page.mouse.down();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'pressed');
    });
  });

  story('WithChildren', () => {
    test('plain', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'plain');
    });
  });

  story('WithLongDescription', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        flaky: { in: /chrome2022(Dark)?/, tests: 'clicked' },
      },
    });

    test('plain', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'plain');
    });

    test('clicked', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('Toggle__root')).hover();
      await page.waitForTimeout(2000);
      await page.locator(tid('Toggle__root')).click();
      await page.waitForTimeout(2000);
      await context.matchImage(await context.takeScreenshot(), 'clicked');
    });
  });
});
