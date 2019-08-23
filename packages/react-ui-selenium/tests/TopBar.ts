import { expect } from 'chai';
import { By } from 'selenium-webdriver';

describe('TopBar', function() {
  describe('TopBar Old', function() {
    it('TopBar Old', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('TopBar Old');
    });
  });
  describe('TopBar New', function() {
    it('TopBar New', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('TopBar New');
    });
  });
});
