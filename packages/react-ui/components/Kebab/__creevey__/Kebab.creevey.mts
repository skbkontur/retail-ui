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

const kebabTests = () => {
  test('plain', async (context) => {
    await context.matchImage(await context.takeScreenshot(), 'plain');
  });

  test('hovered', async (context) => {
    const page = context.webdriver;
    await page.locator(tid('Kebab__caption')).hover();
    await context.matchImage(await context.takeScreenshot(), 'hovered');
  });

  test('clicked', async (context) => {
    const page = context.webdriver;
    await page.locator(tid('Kebab__caption')).click();
    await context.matchImage(await context.takeScreenshot(), 'clicked');
  });

  test('clickedOnButton2ndTime', async (context) => {
    const page = context.webdriver;
    await page.locator(tid('Kebab__caption')).click();
    await page.locator(tid('Kebab__caption')).click();
    await context.matchImage(await context.takeScreenshot(), 'clickedOnButton2ndTime');
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
      const page = context.webdriver;
      await page.locator(tid('Kebab__caption')).click();
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
