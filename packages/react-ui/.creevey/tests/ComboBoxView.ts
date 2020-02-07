import { expect } from 'chai';
import { By } from 'selenium-webdriver';

describe('ComboBoxView', function() {
  describe('input like text', function() {
    it('plain', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('plain');
    });
    it('focused first element', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('[data-comp-name="InputLikeText"]')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('focused first element');
    });
  });
  describe('input like text with placeholder', function() {
    it('plain', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('plain');
    });
  });
  describe('opened', function() {
    it('plain', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('plain');
    });
  });
  describe('with items', function() {
    it('plain', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('plain');
    });
  });
  describe('in flex modal', function() {
    it('plain', async function() {
      await expect(await this.browser.takeScreenshot()).to.matchImage('plain');
    });
  });
});
