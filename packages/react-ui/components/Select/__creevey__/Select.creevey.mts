import { story, kind, test } from 'creevey';
import 'creevey/playwright';

import { tid } from '../../__creevey__/helpers.mjs';

const clickedTest = () => {
  test('clicked', async (context) => {
    const page = context.webdriver;
    await page.locator(tid('Select__root')).click();
    await page.waitForTimeout(1000);
    await context.matchImage(await context.takeScreenshot(), 'clicked');
  });
};

const selectTests = () => {
  test('idle', async (context) => {
    const page = context.webdriver;
    await page.waitForTimeout(1000);
    await context.matchImage(await context.takeScreenshot(), 'idle');
  });

  clickedTest();

  test('MenuItem hover', async (context) => {
    const page = context.webdriver;
    await page.locator(tid('Select__root')).click();
    await page.locator(tid('MenuItem__root')).first().hover();
    await page.waitForTimeout(1000);
    await context.matchImage(await context.takeScreenshot(), 'MenuItem hover');
  });

  test('selected item', async (context) => {
    const page = context.webdriver;
    await page.locator(tid('Select__root')).click();
    await page.locator(tid('MenuItem__root')).first().click();
    await page.waitForTimeout(1000);
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
      const page = context.webdriver;
      const element = page.locator('.dropdown-test-container');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(1000);
      await context.matchImage(await element.screenshot(), 'press Enter');
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
      const page = context.webdriver;
      const root = await page.locator(tid('root'));
      const select = await page.locator(tid('Select__root'));
      await select.click();
      await page.waitForTimeout(500);
      const plainSearch = await root.screenshot();
      await page.keyboard.press('ArrowDown');
      await page.waitForTimeout(500);
      const pressKeyDown = await root.screenshot();
      await page.locator(tid('Input__root')).click();
      await page.keyboard.type('test');
      await page.waitForTimeout(500);
      const fullFieldSearch = await root.screenshot();
      await select.click();
      await select.click();
      await page.waitForTimeout(500);
      const emptySearch = await root.screenshot();
      await context.matchImages({ plainSearch, pressKeyDown, fullFieldSearch, emptySearch });
    });

    test('and various width', async (context) => {
      const page = context.webdriver;
      const root = await page.locator(tid('root'));
      await page.locator(tid('w100px')).click();
      await page.waitForTimeout(500);
      const w100px = await root.screenshot();
      await page.locator(tid('w300px')).click();
      await page.waitForTimeout(500);
      const w300px = await root.screenshot();
      await page.locator(tid('w100prc')).click();
      await page.waitForTimeout(500);
      const w100prc = await root.screenshot();
      await context.matchImages({ w100px, w300px, w100prc });
    });
  });

  story('WithMenuAlignAndVariousWidth', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'no themes': { in: /^(?!\b(chrome)\b)/ } } });

    test('open', async (context) => {
      const page = context.webdriver;
      await page.locator('#test-element').click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot());
    });
  });

  story('WithManualPosition', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'no themes': { in: /^(?!\b(chrome2022|firefox2022)\b)/ } } });

    test('opened top with portal', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('Select__root')).click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'opened top with portal');
    });

    test('opened bottom with portal', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('pos')).click();
      await page.waitForTimeout(1000);
      await page.locator(tid('Select__root')).click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'opened bottom with portal');
    });

    test('opened top without portal', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('portal')).click();
      await page.waitForTimeout(1000);
      await page.locator(tid('Select__root')).click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'opened top without portal');
    });

    test('opened bottom without portal', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('portal')).click();
      await page.waitForTimeout(1000);
      await page.locator(tid('pos')).click();
      await page.waitForTimeout(1000);
      await page.locator(tid('Select__root')).click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'opened bottom without portal');
    });
  });

  story('Size', () => {
    test('ClickedAll', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('open-all')).click();
      await page.waitForTimeout(500);
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'ClickedAll');
    });
  });
});
