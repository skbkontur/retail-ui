import { story, kind, test } from 'creevey';
import { Key } from 'selenium-webdriver';

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
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: 'body' }))
        .sendKeys(Key.TAB)
        .pause(500)
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'tabPress');
    });
  });
});
