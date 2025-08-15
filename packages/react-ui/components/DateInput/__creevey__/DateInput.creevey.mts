import { story, kind, test } from 'creevey';
import { Key } from 'selenium-webdriver';

import { delay } from '../../../lib/delay.mjs';

kind('DateInput', () => {
  story('Simple', () => {
    test('idle', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'idle');
    });

    test('focus', async (context) => {
      await context.webdriver.executeScript(function () {
        const input = window.document.querySelector("[data-comp-name~='DateInput']");
        if (input instanceof HTMLElement) {
          input.focus();
        }
      });
      await context.matchImage(await context.takeScreenshot(), 'focus');
    });
  });

  story('Disabled', () => {
    test('idle', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'idle');
    });

    test('focus', async (context) => {
      await context.webdriver.executeScript(function () {
        const input = window.document.querySelector("[data-comp-name~='DateInput']");
        if (input instanceof HTMLElement) {
          input.focus();
        }
      });
      await context.matchImage(await context.takeScreenshot(), 'focus');
    });
  });

  story('WithWidth', () => {
    test('idle', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'idle');
    });

    test('focus', async (context) => {
      await context.webdriver.executeScript(function () {
        const input = window.document.querySelector("[data-comp-name~='DateInput']");
        if (input instanceof HTMLElement) {
          input.focus();
        }
      });
      await context.matchImage(await context.takeScreenshot(), 'focus');
    });
  });

  story('BlurAlwaysAfterChange', () => {
    test('value not changed', async (context) => {
      await context.webdriver.executeScript(function () {
        const input = window.document.querySelector("[data-comp-name~='DateInput']");
        if (input instanceof HTMLElement) {
          input.focus();
        }
      });
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: 'body' }))
        .perform();
      await delay(500);
      await context.matchImage(await context.takeScreenshot(), 'value not changed');
    });

    test('value changed', async (context) => {
      await context.webdriver.executeScript(function () {
        const input = window.document.querySelector("[data-comp-name~='DateInput']");
        if (input instanceof HTMLElement) {
          input.focus();
        }
      });
      await context.webdriver
        .actions({
          bridge: true,
        })
        .sendKeys('12')
        .click(context.webdriver.findElement({ css: 'body' }))
        .perform();
      await delay(500);
      await context.matchImage(await context.takeScreenshot(), 'value changed');
    });

    test('value restored', async (context) => {
      await context.webdriver.executeScript(function () {
        const input = window.document.querySelector("[data-comp-name~='DateInput']");
        if (input instanceof HTMLElement) {
          input.focus();
        }
      });
      await context.webdriver
        .actions({
          bridge: true,
        })
        .sendKeys(Key.NUMPAD1)
        .click(context.webdriver.findElement({ css: 'body' }))
        .perform();
      await context.webdriver.executeScript(function () {
        const input = window.document.querySelector("[data-comp-name~='DateInput']");
        if (input instanceof HTMLElement) {
          input.blur();
        }
      });
      await context.matchImage(await context.takeScreenshot(), 'value restored');
    });
  });

  story('WithNoValue', () => {
    test('idle', async (context) => {
      await context.matchImage(await context.takeScreenshot());
    });

    test('focused', async (context) => {
      await context.webdriver.executeScript(function () {
        const input = window.document.querySelector("[data-comp-name~='DateInput']");
        if (input instanceof HTMLElement) {
          input.focus();
        }
      });
      await context.matchImage(await context.takeScreenshot());
    });
  });

  story('WithError', () => {
    test('focused', async (context) => {
      const plain = await context.takeScreenshot();
      const DateInputPlaceholder = context.webdriver.findElement({
        css: '[data-tid~="DateFragmentsView__placeholder"]',
      });
      await context.webdriver.actions({ bridge: true }).click(DateInputPlaceholder).perform();
      await delay(1000);
      const focused = await context.takeScreenshot();
      await context.matchImages({ plain, focused });
    });
  });

  story('ShouldSetFocusOnPlaceholderClick', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'chrome only': { in: /^(?!\bchrome2022\b)/ } } });

    test('focused', async (context) => {
      const DateInputPlaceholder = context.webdriver.findElement({
        css: '[data-tid~="DateFragmentsView__placeholder"]',
      });
      await context.webdriver.actions({ bridge: true }).click(DateInputPlaceholder).perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot());
    });
  });
});
