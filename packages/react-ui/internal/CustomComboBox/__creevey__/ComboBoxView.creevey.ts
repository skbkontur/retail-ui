import { story, kind, test } from 'creevey';

const FIREFOX_REGEXP = /.*firefox.*/i;

kind('ComboBoxView', () => {
  story('InputLikeText', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'story-skip-0': {
          in: FIREFOX_REGEXP,
          tests: ['focused first element'],
        },
      },
    });

    test('plain', async function () {
      await this.expect(await this.takeScreenshot()).to.matchImage('plain');
    });

    test('focused first element', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="InputLikeText"]' }))
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('focused first element');
    });
  });
});
