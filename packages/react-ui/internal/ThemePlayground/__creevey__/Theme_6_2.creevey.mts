import { story, kind, test } from 'creevey';
import 'creevey/playwright';
import { tid, waitForPopup } from '../../../components/__creevey__/helpers.mjs';

kind('ThemeVersions/6_2', () => {
  story('TokenInputMenuOffset6_2', ({ setStoryParameters }) => {
    setStoryParameters({
      captureElement: null,
      skip: {
        'no themes': { in: /^(?!\b(chrome2022)\b)/ },
      },
    });

    test('withMenu', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('TokenInput__root')).click();
      await page.keyboard.type('a');
      await waitForPopup(page);
      await page.waitForTimeout(300);
      await context.matchImage(await context.takeScreenshot(), 'withMenu');
    });
  });

  story('InputAffixColor6_2', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'no themes': { in: /^(?!\b(chrome2022)\b)/ },
      },
    });
  });
});
