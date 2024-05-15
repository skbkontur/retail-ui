import { story, kind, test } from 'creevey';

import { PopupMenu, PopupMenuDataTids } from '../PopupMenu';
import { delay } from '../../../lib/utils';

const textAlignmentTests = () => {
  test('opened', async function () {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: `[data-tid~="${PopupMenuDataTids.caption}"]` }))
      .perform();
    await delay(1000);
    await this.expect(await this.takeScreenshot()).to.matchImage('opened');
  });
};

kind('PopupMenu', () => {
  story('WithItems', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'themes dont affect logic': { in: /^(?!\bchrome\b)/ } } });

    textAlignmentTests();
  });

  story('WithItemsWithIcons', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'themes dont affect logic': { in: /^(?!\bchrome\b)/ } } });

    textAlignmentTests();
  });

  story('WithItemsWithIconsWithoutTextAlignment', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'themes dont affect logic': { in: /^(?!\bchrome\b)/ } } });

    textAlignmentTests();
  });
});
