import { expect } from 'chai';
import { By } from 'selenium-webdriver';

describe('Menu', function() {
  describe('with Items', function() {
    it('idle', async function() {
      const element = await this.browser.findElement(By.css('#menu-test-container'));
      await expect(await element.takeScreenshot()).to.matchImage('idle');
    });
  });
  describe('with Header', function() {
    it('idle', async function() {
      const element = await this.browser.findElement(By.css('#menu-test-container'));
      await expect(await element.takeScreenshot()).to.matchImage('idle');
    });
  });
  describe('with Separator', function() {
    it('idle', async function() {
      const element = await this.browser.findElement(By.css('#menu-test-container'));
      await expect(await element.takeScreenshot()).to.matchImage('idle');
    });
  });
  describe('with Custom Child', function() {
    it('idle', async function() {
      const element = await this.browser.findElement(By.css('#menu-test-container'));
      await expect(await element.takeScreenshot()).to.matchImage('idle');
    });
  });
  describe('with maxHeight', function() {
    it('idle', async function() {
      const element = await this.browser.findElement(By.css('[data-tid="menu-container"'));
      await expect(await element.takeScreenshot()).to.matchImage('idle');
    });
    it('moved up from top to the last Item', async function() {
      const element = await this.browser.findElement(By.css('[data-tid="menu-container"'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('#move-up')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('moved up from top to the last Item');
    });
    it('moved up from bottom to the first Item', async function() {
      const element = await this.browser.findElement(By.css('[data-tid="menu-container"'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('#move-up')))
        .click(this.browser.findElement(By.css('#move-up')))
        .click(this.browser.findElement(By.css('#move-up')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('moved up from bottom to the first Item');
    });
    it('moved down from top to the last Item', async function() {
      const element = await this.browser.findElement(By.css('[data-tid="menu-container"'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('#move-up')))
        .click(this.browser.findElement(By.css('#move-up')))
        .click(this.browser.findElement(By.css('#move-up')))
        .click(this.browser.findElement(By.css('#move-down')))
        .click(this.browser.findElement(By.css('#move-down')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('moved down from top to the last Item');
    });
    it('moved down from bottom to the first Item', async function() {
      const element = await this.browser.findElement(By.css('[data-tid="menu-container"'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('#move-up')))
        .click(this.browser.findElement(By.css('#move-up')))
        .click(this.browser.findElement(By.css('#move-up')))
        .click(this.browser.findElement(By.css('#move-down')))
        .click(this.browser.findElement(By.css('#move-down')))
        .click(this.browser.findElement(By.css('#move-down')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('moved down from bottom to the first Item');
    });
  });
  describe('with width', function() {
    it('idle', async function() {
      const element = await this.browser.findElement(By.css('#menu-test-container'));
      await expect(await element.takeScreenshot()).to.matchImage('idle');
    });
  });
  describe('with long Items', function() {
    it('idle', async function() {
      const element = await this.browser.findElement(By.css('#menu-test-container'));
      await expect(await element.takeScreenshot()).to.matchImage('idle');
    });
  });
  describe('without Shadow', function() {
    it('idle', async function() {
      const element = await this.browser.findElement(By.css('#menu-test-container'));
      await expect(await element.takeScreenshot()).to.matchImage('idle');
    });
  });
  describe('with disabled MenuItem', function() {
    it('mouseenter', async function() {
      const element = await this.browser.findElement(By.css('#menu-test-container'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('[data-tid="menuitem-notdisabled"]')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('mouseenter');
    });
  });
});
