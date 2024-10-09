import { story, kind, test } from 'creevey';

import { delay } from '../../../lib/utils';

kind('ScrollContainer', () => {
  story('WithDynamicContent', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: '#test-container' });

    test('changeContent', async function () {
      const idle = await this.takeScreenshot();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#add' }))
        .perform();
      const addContent = await this.takeScreenshot();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#scroll50' }))
        .perform();
      const scroll50 = await this.takeScreenshot();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#scroll100' }))
        .perform();
      const scroll100 = await this.takeScreenshot();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#remove' }))
        .perform();
      const removeContent = await this.takeScreenshot();
      await this.expect({ idle, addContent, scroll50, scroll100, removeContent }).to.matchImages();
    });
  });

  story('WithOnlyCustomHorizontalScroll', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: '#test-container' });

    test('moveScroll', async function () {
      const idle = await this.takeScreenshot();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#scroll50' }))
        .perform();
      const scroll50 = await this.takeScreenshot();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#scroll100' }))
        .perform();
      const scroll100 = await this.takeScreenshot();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#scroll0' }))
        .perform();
      const scroll0 = await this.takeScreenshot();
      await this.expect({ idle, scroll50, scroll100, scroll0 }).to.matchImages();
    });

    test('changeContent', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#add' }))
        .perform();
      const addContent = await this.takeScreenshot();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#scroll50' }))
        .perform();
      const scroll50 = await this.takeScreenshot();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#scroll100' }))
        .perform();
      const scroll100 = await this.takeScreenshot();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#scroll0' }))
        .perform();
      const scroll0 = await this.takeScreenshot();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#remove' }))
        .perform();
      const removeContent = await this.takeScreenshot();
      await this.expect({ addContent, scroll50, scroll100, scroll0, removeContent }).to.matchImages();
    });
  });

  story('WithScrollTo', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: '#test-container' });

    test('scrollTo', async function () {
      const idle = await this.takeScreenshot();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#scrollTo' }))
        .perform();
      const scrollTo = await this.takeScreenshot();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#scrollToTop' }))
        .perform();
      const scrollToTop = await this.takeScreenshot();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#scrollToLeft' }))
        .perform();
      const scrollToLeft = await this.takeScreenshot();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#scrollToBottom' }))
        .perform();
      const scrollToBottom = await this.takeScreenshot();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#scrollToRight' }))
        .perform();
      const scrollToRight = await this.takeScreenshot();
      await this.expect({
        idle,
        scrollTo,
        scrollToTop,
        scrollToBottom,
        scrollToLeft,
        scrollToRight,
      }).to.matchImages();
    });
  });

  story('ScrollBarVisibleAfterTogglingDisabled', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'themes dont affect logic': { in: /^(?!\bchrome2022\b)/ } } });

    test('toggleDisabled', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid="disable-button"]' }))
        .click(this.browser.findElement({ css: '[data-tid="disable-button"]' }))
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('toggleDisabled');
    });
  });

  story('ShowScrollBarOnScroll', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'themes dont affect logic': { in: /^(?!\b(firefox2022|chrome2022)\b)/ } } });

    test('hideScroll', async function () {
      const beforeScroll = await this.takeScreenshot();
      await this.browser.executeScript(function () {
        const scrollContainer = window.document.querySelector('[data-tid~="ScrollContainer__inner"]');
        if (scrollContainer) {
          scrollContainer.scrollTop = 500;
        }
      });
      this.browser
        .actions({
          bridge: true,
        })
        .move({ origin: this.browser.findElement({ css: 'body' }) });
      await delay(200);
      const duringScroll = await this.takeScreenshot();
      await delay(3000);
      const afterScroll = await this.takeScreenshot();
      await this.expect({ beforeScroll, duringScroll, afterScroll }).to.matchImages();
    });
  });

  story('ShowScrollBarOnHover', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'hover works only in firefox': { in: /^(?!\b(firefox2022)\b)/ } } });

    test('hideScroll', async function () {
      this.browser
        .actions({
          bridge: true,
        })
        .move({
          origin: this.browser.findElement({ css: '[data-tid~="ScrollContainer__root"]' }),
        })
        .perform();
      await delay(500);
      const hovered = await this.takeScreenshot();
      this.browser
        .actions({
          bridge: true,
        })
        .move({ x: 1000, y: 700 })
        .perform();
      await delay(3000);
      const withoutHover = await this.takeScreenshot();
      await this.expect({ hovered, withoutHover }).to.matchImages();
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
