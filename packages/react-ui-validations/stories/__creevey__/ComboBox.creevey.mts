import { story, kind, test } from 'creevey';
import { delay } from '@skbkontur/react-ui/lib/delay';

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
        .pause(100)
        .pause(100)
        .move({
          origin: combobox,
        })
        .perform();
      delay(200);
      await context.matchImage(await context.takeScreenshot());
    });
  });
});
