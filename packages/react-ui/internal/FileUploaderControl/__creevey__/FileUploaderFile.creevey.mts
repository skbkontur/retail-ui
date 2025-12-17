import { story, kind, test } from 'creevey';

import 'creevey/playwright';
import { tid, waitForPopup } from '../../../components/__creevey__/helpers.mjs';

kind('FileUploaderFile', () => {
  const stories = [
    'FileUploaderFileWithValidationError',
    'fileUploaderTileWithValidationError',
    'FileUploaderFileWithValidationWarning',
    'fileUploaderTileWithValidationWarning',
  ];

  stories.forEach((item) => {
    story(item, ({ setStoryParameters }) => {
      setStoryParameters({
        skip: {
          'story-skip-0': {
            in: /^(?!\b(chrome2022)\b)/,
          },
        },
      });

      test('hover', async (context) => {
        const page = context.webdriver;
        await page.locator(tid('FileUploader__fileName')).first().hover();
        await waitForPopup(page);
        await context.matchImage(await context.takeScreenshot(), 'hover');
      });
    });
  });
});
