import { story, kind, test } from 'creevey';

import 'creevey/playwright';
import { tid, waitForByTid } from './helpers.mjs';

kind('Radiogroup', () => {
  story('RadioGroupWithItemsProp', () => {
    test('idle', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('button')).click();
      await waitForByTid(page, 'PopupContent');
      await context.matchImage(await context.takeScreenshot());
    });
  });

  story('RadioGroupWithChildrenRadio', () => {
    test('idle', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('button')).click();
      await waitForByTid(page, 'PopupContent');
      await context.matchImage(await context.takeScreenshot());
    });
  });
});
