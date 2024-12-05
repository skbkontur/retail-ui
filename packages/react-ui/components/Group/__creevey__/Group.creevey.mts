import { story, kind, test } from 'creevey';

kind('Group', () => {
  story('SimpleGroupWithInputAndButton', () => {
    test('plain', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'plain');
    });

    test('focused input', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: 'input' }))
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'focused input');
    });
  });
});
