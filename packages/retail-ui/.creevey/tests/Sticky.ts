import { expect } from 'chai';

describe('Sticky', function() {
  describe('Top', function() {
    it('top', async function() {
      await expect(await this.browser.takeScreenshot()).to.matchImage('top');
    });
    it('fixed', async function() {
      await this.browser.executeScript(function() {
        // tslint:disable
        var stickyStop = window.document.querySelector('[data-tid="stickyStop"]');
        // @ts-ignore
        var scrollOffset = stickyStop.getBoundingClientRect().top - window.innerHeight / 2;

        window.scrollTo(0, scrollOffset);
        // tslint:enable
      });
      await expect(await this.browser.takeScreenshot()).to.matchImage('fixed');
    });
    it('stoped', async function() {
      await this.browser.executeScript(function() {
        // tslint:disable
        var stickyStop = window.document.querySelector('[data-tid="stickyStop"]');
        // @ts-ignore
        stickyStop.scrollIntoView();
        // tslint:enable

        // tslint:disable
        var stickyContent = window.document.querySelector('[data-tid="stickyContent"]');
        // @ts-ignore
        var scrollOffset = pageYOffset - stickyContent.getBoundingClientRect().height / 2;

        window.scrollTo(0, scrollOffset);
        // tslint:enable
      });
      await expect(await this.browser.takeScreenshot()).to.matchImage('stoped');
    });
  });
  describe('Bottom', function() {
    it('bottom', async function() {
      await this.browser.executeScript(function() {
        // tslint:disable
        window.scrollTo(0, 9999);
        // tslint:enable
      });
      await expect(await this.browser.takeScreenshot()).to.matchImage('bottom');
    });
    it('fixed', async function() {
      await this.browser.executeScript(function() {
        // tslint:disable
        var sticky = window.document.querySelector('[data-comp-name~="Sticky"]');
        // @ts-ignore
        var scrollOffset = sticky.getBoundingClientRect().top - window.innerHeight;

        window.scrollTo(0, scrollOffset);
        // tslint:enable
      });
      await expect(await this.browser.takeScreenshot()).to.matchImage('fixed');
    });
    it('stoped', async function() {
      await this.browser.executeScript(function() {
        // tslint:disable
        var stickyStop = window.document.querySelector('[data-tid="stickyStop"]');
        // @ts-ignore
        stickyStop.scrollIntoView(false);
        // tslint:enable

        // tslint:disable
        var stickyContent = window.document.querySelector('[data-tid="stickyContent"]');
        // @ts-ignore
        var scrollOffset = pageYOffset + stickyContent.getBoundingClientRect().height / 2;

        window.scrollTo(0, scrollOffset);
        // tslint:enable
      });
      await expect(await this.browser.takeScreenshot()).to.matchImage('fixed');
    });
  });
  describe('Flex container', function() {
    it('idle', async function() {
      await expect(await this.browser.takeScreenshot()).to.matchImage('idle');
    });
  });
  describe('Wide Container', function() {
    it('fixed', async function() {
      await this.browser.executeScript(function() {
        // tslint:disable
        var stickyContent = window.document.querySelector('[data-tid="stickyContent"]');
        var nonStickyText = window.document.querySelector('[data-tid="nonStickyText"]');
        // @ts-ignore
        var scrollXOffset = nonStickyText.getBoundingClientRect().width / 2;
        // @ts-ignore
        var scrollYOffset = stickyContent.getBoundingClientRect().height / 2;

        window.scrollTo(scrollXOffset, scrollYOffset);
        // tslint:enable
      });
      await expect(await this.browser.takeScreenshot()).to.matchImage('fixed');
    });
  });
});
