import { story, kind, test } from 'creevey';

kind('FxInput', () => {
  story('WithWidthStory', () => {
    test('inside auto container', async (context) => {
      const element = await context.webdriver.findElement({ css: '[data-tid="container"]' });
      await context.matchImage(await element.takeScreenshot(), 'inside auto container');
    });

    test('inside fixed container', async (context) => {
      const element = await context.webdriver.findElement({ css: '[data-tid="container"]' });
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '#toggle-width' }))
        .perform();
      await context.matchImage(await element.takeScreenshot(), 'inside fixed container');
    });
  });
});
