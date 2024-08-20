import { story, kind, test } from 'creevey';

kind('CurrencyInput', () => {
  story('SampleStory', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'flacky visible(?!) cursor': {
          in: ['chromeDark'],
          tests: ['Focus', 'Input value', 'External focus and input'],
        },
        'flaky pixels in the bottom left corner': {
          in: ['chrome2022'],
          tests: ['External focus and input'],
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
        .pause(500)
        .sendKeys('2')
        .pause(500)
        .sendKeys('3')
        .pause(500)
        .sendKeys('4')
        .pause(500)
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
        .pause(500)
        .sendKeys('2')
        .pause(500)
        .sendKeys('3')
        .pause(500)
        .sendKeys('4')
        .pause(500)
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('External focus and input');
    });
  });
});
