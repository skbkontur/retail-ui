import { story, kind, test } from 'creevey';

kind('Group', () => {
  story('SimpleGroupWithInputAndButton', () => {
    test('plain', async function () {
      await this.expect(await this.takeScreenshot()).to.matchImage('plain');
    });

    test('focused input', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: 'input' }))
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('focused input');
    });
  });
});
