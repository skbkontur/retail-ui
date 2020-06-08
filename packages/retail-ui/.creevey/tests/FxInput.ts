import { expect } from 'chai';
import { By } from 'selenium-webdriver';

describe('FxInput', function() {
  describe('type text', function() {
    it('type text', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('type text');
    });
  });
  describe('type currency', function() {
    it('type currency', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('type currency');
    });
  });
  describe('with disabled', function() {
    it('with disabled', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('with disabled');
    });
  });
  describe('borderless', function() {
    it('borderless', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('borderless');
    });
  });
  describe('with width', function() {
    it('inside auto container', async function() {
      const element = await this.browser.findElement(By.css('[data-tid="container"]'));
      await expect(await element.takeScreenshot()).to.matchImage('inside auto container');
    });
    it('inside fixed container', async function() {
      const element = await this.browser.findElement(By.css('[data-tid="container"]'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('#toggle-width')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('inside fixed container');
    });
  });
});
