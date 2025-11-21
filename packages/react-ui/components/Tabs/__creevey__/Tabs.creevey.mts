import { story, kind, test } from 'creevey';
import 'creevey/playwright';

import { tid } from '../../__creevey__/helpers.mjs';

const tabsSimpleTests = () => {
  test('move focus forward', async (context) => {
    const page = context.webdriver;
    await page.locator(tid('Tab__root')).nth(0).click();
    await page.waitForTimeout(500);
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(500);
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(500);
    await context.matchImage(await context.takeScreenshot(), 'move focus forward');
  });
  test('move focus backward', async (context) => {
    const page = context.webdriver;
    await page.locator(tid('Tab__root')).nth(2).click();
    await page.waitForTimeout(500);
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(500);
    await page.keyboard.press('ArrowUp');
    await page.waitForTimeout(500);
    await context.matchImage(await context.takeScreenshot(), 'move focus backward');
  });
  test('reset focus after click', async (context) => {
    const page = context.webdriver;
    await page.locator(tid('Tab__root')).nth(0).click();
    await page.waitForTimeout(500);
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(500);
    await page.locator(tid('Tab__root')).nth(2).click();
    await page.waitForTimeout(500);
    await context.matchImage(await context.takeScreenshot(), 'reset focus after click');
  });
};
const tabsTests = () => {
  test('plain', async (context) => {
    await context.matchImage(await context.takeScreenshot(), 'plain');
  });

  test('hovered', async (context) => {
    const page = context.webdriver;
    await page.locator(tid('Tab__root')).nth(1).hover();
    await page.waitForTimeout(500);
    await context.matchImage(await context.takeScreenshot(), 'hovered');
  });

  test('clicked', async (context) => {
    const page = context.webdriver;
    await page.locator(tid('Tab__root')).nth(1).click();
    await page.waitForTimeout(500);
    await context.matchImage(await context.takeScreenshot(), 'clicked');
  });

  test('mouseLeave', async (context) => {
    const page = context.webdriver;
    await page.locator(tid('Tab__root')).nth(1).click();
    await page.locator('body').hover();
    await page.waitForTimeout(500);
    await context.matchImage(await context.takeScreenshot(), 'mouseLeave');
  });

  test('focused', async (context) => {
    const page = context.webdriver;
    await page.locator(tid('Tab__root')).nth(1).click();
    await page.locator('body').hover();
    await page.locator(tid('Tab__root')).nth(1).click();
    await page.waitForTimeout(500);
    await context.matchImage(await context.takeScreenshot(), 'focused');
  });

  test('tabPress', async (context) => {
    const page = context.webdriver;
    await page.locator(tid('Tab__root')).nth(1).click();
    await page.waitForTimeout(500);
    await page.keyboard.press('Tab');
    await page.waitForTimeout(500);
    await context.matchImage(await context.takeScreenshot(), 'tabPress');
  });

  test('enterPress', async (context) => {
    const page = context.webdriver;
    await page.locator(tid('Tab__root')).nth(1).click();
    await page.waitForTimeout(500);
    await page.keyboard.press('Tab');
    await page.waitForTimeout(500);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);
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
