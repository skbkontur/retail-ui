import { story, kind, test } from 'creevey';

import { delay } from '../../../lib/delay';
import { ToggleDataTids } from '../Toggle';
import { TooltipDataTids } from '../../Tooltip';

kind('Toggle', () => {
  story('Plain', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        flaky: { in: /chrome2022(Dark)?/, tests: ['pressed', 'clicked'] },
      },
    });

    test('plain', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'plain');
    });

    test('pressed', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .move({
          origin: context.webdriver.findElement({ css: `[data-tid="${ToggleDataTids.root}"]` }),
        })
        .press()
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'pressed');
    });

    test('clicked', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: `[data-tid="${ToggleDataTids.root}"]` }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'clicked');
    });
  });

  story('DisabledWithTooltip', () => {
    test('pressed', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .move({
          origin: context.webdriver.findElement({ css: `[data-tid="${TooltipDataTids.root}"]` }),
        })
        .press()
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'pressed');
    });
  });

  story('WithChildren', () => {
    test('plain', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'plain');
    });
  });

  story('WithLongDescription', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        flaky: { in: /chrome2022(Dark)?/, tests: 'clicked' },
      },
    });

    test('plain', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'plain');
    });

    test('clicked', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: `[data-tid="${ToggleDataTids.root}"]` }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'clicked');
    });
  });
});
