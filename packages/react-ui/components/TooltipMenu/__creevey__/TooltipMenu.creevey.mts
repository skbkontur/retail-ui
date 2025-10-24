import { story, kind, test } from 'creevey';
import { Key } from 'selenium-webdriver';

import { delay } from '../../../lib/delay.mjs';

const textAlignmentTests = () => {
  test('opened', async (context) => {
    await context.webdriver
      .actions({
        bridge: true,
      })
      .click(context.webdriver.findElement({ css: `[data-tid~="PopupMenu__caption"]` }))
      .perform();
    await delay(1000);
    await context.matchImage(await context.takeScreenshot(), 'opened');
  });
};

kind('TooltipMenu', () => {
  story('SimpleExample', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'story-skip-0': {
          in: ['chrome2022', 'chrome2022Dark'],
          tests: ['clickAfterClickedOnCaption', 'clicked'],
        },

        flaky: { in: ['firefox2022', 'firefox2022Dark'], tests: ['tabPress'] },
      },
    });

    test('plain', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'plain');
    });

    test('clickAfterClickedOnCaption', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid~="TooltipMenu__root"]' }))
        .click(context.webdriver.findElement({ css: '[data-tid~="TooltipMenu__root"]' }))
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'clickAfterClickedOnCaption');
    });

    test('clicked', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid~="TooltipMenu__root"]' }))
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'clicked');
    });

    test('clickedOutside', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid~="TooltipMenu__root"]' }))
        .click(context.webdriver.findElement({ css: 'body' }))
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'clickedOutside');
    });

    test('tabPress', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .sendKeys(Key.TAB)
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'tabPress');
    });

    test('enterPress', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .sendKeys(Key.TAB)
        .sendKeys(Key.ENTER)
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'enterPress');
    });

    test('escapePress', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .sendKeys(Key.TAB)
        .sendKeys(Key.ENTER)
        .sendKeys(Key.ESCAPE)
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'escapePress');
    });
  });

  story('MobileExampleHorizontalPaddings', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: null });

    test('opened', async (context) => {
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: '#test-element' }))
        .perform();
      await delay(200);
      await context.webdriver
        .actions({ bridge: true })
        .move({ origin: context.webdriver.findElement({ css: '[data-tid~="MenuItem__root"]' }) })
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'opened');
    });
  });
  story('WithItemsAndIcons', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'themes dont affect logic': { in: /^(?!\bchrome2022\b)/ } } });

    textAlignmentTests();
  });

  story('WithItemsAndIconsWithoutTextAlignment', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'themes dont affect logic': { in: /^(?!\bchrome2022\b)/ } } });

    textAlignmentTests();
  });
});
