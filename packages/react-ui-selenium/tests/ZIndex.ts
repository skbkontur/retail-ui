import { expect } from 'chai';
import { By } from 'selenium-webdriver';

describe('ZIndex', function() {
  describe('Loader covers tooltip', function() {
    it('Loader covers Tooltip', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('Loader covers Tooltip');
    });
  });
  describe('Modal With Tooltip In Loader', function() {
    it('Loader covers children', async function() {
      const element = await this.browser.findElement(By.css('[data-prop-value*="hasHeader"]'));
      await expect(await element.takeScreenshot()).to.matchImage('Loader covers children');
    });
  });
  describe('Nested elements in loader', function() {
    it('Loader covers children', async function() {
      const element = await this.browser.findElement(By.css('[data-prop-value*="hasHeader"]'));
      await expect(await element.takeScreenshot()).to.matchImage('Loader covers children');
    });
  });
  describe('Tooltip near Loader', function() {
    it('Tooltip covers Loader', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('Tooltip covers Loader');
    });
  });
  describe('Hint and modal', function() {
    it('Modal covers hint', async function() {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement(By.css('button')))
        .perform();

      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement(By.css('.modalBody button')))
        .perform();

      const modal = await this.browser.findElement(By.css('[class^="Modal-module-root"]'));
      await expect(await modal.takeScreenshot()).to.matchImage('Modal covers hint');
    });
  });
  describe('Loader in Modal', function() {
    it('Footer covers loader', async function() {
      const modal = await this.browser.findElement(By.css('[class^="Modal-module-window"]'));
      await expect(await modal.takeScreenshot()).to.matchImage('Footer covers loader');
    });
  });
  describe('Tooltip and DropdownMenu', function() {
    it('Menu covers tooltip', async function() {
      const element = await this.browser.findElement(By.css('.container'));

      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement(By.css('button')))
        .sendKeys('q')
        .perform();

      await expect(await element.takeScreenshot()).to.matchImage('Modal covers hint');
    });
  });
  describe('Sidepage and Select', function() {
    it('SidePage covers Select and Tooltip', async function() {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement(By.css('.select-container button')))
        .sendKeys('q')
        .perform();

      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement(By.css('.open-sidepage-container button')))
        .perform();

      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement(By.css('.sidepage-select-continer button')))
        .sendKeys('q')
        .perform();

      const element = await this.browser.findElement(By.css('[class^="SidePage-module-container"]'));
      await expect(await element.takeScreenshot()).to.matchImage('Loader covers Tooltip');
    });
  });
});
