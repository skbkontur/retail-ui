import { expect } from 'chai';
import { By, Key } from 'selenium-webdriver';

describe('Kebab', function() {
  describe('14px', function() {
    it('plain', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('plain');
    });
    it.skip(['ie11', 'ie11Flat'], 'hovered', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .move({
          origin: this.browser.findElement(By.css('[data-comp-name~="Kebab"]')),
        })
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('hovered');
    });
    it('clicked', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('[data-comp-name~="Kebab"]')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('clicked');
    });
    it('clickedOnButton2ndTime', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('[data-comp-name~="Kebab"]')))
        .click(this.browser.findElement(By.css('[data-comp-name~="Kebab"]')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('clickedOnButton2ndTime');
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
  describe('18px', function() {
    it('plain', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('plain');
    });
    it.skip(['ie11', 'ie11Flat'], 'hovered', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .move({
          origin: this.browser.findElement(By.css('[data-comp-name~="Kebab"]')),
        })
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('hovered');
    });
    it('clicked', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('[data-comp-name~="Kebab"]')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('clicked');
    });
    it('clickedOnButton2ndTime', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('[data-comp-name~="Kebab"]')))
        .click(this.browser.findElement(By.css('[data-comp-name~="Kebab"]')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('clickedOnButton2ndTime');
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
  describe('20px', function() {
    it('plain', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('plain');
    });
    it.skip(['ie11', 'ie11Flat'], 'hovered', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .move({
          origin: this.browser.findElement(By.css('[data-comp-name~="Kebab"]')),
        })
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('hovered');
    });
    it('clicked', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('[data-comp-name~="Kebab"]')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('clicked');
    });
    it('clickedOnButton2ndTime', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('[data-comp-name~="Kebab"]')))
        .click(this.browser.findElement(By.css('[data-comp-name~="Kebab"]')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('clickedOnButton2ndTime');
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
});
