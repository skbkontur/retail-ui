import { kind, story, test } from 'creevey';
import 'creevey/playwright';

kind('ThemeVersions/5_0', () => {
  story('Modal5_0', () => {
    test('idle', async (context) => {
      const idle = await context.takeScreenshot();
      const page = context.webdriver;
      await page.keyboard.press('Tab');
      await page.waitForTimeout(200);
      const focusedByTab = await context.takeScreenshot();
      await context.matchImages({ idle, focusedByTab });
    });
  });

  story('SidePage5_0', () => {
    test('idle', async (context) => {
      const idle = await context.takeScreenshot();
      const page = context.webdriver;
      await page.keyboard.press('Tab');
      await page.waitForTimeout(200);
      const focusedByTab = await context.takeScreenshot();
      await context.matchImages({ idle, focusedByTab });
    });
  });
});
