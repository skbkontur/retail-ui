import 'creevey/playwright';
import { kind, story, test } from 'creevey';

kind('Group', () => {
  story('SimpleGroupWithInputAndButton', () => {
    test('plain', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'plain');
    });

    test('focused input', async (context) => {
      const page = context.webdriver;
      await page.locator('input').click();
      await context.matchImage(await context.takeScreenshot(), 'focused input');
    });
  });
});
