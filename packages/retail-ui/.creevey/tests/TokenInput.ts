import { expect } from 'chai';
import { By } from 'selenium-webdriver';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

describe('TokenInput', function() {
  describe('empty with reference', function() {
    it('idle', async function() {
      const element = await this.browser.findElement(By.css('.tokens-test-container'));
      await delay(100);
      await expect(await element.takeScreenshot()).to.matchImage('idle');
    });
    it('clicked', async function() {
      const element = await this.browser.findElement(By.css('.tokens-test-container'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('[data-comp-name~="TokenInput"]')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('clicked');
    });
    it('withMenu', async function() {
      const element = await this.browser.findElement(By.css('.tokens-test-container'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('[data-comp-name~="TokenInput"]')))
        .sendKeys('a')
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('withMenu');
    });
  });
  describe('disabled', function() {
    it('idle', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('idle');
    });
  });
});
