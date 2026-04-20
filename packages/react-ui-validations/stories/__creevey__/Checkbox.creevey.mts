import 'creevey/playwright';
import { kind, story, test } from 'creevey';

import { tid, waitForByTid } from './helpers.mjs';

kind('Checkbox', () => {
  story('Required', () => {
    test('idle', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('button')).click();
      await page.locator(tid('checkbox')).hover();
      await waitForByTid(page, 'PopupContent');
      await context.matchImage(await context.takeScreenshot());
    });
  });
});
