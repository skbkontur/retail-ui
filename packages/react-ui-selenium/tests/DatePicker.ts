import { expect } from 'chai';
import { By, until } from 'selenium-webdriver';

describe('DatePicker', function() {
  describe('with mouseevent handlers', function() {
    it('opened', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('[class^="DatePicker-root"]')))
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('opened');
    });
    it('DateSelect month', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('[class^="DatePicker-root"]')))
        .perform();
      await this.browser.wait(
        until.elementLocated(
          By.css(
            '[class^="MonthView-month"]:first-child [class^="MonthView-headerMonth"] [class^="DateSelect-caption"]',
          ),
        ),
      );
      await this.browser
        .actions({ bridge: true })
        .click(
          this.browser.findElement(
            By.css(
              '[class^="MonthView-month"]:first-child [class^="MonthView-headerMonth"] [class^="DateSelect-caption"]',
            ),
          ),
        )
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('DateSelect month');
    });
    it('DateSelect year', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('[class^="DatePicker-root"]')))
        .perform();
      await this.browser.wait(
        until.elementLocated(
          By.css(
            '[class^="MonthView-month"]:first-child [class^="MonthView-headerYear"] [class^="DateSelect-caption"]',
          ),
        ),
      );
      await this.browser
        .actions({ bridge: true })
        .click(
          this.browser.findElement(
            By.css(
              '[class^="MonthView-month"]:first-child [class^="MonthView-headerYear"] [class^="DateSelect-caption"]',
            ),
          ),
        )
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('DateSelect year');
    });
  });
  describe('DatePicker with min max date', function() {
    it('DateSelect months', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('[class^="DatePicker-root"]')))
        .perform();
      await this.browser.wait(
        until.elementLocated(
          By.css(
            '[class^="MonthView-month"]:first-child [class^="MonthView-headerMonth"] [class^="DateSelect-caption"]',
          ),
        ),
      );
      await this.browser
        .actions({ bridge: true })
        .click(
          this.browser.findElement(
            By.css(
              '[class^="MonthView-month"]:first-child [class^="MonthView-headerMonth"] [class^="DateSelect-caption"]',
            ),
          ),
        )
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('DateSelect months');
    });
    it('DateSelect years', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement(By.css('[class^="DatePicker-root"]')))
        .perform();
      await this.browser.wait(
        until.elementLocated(
          By.css(
            '[class^="MonthView-month"]:first-child [class^="MonthView-headerYear"] [class^="DateSelect-caption"]',
          ),
        ),
      );
      await this.browser
        .actions({ bridge: true })
        .click(
          this.browser.findElement(
            By.css(
              '[class^="MonthView-month"]:first-child [class^="MonthView-headerYear"] [class^="DateSelect-caption"]',
            ),
          ),
        )
        .perform();
      await expect(await element.takeScreenshot()).to.matchImage('DateSelect years');
    });
  });
});
