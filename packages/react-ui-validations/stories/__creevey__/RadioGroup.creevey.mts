import { story, kind, test } from 'creevey';

kind('Radiogroup', () => {
  story('RadioGroupWithItemsProp', () => {
    test('idle', async (context) => {
      const button = await context.webdriver.findElement({ css: '[data-tid~="button"]' });
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(button)
        .pause(500)
        .perform();
      await context.matchImage(await context.takeScreenshot());
    });
  });

  story('RadioGroupWithChildrenRadio', () => {
    test('idle', async (context) => {
      const button = await context.webdriver.findElement({ css: '[data-tid~="button"]' });
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(button)
        .pause(500)
        .perform();
      await context.matchImage(await context.takeScreenshot());
    });
  });
});
