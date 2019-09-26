import { expect } from 'chai';
import { By } from 'selenium-webdriver';

describe('Dropdown', function() {
  describe('Simple Dropdown', function() {
    it('idle', async function() {
      const element = await this.browser.findElement(By.css('.dropdown-test-container'));
      await expect(await element.takeScreenshot()).to.matchImage('idle');
    });
    it('clicked', async function() {
      const element = await this.browser.findElement(By.css('.dropdown-test-container'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('[data-comp-name^="Dropdown"]')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('clicked');
    });
    it.skip(['ie11', 'ie11Flat'], 'MenuItem hover', async function() {
      const element = await this.browser.findElement(By.css('.dropdown-test-container'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('[data-comp-name^="Dropdown"]')))
        .perform();
      await this.browser
        .actions({
          bridge: true,
        })
        .move({
          origin: this.browser.findElement(By.css('[data-comp-name="MenuItem"]')),
        })
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('MenuItem hover');
    });
    it('selected item', async function() {
      const element = await this.browser.findElement(By.css('.dropdown-test-container'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('[data-comp-name^="Dropdown"]')))
        .perform();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('[data-comp-name="MenuItem"]')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('selected item');
    });
  });
  describe('With fixed width', function() {
    it('idle', async function() {
      const element = await this.browser.findElement(By.css('.dropdown-test-container'));
      await expect(await element.takeScreenshot()).to.matchImage('idle');
    });
  });
  describe('With overflow', function() {
    it('idle', async function() {
      const element = await this.browser.findElement(By.css('.dropdown-test-container'));
      await expect(await element.takeScreenshot()).to.matchImage('idle');
    });
  });
  describe('With icon', function() {
    it('idle', async function() {
      const element = await this.browser.findElement(By.css('.dropdown-test-container'));
      await expect(await element.takeScreenshot()).to.matchImage('idle');
    });
  });
  describe('With icon and overflow', function() {
    it('idle', async function() {
      const element = await this.browser.findElement(By.css('.dropdown-test-container'));
      await expect(await element.takeScreenshot()).to.matchImage('idle');
    });
  });
  describe('With MenuItem icon', function() {
    it('clicked', async function() {
      const element = await this.browser.findElement(By.css('.dropdown-test-container'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('[data-comp-name^="Dropdown"]')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('clicked');
    });
  });
});
