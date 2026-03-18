import { story, kind, test } from 'creevey';

import 'creevey/playwright';
import { tid } from '../../__creevey__/helpers.mjs';

kind('FileUploader', () => {
  story('FileUploaderWithCustomBg', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'themes dont affect logic': {
          in: /^(?!\b(chrome2022)\b)/,
        },
      },
    });

    test('idle', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'idle');
    });

    test('hover', async (context) => {
      const page = context.webdriver;

      await page.locator(tid('file-uploader-1')).hover();
      const rowHover = await context.takeScreenshot();

      await page.locator(tid('file-uploader-2')).hover();
      const tileHover = await context.takeScreenshot();
      await context.matchImages({ rowHover, tileHover });
    });
  });
});
