import { kind, story, test } from 'creevey';
import { Key } from 'selenium-webdriver';

import { delay } from '../../../lib/delay';

kind('ThemeVersions/5_0', () => {
  story('Modal5_0', () => {
    test('idle', async (context) => {
      const idle = await context.webdriver.takeScreenshot();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .sendKeys(Key.TAB)
        .perform();
      await delay(200);
      const focusedByTab = await context.webdriver.takeScreenshot();
      await context.matchImages({ idle, focusedByTab });
    });
  });

  story('SidePage5_0', () => {
    test('idle', async (context) => {
      const idle = await context.webdriver.takeScreenshot();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .sendKeys(Key.TAB)
        .perform();
      await delay(200);
      const focusedByTab = await context.webdriver.takeScreenshot();
      await context.matchImages({ idle, focusedByTab });
    });
  });
});
