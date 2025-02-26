import { story, kind, test } from 'creevey';
import { Key } from 'selenium-webdriver';

import { delay } from '../../../lib/delay';

kind('ThemeProvider', () => {
  story('Playground', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'repeating tests': {
          tests: ['theme 2022 top', 'theme 2022 bottom', 'theme 2022 dark top', 'theme 2022 dark bottom'],
          in: /^(?!\b(chrome2022|firefox2022)\b)/,
        },
      },
    });

    test('theme 2022 top', async (context) => {
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: '[data-prop-id="lightTheme"]' }))
        .perform();
      await delay(500);
      await context.matchImage(await context.webdriver.takeScreenshot(), 'theme 2022 top');
    });

    test('theme 2022 bottom', async (context) => {
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: '[data-prop-id="lightTheme"]' }))
        .perform();
      await context.webdriver.executeScript(function () {
        document.documentElement.scrollTop = document.documentElement.scrollHeight;
      });
      await delay(1000);
      await context.matchImage(await context.webdriver.takeScreenshot(), 'theme 2022 bottom');
    });

    test('theme 2022 dark top', async (context) => {
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: '[data-prop-id="darkTheme"]' }))
        .perform();
      await delay(500);
      await context.matchImage(await context.webdriver.takeScreenshot(), 'theme 2022 dark top');
    });

    test('theme 2022 dark bottom', async (context) => {
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: '[data-prop-id="darkTheme"]' }))
        .perform();
      await context.webdriver.executeScript(function () {
        document.documentElement.scrollTop = document.documentElement.scrollHeight;
      });
      await delay(1000);
      await context.matchImage(await context.webdriver.takeScreenshot(), 'theme 2022 dark bottom');
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
