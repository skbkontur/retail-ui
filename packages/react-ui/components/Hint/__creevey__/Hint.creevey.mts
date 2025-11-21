import { story, kind, test } from 'creevey';
import 'creevey/playwright';

import { tid } from '../../__creevey__/helpers.mjs';

kind('Hint', () => {
  story('SetManualAndOpenedPropOnClick', () => {
    test('click on hint', async (context) => {
      const page = context.webdriver;
      await page.locator('#main').click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'click on hint');
    });
  });

  story('WithSVGIcon', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'internal logic being tested and not something UI related': {
          in: [
            'chromeDark',
            'chrome8px',
            'firefox8px',
            'firefox',
            'firefoxFlat8px',
            'firefoxDark',
            'ie118px',
            'ie11',
            'ie11Dark',
          ],
        },
      },
    });

    test('idle', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'idle');
    });

    test('hover', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('icon')).hover();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'open');
    });
  });
  story('top bottom center', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { "themes don't affect logic": { in: /^(?!\bchrome2022\b)/ } },
    });
  });
  story('HintNearScreenEdge', ({ setStoryParameters }) => {
    setStoryParameters({
      captureElement: 'body',
      skip: { 'no themes': { in: /^(?!\b(chrome2022|firefox2022)\b)/ } },
    });
  });

  story('HintWithoutPortal', () => {
    test('opened', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'open');
    });
  });
});
