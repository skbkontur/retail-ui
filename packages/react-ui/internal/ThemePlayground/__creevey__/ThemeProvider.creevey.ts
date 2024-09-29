import { story, kind, test } from 'creevey';

import { delay } from '../../../lib/utils';

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

    test('theme 2022 top', async function () {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '[data-prop-id="lightTheme"]' }))
        .perform();
      await delay(500);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('theme 2022 top');
    });

    test('theme 2022 bottom', async function () {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '[data-prop-id="lightTheme"]' }))
        .perform();
      await this.browser.executeScript(function () {
        document.documentElement.scrollTop = document.documentElement.scrollHeight;
      });
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('theme 2022 bottom');
    });

    test('theme 2022 dark top', async function () {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '[data-prop-id="darkTheme"]' }))
        .perform();
      await delay(500);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('theme 2022 dark top');
    });

    test('theme 2022 dark bottom', async function () {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '[data-prop-id="darkTheme"]' }))
        .perform();
      await this.browser.executeScript(function () {
        document.documentElement.scrollTop = document.documentElement.scrollHeight;
      });
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('theme 2022 dark bottom');
    });
  });
});
