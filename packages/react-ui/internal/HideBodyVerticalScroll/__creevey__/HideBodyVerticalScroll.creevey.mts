import { story, kind, test } from 'creevey';

import 'creevey/playwright';
import { tid } from '../../../components/__creevey__/helpers.mjs';

const testScrollLockUnlock = () => {
  test('scroll, lock, unlock', async (context) => {
    const page = context.webdriver;
    const toggle = async () => {
      await page.locator(tid('toggle-lock')).click();
      await page.waitForTimeout(1000);
    };
    await page.evaluate(() => {
      const scrollContainer = window.document.documentElement;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    });
    const scrolled = await context.takeScreenshot();
    await toggle();
    const locked = await context.takeScreenshot();
    await toggle();
    const unlocked = await context.takeScreenshot();
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
      captureElement: null,
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
      captureElement: null,
    });
    testScrollLockUnlock();
  });

  story('DisorderlyUnmountAndResize', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'themes dont affect logic': { in: /^(?!\bchrome2022\b)/ } },
      captureElement: null,
    });
    test('idle, hide, show, resize', async (context) => {
      const page = context.webdriver;
      const toggle = async (index: number) => {
        await page
          .locator(`div:nth-of-type(${index}) ${tid('toggle-lock')}`)
          .first()
          .click();
      };

      const idle = await context.takeScreenshot();

      await toggle(1);
      await toggle(2);
      const hide = await context.takeScreenshot();

      await toggle(1);
      await toggle(2);
      const show = await context.takeScreenshot();

      await page.locator(tid('resize')).click();
      const resize = await context.takeScreenshot();

      await context.matchImages({ idle, hide, show, resize });
    });
  });
});
