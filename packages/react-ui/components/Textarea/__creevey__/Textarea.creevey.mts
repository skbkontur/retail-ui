import { story, kind, test } from 'creevey';
import { Key } from 'selenium-webdriver';

import { delay } from '../../../lib/delay';

kind('Textarea', () => {
  story('DifferentStates', () => {
    test('Plain', async (context) => {
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'Plain');
    });

    test('Focus', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '#TextareaPlain textarea' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'Focus');
    });

    test('FocusedByTab', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .move({ x: 0, y: 0 })
        .click()
        .sendKeys(Key.TAB)
        .sendKeys(Key.TAB)
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'Focused by tab');
    });

    test('Typed', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '#TextareaPlain textarea' }))
        .sendKeys('Test...')
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'Typed');
    });
  });

  story('AutoresizableTextareaStory', () => {
    test('autoresize', async (context) => {
      const textArea = () => context.webdriver.findElement({ css: '[data-tid~="TextArea"]' });
      const before = await textArea().takeScreenshot();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid~="AddButton"]' }))
        .pause(500)
        .perform();
      const addText = await textArea().takeScreenshot();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid~="CollapseButton"]' }))
        .pause(500)
        .perform();
      const collapse = await textArea().takeScreenshot();
      await context.matchImages({ before, addText, collapse });
    });
  });

  story('SelectAllByProp', () => {
    test('Plain', async (context) => {
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'Plain');
    });

    test('Focused', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: 'label' }))
        .pause(500)
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'Focused');
    });
  });

  story('SelectAllByButton', () => {
    test('Plain', async (context) => {
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'Plain');
    });

    test('Selected', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid="select-all"]' }))
        .pause(500)
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'Selected');
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

    test('Plain', async (context) => {
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'Plain');
    });

    test('Focus', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '#CounterPlain textarea' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'Focus');
    });

    test('FocusAutoresize', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '#CounterAutoresizeTextarea textarea' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'FocusAutoresize');
    });

    test('FocusWithHelpClosed', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '#CounterWithHelp textarea' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'CounterWithHelp');
    });

    test('FocusWithHelpOpened', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '#CounterWithHelp textarea' }))
        .perform();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: `svg` }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'CounterWithHelpOpened');
    });
  });
});
