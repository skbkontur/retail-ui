import { expect } from 'chai';
import { By } from 'selenium-webdriver';

describe('Link', function() {
  describe('Simple', function() {
    it('idle', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('idle');
    });
    it.skip(['ie11', 'ie11Flat'], 'hover', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .move({
          origin: this.browser.findElement(By.css('a')),
        })
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('hover');
    });
  });
  describe('With Icon', function() {
    it('idle', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('idle');
    });
    it.skip(['ie11', 'ie11Flat'], 'hover', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .move({
          origin: this.browser.findElement(By.css('a')),
        })
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('hover');
    });
  });
  describe('Danger', function() {
    it('idle', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('idle');
    });
    it.skip(['ie11', 'ie11Flat'], 'hover', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .move({
          origin: this.browser.findElement(By.css('a')),
        })
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('hover');
    });
  });
  describe('Grayed', function() {
    it('idle', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('idle');
    });
    it.skip(['ie11', 'ie11Flat'], 'hover', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .move({
          origin: this.browser.findElement(By.css('a')),
        })
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('hover');
    });
  });
  describe('Disabled', function() {
    it('idle', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('idle');
    });
    it.skip(['ie11', 'ie11Flat'], 'hover', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .move({
          origin: this.browser.findElement(By.css('a')),
        })
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('hover');
    });
  });
});
