import { story, kind, test } from 'creevey';
import { Key } from 'selenium-webdriver';

import { PopupMenuDataTids } from '../../../internal/PopupMenu/tids';
import { delay } from '../../../lib/delay';
const textAlignmentTests = () => {
  test('opened', async (context) => {
    await context.webdriver
      .actions({
        bridge: true,
      })
      .click(context.webdriver.findElement({ css: `[data-tid~="${PopupMenuDataTids.caption}"]` }))
      .perform();
    await delay(1000);
    await context.matchImage(await context.takeScreenshot(), 'opened');
  });
};

const kebabTests = () => {
  test('plain', async (context) => {
    await context.matchImage(await context.takeScreenshot(), 'plain');
  });

  test('hovered', async (context) => {
    await context.webdriver
      .actions({
        bridge: true,
      })
      .move({
        origin: context.webdriver.findElement({ css: '[data-comp-name~="Kebab"]' }),
      })
      .perform();
    await context.matchImage(await context.takeScreenshot(), 'hovered');
  });

  test('clicked', async (context) => {
    await context.webdriver
      .actions({
        bridge: true,
      })
      .click(context.webdriver.findElement({ css: '[data-comp-name~="Kebab"]' }))
      .perform();
    await context.matchImage(await context.takeScreenshot(), 'clicked');
  });

  test('clickedOnButton2ndTime', async (context) => {
    await context.webdriver
      .actions({
        bridge: true,
      })
      .click(context.webdriver.findElement({ css: '[data-comp-name~="Kebab"]' }))
      .click(context.webdriver.findElement({ css: '[data-comp-name~="Kebab"]' }))
      .perform();
    await context.matchImage(await context.takeScreenshot(), 'clickedOnButton2ndTime');
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
};

kind('Kebab', () => {
  story('Small', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'hover does not work in chrome': {
          in: ['chrome2022', 'chrome2022Dark'],
          tests: ['hovered', 'clickedOnButton2ndTime'],
        },
      },
    });

    kebabTests();
  });

  story('Medium', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'hover does not work in chrome': {
          in: ['chrome2022', 'chrome2022Dark'],
          tests: ['hovered', 'clickedOnButton2ndTime'],
        },
      },
    });

    kebabTests();
  });

  story('Large', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'hover does not work in chrome': {
          in: ['chrome2022', 'chrome2022Dark'],
          tests: ['hovered', 'clickedOnButton2ndTime'],
        },
      },
    });

    kebabTests();
  });

  story('MobileExampleWithHorizontalPadding', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: null });

    test('opened', async (context) => {
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="Kebab"]' }))
        .perform();
      await delay(200);
      await context.webdriver
        .actions({ bridge: true })
        .move({ origin: context.webdriver.findElement({ css: '[data-comp-name~="MenuItem"]' }) })
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
