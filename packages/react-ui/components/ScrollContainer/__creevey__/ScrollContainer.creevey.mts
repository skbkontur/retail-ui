import { story, kind, test } from 'creevey';

import { delay } from '../../../lib/delay.mjs';

kind('ScrollContainer', () => {
  story('WithDynamicContent', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: '#test-container' });

    test('changeContent', async (context) => {
      const idle = await context.takeScreenshot();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '#add' }))
        .perform();
      const addContent = await context.takeScreenshot();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '#scroll50' }))
        .perform();
      const scroll50 = await context.takeScreenshot();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '#scroll100' }))
        .perform();
      const scroll100 = await context.takeScreenshot();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '#remove' }))
        .perform();
      const removeContent = await context.takeScreenshot();
      await context.matchImages({ idle, addContent, scroll50, scroll100, removeContent });
    });
  });

  story('WithOnlyCustomHorizontalScroll', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: '#test-container' });

    test('moveScroll', async (context) => {
      const idle = await context.takeScreenshot();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '#scroll50' }))
        .perform();
      const scroll50 = await context.takeScreenshot();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '#scroll100' }))
        .perform();
      const scroll100 = await context.takeScreenshot();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '#scroll0' }))
        .perform();
      const scroll0 = await context.takeScreenshot();
      await context.matchImages({ idle, scroll50, scroll100, scroll0 });
    });

    test('changeContent', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '#add' }))
        .perform();
      const addContent = await context.takeScreenshot();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '#scroll50' }))
        .perform();
      const scroll50 = await context.takeScreenshot();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '#scroll100' }))
        .perform();
      const scroll100 = await context.takeScreenshot();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '#scroll0' }))
        .perform();
      const scroll0 = await context.takeScreenshot();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '#remove' }))
        .perform();
      const removeContent = await context.takeScreenshot();
      await context.matchImages({ addContent, scroll50, scroll100, scroll0, removeContent });
    });
  });

  story('WithScrollTo', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: '#test-container' });

    test('scrollTo', async (context) => {
      const idle = await context.takeScreenshot();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '#scrollTo' }))
        .perform();
      const scrollTo = await context.takeScreenshot();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '#scrollToTop' }))
        .perform();
      const scrollToTop = await context.takeScreenshot();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '#scrollToLeft' }))
        .perform();
      const scrollToLeft = await context.takeScreenshot();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '#scrollToBottom' }))
        .perform();
      const scrollToBottom = await context.takeScreenshot();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '#scrollToRight' }))
        .perform();
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
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid="disable-button"]' }))
        .click(context.webdriver.findElement({ css: '[data-tid="disable-button"]' }))
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'toggleDisabled');
    });
  });

  story('ShowScrollBarOnScroll', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'themes dont affect logic': { in: /^(?!\b(firefox2022|chrome2022)\b)/ } } });

    test('hideScroll', async (context) => {
      const beforeScroll = await context.takeScreenshot();
      await context.webdriver.executeScript(function () {
        const scrollContainer = window.document.querySelector('[data-tid~="ScrollContainer__inner"]');
        if (scrollContainer) {
          scrollContainer.scrollTop = 500;
        }
      });
      context.webdriver
        .actions({
          bridge: true,
        })
        .move({ origin: context.webdriver.findElement({ css: 'body' }) });
      await delay(200);
      const duringScroll = await context.takeScreenshot();
      await delay(3000);
      const afterScroll = await context.takeScreenshot();
      await context.matchImages({ beforeScroll, duringScroll, afterScroll });
    });
  });

  story('ShowScrollBarOnHover', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'hover works only in firefox': { in: /^(?!\b(firefox2022)\b)/ } } });

    test('hideScroll', async (context) => {
      context.webdriver
        .actions({
          bridge: true,
        })
        .move({
          origin: context.webdriver.findElement({ css: '[data-tid~="ScrollContainer__root"]' }),
        })
        .perform();
      await delay(500);
      const hovered = await context.takeScreenshot();
      context.webdriver
        .actions({
          bridge: true,
        })
        .move({ x: 1000, y: 700 })
        .perform();
      await delay(3000);
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
