import { story, kind, test } from 'creevey';
import { Key } from 'selenium-webdriver';

import { delay } from '../../../lib/delay.mjs';

const tabsSimpleTests = () => {
  test('move focus forward', async (context) => {
    await context.webdriver
      .actions({
        bridge: true,
      })
      .click(context.webdriver.findElement({ css: '[data-tid~="Tab__root"]:nth-child(1)' }))
      .perform();
    await context.webdriver
      .actions({
        bridge: true,
      })
      .sendKeys(Key.ARROW_RIGHT)
      .pause(500)
      .sendKeys(Key.ARROW_DOWN)
      .perform();
    await context.matchImage(await context.takeScreenshot(), 'move focus forward');
  });
  test('move focus backward', async (context) => {
    await context.webdriver
      .actions({
        bridge: true,
      })
      .click(context.webdriver.findElement({ css: '[data-tid~="Tab__root"]:nth-child(3)' }))
      .perform();
    await delay(1000);
    await context.webdriver
      .actions({
        bridge: true,
      })
      .sendKeys(Key.ARROW_LEFT)
      .perform();
    await delay(1000);
    await context.webdriver
      .actions({
        bridge: true,
      })
      .sendKeys(Key.ARROW_UP)
      .perform();
    await context.matchImage(await context.takeScreenshot(), 'move focus backward');
  });
  test('reset focus after click', async (context) => {
    await context.webdriver
      .actions({
        bridge: true,
      })
      .click(context.webdriver.findElement({ css: '[data-tid~="Tab__root"]:nth-child(1)' }))
      .perform();
    await context.webdriver
      .actions({
        bridge: true,
      })
      .sendKeys(Key.ARROW_RIGHT)
      .pause(500)
      .click(context.webdriver.findElement({ css: '[data-tid~="Tab__root"]:nth-child(3)' }))
      .perform();
    await context.matchImage(await context.takeScreenshot(), 'reset focus after click');
  });
};
const tabsTests = () => {
  test('plain', async (context) => {
    await context.matchImage(await context.takeScreenshot(), 'plain');
  });

  test('hovered', async (context) => {
    await context.webdriver
      .actions({
        bridge: true,
      })
      .move({
        origin: context.webdriver.findElement({ css: '[data-tid~="Tab__root"]:nth-child(2)' }),
      })
      .perform();
    await context.matchImage(await context.takeScreenshot(), 'hovered');
  });

  test('clicked', async (context) => {
    await context.webdriver
      .actions({
        bridge: true,
      })
      .click(context.webdriver.findElement({ css: '[data-tid~="Tab__root"]:nth-child(2)' }))
      .perform();
    await context.matchImage(await context.takeScreenshot(), 'clicked');
  });

  test('mouseLeave', async (context) => {
    await context.webdriver
      .actions({
        bridge: true,
      })
      .click(context.webdriver.findElement({ css: '[data-tid~="Tab__root"]:nth-child(2)' }))
      .move({
        origin: context.webdriver.findElement({ css: 'body' }),
      })
      .perform();
    await context.matchImage(await context.takeScreenshot(), 'mouseLeave');
  });

  test('focused', async (context) => {
    await context.webdriver
      .actions({
        bridge: true,
      })
      .click(context.webdriver.findElement({ css: '[data-tid~="Tab__root"]:nth-child(2)' }))
      .move({
        origin: context.webdriver.findElement({ css: 'body' }),
      })
      .click(context.webdriver.findElement({ css: '[data-tid~="Tab__root"]:nth-child(2)' }))
      .perform();
    await context.matchImage(await context.takeScreenshot(), 'focused');
  });

  test('tabPress', async (context) => {
    await context.webdriver
      .actions({
        bridge: true,
      })
      .click(context.webdriver.findElement({ css: '[data-tid~="Tab__root"]:nth-child(2)' }))
      .perform();
    await delay(1000);
    await context.webdriver
      .actions({
        bridge: true,
      })
      .sendKeys(Key.TAB)
      .perform();
    await delay(1000);
    await context.matchImage(await context.takeScreenshot(), 'tabPress');
  });

  test('enterPress', async (context) => {
    await context.webdriver
      .actions({
        bridge: true,
      })
      .click(context.webdriver.findElement({ css: '[data-tid~="Tab__root"]:nth-child(2)' }))
      .perform();
    await delay(1000);
    await context.webdriver
      .actions({
        bridge: true,
      })
      .sendKeys(Key.TAB)
      .perform();
    await delay(1000);
    await context.webdriver
      .actions({
        bridge: true,
      })
      .sendKeys(Key.ENTER)
      .perform();
    await delay(1000);
    await context.matchImage(await context.takeScreenshot(), 'enterPress');
  });
};

kind('Tabs', () => {
  story('WithDisabledTab', () => {
    tabsTests();
  });
  story('Simple', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'hover does not work in chrome': {
          in: ['chrome2022', 'chrome2022Dark'],
          tests: ['hovered'],
        },
      },
    });

    tabsTests();
    tabsSimpleTests();
  });
  story('SimpleMedium', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'hover does not work in chrome': {
          in: ['chrome2022', 'chrome2022Dark'],
          tests: ['hovered'],
        },
      },
    });

    tabsTests();
    tabsSimpleTests();
  });
  story('SimpleSmall', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'hover does not work in chrome': {
          in: ['chrome2022', 'chrome2022Dark'],
          tests: ['hovered'],
        },
      },
    });

    tabsTests();
    tabsSimpleTests();
  });
  story('Vertical', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'hover does not work in chrome': {
          in: ['chrome2022', 'chrome2022Dark'],
          tests: ['hovered', 'enterPress'],
        },
      },
    });
    tabsTests();
  });
  story('VerticalMedium', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'hover does not work in chrome': {
          in: ['chrome2022', 'chrome2022Dark'],
          tests: ['hovered', 'enterPress'],
        },
      },
    });
    tabsTests();
  });
  story('VerticalSmall', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'hover does not work in chrome': {
          in: ['chrome2022', 'chrome2022Dark'],
          tests: ['hovered', 'enterPress'],
        },
      },
    });
    tabsTests();
  });
});
