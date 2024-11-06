import { story, kind, test } from 'creevey';

kind('Input', () => {
  story('TooltipTopLeft', () => {
    test('invalidTooltip', async function () {
      const input = await this.browser.findElement({ css: '[data-tid~="test-input"]' });
      await this.browser
        .actions({
          bridge: true,
        })
        .click(input)
        .sendKeys('test')
        .click(this.browser.findElement({ css: 'body' }))
        .click(input)
        .pause(500)
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage();
    });
  });
});
