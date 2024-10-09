import { story, kind, test } from 'creevey';

kind('FxInput', () => {
  story('WithWidthStory', () => {
    test('inside auto container', async function () {
      const element = await this.browser.findElement({ css: '[data-tid="container"]' });
      await this.expect(await element.takeScreenshot()).to.matchImage('inside auto container');
    });

    test('inside fixed container', async function () {
      const element = await this.browser.findElement({ css: '[data-tid="container"]' });
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#toggle-width' }))
        .perform();
      await this.expect(await element.takeScreenshot()).to.matchImage('inside fixed container');
    });
  });
});
