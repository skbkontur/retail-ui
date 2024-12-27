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

    test('plain', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'plain');
    });

    test('focused first element', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="InputLikeText"]' }))
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'focused first element');
    });
  });
});
