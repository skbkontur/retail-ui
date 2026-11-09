import 'creevey/playwright';
import { strict as assert } from 'node:assert';

import { kind, story, test } from 'creevey';

import { tid, waitForAnimationFrame } from '../../../components/__creevey__/helpers.mjs';

kind('Popup/Resize regressions', () => {
  story('MaxWidthWithIframe', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { desktopOnly: { in: /^(?!chrome2022$)/ } } });

    test('constrains content to maxWidth with observer and iframe', async ({ webdriver: page }) => {
      for (const id of ['resize-observer', 'resize-iframe']) {
        const popup = page.locator(`#${id}`);
        await popup.locator(tid('PopupContent')).waitFor();
      }
      await waitForAnimationFrame(page);

      const sizes = await page.evaluate(() =>
        ['resize-observer', 'resize-iframe'].map((id) => {
          const root = document.getElementById(id);
          const content = root?.querySelector('[data-tid~="PopupContent"]');
          if (!root || !content) {
            throw new Error(`Missing popup or content for ${id}`);
          }
          return {
            id,
            rootWidth: root.getBoundingClientRect().width,
            contentWidth: content.getBoundingClientRect().width,
          };
        }),
      );
      for (const { id, rootWidth, contentWidth } of sizes) {
        assert.ok(rootWidth <= 201, `${id}: popup width ${rootWidth} exceeds maxWidth=200`);
        assert.ok(
          contentWidth <= rootWidth + 1,
          `${id}: content width ${contentWidth} exceeds popup width ${rootWidth}`,
        );
      }
    });
  });
});
