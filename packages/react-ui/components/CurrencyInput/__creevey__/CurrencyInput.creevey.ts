import { story, kind, test } from 'creevey';
import { delay } from '../../../lib/utils';

kind('CurrencyInput', () => {
  story('SampleStory', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'flacky visible(?!) cursor': {
          in: ['chromeDark'],
          tests: ['Focus', 'Input value', 'External focus and input'],
        },
      },
    });

    test('Plain', async function () {
      await this.expect(await this.takeScreenshot()).to.matchImage('Plain');
    });

    test('Focus', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(
          this.browser.findElement({
            css: '[data-comp-name*="CurrencyInput"] input',
          }),
        )
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('Focus');
    });

    test('Input value', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(
          this.browser.findElement({
            css: '[data-comp-name*="CurrencyInput"] input',
          }),
        )
        .sendKeys('1')
        .perform();
      await delay(500);
      await this.browser
        .actions({
          bridge: true,
        })
        .sendKeys('2')
        .perform();
      await delay(500);
      await this.browser
        .actions({
          bridge: true,
        })
        .sendKeys('3')
        .perform();
      await delay(500);
      await this.browser
        .actions({
          bridge: true,
        })
        .sendKeys('4')
        .perform();
      await delay(500);
      await this.browser
        .actions({
          bridge: true,
        })
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('Input value');
    });

    test('External focus and input', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid~="focus-input"]' }))
        .perform();
      await this.browser
        .actions({
          bridge: true,
        })
        .sendKeys('1')
        .perform();
      await delay(500);
      await this.browser
        .actions({
          bridge: true,
        })
        .sendKeys('2')
        .perform();
      await delay(500);
      await this.browser
        .actions({
          bridge: true,
        })
        .sendKeys('3')
        .perform();
      await delay(500);
      await this.browser
        .actions({
          bridge: true,
        })
        .sendKeys('4')
        .perform();
      await delay(500);
      await this.browser
        .actions({
          bridge: true,
        })
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('External focus and input');
    });
  });
});
