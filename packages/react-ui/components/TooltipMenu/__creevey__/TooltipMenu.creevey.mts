import { story, kind, test } from 'creevey';
import 'creevey/playwright';

import { tid } from '../../__creevey__/helpers.mjs';

const textAlignmentTests = () => {
  test('opened', async (context) => {
    const page = context.webdriver;
    await page.locator(tid('PopupMenu__caption')).click();
    await page.waitForTimeout(1000);
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
      const page = context.webdriver;
      await page.locator(tid('TooltipMenu__root')).click();
      await page.locator(tid('TooltipMenu__root')).click();
      await context.matchImage(await context.takeScreenshot(), 'clickAfterClickedOnCaption');
    });

    test('clicked', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('TooltipMenu__root')).click();
      await context.matchImage(await context.takeScreenshot(), 'clicked');
    });

    test('clickedOutside', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('TooltipMenu__root')).click();
      await page.locator('body').click();
      await context.matchImage(await context.takeScreenshot(), 'clickedOutside');
    });

    test('tabPress', async (context) => {
      const page = context.webdriver;
      await page.keyboard.press('Tab');
      await context.matchImage(await context.takeScreenshot(), 'tabPress');
    });

    test('enterPress', async (context) => {
      const page = context.webdriver;
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await context.matchImage(await context.takeScreenshot(), 'enterPress');
    });

    test('escapePress', async (context) => {
      const page = context.webdriver;
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.keyboard.press('Escape');
      await context.matchImage(await context.takeScreenshot(), 'escapePress');
    });
  });

  story('MobileExampleHorizontalPaddings', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: null });

    test('opened', async (context) => {
      const page = context.webdriver;
      await page.locator('#test-element').click();
      await page.waitForTimeout(200);
      await page.locator(tid('MenuItem__root')).first().hover();
      await page.waitForTimeout(1000);
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
