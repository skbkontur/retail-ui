import 'creevey/playwright';
import { kind, story, test } from 'creevey';
import type { Page } from 'playwright-core';

import { tid } from '../../__creevey__/helpers.mjs';

const waitForResizedTabIndicator = async (page: Page, containerTid: string, expanded = false) => {
  await page.waitForFunction(
    ({ containerTid, expanded }) => {
      const container = document.querySelector(`[data-tid~="${containerTid}"]`);
      const resizedTab = container?.querySelector('[data-tid~="Tab__root"]');
      const activeTab = container?.querySelector('[data-tid~="Tab__root"][data-visual-state-active]');
      const indicator = container?.querySelector('[data-tid~="Indicator__root"]');
      if (!resizedTab || !activeTab || !indicator) {
        return false;
      }
      // Wait for the content update before checking the indicator's geometry.
      if (resizedTab.textContent?.includes('Tab with dynamically expanded content') !== expanded) {
        return false;
      }
      const tabRect = activeTab.getBoundingClientRect();
      const indicatorRect = indicator.getBoundingClientRect();
      return (
        tabRect.width > 0 &&
        Math.abs(tabRect.left - indicatorRect.left) < 1 &&
        Math.abs(tabRect.width - indicatorRect.width) < 1
      );
    },
    { containerTid, expanded },
  );
};

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
  story('WithInternalTabSizeChange', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { chromeOnly: { in: /^(?!chrome2022$)/ } },
    });

    for (const [name, containerTid] of [
      ['resize active tab', 'ActiveTabResize'],
      ['resize previous tab', 'PreviousTabResize'],
    ]) {
      test(name, async (context) => {
        const page = context.webdriver;
        const toggle = page.locator(tid(containerTid)).getByRole('button', { name: 'Toggle', exact: true });
        await toggle.waitFor();
        await waitForResizedTabIndicator(page, containerTid);
        const initial = await context.takeScreenshot();

        await toggle.click();
        await page.mouse.move(0, 0);
        await waitForResizedTabIndicator(page, containerTid, true);
        const expanded = await context.takeScreenshot();

        await toggle.click();
        await page.mouse.move(0, 0);
        await waitForResizedTabIndicator(page, containerTid);
        const shrunk = await context.takeScreenshot();

        await context.matchImages({ initial, expanded, shrunk });
      });
    }
  });

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
