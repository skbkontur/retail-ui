import { story, kind, test } from 'creevey';
import 'creevey/playwright';

import { tid } from '../../../components/__creevey__/helpers.mjs';

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
      const page = context.webdriver;
      await page.locator(tid('InputLikeText__root')).first().click();
      await context.matchImage(await context.takeScreenshot(), 'focused first element');
    });
  });
});
