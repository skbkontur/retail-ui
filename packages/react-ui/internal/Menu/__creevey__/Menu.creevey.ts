import { story, kind, test } from 'creevey';

kind('Menu', () => {
  story('WithMaxHeight', ({ setStoryParameters }) => {
    setStoryParameters({
      captureElement: '[data-tid="menu-container"',
      skip: {
        flacky: { in: ['chrome2022'] },
      },
    });

    test('idle', async function () {
      await this.expect(await this.takeScreenshot()).to.matchImage('idle');
    });

    test('moved up from top to the last Item', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#move-up' }))
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('moved up from top to the last Item');
    });

    test('moved up from bottom to the first Item', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#move-up' }))
        .click(this.browser.findElement({ css: '#move-up' }))
        .click(this.browser.findElement({ css: '#move-up' }))
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('moved up from bottom to the first Item');
    });

    test('moved down from top to the last Item', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#move-up' }))
        .click(this.browser.findElement({ css: '#move-up' }))
        .click(this.browser.findElement({ css: '#move-up' }))
        .click(this.browser.findElement({ css: '#move-down' }))
        .click(this.browser.findElement({ css: '#move-down' }))
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('moved down from top to the last Item');
    });

    test('moved down from bottom to the first Item', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#move-up' }))
        .click(this.browser.findElement({ css: '#move-up' }))
        .click(this.browser.findElement({ css: '#move-up' }))
        .click(this.browser.findElement({ css: '#move-down' }))
        .click(this.browser.findElement({ css: '#move-down' }))
        .click(this.browser.findElement({ css: '#move-down' }))
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('moved down from bottom to the first Item');
    });
  });

  story('WithDisabledMenuItem', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'hover does not work in chrome': { in: ['chrome2022', 'chrome2022Dark'], tests: ['mouseenter'] },
      },
    });

    test('mouseenter', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid="menuitem-notdisabled"]' }))
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('mouseenter');
    });
  });
  story('WithItemsWithIconsWithoutTextAlignment', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'themes dont affect logic': { in: /^(?!\bchrome2022\b)/ } },
    });
  });
});
