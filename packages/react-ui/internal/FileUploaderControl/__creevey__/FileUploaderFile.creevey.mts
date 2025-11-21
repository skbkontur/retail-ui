import { story, kind, test } from 'creevey';
import 'creevey/playwright';

import { tid, waitForPopup } from '../../../components/__creevey__/helpers.mjs';

kind('FileUploaderFile', () => {
  story('FileUploaderFileWithValidationError', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'story-skip-0': {
          in: /^(?!\b(chrome2022)\b)/,
        },
      },
    });

    test('hover', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('FileUploader__fileName')).hover();
      await waitForPopup(page);
      await context.matchImage(await context.takeScreenshot(), 'hover');
    });
  });
});
