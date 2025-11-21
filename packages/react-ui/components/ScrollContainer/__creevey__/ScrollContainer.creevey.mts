import { story, kind, test } from 'creevey';
import 'creevey/playwright';

import { tid } from '../../__creevey__/helpers.mjs';

kind('ScrollContainer', () => {
  story('WithDynamicContent', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: '#test-container' });

    test('changeContent', async (context) => {
      const page = context.webdriver;
      const idle = await context.takeScreenshot();
      await page.locator('#add').click();
      const addContent = await context.takeScreenshot();
      await page.locator('#scroll50').click();
      const scroll50 = await context.takeScreenshot();
      await page.locator('#scroll100').click();
      const scroll100 = await context.takeScreenshot();
      await page.locator('#remove').click();
      const removeContent = await context.takeScreenshot();
      await context.matchImages({ idle, addContent, scroll50, scroll100, removeContent });
    });
  });

  story('WithOnlyCustomHorizontalScroll', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: '#test-container' });

    test('moveScroll', async (context) => {
      const page = context.webdriver;
      const idle = await context.takeScreenshot();
      await page.locator('#scroll50').click();
      const scroll50 = await context.takeScreenshot();
      await page.locator('#scroll100').click();
      const scroll100 = await context.takeScreenshot();
      await page.locator('#scroll0').click();
      const scroll0 = await context.takeScreenshot();
      await context.matchImages({ idle, scroll50, scroll100, scroll0 });
    });

    test('changeContent', async (context) => {
      const page = context.webdriver;
      await page.locator('#add').click();
      const addContent = await context.takeScreenshot();
      await page.locator('#scroll50').click();
      const scroll50 = await context.takeScreenshot();
      await page.locator('#scroll100').click();
      const scroll100 = await context.takeScreenshot();
      await page.locator('#scroll0').click();
      const scroll0 = await context.takeScreenshot();
      await page.locator('#remove').click();
      const removeContent = await context.takeScreenshot();
      await context.matchImages({ addContent, scroll50, scroll100, scroll0, removeContent });
    });
  });

  story('WithScrollTo', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: '#test-container' });

    test('scrollTo', async (context) => {
      const page = context.webdriver;
      const idle = await context.takeScreenshot();
      await page.locator('#scrollTo').click();
      const scrollTo = await context.takeScreenshot();
      await page.locator('#scrollToTop').click();
      const scrollToTop = await context.takeScreenshot();
      await page.locator('#scrollToLeft').click();
      const scrollToLeft = await context.takeScreenshot();
      await page.locator('#scrollToBottom').click();
      const scrollToBottom = await context.takeScreenshot();
      await page.locator('#scrollToRight').click();
      const scrollToRight = await context.takeScreenshot();
      await context.matchImages({
        idle,
        scrollTo,
        scrollToTop,
        scrollToBottom,
        scrollToLeft,
        scrollToRight,
      });
    });
  });

  story('ScrollBarVisibleAfterTogglingDisabled', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'themes dont affect logic': { in: /^(?!\bchrome2022\b)/ } } });

    test('toggleDisabled', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('disable-button')).click();
      await page.locator(tid('disable-button')).click();
      await context.matchImage(await context.takeScreenshot(), 'toggleDisabled');
    });
  });

  story('ShowScrollBarOnScroll', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'themes dont affect logic': { in: /^(?!\b(firefox2022|chrome2022)\b)/ } } });

    test('hideScroll', async (context) => {
      const page = context.webdriver;
      const beforeScroll = await context.takeScreenshot();
      await page.evaluate(() => {
        const scrollContainer = window.document.querySelector('[data-tid~="ScrollContainer__inner"]');
        if (scrollContainer) {
          scrollContainer.scrollTop = 500;
        }
      });
      await page.locator('body').hover();
      await page.waitForTimeout(200);
      const duringScroll = await context.takeScreenshot();
      await page.waitForTimeout(3000);
      const afterScroll = await context.takeScreenshot();
      await context.matchImages({ beforeScroll, duringScroll, afterScroll });
    });
  });

  story('ShowScrollBarOnHover', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'hover works only in firefox': { in: /^(?!\b(firefox2022)\b)/ } } });

    test('hideScroll', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('ScrollContainer__root')).hover();
      await page.waitForTimeout(500);
      const hovered = await context.takeScreenshot();
      await page.mouse.move(1000, 700);
      await page.waitForTimeout(3000);
      const withoutHover = await context.takeScreenshot();
      await context.matchImages({ hovered, withoutHover });
    });
  });
  story('NeverShowScrollBar', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'themes dont affect logic': { in: /^(?!\b(firefox2022|chrome2022)\b)/ } },
    });
  });
  story('OffsetY', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'themes dont affect logic': { in: /^(?!\bchrome2022\b)/ } },
    });
  });
  story('OffsetX', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'themes dont affect logic': { in: /^(?!\bchrome2022\b)/ } },
    });
  });
  story('OffsetYAndX', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'themes dont affect logic': { in: /^(?!\bchrome2022\b)/ } },
    });
  });
});
