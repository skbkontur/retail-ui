import { expect } from 'chai';
import { By } from 'selenium-webdriver';

describe('ToastView', function() {
  describe('simple toast', function() {
    it('simple', async function() {
      const element = await this.browser.findElement(By.css('[class^="ToastView-module-root"]'));
      await expect(await element.takeScreenshot()).to.matchImage('simple');
    });
  });
  describe('with action', function() {
    it('with action', async function() {
      const element = await this.browser.findElement(By.css('[class^="ToastView-module-root"]'));
      await expect(await element.takeScreenshot()).to.matchImage('with action');
    });
  });
});
