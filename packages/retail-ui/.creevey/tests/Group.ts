import { expect } from 'chai';
import { By } from 'selenium-webdriver';

describe('Group', function() {
  describe('Simple Group with Input and Button', function() {
    it('plain', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('plain');
    });
    it('focused input', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('input')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('focused input');
    });
  });
  describe('Button group', function() {
    it('plain', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('plain');
    });
  });
  describe('Simple Group with custom Inputs width', function() {
    it('with custom Inputs width', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('with custom Inputs width');
    });
  });
  describe('With width', function() {
    it('with width', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('with width');
    });
  });
});
