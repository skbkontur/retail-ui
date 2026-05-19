import 'creevey/playwright';
import { kind, story, test } from 'creevey';

import { tid, waitForByTid } from './helpers.mjs';

kind('DateRangePicker', () => {
  story('Example1', ({ setStoryParameters }) => {
    if (process.env.REACT_VERSION === '17') {
      // Shared baselines stay common for all React versions.
      // React 17 is skipped only for this single Example1/submit story.
      setStoryParameters({
        skip: {
          'known render difference on React 17': {
            tests: ['submit'],
          },
        },
      });
    }

    test('submit', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('submit-button')).click();
      await waitForByTid(page, 'Calendar__root');
      await waitForByTid(page, 'Tooltip__content');
      await context.matchImage(await context.takeScreenshot());
    });
  });
});
