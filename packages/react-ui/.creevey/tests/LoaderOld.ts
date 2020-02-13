import { expect } from 'chai';
import { By } from 'selenium-webdriver';

describe('LoaderOld', function() {
  describe('Active loader', function() {
    it('covers children', async function() {
      const element = await this.browser.findElement(By.css('[data-comp-name~="LoaderOld"]'));
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
      const element = await this.browser.findElement(By.css('[data-comp-name~="LoaderOld"]'));
      const button = await this.browser.findElement(By.css('[data-comp-name~="Button"]'));

      await this.browser
        .actions({ bridge: true })
        .click(button)
        .perform();

      await expect(await element.takeScreenshot()).to.matchImage("doesn't cover children");
    });
  });
});
