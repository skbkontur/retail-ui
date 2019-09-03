import { expect } from 'chai';
import { By, Key } from 'selenium-webdriver';

describe('Radio', function() {
  describe('Radio with different states', function() {
    it('different states', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('different states');
    });
  });
  describe('Highlighted', function() {
    it('plain', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('plain');
    });
    it('tabPress', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('body')))
        .sendKeys(Key.TAB)
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('tabPress');
    });
  });
});
