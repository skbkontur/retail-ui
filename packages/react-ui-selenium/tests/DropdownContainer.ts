import { expect } from 'chai';
import { By } from 'selenium-webdriver';

describe('DropdownContainer', function() {
  describe('various aligns, portals, items and scrolls', function() {
    it('short Items', async function() {
      await expect(await this.browser.takeScreenshot()).to.matchImage('short Items');
    });
    it('short Items scroll', async function() {
      await this.browser.executeScript(function() {
        // tslint:disable
        // @ts-ignore
        var innerScroll: Element = window.document.querySelector('#inner-scroll');
        innerScroll.scrollTop = innerScroll.scrollHeight;
        innerScroll.scrollLeft = innerScroll.scrollWidth;
        // tslint:enable
      });
      await expect(await this.browser.takeScreenshot()).to.matchImage('short Items scroll');
    });
    it('long Items', async function() {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement(By.css('#buttons button')))
        .perform();
      await expect(await this.browser.takeScreenshot()).to.matchImage('long Items');
    });
    it('long Items scroll', async function() {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement(By.css('#buttons button')))
        .perform();
      await this.browser.executeScript(function() {
        // tslint:disable
        // @ts-ignore
        var innerScroll: Element = window.document.querySelector('#inner-scroll');
        innerScroll.scrollTop = innerScroll.scrollHeight;
        innerScroll.scrollLeft = innerScroll.scrollWidth;
        // tslint:enable
      });
      await expect(await this.browser.takeScreenshot()).to.matchImage('long Items scroll');
    });
  });
});
