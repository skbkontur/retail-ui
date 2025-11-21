import { story, kind, test } from 'creevey';
import 'creevey/playwright';

import { tid } from '../../__creevey__/helpers.mjs';

const outOfViewTests = (side: 'left' | 'right') => {
  test('out of viewport', async (context) => {
    const page = context.webdriver;
    await page.locator(tid('firstMenu')).click();
    await page.waitForTimeout(1000);

    if (side === 'left') {
      const container = page.locator(tid('container'));
      await container.evaluate((element) => (element.scrollLeft = element.scrollWidth));
    }

    await context.matchImage(await context.takeScreenshot(), 'out of viewport');
  });

  test('out of edge with min menu width', async (context) => {
    const page = context.webdriver;
    await page.locator(tid('secondMenu')).click();
    await page.waitForTimeout(1000);

    if (side === 'left') {
      const container = page.locator(tid('container'));
      await container.evaluate((element) => (element.scrollLeft = element.scrollWidth));
    }

    await context.matchImage(await context.takeScreenshot(), 'out of viewport with min menu width');
  });
};

const textAlignmentTests = () => {
  test('opened', async (context) => {
    const page = context.webdriver;
    await page.locator(tid('PopupMenu__caption')).click();
    await page.waitForTimeout(1000);
    await context.matchImage(await context.takeScreenshot(), 'opened');
  });
};

const navigateInNestedMenuItems = () => {
  test('navigate', async (context) => {
    const page = context.webdriver;
    await page.locator(tid('PopupMenu__caption')).click();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    const arrowDown = await context.takeScreenshot();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1000);
    const enter = await context.takeScreenshot();
    await context.matchImages({ arrowDown, enter });
  });
};

kind('DropdownMenu', () => {
  story('SimpleExample', () => {
    test('plain', async (context) => {
      const page = context.webdriver;
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'plain');
    });

    test('clickAfterClickedOnCaption', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('PopupMenu__caption')).click();
      await page.locator(tid('PopupMenu__caption')).click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'clickAfterClickedOnCaption');
    });

    test('clicked', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('PopupMenu__caption')).click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'clicked');
    });

    test('tabPress', async (context) => {
      const page = context.webdriver;
      await page.keyboard.press('Tab');
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'tabPress');
    });

    test('enterPress', async (context) => {
      const page = context.webdriver;
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'enterPress');
    });

    test('escapePress', async (context) => {
      const page = context.webdriver;
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.keyboard.press('Escape');
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'escapePress');
    });
  });

  story('CaptionWidth', () => {
    test('plain', async (context) => {
      const page = context.webdriver;
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'plain');
    });
  });

  story('WithHeaderAndFooter', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: null });

    test('clicked', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('PopupMenu__caption')).click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'clicked');
    });

    test('scrolled by 100', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('PopupMenu__caption')).click();
      await page.evaluate(() => {
        const scrollContainer = window.document.querySelector('[data-tid~="ScrollContainer__inner"]') as HTMLElement;
        scrollContainer.scrollTop += 100;
      });
      await page.waitForTimeout(2000);
      await context.matchImage(await context.takeScreenshot(), 'scrolled by 100');
    });

    test('scrolled down to bottom', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('PopupMenu__caption')).click();
      await page.evaluate(() => {
        const scrollContainer = window.document.querySelector('[data-tid~="ScrollContainer__inner"]') as HTMLElement;
        scrollContainer.scrollTop += scrollContainer.scrollHeight;
      });
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'scrolled down to bottom');
    });
  });

  story('MobileExampleWithHorizontalPadding', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: null });

    test('opened', async (context) => {
      const page = context.webdriver;
      await page.locator('[data-tid~="PopupMenu__root"]').click();
      await page.waitForTimeout(200);
      await page.locator('[data-tid~="MenuItem__root"]').first().hover();
      await page.waitForTimeout(1000);
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
