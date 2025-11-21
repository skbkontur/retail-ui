import 'creevey/playwright';
import { story, kind, test } from 'creevey';

import { tid } from './helpers.mjs';

kind('ValidationWrapper', () => {
  story('ScrollAndFocusInIframe', () => {
    test('scroll', async (context) => {
      const page = context.webdriver;
      const idle = await context.takeScreenshot();
      await page.locator(tid('outside-submit')).click();
      await page.waitForTimeout(500);
      const scrollOnOutsideSubmit = await context.takeScreenshot();

      await context.matchImages({ idle, scrollOnOutsideSubmit });
    });
  });
});
