import { story, kind, test } from 'creevey';
import { Key } from 'selenium-webdriver';

import { delay } from '../../../lib/delay.mjs';

const clickedTest = () => {
  test('clicked', async (context) => {
    await context.webdriver
      .actions({
        bridge: true,
      })
      .click(context.webdriver.findElement({ css: '[data-tid~="Select__root"]' }))
      .perform();
    await delay(1000);
    await context.matchImage(await context.takeScreenshot(), 'clicked');
  });
};

const selectTests = () => {
  test('idle', async (context) => {
    await delay(1000);
    await context.matchImage(await context.takeScreenshot(), 'idle');
  });

  clickedTest();

  test('MenuItem hover', async (context) => {
    await context.webdriver
      .actions({
        bridge: true,
      })
      .click(context.webdriver.findElement({ css: '[data-tid~="Select__root"]' }))
      .perform();
    await context.webdriver
      .actions({
        bridge: true,
      })
      .move({
        origin: context.webdriver.findElement({ css: '[data-tid~="MenuItem__root"]' }),
      })
      .perform();
    await delay(1000);
    await context.matchImage(await context.takeScreenshot(), 'MenuItem hover');
  });

  test('selected item', async (context) => {
    await context.webdriver
      .actions({
        bridge: true,
      })
      .click(context.webdriver.findElement({ css: '[data-tid~="Select__root"]' }))
      .perform();
    await context.webdriver
      .actions({
        bridge: true,
      })
      .click(context.webdriver.findElement({ css: '[data-tid~="MenuItem__root"]' }))
      .perform();
    await delay(1000);
    await context.matchImage(await context.takeScreenshot(), 'selected item');
  });
};

kind('Select', () => {
  story('Simple', ({ setStoryParameters }) => {
    setStoryParameters({
      captureElement: '.dropdown-test-container',
      skip: {
        'hover does not work in chrome': { in: ['chrome2022', 'chrome2022Dark'], tests: ['MenuItem hover'] },
      },
    });

    selectTests();
  });

  story('MobileWithSearch', () => {
    clickedTest();
  });

  story('MobileWithTitle', () => {
    clickedTest();
  });

  story('MobileWithTitleAndSearch', () => {
    clickedTest();
  });

  story('MobileWithoutTitleAndSearch', () => {
    clickedTest();
  });

  story('UseLink', ({ setStoryParameters }) => {
    setStoryParameters({
      captureElement: '.dropdown-test-container',
      skip: {
        'hover does not work in chrome': { in: ['chrome2022', 'chrome2022Dark'], tests: ['MenuItem hover'] },
      },
    });

    selectTests();
  });

  story('UseLinkWithIcon', ({ setStoryParameters }) => {
    setStoryParameters({
      captureElement: '.dropdown-test-container',
      skip: {
        'hover does not work in chrome': { in: ['chrome2022', 'chrome2022Dark'], tests: ['MenuItem hover'] },
      },
    });

    selectTests();
  });

  story('WithTextOverflow', ({ setStoryParameters }) => {
    setStoryParameters({
      captureElement: '.dropdown-test-container',
      skip: {
        'hover does not work in chrome': { in: ['chrome2022', 'chrome2022Dark'], tests: ['MenuItem hover'] },
      },
    });

    selectTests();
  });

  story('UsingOnKeyDown', () => {
    test('press Enter', async (context) => {
      const element = await context.webdriver.findElement({ css: '.dropdown-test-container' });
      await context.webdriver
        .actions({
          bridge: true,
        })
        .sendKeys(Key.TAB)
        .sendKeys(Key.ENTER)
        .sendKeys(Key.ARROW_DOWN)
        .sendKeys(Key.ENTER)
        .perform();
      await delay(1000);
      await context.matchImage(await element.takeScreenshot(), 'press Enter');
    });
  });

  story('WithSearchAndVariousWidth', ({ setStoryParameters }) => {
    setStoryParameters({
      captureElement: '#test-element',
      skip: {
        flaky: { in: ['chrome2022', 'chrome2022Dark'] },
      },
    });

    test('search', async (context) => {
      const root = await context.webdriver.findElement({ css: '[data-tid="root"]' });
      const select = await context.webdriver.findElement({ css: '[data-tid~="Select__root"]' });
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(select)
        .pause(500)
        .perform();
      const plainSearch = await root.takeScreenshot();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .sendKeys(Key.ARROW_DOWN)
        .pause(500)
        .perform();
      const pressKeyDown = await root.takeScreenshot();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid~="Input__root"]' }))
        .sendKeys('test')
        .pause(500)
        .perform();
      const fullFieldSearch = await root.takeScreenshot();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(select)
        .click(select)
        .pause(500)
        .perform();
      const emptySearch = await root.takeScreenshot();
      await context.matchImages({ plainSearch, pressKeyDown, fullFieldSearch, emptySearch });
    });

    test('and various width', async (context) => {
      const root = await context.webdriver.findElement({ css: '[data-tid="root"]' });
      await context.webdriver
        .actions({ bridge: true })
        .click(await context.webdriver.findElement({ css: '[data-tid="w100px"]' }))
        .pause(500)
        .perform();
      const w100px = await root.takeScreenshot();
      await context.webdriver
        .actions({ bridge: true })
        .click(await context.webdriver.findElement({ css: '[data-tid="w300px"]' }))
        .pause(500)
        .perform();
      const w300px = await root.takeScreenshot();
      await context.webdriver
        .actions({ bridge: true })
        .click(await context.webdriver.findElement({ css: '[data-tid="w100prc"]' }))
        .pause(500)
        .perform();
      const w100prc = await root.takeScreenshot();
      await context.matchImages({ w100px, w300px, w100prc });
    });
  });

  story('WithMenuAlignAndVariousWidth', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'no themes': { in: /^(?!\b(chrome)\b)/ } } });

    test('open', async (context) => {
      const root = await context.webdriver.findElement({ css: '#test-element' });
      await delay(1000);
      await context.matchImage(await root.takeScreenshot());
    });
  });

  story('WithManualPosition', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'no themes': { in: /^(?!\b(chrome2022|firefox2022)\b)/ } } });

    test('opened top with portal', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid~="Select__root"]' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'opened top with portal');
    });

    test('opened bottom with portal', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid~="pos"]' }))
        .pause(1000)
        .click(context.webdriver.findElement({ css: '[data-tid~="Select__root"]' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'opened bottom with portal');
    });

    test('opened top without portal', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid~="portal"]' }))
        .pause(1000)
        .click(context.webdriver.findElement({ css: '[data-tid~="Select__root"]' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'opened top without portal');
    });

    test('opened bottom without portal', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid~="portal"]' }))
        .pause(1000)
        .click(context.webdriver.findElement({ css: '[data-tid~="pos"]' }))
        .pause(1000)
        .click(context.webdriver.findElement({ css: '[data-tid~="Select__root"]' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'opened bottom without portal');
    });
  });

  story('Size', () => {
    test('ClickedAll', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid="open-all"]' }))
        .pause(500)
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'ClickedAll');
    });
  });
});
