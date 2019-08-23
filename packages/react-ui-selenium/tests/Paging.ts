import { expect } from 'chai';
import { By, Key } from 'selenium-webdriver';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

describe('Paging', function() {
  describe('GoToAbsensePage', function() {
    it('plain', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('plain');
    });
    it.skip(['ie11'], 'hover', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .move({
          origin: this.browser.findElement(By.css('[class^="Paging-pageLinkWrapper"]')),
        })
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('hover');
    });
    it('change page by number', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('[class^="Paging-pageLinkWrapper"]')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('change page by number');
    });
    it('change page by forwardLink', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await delay(1000);
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('[class^="Paging-forwardLink"]')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('change page by forwardLink');
    });
    it('focused', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await delay(1000);
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('[class^="Paging-pageLinkWrapper"]')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('focused');
    });
    it('Move focus right', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('[class^="Paging-pageLinkWrapper"]')))
        .pause(100)
        .sendKeys(Key.ARROW_RIGHT)
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('Move focus right');
    });
    it('Move to page by Ender', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('[class^="Paging-pageLinkWrapper"]')))
        .pause(100)
        .sendKeys(Key.ARROW_RIGHT)
        .pause(100)
        .sendKeys(Key.ENTER)
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('Move to page by Ender');
    });
  });
});
