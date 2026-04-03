import { story, kind, test } from 'creevey';

import 'creevey/playwright';
import { tid } from '../../../components/__creevey__/helpers.mjs';

kind('ThemeVersions/6_0', () => {
  story('Calendar6_0', () => {
    test('selected date hover', async (context) => {
      const page = context.webdriver;
      await page
        .locator(tid('DayCellView__root'), { has: page.getByText('12') })
        .nth(0)
        .hover();

      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'selected date hover');
    });

    test('selected weekend date hover', async (context) => {
      const page = context.webdriver;
      await page
        .locator(tid('DayCellView__root'), { has: page.getByText('14') })
        .nth(0)
        .click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'selected weekend date hover');
    });
  });
});
