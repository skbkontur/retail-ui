import { story, kind, test } from 'creevey';

import { delay } from '../../../lib/delay.mjs';

kind('ClearCrossIcon', () => {
  story('ClearCrossIconDefaultColors', () => {
    test('idle', async (context) => {
      const plain = await context.takeScreenshot();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .move({
          origin: context.webdriver.findElement({ css: `[data-tid='clear-cross-icon']` }),
        })
        .perform();
      await delay(300);
      const hover = await context.takeScreenshot();

      await context.matchImages({ plain, hover });
    });
  });

  story('ClearCrossIconWithCustomColors', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'test theme variables': { in: /^(?!\bchrome2022\b)/ } },
    });
    test('idle', async (context) => {
      const plain = await context.takeScreenshot();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .move({
          origin: context.webdriver.findElement({ css: `[data-tid='clear-cross-icon']` }),
        })
        .perform();
      await delay(300);
      const hover = await context.takeScreenshot();

      await context.matchImages({ plain, hover });
    });
  });
});
