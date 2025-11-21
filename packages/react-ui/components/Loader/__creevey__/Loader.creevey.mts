import { story, kind, test } from 'creevey';
import 'creevey/playwright';

import { tid } from '../../__creevey__/helpers.mjs';

kind('Loader', () => {
  story('ActiveLoader', () => {
    test('covers children', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('Button__root')).click({ force: true });
      await context.matchImage(await context.takeScreenshot(), 'cover children');
    });
  });

  story('InactiveLoader', () => {
    test("doesn't cover children", async (context) => {
      const page = context.webdriver;
      await page.locator(tid('Button__root')).click();
      await context.matchImage(await context.takeScreenshot(), "doesn't cover children");
    });
  });

  story('FocusInside', () => {
    test('focus inside', async (context) => {
      const page = context.webdriver;
      await page.keyboard.press('Tab');
      const enabled = await context.takeScreenshot();
      await page.locator(tid('toggle-loader')).click();
      await page.locator(tid('Loader__Veil')).waitFor();
      await page.locator('body').click();
      await page.keyboard.press('Tab');
      const disabled = await context.takeScreenshot();
      await context.matchImages({ enabled, disabled });
    });
  });
});
