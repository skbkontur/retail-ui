import { expect } from 'chai';
import { By } from 'selenium-webdriver';

describe('Input', function() {
  describe('Inputs with different sizes', function() {
    it('Plain small', async function() {
      const element = await this.browser.findElement(By.css('#small-input-wrapper'));
      await expect(await element.takeScreenshot()).to.matchImage('Plain');
    });
    it('Focused small', async function() {
      const element = await this.browser.findElement(By.css('#small-input-wrapper'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('#small-input-wrapper input')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('Focused');
    });
    it('With typed text small', async function() {
      const element = await this.browser.findElement(By.css('#small-input-wrapper'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('#small-input-wrapper input')))
        .sendKeys('Test...')
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('With typed text');
    });
    it('With long typed text small', async function() {
      const element = await this.browser.findElement(By.css('#small-input-wrapper'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('#small-input-wrapper input')))
        .sendKeys('Test...')
        .sendKeys(
          'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        )
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('With long typed text');
    });
    it('Plain medium', async function() {
      const element = await this.browser.findElement(By.css('#medium-input-wrapper'));
      await expect(await element.takeScreenshot()).to.matchImage('Plain');
    });
    it('Focused medium', async function() {
      const element = await this.browser.findElement(By.css('#medium-input-wrapper'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('#medium-input-wrapper input')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('Focused');
    });
    it('With typed text medium', async function() {
      const element = await this.browser.findElement(By.css('#medium-input-wrapper'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('#medium-input-wrapper input')))
        .sendKeys('Test...')
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('With typed text');
    });
    it('With long typed text medium', async function() {
      const element = await this.browser.findElement(By.css('#medium-input-wrapper'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('#medium-input-wrapper input')))
        .sendKeys('Test...')
        .sendKeys(
          'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        )
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('With long typed text');
    });
    it('Plain large', async function() {
      const element = await this.browser.findElement(By.css('#large-input-wrapper'));
      await expect(await element.takeScreenshot()).to.matchImage('Plain');
    });
    it('Focused large', async function() {
      const element = await this.browser.findElement(By.css('#large-input-wrapper'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('#large-input-wrapper input')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('Focused');
    });
    it('With typed text large', async function() {
      const element = await this.browser.findElement(By.css('#large-input-wrapper'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('#large-input-wrapper input')))
        .sendKeys('Test...')
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('With typed text');
    });
    it('With long typed text large', async function() {
      const element = await this.browser.findElement(By.css('#large-input-wrapper'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('#large-input-wrapper input')))
        .sendKeys('Test...')
        .sendKeys(
          'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        )
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('With long typed text');
    });
  });
  describe('Inputs with different states', function() {
    it('Warning small', async function() {
      const element = await this.browser.findElement(By.css('#warning-small-input-wrapper'));
      await expect(await element.takeScreenshot()).to.matchImage('Warning small');
    });
    it('Warning large', async function() {
      const element = await this.browser.findElement(By.css('#warning-large-input-wrapper'));
      await expect(await element.takeScreenshot()).to.matchImage('Warning large');
    });
    it('Error small', async function() {
      const element = await this.browser.findElement(By.css('#error-small-input-wrapper'));
      await expect(await element.takeScreenshot()).to.matchImage('Error small');
    });
    it('Error large', async function() {
      const element = await this.browser.findElement(By.css('#error-large-input-wrapper'));
      await expect(await element.takeScreenshot()).to.matchImage('Error large');
    });
    it('Disabled small', async function() {
      const element = await this.browser.findElement(By.css('#disabled-small-input-wrapper'));
      await expect(await element.takeScreenshot()).to.matchImage('Disabled small');
    });
    it('Disabled large', async function() {
      const element = await this.browser.findElement(By.css('#disabled-large-input-wrapper'));
      await expect(await element.takeScreenshot()).to.matchImage('Disabled large');
    });
    it('Disabled text small', async function() {
      const element = await this.browser.findElement(By.css('#disabled-text-small-input-wrapper'));
      await expect(await element.takeScreenshot()).to.matchImage('Disabled text small');
    });
    it('Disabled text large', async function() {
      const element = await this.browser.findElement(By.css('#disabled-text-large-input-wrapper'));
      await expect(await element.takeScreenshot()).to.matchImage('Disabled text large');
    });
    it('Placeholder small', async function() {
      const element = await this.browser.findElement(By.css('#placeholder-small-input-wrapper'));
      await expect(await element.takeScreenshot()).to.matchImage('Placeholder small');
    });
    it('Placeholder large', async function() {
      const element = await this.browser.findElement(By.css('#placeholder-large-input-wrapper'));
      await expect(await element.takeScreenshot()).to.matchImage('Placeholder large');
    });
    it('Password small', async function() {
      const element = await this.browser.findElement(By.css('#password-small-input-wrapper'));
      await expect(await element.takeScreenshot()).to.matchImage('Password small');
    });
    it('Password large', async function() {
      const element = await this.browser.findElement(By.css('#password-large-input-wrapper'));
      await expect(await element.takeScreenshot()).to.matchImage('Password large');
    });
    it('Borderless small', async function() {
      const element = await this.browser.findElement(By.css('#borderless-small-input-wrapper'));
      await expect(await element.takeScreenshot()).to.matchImage('Borderless small');
    });
    it('Borderless large', async function() {
      const element = await this.browser.findElement(By.css('#borderless-large-input-wrapper'));
      await expect(await element.takeScreenshot()).to.matchImage('Borderless large');
    });
    it('Left icon small', async function() {
      const element = await this.browser.findElement(By.css('#left-icon-small-input-wrapper'));
      await expect(await element.takeScreenshot()).to.matchImage('Left icon small');
    });
    it('Left icon large', async function() {
      const element = await this.browser.findElement(By.css('#left-icon-large-input-wrapper'));
      await expect(await element.takeScreenshot()).to.matchImage('Left icon large');
    });
    it('Right icon small', async function() {
      const element = await this.browser.findElement(By.css('#right-icon-small-input-wrapper'));
      await expect(await element.takeScreenshot()).to.matchImage('Right icon small');
    });
    it('Right icon large', async function() {
      const element = await this.browser.findElement(By.css('#right-icon-large-input-wrapper'));
      await expect(await element.takeScreenshot()).to.matchImage('Right icon large');
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
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('Selected');
    });
  });
  describe('Input with phone mask', function() {
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
        .click(this.browser.findElement(By.css('input')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('Focused');
    });
    it('Editing', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('input')))
        .sendKeys('9')
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('Editing');
    });
    it('Blured', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('input')))
        .sendKeys('9')
        .perform();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('body')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('Blured');
    });
  });
  describe('Placeholder and Mask', function() {
    it('Plain', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('Plain');
    });
  });
  describe('Prefix and suffix small', function() {
    it('Plain', async function() {
      const element = await this.browser.findElement(By.css('#inputWithPrefixOrSuffx-small'));
      await expect(await element.takeScreenshot()).to.matchImage('Plain');
    });
    it('First input focused', async function() {
      const element = await this.browser.findElement(By.css('#inputWithPrefixOrSuffx-small'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('#inputWithPrefixOrSuffx-small input')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('First input focused');
    });
  });
  describe('Prefix and suffix medium', function() {
    it('Plain', async function() {
      const element = await this.browser.findElement(By.css('#inputWithPrefixOrSuffx-medium'));
      await expect(await element.takeScreenshot()).to.matchImage('Plain');
    });
    it('First input focused', async function() {
      const element = await this.browser.findElement(By.css('#inputWithPrefixOrSuffx-medium'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('#inputWithPrefixOrSuffx-medium input')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('First input focused');
    });
  });
  describe('Prefix and suffix large', function() {
    it('Plain', async function() {
      const element = await this.browser.findElement(By.css('#inputWithPrefixOrSuffx-large'));
      await expect(await element.takeScreenshot()).to.matchImage('Plain');
    });
    it('First input focused', async function() {
      const element = await this.browser.findElement(By.css('#inputWithPrefixOrSuffx-large'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('#inputWithPrefixOrSuffx-large input')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('First input focused');
    });
  });
  describe('text styles reset', function() {
    it('plain', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('plain');
    });
  });
});
