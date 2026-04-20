import 'creevey/playwright';
import { kind, story, test } from 'creevey';

import { tid } from '../../__creevey__/helpers.mjs';

kind('Switcher', () => {
  story('Horizontal', () => {
    test('idle', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'idle');
    });

    test('clicked', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('Button__root')).first().click();
      await context.matchImage(await context.takeScreenshot(), 'clicked');
    });
  });
  story('WithCustomRenderItems', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'chrome only': { in: /^(?!\bchrome2022\b)/ } },
    });
  });
});
