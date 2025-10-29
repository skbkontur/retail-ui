import 'creevey/playwright';
import { story, kind, test } from 'creevey';

import { tid, waitForByTid } from './helpers.mjs';

kind('DateRangePicker', () => {
  story('Example1', () => {
    test('submit', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('submit-button')).click();
      await waitForByTid(page, 'Calendar__root');
      await waitForByTid(page, 'Tooltip__content');
      await context.matchImage(await context.takeScreenshot());
    });
  });
});
