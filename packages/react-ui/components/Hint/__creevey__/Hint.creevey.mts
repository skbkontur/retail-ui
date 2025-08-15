import { story, kind, test } from 'creevey';

import { delay } from '../../../lib/delay.mjs';

kind('Hint', () => {
  story('SetManualAndOpenedPropOnClick', () => {
    test('click on hint', async (context) => {
      await context.webdriver
        .actions()
        .click(context.webdriver.findElement({ css: '#main' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.webdriver.takeScreenshot(), 'click on hint');
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
      await context.webdriver
        .actions()
        .move({
          origin: context.webdriver.findElement({ css: '[data-tid="icon"]' }),
        })
        .perform();
      await delay(1000);
      await context.matchImage(await context.webdriver.takeScreenshot(), 'open');
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
      await context.matchImage(await context.webdriver.takeScreenshot(), 'open');
    });
  });
});
