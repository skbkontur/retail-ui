import { story, kind, test } from 'creevey';

import { delay } from '../../../lib/delay';

const testScrollLockUnlock = () => {
  test('scroll, lock, unlock', async (context) => {
    const toggle = async () => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid~="toggle-lock"]' }))
        .perform();
      await delay(1000);
    };
    await context.webdriver.executeScript(function () {
      const scrollContainer = window.document.documentElement;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    });
    const scrolled = await context.webdriver.takeScreenshot();
    await toggle();
    const locked = await context.webdriver.takeScreenshot();
    await toggle();
    const unlocked = await context.webdriver.takeScreenshot();
    await context.matchImages({ scrolled, locked, unlocked });
  });
};

kind('HideBodyVerticalScroll', () => {
  story('Sample', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'themes dont affect logic': { in: /^(?!\bchrome2022\b)/ } },
    });
    testScrollLockUnlock();
  });

  story('WithScrollableContent', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'themes dont affect logic': { in: /^(?!\bchrome2022\b)/ } },
    });
    testScrollLockUnlock();
  });

  story('WithHTMLOverflowYScroll', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'themes dont affect logic': { in: /^(?!\bchrome2022\b)/ } },
    });
    testScrollLockUnlock();
  });

  story('Multiple_WithScrollableContent', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'themes dont affect logic': { in: /^(?!\bchrome2022\b)/ } },
    });
    testScrollLockUnlock();
  });
});
