import { story, kind, test } from 'creevey';
import { Key } from 'selenium-webdriver';

import { delay } from '../../../lib/delay';

kind('TokenInput', () => {
  story('EmptyWithReference', ({ setStoryParameters }) => {
    setStoryParameters({
      captureElement: '.tokens-test-container',
      skip: {
        'do not pass on teamcity': {
          in: ['firefox', 'firefox8px', 'firefoxFlat8px', 'firefoxDark', 'firefox2022', 'firefox2022Dark'],
          tests: ['clicked', 'withMenu'],
        },
      },
    });

    test('idle', async (context) => {
      await delay(100);
      await context.matchImage(await context.takeScreenshot(), 'idle');
    });

    test('clicked', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="TokenInput"]' }))
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'clicked');
    });

    test('withMenu', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="TokenInput"]' }))
        .sendKeys('a')
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'withMenu');
    });
  });

  story('EmptyCombined', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'flaky tests': { in: /firefox/ },
      },
    });

    test('selectFirst', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="TokenInput"]' }))
        .sendKeys('a')
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), );
    });
  });

  story('CombinedFilled', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'do not pass on teamcity': { in: ['firefox2022', 'firefox2022Dark'], tests: ['editToken'] },
        flaky: { in: /firefox/, tests: ['selectAndType', 'editToken'] },
      },
    });

    test('selectAndType', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="Token"]' }))
        .perform();
      const selected = await context.takeScreenshot();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .sendKeys('a')
        .perform();
      const typed = await context.takeScreenshot();
      await context.matchImages({ selected, typed });
    });

    test('editToken', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .doubleClick(context.webdriver.findElement({ css: '[data-comp-name~="Token"]' }))
        .perform();
      const doubleClickOnToken = await context.takeScreenshot();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="MenuItem"]' }))
        .perform();
      const clickOnMenuItem = await context.takeScreenshot();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .sendKeys(Key.ENTER)
        .perform();
      const enterOnActiveToken = await context.takeScreenshot();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .sendKeys('EDITED')
        .perform();
      const editToken = await context.takeScreenshot();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .sendKeys(Key.ENTER)
        .perform();
      const enterAfterEdit = await context.takeScreenshot();
      await context.matchImages({
        doubleClickOnToken,
        clickOnMenuItem,
        enterOnActiveToken,
        editToken,
        enterAfterEdit,
      });
    });
  });

  story('CustomAddButton', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'do not pass on teamcity': {
          in: ['firefox', 'firefox8px', 'firefoxFlat8px', 'firefoxDark', 'firefox2022', 'firefox2022Dark'],
          tests: ['addButton'],
        },
      },
    });

    test('addButton', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="TokenInput"]' }))
        .sendKeys('zzz')
        .perform();
      await context.matchImage(await context.takeScreenshot(), );
    });
  });

  story('OnUnexpectedInputValidation', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        flacky: {
          in: ['firefox', 'firefox8px', 'firefoxFlat8px', 'firefoxDark', 'firefox2022', 'firefox2022Dark'],
          tests: ['token select', 'token edit'],
        },
      },
    });

    test('token select', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="TokenInput"]' }))
        .pause(1000)
        .sendKeys('aaa')
        .pause(1000)
        .move({ x: 0, y: 0 })
        .click()
        .pause(1000)
        .perform();
      const withNotSelectedToken = await context.takeScreenshot();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="TokenInput"]' }))
        .sendKeys(Key.BACK_SPACE)
        .sendKeys(Key.BACK_SPACE)
        .sendKeys(Key.BACK_SPACE)
        .sendKeys(Key.BACK_SPACE)
        .sendKeys(Key.BACK_SPACE)
        .sendKeys('aaaccc')
        .move({ x: 0, y: 0 })
        .click()
        .perform();
      const withAutoSelectedTokens = await context.takeScreenshot();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="TokenInput"]' }))
        .pause(1000)
        .sendKeys('clear')
        .move({ x: 0, y: 0 })
        .click()
        .perform();
      await delay(1000);
      const clearedOnNullReturn = await context.takeScreenshot();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .clear();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="TokenInput"]' }))
        .sendKeys(Key.BACK_SPACE)
        .sendKeys(Key.BACK_SPACE)
        .sendKeys(Key.BACK_SPACE)
        .sendKeys('aaa')
        .sendKeys(Key.ENTER)
        .pause(1000)
        .sendKeys('bbb')
        .sendKeys(Key.ENTER)
        .move({ x: 0, y: 0 })
        .click()
        .perform();
      const withSelectedTokens = await context.takeScreenshot();
      await context.matchImages({
        withNotSelectedToken,
        withAutoSelectedTokens,
        clearedOnNullReturn,
        withSelectedTokens,
      });
    });

    test('token edit', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="TokenInput"]' }))
        .pause(300)
        .sendKeys('aaa')
        .pause(300)
        .sendKeys(Key.ENTER)
        .pause(300)
        .sendKeys('bbb')
        .pause(300)
        .sendKeys(Key.ENTER)
        .pause(300)
        .perform();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .doubleClick(context.webdriver.findElement({ css: '[data-comp-name~="Token"]' }))
        .pause(1000)
        .sendKeys('aaa')
        .pause(300)
        .move({ x: 0, y: 0 })
        .click()
        .pause(300)
        .perform();
      const withSameValue = await context.takeScreenshot();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .doubleClick(context.webdriver.findElement({ css: '[data-comp-name~="Token"]' }))
        .pause(1000)
        .sendKeys('zzz')
        .pause(300)
        .move({ x: 0, y: 0 })
        .click()
        .pause(300)
        .perform();
      const withNotEditedToken = await context.takeScreenshot();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .doubleClick(context.webdriver.findElement({ css: '[data-comp-name~="Token"]' }))
        .pause(1000)
        .sendKeys(Key.BACK_SPACE)
        .sendKeys(Key.BACK_SPACE)
        .sendKeys(Key.BACK_SPACE)
        .sendKeys(Key.BACK_SPACE)
        .sendKeys(Key.BACK_SPACE)
        .sendKeys('clear')
        .pause(300)
        .move({ x: 0, y: 0 })
        .click()
        .pause(300)
        .perform();
      const withRemovedToken = await context.takeScreenshot();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .doubleClick(context.webdriver.findElement({ css: '[data-comp-name~="Token"]' }))
        .pause(1000)
        .sendKeys('EDITED')
        .pause(300)
        .sendKeys(Key.ARROW_DOWN)
        .sendKeys(Key.ENTER)
        .pause(300)
        .move({ x: 0, y: 0 })
        .click()
        .pause(300)
        .perform();
      const withEditedToken = await context.takeScreenshot();
      await context.matchImages({ withSameValue, withNotEditedToken, withRemovedToken, withEditedToken });
    });
  });

  story('FullWidthMenu', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'do not pass on teamcity': {
          in: ['firefox', 'firefox8px', 'firefoxFlat8px', 'firefoxDark', 'firefox2022', 'firefox2022Dark'],
          tests: ['selectFirst'],
        },
      },
    });

    test('selectFirst', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="TokenInput"]' }))
        .sendKeys('a')
        .perform();
      await context.matchImage(await context.takeScreenshot(), );
    });
  });

  story('CustomRenderTotalCount', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'do not pass on teamcity': {
          in: ['firefox', 'firefox8px', 'firefoxFlat8px', 'firefoxDark', 'firefox2022', 'firefox2022Dark'],
          tests: ['renderTotalCount'],
        },
      },
    });

    test('renderTotalCount', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="TokenInput"]' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), );
    });
  });

  story('WithPlaceholderAndWidth', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        flaky: { in: /firefox/, tests: ['selected'] },
      },
    });
    test('idle', async (context) => {
      await context.matchImage(await context.takeScreenshot(), );
    });

    test('selected', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="TokenInput"]' }))
        .pause(500)
        .sendKeys('a')
        .perform();
      await delay(1000);
      await context.webdriver
        .actions({
          bridge: true,
        })

        .click(context.webdriver.findElement({ css: '[data-comp-name~="MenuItem"]' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), );
    });
  });

  story('Size', ({ setStoryParameters }) => {
    setStoryParameters({
      captureElement: '[data-tid="Gapped__vertical"]',
    });

    test('MenuItem inherits size', async (context) => {
      await context.webdriver.actions({ bridge: true }).keyDown(Key.TAB).perform();
      const tab1 = await context.takeScreenshot();

      await context.webdriver.actions({ bridge: true }).keyDown(Key.TAB).perform();
      const tab2 = await context.takeScreenshot();

      await context.webdriver.actions({ bridge: true }).keyDown(Key.TAB).perform();
      const tab3 = await context.takeScreenshot();

      await context.matchImages({ tab1, tab2, tab3 });
    });
  });
});
