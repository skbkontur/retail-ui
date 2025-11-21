import { story, kind, test } from 'creevey';
import 'creevey/playwright';

import { tid } from '../../../components/__creevey__/helpers.mjs';

const textAlignmentTests = () => {
  test('opened', async (context) => {
    const page = context.webdriver;
    await page.locator(tid('PopupMenu__caption')).click();
    await page.waitForTimeout(1000);
    await context.matchImage(await context.takeScreenshot(), 'opened');
  });
};

kind('PopupMenu', () => {
  story('WithItems', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'themes dont affect logic': { in: /^(?!\bchrome2022\b)/ } } });

    textAlignmentTests();
  });

  story('WithItemsWithIcons', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'themes dont affect logic': { in: /^(?!\bchrome2022\b)/ } } });

    textAlignmentTests();
  });

  story('WithItemsWithIconsWithoutTextAlignment', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'themes dont affect logic': { in: /^(?!\bchrome2022\b)/ } } });

    textAlignmentTests();
  });
});
