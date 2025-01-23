import { story, kind, test } from 'creevey';

kind('ComboBox', () => {
  story('Required', () => {
    test('idle', async (context) => {
      const combobox = await context.webdriver.findElement({ css: '[data-tid~="combobox"]' });
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(combobox)
        .sendKeys('test')
        .click(context.webdriver.findElement({ css: 'body' }))
        .move({
          origin: combobox,
        })
        .perform();
      await context.matchImage(await context.takeScreenshot());
    });
  });
});
