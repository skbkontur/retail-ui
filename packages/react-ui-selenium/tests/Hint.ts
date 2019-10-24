import { expect } from 'chai';
import { By } from 'selenium-webdriver';

describe('Hint', function() {
  describe('default', function() {
    it('mouseOver', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('mouseOver');
    });
  });
  describe('left', function() {
    it('mouseOver', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('mouseOver');
    });
  });
  describe('right', function() {
    it('mouseOver', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('mouseOver');
    });
  });
  describe('bottom', function() {
    it('mouseOver', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('mouseOver');
    });
  });
  describe('with large word', function() {
    it('mouseOver', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('mouseOver');
    });
  });
  describe('with block-element', function() {
    it('mouseOver', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('mouseOver');
    });
  });
  describe('with 100%-width input', function() {
    it('mouseOver', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('mouseOver');
    });
  });
  describe('Hints without wrapper around inline-block with 50% width', function() {
    it('mouseOver', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));

      await new Promise(res => setTimeout(res, 100));

      await expect(await element.takeScreenshot()).to.matchImage('mouseOver');
    });
  });
});
