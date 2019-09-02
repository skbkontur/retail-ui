import { expect } from 'chai';
import { By } from 'selenium-webdriver';

describe('Textarea', function() {
  describe('Different states', function() {
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
        .click(this.browser.findElement(By.css('#TextareaPlain textarea')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('Focus');
    });
    it('Typed', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('#TextareaPlain textarea')))
        .sendKeys('Test...')
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('Typed');
    });
  });
  describe('Textarea with placeholder', function() {
    it('Plain', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('Plain');
    });
  });
  describe('Textarea with custom width', function() {
    it('Plain', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('Plain');
    });
  });
  describe('Select all by prop', function() {
    it('Plain', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('Plain');
    });
    it('Focused', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('label')))
        .pause(500)
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('Focused');
    });
  });
  describe('Select all by button', function() {
    it('Plain', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('Plain');
    });
    it('Selected', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('button')))
        .pause(500)
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('Selected');
    });
  });
});
