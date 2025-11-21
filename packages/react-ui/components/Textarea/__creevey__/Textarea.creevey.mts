import { story, kind, test } from 'creevey';
import 'creevey/playwright';

import { tid } from '../../__creevey__/helpers.mjs';

kind('Textarea', () => {
  story('DifferentStates', () => {
    test('Plain', async (context) => {
      const page = context.webdriver;
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'Plain');
    });

    test('Focus', async (context) => {
      const page = context.webdriver;
      await page.locator('#TextareaPlain textarea').click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'Focus');
    });

    test('FocusedByTab', async (context) => {
      const page = context.webdriver;
      await page.mouse.move(0, 0);
      await page.mouse.click(0, 0);
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'Focused by tab');
    });

    test('Typed', async (context) => {
      const page = context.webdriver;
      await page.locator('#TextareaPlain textarea').click();
      await page.keyboard.type('Test...');
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'Typed');
    });
  });

  story('AutoresizableTextareaStory', () => {
    test('autoresize', async (context) => {
      const page = context.webdriver;
      const textArea = () => page.locator(tid('TextArea'));
      const before = await textArea().screenshot();
      await page.locator(tid('AddButton')).click();
      await page.waitForTimeout(500);
      const addText = await textArea().screenshot();
      await page.locator(tid('CollapseButton')).click();
      await page.waitForTimeout(500);
      const collapse = await textArea().screenshot();
      await context.matchImages({ before, addText, collapse });
    });
  });

  story('SelectAllByProp', () => {
    test('Plain', async (context) => {
      const page = context.webdriver;
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'Plain');
    });

    test('Focused', async (context) => {
      const page = context.webdriver;
      await page.locator('label').click();
      await page.waitForTimeout(500);
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'Focused');
    });
  });

  story('SelectAllByButton', () => {
    test('Plain', async (context) => {
      const page = context.webdriver;
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'Plain');
    });

    test('Selected', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('select-all')).click();
      await page.waitForTimeout(500);
      await page.waitForTimeout(1000);
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
      const page = context.webdriver;
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'Plain');
    });

    test('Focus', async (context) => {
      const page = context.webdriver;
      await page.locator('#CounterPlain textarea').click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'Focus');
    });

    test('FocusAutoresize', async (context) => {
      const page = context.webdriver;
      await page.locator('#CounterAutoresizeTextarea textarea').first().click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'FocusAutoresize');
    });

    test('FocusWithHelpClosed', async (context) => {
      const page = context.webdriver;
      await page.locator('#CounterWithHelp textarea').click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'CounterWithHelp');
    });

    test('FocusWithHelpOpened', async (context) => {
      const page = context.webdriver;
      await page.locator('#CounterWithHelp textarea').click();
      await page.locator('svg').click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'CounterWithHelpOpened');
    });
  });
});
