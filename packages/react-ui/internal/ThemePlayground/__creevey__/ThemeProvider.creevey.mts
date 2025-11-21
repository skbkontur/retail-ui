import { story, kind, test } from 'creevey';
import 'creevey/playwright';

kind('ThemeProvider', () => {
  story('Playground', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'repeating tests': {
          tests: ['theme 2022', 'theme 2022 dark'],
          in: /^(?!\b(chrome2022|firefox2022)\b)/,
        },
      },
    });

    test('theme 2022', async (context) => {
      const page = context.webdriver;
      await page.locator('[data-tab-id="lightTheme"]').click();
      await page.waitForTimeout(500);
      await context.matchImage(await context.takeScreenshot(), 'theme 2022');
    });

    test('theme 2022 dark', async (context) => {
      const page = context.webdriver;
      await page.locator('[data-tab-id="darkTheme"]').click();
      await page.waitForTimeout(500);
      await context.matchImage(await context.takeScreenshot(), 'theme 2022 dark');
    });
  });

  story('UnlinkVars', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'themes do not affect logic': {
          in: ['chrome2022Dark', 'firefox2022', 'firefox2022Dark'],
        },
      },
    });
  });
});
