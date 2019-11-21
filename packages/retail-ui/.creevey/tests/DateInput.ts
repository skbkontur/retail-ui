import { expect } from 'chai';
import { By } from 'selenium-webdriver';

async function focus($: any) {
  await $.browser.executeScript(() => {
    (window.document.querySelector("[data-comp-name*='DateInput InputLikeText']") as HTMLElement).focus();
  });
}

describe('DateInput', function() {
  describe('simple', function() {
    it('idle', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await new Promise(res => setTimeout(res, 500));
      await expect(await element.takeScreenshot()).to.matchImage('idle');
    });
    it('focus', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await focus(this);
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
      await focus(this);
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
      await focus(this);
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
