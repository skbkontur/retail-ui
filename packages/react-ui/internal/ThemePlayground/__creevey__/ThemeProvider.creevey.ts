import { story, kind, test } from 'creevey';

import { delay } from '../../../lib/utils';

kind('ThemeProvider', () => {
  story('Playground', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'repeating tests': {
          tests: [
            'default theme top',
            'default theme bottom',
            'dark theme top',
            'dark theme bottom',
            'default old theme top',
            'default old theme bottom',
            'flat old theme top',
            'flat old theme bottom',
            'theme 2022 top',
            'theme 2022 bottom',
            'theme 2022 dark top',
            'theme 2022 dark bottom',
          ],
          in: /^(?!\b(chrome|firefox)\b)/,
        },
      },
    });

    test('default theme top', async function () {
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('default theme top');
    });

    test('default theme bottom', async function () {
      await this.browser.executeScript(function () {
        document.documentElement.scrollTop = document.documentElement.scrollHeight;
      });
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('default theme bottom');
    });

    test('dark theme top', async function () {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '[data-prop-id="dark"]' }))
        .perform();
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('dark theme top');
    });

    test('dark theme bottom', async function () {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '[data-prop-id="dark"]' }))
        .perform();
      await this.browser.executeScript(function () {
        document.documentElement.scrollTop = document.documentElement.scrollHeight;
      });
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('dark theme bottom');
    });

    test('default old theme top', async function () {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '[data-prop-id="defaultOld"]' }))
        .perform();
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('default old theme top');
    });

    test('default old theme bottom', async function () {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '[data-prop-id="defaultOld"]' }))
        .perform();
      await this.browser.executeScript(function () {
        document.documentElement.scrollTop = document.documentElement.scrollHeight;
      });
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('default old theme bottom');
    });

    test('flat old theme top', async function () {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '[data-prop-id="flatOld"]' }))
        .perform();
      await delay(500);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('flat old theme top');
    });

    test('flat old theme bottom', async function () {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '[data-prop-id="flatOld"]' }))
        .perform();
      await this.browser.executeScript(function () {
        document.documentElement.scrollTop = document.documentElement.scrollHeight;
      });
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('flat old theme bottom');
    });

    test('theme 2022 top', async function () {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '[data-prop-id="theme2022"]' }))
        .perform();
      await delay(500);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('theme 2022 top');
    });

    test('theme 2022 bottom', async function () {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '[data-prop-id="theme2022"]' }))
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
        .click(this.browser.findElement({ css: '[data-prop-id="theme2022Dark"]' }))
        .perform();
      await delay(500);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('theme 2022 dark top');
    });

    test('theme 2022 dark bottom', async function () {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '[data-prop-id="theme2022Dark"]' }))
        .perform();
      await this.browser.executeScript(function () {
        document.documentElement.scrollTop = document.documentElement.scrollHeight;
      });
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('theme 2022 dark bottom');
    });
  });
});
