import 'creevey/playwright';
import { story, kind, test } from 'creevey';

import { tid } from './helpers.mjs';

kind('ValidationWrapper', () => {
  story('ScrollAndFocusInIframe', () => {
    test('scroll', async (context) => {
      const page = context.webdriver;
      const idle = await page.screenshot();
      await page.locator(tid('outside-submit')).click();
      await page.waitForTimeout(500);
      const scrollOnOutsideSubmit = await page.screenshot();

      await context.matchImages({ idle, scrollOnOutsideSubmit });
    });
  });
});
