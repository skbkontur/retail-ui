import { story, kind, test } from 'creevey';

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
});
