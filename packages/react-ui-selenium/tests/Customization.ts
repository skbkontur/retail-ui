import { expect } from 'chai';
import { By } from 'selenium-webdriver';

describe('ThemeProvider', function() {
  describe('playground', function() {
    // NOTE We scroll page because selenium don't take composite images, especialy for ie
    it('default theme top', async function() {
      await expect(await this.browser.takeScreenshot()).to.matchImage('default theme top');
    });
    it('default theme bottom', async function() {
      await this.browser.executeScript(function() {
        document.documentElement.scrollTop = document.documentElement.offsetHeight;
      });
      await expect(await this.browser.takeScreenshot()).to.matchImage('default theme bottom');
    });
    it('flat theme top', async function() {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement(By.css('[data-prop-id="flat"]')))
        .perform();
      await expect(await this.browser.takeScreenshot()).to.matchImage('flat theme top');
    });
    it('flat theme bottom', async function() {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement(By.css('[data-prop-id="flat"]')))
        .perform();
      await this.browser.executeScript(function() {
        document.documentElement.scrollTop = document.documentElement.offsetHeight;
      });
      await expect(await this.browser.takeScreenshot()).to.matchImage('flat theme bottom');
    });
    it('dark theme top', async function() {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement(By.css('[data-prop-id="dark"]')))
        .perform();
      await expect(await this.browser.takeScreenshot()).to.matchImage('dark theme top');
    });
    it('dark theme bottom', async function() {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement(By.css('[data-prop-id="dark"]')))
        .perform();
      await this.browser.executeScript(function() {
        document.documentElement.scrollTop = document.documentElement.offsetHeight;
      });
      await expect(await this.browser.takeScreenshot()).to.matchImage('dark theme bottom');
    });
  });
});
