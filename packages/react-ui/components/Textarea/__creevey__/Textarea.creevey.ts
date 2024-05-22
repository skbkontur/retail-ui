import { story, kind, test } from 'creevey';

import { delay } from '../../../lib/utils';

kind('Textarea', () => {
  story('DifferentStates', () => {
    test('Plain', async function () {
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('Plain');
    });

    test('Focus', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#TextareaPlain textarea' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('Focus');
    });

    test('FocusedByTab', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .move({ x: 0, y: 0 })
        .click()
        .sendKeys(this.keys.TAB)
        .sendKeys(this.keys.TAB)
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('Focused by tab');
    });

    test('Typed', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#TextareaPlain textarea' }))
        .sendKeys('Test...')
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('Typed');
    });
  });

  story('AutoresizableTextareaStory', () => {
    test('autoresize', async function () {
      const textArea = () => this.browser.findElement({ css: '[data-tid~="TextArea"]' });
      const before = await textArea().takeScreenshot();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid~="AddButton"]' }))
        .pause(500)
        .perform();
      const addText = await textArea().takeScreenshot();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid~="CollapseButton"]' }))
        .pause(500)
        .perform();
      const collapse = await textArea().takeScreenshot();
      await this.expect({ before, addText, collapse }).to.matchImages();
    });
  });

  story('SelectAllByProp', () => {
    test('Plain', async function () {
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('Plain');
    });

    test('Focused', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: 'label' }))
        .pause(500)
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('Focused');
    });
  });

  story('SelectAllByButton', () => {
    test('Plain', async function () {
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('Plain');
    });

    test('Selected', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid="select-all"]' }))
        .pause(500)
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('Selected');
    });
  });

  story('TextareaWithCounters', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'flacky scrollbars height': {
          in: ['firefox', 'firefox8px', 'firefoxFlat8px', 'firefoxDark'],
        },
      },
    });

    test('Plain', async function () {
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('Plain');
    });

    test('Focus', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#CounterPlain textarea' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('Focus');
    });

    test('FocusAutoresize', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#CounterAutoresizeTextarea textarea' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('FocusAutoresize');
    });

    test('FocusWithHelpClosed', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#CounterWithHelp textarea' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('CounterWithHelp');
    });

    test('FocusWithHelpOpened', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '#CounterWithHelp textarea' }))
        .perform();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: `svg` }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('CounterWithHelpOpened');
    });
  });
});
