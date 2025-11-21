import { story, kind, test } from 'creevey';
import 'creevey/playwright';

kind('Radio', () => {
  story('Highlighted', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        flaky: { in: /firefox/ },
      },
    });

    test('plain', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'plain');
    });

    test('tabPress', async (context) => {
      const page = context.webdriver;
      await page.locator('body').click();
      await page.keyboard.press('Tab');
      await page.waitForTimeout(500);
      await context.matchImage(await context.takeScreenshot(), 'tabPress');
    });
  });
});
