import { story, kind, test } from 'creevey';

import { delay } from '../../../lib/utils';

kind('DateInput', () => {
  story('Simple', () => {
    test('idle', async function () {
      await this.expect(await this.takeScreenshot()).to.matchImage('idle');
    });

    test('focus', async function () {
      await this.browser.executeScript(function () {
        const input = window.document.querySelector("[data-comp-name~='DateInput']");
        if (input instanceof HTMLElement) {
          input.focus();
        }
      });
      await this.expect(await this.takeScreenshot()).to.matchImage('focus');
    });
  });

  story('Disabled', () => {
    test('idle', async function () {
      await this.expect(await this.takeScreenshot()).to.matchImage('idle');
    });

    test('focus', async function () {
      await this.browser.executeScript(function () {
        const input = window.document.querySelector("[data-comp-name~='DateInput']");
        if (input instanceof HTMLElement) {
          input.focus();
        }
      });
      await this.expect(await this.takeScreenshot()).to.matchImage('focus');
    });
  });

  story('WithWidth', () => {
    test('idle', async function () {
      await this.expect(await this.takeScreenshot()).to.matchImage('idle');
    });

    test('focus', async function () {
      await this.browser.executeScript(function () {
        const input = window.document.querySelector("[data-comp-name~='DateInput']");
        if (input instanceof HTMLElement) {
          input.focus();
        }
      });
      await this.expect(await this.takeScreenshot()).to.matchImage('focus');
    });
  });

  // story('BlurAlwaysAfterChange', ({ setStoryParameters }) => {
  //   setStoryParameters({
  //     skip: {
  //       'story-skip-0': {
  //         in: ['firefox8px', 'firefoxDark', 'firefox2022', 'firefox2022Dark'],
  //         tests: ['value not changed', 'value changed', 'value restored'],
  //       },
  //     },
  //   });

    test('value not changed', async function () {
      await this.browser.executeScript(function () {
        const input = window.document.querySelector("[data-comp-name~='DateInput']");
        if (input instanceof HTMLElement) {
          input.focus();
        }
      });
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: 'body' }))
        .perform();
      await delay(500);
      await this.expect(await this.takeScreenshot()).to.matchImage('value not changed');
    });

    test('value changed', async function () {
      await this.browser.executeScript(function () {
        const input = window.document.querySelector("[data-comp-name~='DateInput']");
        if (input instanceof HTMLElement) {
          input.focus();
        }
      });
      await this.browser
        .actions({
          bridge: true,
        })
        .sendKeys('12')
        .click(this.browser.findElement({ css: 'body' }))
        .perform();
      await delay(500);
      await this.expect(await this.takeScreenshot()).to.matchImage('value changed');
    });

    test('value restored', async function () {
      await this.browser.executeScript(function () {
        const input = window.document.querySelector("[data-comp-name~='DateInput']");
        if (input instanceof HTMLElement) {
          input.focus();
        }
      });
      await this.browser
        .actions({
          bridge: true,
        })
        .sendKeys(this.keys.NUMPAD1)
        .click(this.browser.findElement({ css: 'body' }))
        .perform();
      await this.browser.executeScript(function () {
        const input = window.document.querySelector("[data-comp-name~='DateInput']");
        if (input instanceof HTMLElement) {
          input.blur();
        }
      });
      await this.expect(await this.takeScreenshot()).to.matchImage('value restored');
    });
  });

  story('WithNoValue', () => {
    test('idle', async function () {
      await this.expect(await this.takeScreenshot()).to.matchImage();
    });

    test('focused', async function () {
      await this.browser.executeScript(function () {
        const input = window.document.querySelector("[data-comp-name~='DateInput']");
        if (input instanceof HTMLElement) {
          input.focus();
        }
      });
      await this.expect(await this.takeScreenshot()).to.matchImage();
    });
  });

  story('WithError', () => {
    test('focused', async function () {
      const plain = await this.takeScreenshot();
      const DateInputPlaceholder = this.browser.findElement({
        css: '[data-tid~="DateFragmentsView__placeholder"]',
      });
      await this.browser.actions({ bridge: true }).click(DateInputPlaceholder).perform();
      await delay(1000);
      const focused = await this.takeScreenshot();
      await this.expect([plain, focused]).to.matchImages();
    });
  });

  story('ShouldSetFocusOnPlaceholderClick', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'chrome only': { in: /^(?!\bchrome2022\b)/ } } });

    test('focused', async function () {
      const DateInputPlaceholder = this.browser.findElement({
        css: '[data-tid~="DateFragmentsView__placeholder"]',
      });
      await this.browser.actions({ bridge: true }).click(DateInputPlaceholder).perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage();
    });
  });
});
