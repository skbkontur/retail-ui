import { expect } from 'chai';
import { By } from 'selenium-webdriver';

describe('Select', function() {
  describe('Simple', function() {
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
        .click(this.browser.findElement(By.css('[class^="Select-root"]')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('clicked');
    });
    it.skip(['ie11'], 'MenuItem hover', async function() {
      const element = await this.browser.findElement(By.css('.dropdown-test-container'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('[class^="Select-root"]')))
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
        .click(this.browser.findElement(By.css('[class^="Select-root"]')))
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
  describe('use link', function() {
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
        .click(this.browser.findElement(By.css('[class^="Select-root"]')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('clicked');
    });
    it.skip(['ie11'], 'MenuItem hover', async function() {
      const element = await this.browser.findElement(By.css('.dropdown-test-container'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('[class^="Select-root"]')))
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
        .click(this.browser.findElement(By.css('[class^="Select-root"]')))
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
  describe('use link with icon', function() {
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
        .click(this.browser.findElement(By.css('[class^="Select-root"]')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('clicked');
    });
    it.skip(['ie11'], 'MenuItem hover', async function() {
      const element = await this.browser.findElement(By.css('.dropdown-test-container'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('[class^="Select-root"]')))
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
        .click(this.browser.findElement(By.css('[class^="Select-root"]')))
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
  describe('with text overflow', function() {
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
        .click(this.browser.findElement(By.css('[class^="Select-root"]')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('clicked');
    });
    it.skip(['ie11'], 'MenuItem hover', async function() {
      const element = await this.browser.findElement(By.css('.dropdown-test-container'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('[class^="Select-root"]')))
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
        .click(this.browser.findElement(By.css('[class^="Select-root"]')))
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
});
