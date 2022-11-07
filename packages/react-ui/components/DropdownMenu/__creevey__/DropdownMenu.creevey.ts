import { story, kind, test } from 'creevey';

import { delay } from '../../../lib/utils';

kind('DropdownMenu', () => {
  story('SimpleExample', () => {
    test('plain', async function () {
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('plain');
    });

    test('clickAfterClickedOnCaption', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid~="PopupMenu__caption"]' }))
        .perform();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid~="PopupMenu__caption"]' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('clickAfterClickedOnCaption');
    });

    test('clicked', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid~="PopupMenu__caption"]' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('clicked');
    });

    test('tabPress', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .sendKeys(this.keys.TAB)
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('tabPress');
    });

    test('enterPress', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .sendKeys(this.keys.TAB)
        .perform();
      await this.browser
        .actions({
          bridge: true,
        })
        .sendKeys(this.keys.ENTER)
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('enterPress');
    });

    test('escapePress', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .sendKeys(this.keys.TAB)
        .perform();
      await this.browser
        .actions({
          bridge: true,
        })
        .sendKeys(this.keys.ENTER)
        .perform();
      await this.browser
        .actions({
          bridge: true,
        })
        .sendKeys(this.keys.ESCAPE)
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('escapePress');
    });
  });

  story('MenuOutOfViewPortRight', () => {
    test('out of viewport', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid="firstMenu"]' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('out of viewport');
    });

    test('out of edge with min menu width', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid="secondMenu"]' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('out of viewport with min menu width');
    });
  });

  story('MenuOutOfViewPortLeft', () => {
    test('out of viewport', async function () {
      await this.browser.executeScript(function () {
        const container = window.document.querySelector('[data-tid="container"]') as HTMLElement;
        container.scrollLeft = container.scrollWidth;
      });
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid="firstMenu"]' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('out of viewport');
    });

    test('out of edge with min menu width', async function () {
      await this.browser.executeScript(function () {
        const container = window.document.querySelector('[data-tid="container"]') as HTMLElement;
        container.scrollLeft = container.scrollWidth;
      });
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid="secondMenu"]' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('out of viewport with min menu width');
    });
  });

  story('CaptionWidth', () => {
    test('plain', async function () {
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('plain');
    });
  });

  story('WithHeaderAndFooter', () => {
    test('clicked', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid~="PopupMenu__caption"]' }))
        .perform();
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('clicked');
    });

    test('scrolled by 100', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid~="PopupMenu__caption"]' }))
        .perform();
      await this.browser.executeScript(function () {
        const scrollContainer = window.document.querySelector('[data-tid~="ScrollContainer__inner"]') as HTMLElement;
        scrollContainer.scrollTop += 100;
      });
      await delay(2000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('scrolled by 100');
    });

    test('scrolled down to bottom', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid~="PopupMenu__caption"]' }))
        .perform();
      await this.browser.executeScript(function () {
        const scrollContainer = window.document.querySelector('[data-tid~="ScrollContainer__inner"]') as HTMLElement;
        scrollContainer.scrollTop += scrollContainer.scrollHeight;
      });
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('scrolled down to bottom');
    });
  });
});
