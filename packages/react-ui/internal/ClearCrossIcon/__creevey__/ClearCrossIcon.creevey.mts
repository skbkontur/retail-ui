import { story, kind, test } from 'creevey';
import 'creevey/playwright';

import { tid } from '../../../components/__creevey__/helpers.mjs';

kind('ClearCrossIcon', () => {
  story('ClearCrossIconDefaultColors', () => {
    test('idle', async (context) => {
      const page = context.webdriver;
      const plain = await context.takeScreenshot();
      await page.locator(tid('clear-cross-icon')).hover();
      await page.waitForTimeout(300);
      const hover = await context.takeScreenshot();

      await context.matchImages({ plain, hover });
    });
  });

  story('ClearCrossIconWithCustomColors', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'test theme variables': { in: /^(?!\bchrome2022\b)/ } },
    });
    test('idle', async (context) => {
      const page = context.webdriver;
      const plain = await context.takeScreenshot();
      await page.locator(tid('clear-cross-icon')).hover();
      await page.waitForTimeout(300);
      const hover = await context.takeScreenshot();

      await context.matchImages({ plain, hover });
    });
  });
});
