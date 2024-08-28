import { story, kind, test } from 'creevey';

import { delay } from '../../../lib/utils';
import { ButtonDataTids } from '../../Button';

kind('Overlays/MiniModal', () => {
  story('Simple', () => {
    test('open modal', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: `[data-tid~="${ButtonDataTids.rootElement}"]` }))
        .perform();
      await delay(200);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('open modal');
    });
  });
});
