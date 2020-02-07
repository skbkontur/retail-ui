import { expect } from 'chai';
import { By, Key } from 'selenium-webdriver';

describe('Button', function() {
  describe('playground', function() {
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
          origin: this.browser.findElement(By.css('button')),
        })
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('hover');
    });
    it('pressed', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .move({
          origin: this.browser.findElement(By.css('button')),
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
        .click(this.browser.findElement(By.css('button')))
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
  });
  describe('use link', function() {
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
          origin: this.browser.findElement(By.css('button')),
        })
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('hover');
    });
    it('pressed', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .move({
          origin: this.browser.findElement(By.css('button')),
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
        .click(this.browser.findElement(By.css('button')))
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
  });
  describe('use link with icon', function() {
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
          origin: this.browser.findElement(By.css('button')),
        })
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('hover');
    });
    it('pressed', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .move({
          origin: this.browser.findElement(By.css('button')),
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
        .click(this.browser.findElement(By.css('button')))
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
  });
  describe('multiline text with link button', function() {
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
          origin: this.browser.findElement(By.css('button')),
        })
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('hover');
    });
    it('pressed', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .move({
          origin: this.browser.findElement(By.css('button')),
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
        .click(this.browser.findElement(By.css('button')))
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
  });
  describe('with error', function() {
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
          origin: this.browser.findElement(By.css('button')),
        })
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('hover');
    });
    it.skip(['chrome'], 'pressed', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .move({
          origin: this.browser.findElement(By.css('button')),
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
    it.skip(['chrome'], 'clicked', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('button')))
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
  });
  describe('arrow with error', function() {
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
          origin: this.browser.findElement(By.css('button')),
        })
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('hover');
    });
    it.skip(['chrome'], 'pressed', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .move({
          origin: this.browser.findElement(By.css('button')),
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
    it.skip(['chrome'], 'clicked', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('button')))
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
  });
  describe('different content', function() {
    it('plain', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('plain');
    });
  });
  describe('text styles reset', function() {
    it('plain', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('plain');
    });
  });
  describe('different aligns', function() {
    it('plain', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('plain');
    });
  });
  describe('default combinations', function() {
    it('page - 1', async function() {
      const element = await this.browser.findElement(By.css('[data-comp-name~="ComponentTable"]'));
      await expect(await element.takeScreenshot()).to.matchImage('page - 1');
    });
    it('page - 2', async function() {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement(By.css('#next-page')))
        .perform();
      const element = await this.browser.findElement(By.css('[data-comp-name~="ComponentTable"]'));
      await expect(await element.takeScreenshot()).to.matchImage('page - 2');
    });
    it('page - 3', async function() {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement(By.css('#next-page')))
        .click(this.browser.findElement(By.css('#next-page')))
        .perform();
      const element = await this.browser.findElement(By.css('[data-comp-name~="ComponentTable"]'));
      await expect(await element.takeScreenshot()).to.matchImage('page - 3');
    });
    it('page - 4', async function() {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement(By.css('#next-page')))
        .click(this.browser.findElement(By.css('#next-page')))
        .click(this.browser.findElement(By.css('#next-page')))
        .perform();
      const element = await this.browser.findElement(By.css('[data-comp-name~="ComponentTable"]'));
      await expect(await element.takeScreenshot()).to.matchImage('page - 4');
    });
    it('page - 5', async function() {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement(By.css('#next-page')))
        .click(this.browser.findElement(By.css('#next-page')))
        .click(this.browser.findElement(By.css('#next-page')))
        .click(this.browser.findElement(By.css('#next-page')))
        .perform();
      const element = await this.browser.findElement(By.css('[data-comp-name~="ComponentTable"]'));
      await expect(await element.takeScreenshot()).to.matchImage('page - 5');
    });
  });
  describe('combinations with warning', function() {
    it('page - 1', async function() {
      const element = await this.browser.findElement(By.css('[data-comp-name~="ComponentTable"]'));
      await expect(await element.takeScreenshot()).to.matchImage('page - 1');
    });
    it('page - 2', async function() {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement(By.css('#next-page')))
        .perform();
      const element = await this.browser.findElement(By.css('[data-comp-name~="ComponentTable"]'));
      await expect(await element.takeScreenshot()).to.matchImage('page - 2');
    });
    it('page - 3', async function() {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement(By.css('#next-page')))
        .click(this.browser.findElement(By.css('#next-page')))
        .perform();
      const element = await this.browser.findElement(By.css('[data-comp-name~="ComponentTable"]'));
      await expect(await element.takeScreenshot()).to.matchImage('page - 3');
    });
    it('page - 4', async function() {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement(By.css('#next-page')))
        .click(this.browser.findElement(By.css('#next-page')))
        .click(this.browser.findElement(By.css('#next-page')))
        .perform();
      const element = await this.browser.findElement(By.css('[data-comp-name~="ComponentTable"]'));
      await expect(await element.takeScreenshot()).to.matchImage('page - 4');
    });
    it('page - 5', async function() {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement(By.css('#next-page')))
        .click(this.browser.findElement(By.css('#next-page')))
        .click(this.browser.findElement(By.css('#next-page')))
        .click(this.browser.findElement(By.css('#next-page')))
        .perform();
      const element = await this.browser.findElement(By.css('[data-comp-name~="ComponentTable"]'));
      await expect(await element.takeScreenshot()).to.matchImage('page - 5');
    });
  });
  describe('combinations with error', function() {
    it('page - 1', async function() {
      const element = await this.browser.findElement(By.css('[data-comp-name~="ComponentTable"]'));
      await expect(await element.takeScreenshot()).to.matchImage('page - 1');
    });
    it('page - 2', async function() {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement(By.css('#next-page')))
        .perform();
      const element = await this.browser.findElement(By.css('[data-comp-name~="ComponentTable"]'));
      await expect(await element.takeScreenshot()).to.matchImage('page - 2');
    });
    it('page - 3', async function() {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement(By.css('#next-page')))
        .click(this.browser.findElement(By.css('#next-page')))
        .perform();
      const element = await this.browser.findElement(By.css('[data-comp-name~="ComponentTable"]'));
      await expect(await element.takeScreenshot()).to.matchImage('page - 3');
    });
    it('page - 4', async function() {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement(By.css('#next-page')))
        .click(this.browser.findElement(By.css('#next-page')))
        .click(this.browser.findElement(By.css('#next-page')))
        .perform();
      const element = await this.browser.findElement(By.css('[data-comp-name~="ComponentTable"]'));
      await expect(await element.takeScreenshot()).to.matchImage('page - 4');
    });
    it('page - 5', async function() {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement(By.css('#next-page')))
        .click(this.browser.findElement(By.css('#next-page')))
        .click(this.browser.findElement(By.css('#next-page')))
        .click(this.browser.findElement(By.css('#next-page')))
        .perform();
      const element = await this.browser.findElement(By.css('[data-comp-name~="ComponentTable"]'));
      await expect(await element.takeScreenshot()).to.matchImage('page - 5');
    });
  });
  describe('combinations with focus', function() {
    it('page - 1', async function() {
      const element = await this.browser.findElement(By.css('[data-comp-name~="ComponentTable"]'));
      await expect(await element.takeScreenshot()).to.matchImage('page - 1');
    });
    it('page - 2', async function() {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement(By.css('#next-page')))
        .perform();
      const element = await this.browser.findElement(By.css('[data-comp-name~="ComponentTable"]'));
      await expect(await element.takeScreenshot()).to.matchImage('page - 2');
    });
    it('page - 3', async function() {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement(By.css('#next-page')))
        .click(this.browser.findElement(By.css('#next-page')))
        .perform();
      const element = await this.browser.findElement(By.css('[data-comp-name~="ComponentTable"]'));
      await expect(await element.takeScreenshot()).to.matchImage('page - 3');
    });
    it('page - 4', async function() {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement(By.css('#next-page')))
        .click(this.browser.findElement(By.css('#next-page')))
        .click(this.browser.findElement(By.css('#next-page')))
        .perform();
      const element = await this.browser.findElement(By.css('[data-comp-name~="ComponentTable"]'));
      await expect(await element.takeScreenshot()).to.matchImage('page - 4');
    });
    it('page - 5', async function() {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement(By.css('#next-page')))
        .click(this.browser.findElement(By.css('#next-page')))
        .click(this.browser.findElement(By.css('#next-page')))
        .click(this.browser.findElement(By.css('#next-page')))
        .perform();
      const element = await this.browser.findElement(By.css('[data-comp-name~="ComponentTable"]'));
      await expect(await element.takeScreenshot()).to.matchImage('page - 5');
    });
  });
  describe('loading combinations', function() {
    it('page - 1', async function() {
      const element = await this.browser.findElement(By.css('[data-comp-name~="ComponentTable"]'));
      await expect(await element.takeScreenshot()).to.matchImage('page - 1');
    });
    it('page - 2', async function() {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement(By.css('#next-page')))
        .perform();
      const element = await this.browser.findElement(By.css('[data-comp-name~="ComponentTable"]'));
      await expect(await element.takeScreenshot()).to.matchImage('page - 2');
    });
    it('page - 3', async function() {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement(By.css('#next-page')))
        .click(this.browser.findElement(By.css('#next-page')))
        .perform();
      const element = await this.browser.findElement(By.css('[data-comp-name~="ComponentTable"]'));
      await expect(await element.takeScreenshot()).to.matchImage('page - 3');
    });
    it('page - 4', async function() {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement(By.css('#next-page')))
        .click(this.browser.findElement(By.css('#next-page')))
        .click(this.browser.findElement(By.css('#next-page')))
        .perform();
      const element = await this.browser.findElement(By.css('[data-comp-name~="ComponentTable"]'));
      await expect(await element.takeScreenshot()).to.matchImage('page - 4');
    });
    it('page - 5', async function() {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement(By.css('#next-page')))
        .click(this.browser.findElement(By.css('#next-page')))
        .click(this.browser.findElement(By.css('#next-page')))
        .click(this.browser.findElement(By.css('#next-page')))
        .perform();
      const element = await this.browser.findElement(By.css('[data-comp-name~="ComponentTable"]'));
      await expect(await element.takeScreenshot()).to.matchImage('page - 5');
    });
  });
  describe('disabled combinations', function() {
    it('page - 1', async function() {
      const element = await this.browser.findElement(By.css('[data-comp-name~="ComponentTable"]'));
      await expect(await element.takeScreenshot()).to.matchImage('page - 1');
    });
    it('page - 2', async function() {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement(By.css('#next-page')))
        .perform();
      const element = await this.browser.findElement(By.css('[data-comp-name~="ComponentTable"]'));
      await expect(await element.takeScreenshot()).to.matchImage('page - 2');
    });
    it('page - 3', async function() {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement(By.css('#next-page')))
        .click(this.browser.findElement(By.css('#next-page')))
        .perform();
      const element = await this.browser.findElement(By.css('[data-comp-name~="ComponentTable"]'));
      await expect(await element.takeScreenshot()).to.matchImage('page - 3');
    });
    it('page - 4', async function() {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement(By.css('#next-page')))
        .click(this.browser.findElement(By.css('#next-page')))
        .click(this.browser.findElement(By.css('#next-page')))
        .perform();
      const element = await this.browser.findElement(By.css('[data-comp-name~="ComponentTable"]'));
      await expect(await element.takeScreenshot()).to.matchImage('page - 4');
    });
    it('page - 5', async function() {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement(By.css('#next-page')))
        .click(this.browser.findElement(By.css('#next-page')))
        .click(this.browser.findElement(By.css('#next-page')))
        .click(this.browser.findElement(By.css('#next-page')))
        .perform();
      const element = await this.browser.findElement(By.css('[data-comp-name~="ComponentTable"]'));
      await expect(await element.takeScreenshot()).to.matchImage('page - 5');
    });
  });
  describe('active combinations', function() {
    it('page - 1', async function() {
      const element = await this.browser.findElement(By.css('[data-comp-name~="ComponentTable"]'));
      await expect(await element.takeScreenshot()).to.matchImage('page - 1');
    });
    it('page - 2', async function() {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement(By.css('#next-page')))
        .perform();
      const element = await this.browser.findElement(By.css('[data-comp-name~="ComponentTable"]'));
      await expect(await element.takeScreenshot()).to.matchImage('page - 2');
    });
    it('page - 3', async function() {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement(By.css('#next-page')))
        .click(this.browser.findElement(By.css('#next-page')))
        .perform();
      const element = await this.browser.findElement(By.css('[data-comp-name~="ComponentTable"]'));
      await expect(await element.takeScreenshot()).to.matchImage('page - 3');
    });
    it('page - 4', async function() {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement(By.css('#next-page')))
        .click(this.browser.findElement(By.css('#next-page')))
        .click(this.browser.findElement(By.css('#next-page')))
        .perform();
      const element = await this.browser.findElement(By.css('[data-comp-name~="ComponentTable"]'));
      await expect(await element.takeScreenshot()).to.matchImage('page - 4');
    });
    it('page - 5', async function() {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement(By.css('#next-page')))
        .click(this.browser.findElement(By.css('#next-page')))
        .click(this.browser.findElement(By.css('#next-page')))
        .click(this.browser.findElement(By.css('#next-page')))
        .perform();
      const element = await this.browser.findElement(By.css('[data-comp-name~="ComponentTable"]'));
      await expect(await element.takeScreenshot()).to.matchImage('page - 5');
    });
  });
  describe('checked combinations', function() {
    it('page - 1', async function() {
      const element = await this.browser.findElement(By.css('[data-comp-name~="ComponentTable"]'));
      await expect(await element.takeScreenshot()).to.matchImage('page - 1');
    });
    it('page - 2', async function() {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement(By.css('#next-page')))
        .perform();
      const element = await this.browser.findElement(By.css('[data-comp-name~="ComponentTable"]'));
      await expect(await element.takeScreenshot()).to.matchImage('page - 2');
    });
    it('page - 3', async function() {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement(By.css('#next-page')))
        .click(this.browser.findElement(By.css('#next-page')))
        .perform();
      const element = await this.browser.findElement(By.css('[data-comp-name~="ComponentTable"]'));
      await expect(await element.takeScreenshot()).to.matchImage('page - 3');
    });
    it('page - 4', async function() {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement(By.css('#next-page')))
        .click(this.browser.findElement(By.css('#next-page')))
        .click(this.browser.findElement(By.css('#next-page')))
        .perform();
      const element = await this.browser.findElement(By.css('[data-comp-name~="ComponentTable"]'));
      await expect(await element.takeScreenshot()).to.matchImage('page - 4');
    });
    it('page - 5', async function() {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement(By.css('#next-page')))
        .click(this.browser.findElement(By.css('#next-page')))
        .click(this.browser.findElement(By.css('#next-page')))
        .click(this.browser.findElement(By.css('#next-page')))
        .perform();
      const element = await this.browser.findElement(By.css('[data-comp-name~="ComponentTable"]'));
      await expect(await element.takeScreenshot()).to.matchImage('page - 5');
    });
  });
});
