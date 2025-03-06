import { story, kind, test } from 'creevey';

kind('Checkbox', () => {
  story('Required', () => {
    test('idle', async (context) => {
      const checkButton = await context.webdriver.findElement({ css: '[data-tid~="button"]' });
      const checkbox = await context.webdriver.findElement({ css: '[data-tid~="checkbox"]' });
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(checkButton)
        .pause(100)
        .move({
          origin: checkbox,
        })
        .perform();
      await context.matchImage(await context.takeScreenshot());
    });
  });
});
