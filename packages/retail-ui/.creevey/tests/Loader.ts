import { expect } from 'chai';
import { By } from 'selenium-webdriver';

describe('Loader', function() {
  describe('Active loader', function() {
    it('covers children', async function() {
      const element = await this.browser.findElement(By.css('[data-comp-name~="Loader"]'));
      const button = await this.browser.findElement(By.css('[data-comp-name~="Button"]'));

      await this.browser
        .actions({ bridge: true })
        .click(button)
        .perform();

      await expect(await element.takeScreenshot()).to.matchImage('cover children');
    });
  });
  describe('Inactive loader', function() {
    it("doesn't cover children", async function() {
      const element = await this.browser.findElement(By.css('[data-comp-name~="Loader"]'));
      const button = await this.browser.findElement(By.css('[data-comp-name~="Button"]'));

      await this.browser
        .actions({ bridge: true })
        .click(button)
        .perform();

      await expect(await element.takeScreenshot()).to.matchImage("doesn't cover children");
    });
  });
  describe('Wrapper with custom height and inactive loader', function() {
    it('have children with same height while loader inactive', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage(
        'have children with same height while loader inactive',
      );
    });
  });
  describe('Wrapper with custom height and active loader', function() {
    it('have children with same height while loader active', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('have children with same height while loader active');
    });
  });
  describe('Activate Loader after mount on large content', function() {
    it('recalc position', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('recalc position');
    });
  });
});
