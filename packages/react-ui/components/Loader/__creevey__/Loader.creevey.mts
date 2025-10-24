import { story, kind, test } from 'creevey';
import { Key } from 'selenium-webdriver';

kind('Loader', () => {
  story('ActiveLoader', () => {
    test('covers children', async (context) => {
      const element = await context.webdriver.findElement({ css: '[data-tid~="Loader__Veil"]' });
      const button = await context.webdriver.findElement({ css: '[data-tid~="Button__root"]' });
      await context.webdriver.actions({ bridge: true }).click(button).perform();
      await context.matchImage(await element.takeScreenshot(), 'cover children');
    });
  });

  story('InactiveLoader', () => {
    test("doesn't cover children", async (context) => {
      const element = await context.webdriver.findElement({ css: '[data-tid~="Loader__Idle"]' });
      const button = await context.webdriver.findElement({ css: '[data-tid~="Button__root"]' });
      await context.webdriver.actions({ bridge: true }).click(button).perform();
      await context.matchImage(await element.takeScreenshot(), "doesn't cover children");
    });
  });

  story('FocusInside', () => {
    test('focus inside', async (context) => {
      const loader = await context.webdriver.findElement({ css: '[data-tid~="Loader__Idle"]' });
      const toggle = await context.webdriver.findElement({ css: '[data-tid~="toggle-loader"]' });
      await context.webdriver.actions().sendKeys(Key.TAB).perform();
      const enabled = await loader.takeScreenshot();
      await context.webdriver.actions().click(toggle).move({ x: 0, y: 0 }).click().perform();
      await context.webdriver.actions().sendKeys(Key.TAB).perform();
      const disabled = await loader.takeScreenshot();
      await context.matchImages({ enabled, disabled });
    });
  });
});
