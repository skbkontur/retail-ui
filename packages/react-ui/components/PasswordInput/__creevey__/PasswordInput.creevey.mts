import { story, kind, test } from 'creevey';
import 'creevey/playwright';

import { tid } from '../../__creevey__/helpers.mjs';

kind('PasswordInput', () => {
  story('Plain', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'flickering screenshot': { in: ['chrome2022'], tests: ['With typed password'] },
      },
    });

    test('Plain', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'Plain');
    });

    test('With typed password', async (context) => {
      const page = context.webdriver;
      await page.locator('[type="password"]').click();
      await page.keyboard.type('Test...');
      await context.matchImage(await context.takeScreenshot(), 'With typed password');
    });

    test('With visible password', async (context) => {
      const page = context.webdriver;
      await page.locator('[type="password"]').click();
      await page.keyboard.type('Test...');
      await page.locator(tid('PasswordInputEyeIcon')).click();
      await context.matchImage(await context.takeScreenshot(), 'With visible password');
    });
  });

  story('Width', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'no themes': { in: /^(?!\b(chrome2022)\b)/ },
      },
    });
  });
});
