import { story, kind, test } from 'creevey';

import { delay } from '../../../lib/utils';

const testScrollLockUnlock = () => {
  test('scroll, lock, unlock', async function () {
    const toggle = async () => {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid~="toggle-lock"]' }))
        .perform();
      await delay(1000);
    };
    await this.browser.executeScript(function () {
      const scrollContainer = window.document.documentElement;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    });
    const scrolled = await this.browser.takeScreenshot();
    await toggle();
    const locked = await this.browser.takeScreenshot();
    await toggle();
    const unlocked = await this.browser.takeScreenshot();
    await this.expect({ scrolled, locked, unlocked }).to.matchImages();
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

  story('DisorderlyUnmountAndResize', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'themes dont affect logic': { in: /^(?!\bchrome2022\b)/ } },
    });
    test('idle, hide, show, resize', async function () {
      const toggle = async (index: number) => {
        await this.browser.findElement({ css: `div:nth-of-type(${index}) [data-tid~="toggle-lock"]` }).click();
      };

      const idle = await this.browser.takeScreenshot();

      await toggle(1);
      await toggle(2);
      const hide = await this.browser.takeScreenshot();

      await toggle(1);
      await toggle(2);
      const show = await this.browser.takeScreenshot();

      await this.browser.findElement({ css: '[data-tid="resize"]' }).click();
      const resize = await this.browser.takeScreenshot();

      await this.expect({ idle, hide, show, resize }).to.matchImages();
    });
  });
});
