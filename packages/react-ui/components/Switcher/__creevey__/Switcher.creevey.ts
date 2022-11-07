import { story, kind, test } from 'creevey';

kind('Switcher', () => {
  story('Horizontal', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'story-skip-0': { in: ['chromeFlat8px'], tests: 'clicked' },
      },
    });

    test('idle', async function () {
      await this.expect(await this.takeScreenshot()).to.matchImage('idle');
    });

    test('clicked', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="Button"]' }))
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('clicked');
    });
  });
});
