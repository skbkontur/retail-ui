import { story, kind, test } from 'creevey';
import 'creevey/playwright';

import { tid } from '../../__creevey__/helpers.mjs';

kind('RadioGroup', () => {
  story('Vertical', ({ setStoryParameters }) => {
    setStoryParameters({
      captureElement: '#RadioGroup-wrap',
      skip: {
        'hover does not work in chrome': {
          in: ['chrome2022', 'chrome2022Dark'],
          tests: ['hovered'],
        },
      },
    });

    test('plain', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'plain');
    });

    test('hovered', async (context) => {
      const page = context.webdriver;
      await page
        .locator(tid('RadioGroup__root') + ' > span > label')
        .first()
        .hover();
      await context.matchImage(await context.takeScreenshot(), 'hovered');
    });

    test('clicked', async (context) => {
      const page = context.webdriver;
      await page
        .locator(tid('RadioGroup__root') + ' > span > label')
        .first()
        .click();
      await context.matchImage(await context.takeScreenshot(), 'clicked');
    });

    test('mouseLeave', async (context) => {
      // NOTE Firefox bug if click send right after click from previous test it results as double click
      const page = context.webdriver;
      await page.waitForTimeout(500);
      await page
        .locator(tid('RadioGroup__root') + ' > span > label')
        .first()
        .click();
      await page.locator(tid('JustButton')).click();
      await context.matchImage(await context.takeScreenshot(), 'mouseLeave');
    });

    test('tabPress', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('JustButton')).click();
      await page.keyboard.press('Tab');
      await context.matchImage(await context.takeScreenshot(), 'tabPress');
    });

    test('arrow_down', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('JustButton')).click();
      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);
      await page.keyboard.press('ArrowDown');
      await context.matchImage(await context.takeScreenshot(), 'arrow_down');
    });
  });

  story('RemoveBaselineSpacer', ({ setStoryParameters }) => {
    setStoryParameters({
      captureElement: '#RemoveBaselineSpacer-wrap',
    });

    test('defaultState', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'defaultState');
    });
  });
});
