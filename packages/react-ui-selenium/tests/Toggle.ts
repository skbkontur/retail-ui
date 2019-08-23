import { expect } from 'chai';
import { By } from 'selenium-webdriver';

describe('Toggle', function() {
  describe('plain', function() {
    it('plain', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('plain');
    });
    it('pressed', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .move({
          origin: this.browser.findElement(By.css('label')),
        })
        .press()
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('pressed');
      await this.browser
        .actions({
          bridge: true,
        })
        .release()
        .perform();
    });
    it('clicked', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('label')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('clicked');
    });
  });
  describe('playground', function() {
    it('plain', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('plain');
    });
  });
});
