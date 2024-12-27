import { story, kind, test } from 'creevey';

import { delay } from '../../../lib/delay';

kind('Calendar', () => {
  story('CalendarWithMinMaxDate', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { "themes don't affect logic": { in: /^(?!\b(chrome2022|firefox2022)\b)/ } },
    });
    test('DateSelect months', async (context) => {
      await delay(1000);
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="Calendar"]' }))
        .pause(1000)
        .click(
          context.webdriver.findElement({
            css: '[data-tid="MonthView__month"]:first-child [data-tid="MonthView__headerMonth"] [data-tid="DateSelect__caption"]',
          }),
        )
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'DateSelect months');
    });

    test('DateSelect years', async (context) => {
      await delay(1000);
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="Calendar"]' }))
        .pause(1000)
        .click(
          context.webdriver.findElement({
            css: '[data-comp-name~="MonthView"]:first-child [data-tid="MonthView__headerYear"] [data-tid="DateSelect__caption"]',
          }),
        )
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'DateSelect years');
    });
  });

  story('ScrollsCalendarOnDateChange', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { "themes don't affect logic": { in: /^(?!\b(chrome2022|firefox2022)\b)/ } },
    });
    test('initial date', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'initial date');
    });

    test('scrolls to new date on date change', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid="change-date-button"]' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'scrolls to new date on date change');
    });
  });

  story('CalendarWithBottomSeparator', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        "themes don't affect the bottom separator": {
          in: /^(?!\b(chrome2022|chrome2022Dark|firefox2022|firefox2022Dark)\b)/,
        },
      },
    });
  });
});
