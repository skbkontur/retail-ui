import { expect } from 'chai';
import { By, Key } from 'selenium-webdriver';

describe('DropdownMenu', function() {
  describe('Simple example', function() {
    it('plain', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('plain');
    });
    it('clickAfterClickedOnCaption', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('[data-tid~="PopupMenu__caption"]')))
        .perform();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('[data-tid~="PopupMenu__caption"]')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('clickAfterClickedOnCaption');
    });
    it('clicked', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('[data-tid~="PopupMenu__caption"]')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('clicked');
    });
    it('tabPress', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .sendKeys(Key.TAB)
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('tabPress');
    });
    it('enterPress', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .sendKeys(Key.TAB)
        .perform();
      await this.browser
        .actions({
          bridge: true,
        })
        .sendKeys(Key.ENTER)
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('enterPress');
    });
    it('escapePress', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .sendKeys(Key.TAB)
        .perform();
      await this.browser
        .actions({
          bridge: true,
        })
        .sendKeys(Key.ENTER)
        .perform();
      await this.browser
        .actions({
          bridge: true,
        })
        .sendKeys(Key.ESCAPE)
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('escapePress');
    });
  });
  describe('With header and footer', function() {
    it('clicked', async function() {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('[data-tid~="PopupMenu__caption"]')))
        .perform();
      await expect(await this.browser.takeScreenshot()).to.matchImage('clicked');
    });
    it('scrolled by 100', async function() {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('[data-tid~="PopupMenu__caption"]')))
        .perform();
      await this.browser.executeScript(function() {
        // @ts-ignore
        var scrollContainer: Element = window.document.querySelector('[data-tid~="ScrollContainer__inner"]');
        scrollContainer.scrollTop += 100;
      });
      await expect(await this.browser.takeScreenshot()).to.matchImage('scrolled by 100');
    });
    it('scrolled down to bottom', async function() {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('[data-tid~="PopupMenu__caption"]')))
        .perform();
      await this.browser.executeScript(function() {
        // @ts-ignore
        var scrollContainer: Element = window.document.querySelector('[data-tid~="ScrollContainer__inner"]');
        scrollContainer.scrollTop += scrollContainer.scrollHeight;
      });
      await expect(await this.browser.takeScreenshot()).to.matchImage('scrolled down to bottom');
    });
  });
});
