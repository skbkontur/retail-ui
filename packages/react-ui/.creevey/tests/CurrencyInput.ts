import { expect } from 'chai';
import { By } from 'selenium-webdriver';

describe('CurrencyInput', function() {
  describe('Sample', function() {
    it('Plain', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('Plain');
    });
    it('Focus', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('[data-comp-name*="CurrencyInput"] input')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('Focus');
    });
    it('Input value', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('[data-comp-name*="CurrencyInput"] input')))
        .sendKeys('1')
        .pause(500)
        .sendKeys('2')
        .pause(500)
        .sendKeys('3')
        .pause(500)
        .sendKeys('4')
        .pause(500)
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('Input value');
    });
    it('External focus and input', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('button')))
        .perform();
      await this.browser
        .actions({
          bridge: true,
        })
        .sendKeys('1')
        .pause(500)
        .sendKeys('2')
        .pause(500)
        .sendKeys('3')
        .pause(500)
        .sendKeys('4')
        .pause(500)
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('External focus and input');
    });
  });
});
