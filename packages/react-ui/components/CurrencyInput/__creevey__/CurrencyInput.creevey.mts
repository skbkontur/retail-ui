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

    test('Plain', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'Plain');
    });

    test('Focus', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(
          context.webdriver.findElement({
            css: '[data-comp-name*="CurrencyInput"] input',
          }),
        )
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'Focus');
    });

    test('Input value', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(
          context.webdriver.findElement({
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
      await context.matchImage(await context.takeScreenshot(), 'Input value');
    });

    test('External focus and input', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid~="focus-input"]' }))
        .perform();
      await context.webdriver
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
      await context.matchImage(await context.takeScreenshot(), 'External focus and input');
    });
  });
});
