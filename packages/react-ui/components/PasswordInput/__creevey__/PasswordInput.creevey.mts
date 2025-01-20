import { story, kind, test } from 'creevey';

kind('PasswordInput', () => {
  story('Plain', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'flickering screenshot': { in: ['chrome2022'], tests: ['With typed password'] },
      },
    });

    test('Plain', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'Plain');
    });

    test('With typed password', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[type="password"]' }))
        .sendKeys('Test...')
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'With typed password');
    });

    test('With visible password', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[type="password"]' }))
        .sendKeys('Test...')
        .click(context.webdriver.findElement({ css: '[data-tid="PasswordInputEyeIcon"]' }))
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'With visible password');
    });
  });
});
