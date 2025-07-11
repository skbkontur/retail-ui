import { story, kind, test } from 'creevey';
import { delay } from '@skbkontur/react-ui/lib/delay';

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
        .pause(1000)
        .move({
          origin: checkbox,
        })
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot());
    });
  });
});
