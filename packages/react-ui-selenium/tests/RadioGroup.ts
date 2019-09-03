import { expect } from 'chai';
import { By, Key } from 'selenium-webdriver';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

describe('RadioGroup', function() {
  describe('vertical', function() {
    it('plain', async function() {
      const element = await this.browser.findElement(By.css('#RadioGroup-wrap'));
      await expect(await element.takeScreenshot()).to.matchImage('plain');
    });
    it.skip(['ie11'], 'hovered', async function() {
      const element = await this.browser.findElement(By.css('#RadioGroup-wrap'));
      await this.browser
        .actions({
          bridge: true,
        })
        .move({
          origin: this.browser.findElement(By.css('[data-comp-name="RadioGroup"] > span > label')),
        })
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('hovered');
    });
    it('clicked', async function() {
      const element = await this.browser.findElement(By.css('#RadioGroup-wrap'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('[data-comp-name="RadioGroup"] > span > label')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('clicked');
    });
    it('mouseLeave', async function() {
      const element = await this.browser.findElement(By.css('#RadioGroup-wrap'));
      // NOTE Firefox bug if click send right after click from previous test it results as double click
      await delay(500);
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('[data-comp-name="RadioGroup"] > span > label')))
        .perform();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('[data-tid="JustButton"]')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('mouseLeave');
    });
    it('tabPress', async function() {
      const element = await this.browser.findElement(By.css('#RadioGroup-wrap'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('[data-tid="JustButton"]')))
        .sendKeys(Key.TAB)
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('tabPress');
    });
    it('arrow_down', async function() {
      const element = await this.browser.findElement(By.css('#RadioGroup-wrap'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('[data-tid="JustButton"]')))
        .sendKeys(Key.TAB)
        .sendKeys(Key.DOWN)
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('arrow_down');
    });
  });
  describe('inline', function() {
    it('RadioGroup inline', async function() {
      const element = await this.browser.findElement(By.css('#RadioGroup-wrap'));
      await expect(await element.takeScreenshot()).to.matchImage('RadioGroup inline');
    });
  });
});
