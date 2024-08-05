import { story, kind, test } from 'creevey';

kind('Radio', () => {
  story('Highlighted', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        flaky: { in: /firefox/ },
      },
    });

    test('plain', async function () {
      await this.expect(await this.takeScreenshot()).to.matchImage('plain');
    });

    test('tabPress', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: 'body' }))
        .sendKeys(this.keys.TAB)
        .pause(500)
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('tabPress');
    });
  });
});
