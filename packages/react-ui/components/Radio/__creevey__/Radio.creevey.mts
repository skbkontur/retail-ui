import 'creevey/playwright';
import { kind, story, test } from 'creevey';

import { tid } from '../../__creevey__/helpers.mjs';

kind('Radio', () => {
  story('Highlighted', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        flaky: { in: /firefox/ },
      },
    });

    test('plain', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'plain');
    });

    test('tabPress', async (context) => {
      const page = context.webdriver;
      await page.locator('body').click();
      await page.keyboard.press('Tab');
      await page.waitForTimeout(500);
      await context.matchImage(await context.takeScreenshot(), 'tabPress');
    });
  });

  story('CheckedPropInRadioGroup', ({ setStoryParameters }) => {
    setStoryParameters({
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
      await page.locator(tid('Radio__root')).nth(1).hover();
      await page.waitForTimeout(500);
      await context.matchImage(await context.takeScreenshot(), 'hovered');
    });
  });
});
