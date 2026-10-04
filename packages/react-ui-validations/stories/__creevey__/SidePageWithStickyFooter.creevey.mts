import 'creevey/playwright';
import { kind, story, test } from 'creevey';

import { tid, waitForValidationTooltip } from './helpers.mjs';

kind('SidePageWithStickyFooter', () => {
  story('ValidationTooltip', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: null });

    test('scrolls the invalid control above the sticky footer', async (context) => {
      const page = context.webdriver;

      await page.locator(tid('validation-input')).evaluate((input) => input.scrollIntoView({ block: 'end' }));
      // Keep the input inside the viewport but under the sticky footer
      await page.locator(tid('SidePage__container')).evaluate((container) => {
        container.scrollTop += 20;
      });

      await page.locator(tid('submit')).click();
      await waitForValidationTooltip(page);
      await page.waitForTimeout(1000);

      await context.matchImage(await context.takeScreenshot());
    });

    test('scrolls the invalid control below the sticky header', async (context) => {
      const page = context.webdriver;

      await page.locator(tid('validation-input')).evaluate((input) => input.scrollIntoView({ block: 'start' }));
      // Keep the input inside the viewport but under the sticky header
      await page.locator(tid('SidePage__container')).evaluate((container) => {
        container.scrollTop -= 20;
      });

      await page.locator(tid('submit')).click();
      await waitForValidationTooltip(page);
      await page.waitForTimeout(1000);

      await context.matchImage(await context.takeScreenshot());
    });
  });
});
