import 'creevey/playwright';
import { story, kind, test } from 'creevey';

import { tid, waitForByTid } from './helpers.mjs';

kind('ComboBox', () => {
  story('Required', () => {
    test('idle', async (context) => {
      const page = context.webdriver;
      const combobox = page.locator(tid('combobox'));
      await combobox.click();
      await combobox.hover();
      await combobox.getByRole('textbox').fill('test');
      await page.locator('body').click();
      await combobox.hover();
      await waitForByTid(page, 'PopupContent');
      await context.matchImage(await context.takeScreenshot());
    });
  });
});
