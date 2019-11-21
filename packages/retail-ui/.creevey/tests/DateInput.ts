import { expect } from 'chai';
import { By } from 'selenium-webdriver';

describe('DateInput', function() {
  describe('simple', function() {
    it('idle', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('idle');
    });
    it('focus', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser.executeScript(() => {
        const el: HTMLElement | null = window.document.querySelector("[data-comp-name*='DateInput InputLikeText']");
        if (el) {
          el.focus();
        }
      });
      await this.browser.wait(new Promise(resolve => setTimeout(resolve, 100)));
      await expect(await element.takeScreenshot()).to.matchImage('focus');
    });
  });
  describe('disabled', function() {
    it('idle', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('idle');
    });
    it('focus', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css("[data-comp-name*='DateInput']")))
        .pause(500)
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('focus');
    });
  });
  describe('with width', function() {
    it('idle', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('idle');
    });
    it('focus', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css("[data-comp-name*='DateInput']")))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('focus');
    });
  });
  describe('different formatting', function() {
    it('idle', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('idle');
    });
  });
});
