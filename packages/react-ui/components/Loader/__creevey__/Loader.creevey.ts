import { story, kind, test } from 'creevey';

kind('Loader', () => {
  story('ActiveLoader', () => {
    test('covers children', async function () {
      const element = await this.browser.findElement({ css: '[data-comp-name~="Loader"]' });
      const button = await this.browser.findElement({ css: '[data-comp-name~="Button"]' });
      await this.browser.actions({ bridge: true }).click(button).perform();
      await this.expect(await element.takeScreenshot()).to.matchImage('cover children');
    });
  });

  story('InactiveLoader', () => {
    test("doesn't cover children", async function () {
      const element = await this.browser.findElement({ css: '[data-comp-name~="Loader"]' });
      const button = await this.browser.findElement({ css: '[data-comp-name~="Button"]' });
      await this.browser.actions({ bridge: true }).click(button).perform();
      await this.expect(await element.takeScreenshot()).to.matchImage("doesn't cover children");
    });
  });

  story('FocusInside', () => {
    test('focus inside', async function () {
      const loader = await this.browser.findElement({ css: '[data-comp-name~="Loader"]' });
      const toggle = await this.browser.findElement({ css: '[data-tid~="toggle-loader"]' });
      await this.browser.actions().sendKeys(this.keys.TAB).perform();
      const enabled = await loader.takeScreenshot();
      await this.browser.actions().click(toggle).move({ x: 0, y: 0 }).click().perform();
      await this.browser.actions().sendKeys(this.keys.TAB).perform();
      const disabled = await loader.takeScreenshot();
      await this.expect({ enabled, disabled }).to.matchImages();
    });
  });
});
