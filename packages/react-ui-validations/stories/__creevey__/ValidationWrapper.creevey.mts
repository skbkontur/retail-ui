import { story, kind, test } from 'creevey';

import { delay } from './delay.mjs';

kind('ValidationWrapper', () => {
  story('ScrollAndFocusInIframe', () => {
    test('scroll', async (context) => {
      const idle = await context.webdriver.takeScreenshot();
      const submitOutside = await context.webdriver.findElement({ css: '[data-tid~="outside-submit"]' });

      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(submitOutside)
        .perform();

      await delay(500);
      const scrollOnOutsideSubmit = await context.webdriver.takeScreenshot();

      await context.matchImages({ idle, scrollOnOutsideSubmit });
    });
  });
});
