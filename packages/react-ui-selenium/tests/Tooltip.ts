import { expect } from 'chai';
import { By, Key } from 'selenium-webdriver';

describe('Tooltip', function() {
  describe('static tooltip', function() {
    it('simple', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('simple');
    });
  });
  describe('tooltip left', function() {
    it('plain', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('plain');
    });
  });
  describe('tooltip right', function() {
    it('plain', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('plain');
    });
  });
  describe('tooltip bottom', function() {
    it('plain', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('plain');
    });
  });
  describe('Tooltips without wrapper around inline-block with 50% width', function() {
    it.skip(['ie11'], 'hover', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .move({
          origin: this.browser.findElement(By.css('textarea')),
        })
        .pause(500)
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('hover');
    });
  });
  describe('Opened tooltip without wrapper', function() {
    it('plain', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('plain');
    });
  });
  describe('focus tooltip', function() {
    it('01 - plain', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('01 - plain');
    });
    it('02 - focus', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .sendKeys(Key.TAB)
        .pause(500)
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('02 - focus');
    });
    it('03 - blur', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .sendKeys(Key.TAB)
        .perform();
      // NOTE In FF next Tab key event will focus browser tab that fail next tests
      // Possible solution add focus trap element inside all stories as a decorator
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('body')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('03 - blur');
    });
  });
  describe('focus tooltip (native input)', function() {
    it('01 - plain', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('01 - plain');
    });
    it('02 - focus', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('input')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('02 - focus');
    });
    it('03 - blur', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('input')))
        .perform();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('body')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('03 - blur');
    });
  });
  describe('Tooltip with external dynamic content', function() {
    it('01 - plain', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('01 - plain');
    });
    it('02 - changes top position if does not fit', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('#Container-0 button')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('02 - changes top position if does not fit');
    });
    it('03 - does not change position back on shrink', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('#Container-0 button')))
        .pause(100)
        .click(this.browser.findElement(By.css('#Container-0 button')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('03 - does not change position back on shrink');
    });
    it('04 - does not change top position if fits', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('#Container-1 button')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('04 - does not change top position if fits');
    });
    it('05 - does not change position on shrink', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('#Container-1 button')))
        .perform();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('#Container-1 button')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('05 - does not change position on shrink');
    });
    it('06 - changes left position if does not fit', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('#Container-2 button')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('06 - changes left position if does not fit');
    });
    it('07 - does not change position back on shrink', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('#Container-2 button')))
        .perform();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('#Container-2 button')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('07 - does not change position back on shrink');
    });
    it('08 - does not change bottom position if fits', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('#Container-3 button')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('08 - does not change bottom position if fits');
    });
    it('09 - does not change position on shrink', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('#Container-3 button')))
        .pause(100)
        .click(this.browser.findElement(By.css('#Container-3 button')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('09 - does not change position on shrink');
    });
    it('10 - does not change bottom position if does not fit', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('#Container-4 button')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage(
        '10 - does not change bottom position if does not fit',
      );
    });
    it('11 - does not change position on shrink', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('#Container-4 button')))
        .pause(100)
        .click(this.browser.findElement(By.css('#Container-4 button')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('11 - does not change position on shrink');
    });
  });
  describe('Tooltip with Input and switchable content', function() {
    it('focus and types', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('input')))
        .sendKeys('Hi')
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('focus and types');
    });
    it('clear input', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('input')))
        .sendKeys('Hi')
        .sendKeys(Key.BACK_SPACE, Key.BACK_SPACE)
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('clear input');
    });
  });
  describe('dynamic triggers', function() {
    it('without trigger', async function() {
      const element = await this.browser.findElement(By.css('[data-comp-name~="TestTooltip"]'));
      await expect(await element.takeScreenshot()).to.matchImage('without trigger');
    });
    it.skip(['ie11'], 'hover - mouseEnter', async function() {
      const element = await this.browser.findElement(By.css('[data-comp-name~="TestTooltip"]'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('#hover')))
        .move({
          origin: this.browser.findElement(By.css('[type="button"]')),
        })
        .perform();

      await expect(await element.takeScreenshot()).to.matchImage('hover - mouseEnter');
    });
    it('hover - mouseLeave', async function() {
      const element = await this.browser.findElement(By.css('[data-comp-name~="TestTooltip"]'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('#hover')))
        .move({
          origin: this.browser.findElement(By.css('[type="button"]')),
        })
        .pause(500)
        .perform();
      await this.browser
        .actions({
          bridge: true,
        })
        .move({
          origin: this.browser.findElement(By.css('body')),
        })
        .pause(500)
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('hover - mouseLeave');
    });
    it('click - click anchor', async function() {
      const element = await this.browser.findElement(By.css('[data-comp-name~="TestTooltip"]'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('#click')))
        .click(this.browser.findElement(By.css('[type="button"]')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('click - click anchor');
    });
    it('click - click outside', async function() {
      const element = await this.browser.findElement(By.css('[data-comp-name~="TestTooltip"]'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('#click')))
        .click(this.browser.findElement(By.css('[type="button"]')))
        .click(this.browser.findElement(By.css('body')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('click - click outside');
    });
    it('focus - focus', async function() {
      const element = await this.browser.findElement(By.css('[data-comp-name~="TestTooltip"]'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('#focus')))
        .perform();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('[type="button"]')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('focus - focus');
    });
    it('focus - blur', async function() {
      const element = await this.browser.findElement(By.css('[data-comp-name~="TestTooltip"]'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('#focus')))
        .click(this.browser.findElement(By.css('[type="button"]')))
        .click(this.browser.findElement(By.css('body')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('focus - blur');
    });
    it('opened', async function() {
      const element = await this.browser.findElement(By.css('[data-comp-name~="TestTooltip"]'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('#opened')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('opened');
    });
    it('closed', async function() {
      const element = await this.browser.findElement(By.css('[data-comp-name~="TestTooltip"]'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('#opened')))
        .click(this.browser.findElement(By.css('#closed')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('closed');
    });
    it.skip(['ie11'], 'hover&focus - mouseEnter', async function() {
      const element = await this.browser.findElement(By.css('[data-comp-name~="TestTooltip"]'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('#hover_focus')))
        .move({
          origin: this.browser.findElement(By.css('[type="button"]')),
        })
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('hover&focus - mouseEnter');
    });
    it('hover&focus - mouseLeave', async function() {
      const element = await this.browser.findElement(By.css('[data-comp-name~="TestTooltip"]'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('#hover_focus')))
        .move({
          origin: this.browser.findElement(By.css('[type="button"]')),
        })
        .move({
          origin: this.browser.findElement(By.css('body')),
        })
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('hover&focus - mouseLeave');
    });
    it('hover&focus - focus', async function() {
      const element = await this.browser.findElement(By.css('[data-comp-name~="TestTooltip"]'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('#hover_focus')))
        .click(this.browser.findElement(By.css('[type="button"]')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('hover&focus - focus');
    });
    it('hover&focus - focus - mouseLeave', async function() {
      const element = await this.browser.findElement(By.css('[data-comp-name~="TestTooltip"]'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('#hover_focus')))
        .click(this.browser.findElement(By.css('[type="button"]')))
        .move({
          origin: this.browser.findElement(By.css('body')),
        })
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('hover&focus - focus - mouseLeave');
    });
    it('hover&focus - blur', async function() {
      const element = await this.browser.findElement(By.css('[data-comp-name~="TestTooltip"]'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('#hover_focus')))
        .click(this.browser.findElement(By.css('[type="button"]')))
        .click(this.browser.findElement(By.css('body')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('hover&focus - blur');
    });
  });
  describe('Tooltip with Input and huge content', function() {
    it('idle', async function() {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement(By.css('[data-comp-name~="Input"]')))
        .perform();
      await expect(await this.browser.takeScreenshot()).to.matchImage('idle');
    });
  });
});
