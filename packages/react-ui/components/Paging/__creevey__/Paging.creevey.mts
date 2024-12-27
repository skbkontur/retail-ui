import { story, kind, test } from 'creevey';
import { Key } from 'selenium-webdriver';

import { delay } from '../../../lib/delay';

kind('Paging', () => {
  story('GoToAbsensePageStory', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'hover does not work in chrome': {
          in: ['chrome2022', 'chrome2022Dark'],
          tests: ['hover', 'Move to page by Ender'],
        },
        flaky: {
          in: ['firefox2022', 'firefox2022Dark'],
          tests: ['Move focus right', 'Move to page by Ender'],
        },
      },
    });

    test('plain', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'plain');
    });

    test('hover', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .move({
          origin: context.webdriver.findElement({ css: `[data-tid='Paging__pageLinkWrapper']` }),
        })
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'hover');
    });

    test('change page by number', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: `[data-tid='Paging__pageLinkWrapper']` }))
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'change page by number');
    });

    test('change page by forwardLink', async (context) => {
      // NOTE Firefox bug if click send right after click from previous test it results as double click
      await delay(500);
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: `[data-tid='Paging__forwardLink']` }))
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'change page by forwardLink');
    });

    test('focused', async (context) => {
      // NOTE Firefox bug if click send right after click from previous test it results as double click
      await delay(500);
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: `[data-tid='Paging__pageLinkWrapper']` }))
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'focused');
    });

    test('Move focus right', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: `[data-tid='Paging__pageLinkWrapper']` }))
        .pause(100)
        .sendKeys(Key.ARROW_RIGHT)
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'Move focus right');
    });

    test('Move to page by Ender', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: `[data-tid='Paging__pageLinkWrapper']` }))
        .pause(100)
        .sendKeys(Key.ARROW_RIGHT)
        .pause(100)
        .sendKeys(Key.ENTER)
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'Move to page by Ender');
    });
  });
});
