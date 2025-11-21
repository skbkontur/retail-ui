import { story, kind, test } from 'creevey';
import 'creevey/playwright';

import { tid } from '../../__creevey__/helpers.mjs';

kind('FxInput', () => {
  story('WithWidthStory', () => {
    test('inside auto container', async (context) => {
      const page = context.webdriver;
      const element = page.locator(tid('container'));
      await context.matchImage(await element.screenshot(), 'inside auto container');
    });

    test('inside fixed container', async (context) => {
      const page = context.webdriver;
      const element = page.locator(tid('container'));
      await page.locator('#toggle-width').click();
      await context.matchImage(await element.screenshot(), 'inside fixed container');
    });
  });
});
