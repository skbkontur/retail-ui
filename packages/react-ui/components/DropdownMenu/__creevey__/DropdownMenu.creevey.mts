import { story, kind, test } from 'creevey';
import { Key } from 'selenium-webdriver';

import { delay } from '../../../lib/delay.mjs';

const outOfViewTests = (side: 'left' | 'right') => {
  test('out of viewport', async (context) => {
    if (side === 'left') {
      await context.webdriver.executeScript(function () {
        const container = window.document.querySelector('[data-tid="container"]') as HTMLElement;
        container.scrollLeft = container.scrollWidth;
      });
    }

    await context.webdriver
      .actions({
        bridge: true,
      })
      .click(context.webdriver.findElement({ css: '[data-tid="firstMenu"]' }))
      .perform();
    await delay(1000);

    await context.matchImage(await context.takeScreenshot(), 'out of viewport');
  });

  test('out of edge with min menu width', async (context) => {
    if (side === 'left') {
      await context.webdriver.executeScript(function () {
        const container = window.document.querySelector('[data-tid="container"]') as HTMLElement;
        container.scrollLeft = container.scrollWidth;
      });
    }

    await context.webdriver
      .actions({
        bridge: true,
      })
      .click(context.webdriver.findElement({ css: '[data-tid="secondMenu"]' }))
      .perform();
    await delay(1000);

    await context.matchImage(await context.takeScreenshot(), 'out of viewport with min menu width');
  });
};

const textAlignmentTests = () => {
  test('opened', async (context) => {
    await context.webdriver
      .actions({
        bridge: true,
      })
      .click(context.webdriver.findElement({ css: '[data-tid~="PopupMenu__caption"]' }))
      .perform();
    await delay(1000);
    await context.matchImage(await context.takeScreenshot(), 'opened');
  });
};

const navigateInNestedMenuItems = () => {
  test('navigate', async (context) => {
    await context.webdriver
      .actions({
        bridge: true,
      })
      .click(context.webdriver.findElement({ css: '[data-tid~="PopupMenu__caption"]' }))
      .sendKeys(Key.DOWN)
      .sendKeys(Key.DOWN)
      .perform();
    const arrowDown = await context.webdriver.takeScreenshot();
    await context.webdriver
      .actions({
        bridge: true,
      })
      .sendKeys(Key.ENTER)
      .perform();
    await delay(1000);
    const enter = await context.webdriver.takeScreenshot();
    await context.matchImages({ arrowDown, enter });
  });
};

kind('DropdownMenu', () => {
  story('SimpleExample', () => {
    test('plain', async (context) => {
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'plain');
    });

    test('clickAfterClickedOnCaption', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid~="PopupMenu__caption"]' }))
        .perform();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid~="PopupMenu__caption"]' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'clickAfterClickedOnCaption');
    });

    test('clicked', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid~="PopupMenu__caption"]' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'clicked');
    });

    test('tabPress', async (context) => {
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
        .sendKeys(Key.TAB)
        .perform();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .sendKeys(Key.ENTER)
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'enterPress');
    });

    test('escapePress', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .sendKeys(Key.TAB)
        .perform();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .sendKeys(Key.ENTER)
        .perform();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .sendKeys(Key.ESCAPE)
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'escapePress');
    });
  });

  story('CaptionWidth', () => {
    test('plain', async (context) => {
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'plain');
    });
  });

  story('WithHeaderAndFooter', () => {
    test('clicked', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid~="PopupMenu__caption"]' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.webdriver.takeScreenshot(), 'clicked');
    });

    test('scrolled by 100', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid~="PopupMenu__caption"]' }))
        .perform();
      await context.webdriver.executeScript(function () {
        const scrollContainer = window.document.querySelector('[data-tid~="ScrollContainer__inner"]') as HTMLElement;
        scrollContainer.scrollTop += 100;
      });
      await delay(2000);
      await context.matchImage(await context.webdriver.takeScreenshot(), 'scrolled by 100');
    });

    test('scrolled down to bottom', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid~="PopupMenu__caption"]' }))
        .perform();
      await context.webdriver.executeScript(function () {
        const scrollContainer = window.document.querySelector('[data-tid~="ScrollContainer__inner"]') as HTMLElement;
        scrollContainer.scrollTop += scrollContainer.scrollHeight;
      });
      await delay(1000);
      await context.matchImage(await context.webdriver.takeScreenshot(), 'scrolled down to bottom');
    });
  });

  story('MobileExampleWithHorizontalPadding', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: null });

    test('opened', async (context) => {
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: '[data-tid~="PopupMenu__root"]' }))
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
  story('MenuOutOfViewPortRight', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { flacky: { in: ['firefox2022', 'firefox2022Dark'] } },
    });
    outOfViewTests('right');
  });
  story('MenuOutOfViewPortLeft', () => {
    outOfViewTests('left');
  });

  story('WithItemsAndIcons', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'themes dont affect logic': { in: /^(?!\bchrome2022\b)/ } } });

    textAlignmentTests();
  });

  story('WithItemsAndIconsWithoutTextAlignment', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'themes dont affect logic': { in: /^(?!\bchrome2022\b)/ } } });

    textAlignmentTests();
  });

  story('WithNestedMenuItems', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'themes dont affect logic': { in: /^(?!\bchrome2022\b)/ } } });

    navigateInNestedMenuItems();
  });
});
