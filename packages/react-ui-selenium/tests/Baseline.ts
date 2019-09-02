import { expect } from 'chai';
import { By } from 'selenium-webdriver';

describe('Baseline', function() {
  describe('Button and text', function() {
    it('simple', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('simple');
    });
  });
  describe('Medium Button and text', function() {
    it('simple', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('simple');
    });
  });
  describe('Large Button and text', function() {
    it('simple', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('simple');
    });
  });
  describe('Button and link', function() {
    it('simple', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('simple');
    });
  });
  describe('Input and text', function() {
    it('simple', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('simple');
    });
  });
  describe('Text, Input, InputLikeText', function() {
    it('simple', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('simple');
    });
  });
  describe('Text, Large Input', function() {
    it('simple', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('simple');
    });
  });
  describe('Text, Buttons', function() {
    it('simple', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('simple');
    });
  });
  describe('Text, Large Button', function() {
    it('simple', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('simple');
    });
  });
  describe('Text, Spinner', function() {
    it('simple', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('simple');
    });
  });
  describe('Icon, Spinner', function() {
    it('simple', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('simple');
    });
  });
});
