import { expect } from 'chai';
import { By } from 'selenium-webdriver';

describe('PasswordInput', function() {
  describe('Plain', function() {
    it('Plain', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('Plain');
    });
    it('With typed password', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('[type="password"]')))
        .sendKeys('Test...')
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('With typed password');
    });
    it('With visible password', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('[type="password"]')))
        .sendKeys('Test...')
        .click(this.browser.findElement(By.css('[data-tid="PasswordInputEyeIcon"]')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('With visible password');
    });
  });
  describe('CapsLock label', function() {
    it('Plain', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('Plain');
    });
  });
});
