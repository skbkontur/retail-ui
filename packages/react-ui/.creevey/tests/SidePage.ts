import { expect } from 'chai';
import { By } from 'selenium-webdriver';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

describe('SidePage', function() {
  describe('Simple', function() {
    it('open side-page', async function() {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('button')))
        .perform();
      await expect(await this.browser.takeScreenshot()).to.matchImage('open side-page');
    });
  });
  describe('SidePage with left position', function() {
    it('plain', async function() {
      await expect(await this.browser.takeScreenshot()).to.matchImage('plain');
    });
  });
  describe('SidePage over another SidePage', function() {
    it('open internal side-page', async function() {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('button')))
        .perform();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('[data-comp-name~="SidePageBody"] button')))
        .perform();
      await expect(await this.browser.takeScreenshot()).to.matchImage('open internal side-page');
    });
    it('close internal side-page', async function() {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('button')))
        .perform();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('[data-comp-name~="SidePageBody"] button')))
        .perform();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('.react-ui:last-child [data-comp-name~="SidePageFooter"] button')))
        .perform();
      await expect(await this.browser.takeScreenshot()).to.matchImage('close internal side-page');
    });
  });
  describe('test updateLayout method', function() {
    it('idle', async function() {
      await expect(await this.browser.takeScreenshot()).to.matchImage('idle');
    });
    it('Body content has been changed', async function() {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('[data-tid="toggle-body-content"]')))
        .perform();
      await expect(await this.browser.takeScreenshot()).to.matchImage('Body content has been changed');
    });
    it('child component content has been changed', async function() {
      await delay(1000);
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('[data-tid="toggle-child-component-content"]')))
        .perform();
      await expect(await this.browser.takeScreenshot()).to.matchImage('child component content has been changed');
    });
    it('update layout', async function() {
      await delay(1000);
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('[data-tid="toggle-child-component-content"]')))
        .click(this.browser.findElement(By.css('[data-tid="update"]')))
        .perform();
      await expect(await this.browser.takeScreenshot()).to.matchImage('update layout');
    });
  });
  describe('With long title', function() {
    it('not fixed', async function() {
      await expect(await this.browser.takeScreenshot()).to.matchImage('not fixed');
    });
    it('fixed close element', async function() {
      await this.browser.executeScript(function() {
        var sidePageContainer = window.document.querySelector('[class^="SidePage-module-container"]');
        var sidePageHeader = window.document.querySelector('[data-comp-name~="SidePageHeader"]');
        var fixedHeaderHeight = 50;

        // @ts-ignore
        sidePageContainer.scrollTop = (sidePageHeader.offsetHeight - fixedHeaderHeight) / 2;
        });
      await delay(1000);
      await expect(await this.browser.takeScreenshot()).to.matchImage('fixed close element');
    });
    it('fixed header', async function() {
      await this.browser.executeScript(function() {
        var sidePageContainer = window.document.querySelector('[class^="SidePage-module-container"]');
        var sidePageHeader = window.document.querySelector('[data-comp-name~="SidePageHeader"]');
        var fixedHeaderHeight = 50;

        // @ts-ignore
        sidePageContainer.scrollTop = sidePageHeader.offsetHeight - fixedHeaderHeight;
        });
      await delay(1000);
      await expect(await this.browser.takeScreenshot()).to.matchImage('fixed header');
    });
  });
});
