import { story, kind, test } from 'creevey';

import { delay } from '../../../lib/delay';

kind('DateRangePicker', () => {
  story('MinMax', () => {
    test('opened', async (context) => {
      await delay(1000);
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid="DateRangePicker__start"]' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'opened');
    });

    test('DateSelect month', async (context) => {
      await delay(1000);
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid="DateRangePicker__start"]' }))
        .perform();
      await delay(1000);
      await context.webdriver
        .actions({ bridge: true })
        .click(
          context.webdriver.findElement({
            css: '[data-tid="MonthView__month"]:first-child [data-tid="MonthView__headerMonth"] [data-tid="DateSelect__caption"]',
          }),
        )
        .move({ origin: context.webdriver.findElement({ css: 'body' }) })
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'DateSelect month');
    });

    test('DateSelect year', async (context) => {
      await delay(1000);
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid="DateRangePicker__start"]' }))
        .perform();
      await delay(1000);
      await context.webdriver
        .actions({ bridge: true })
        .click(
          context.webdriver.findElement({
            css: '[data-comp-name~="MonthView"]:first-child [data-tid="MonthView__headerYear"] [data-tid="DateSelect__caption"]',
          }),
        )
        .move({ origin: context.webdriver.findElement({ css: 'body' }) })
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'DateSelect year');
    });
  });

  story('TodayButton', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'no themes': { in: /^(?!\b(chrome2022|firefox2022)\b)/ } } });

    test('opened', async (context) => {
      await delay(1000);
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid="DateRangePicker__start"]' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'opened');
    });
  });

  story('OptionalRange', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'no themes': { in: /^(?!\b(chrome2022|firefox2022)\b)/ } } });

    test('opened', async (context) => {
      await delay(1000);
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid="DateRangePicker__start"]' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'opened');
    });
  });

  story('OptionalRangeWithTodayButton', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'no themes': { in: /^(?!\b(chrome2022|firefox2022)\b)/ } } });

    test('opened', async (context) => {
      await delay(1000);
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid="DateRangePicker__start"]' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'opened');
    });
  });

  story('MenuPos', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'no themes': { in: /^(?!\b(chrome2022|firefox2022)\b)/ } } });

    test('opened position top', async (context) => {
      await delay(1000);
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid="position-top"] [data-tid="DateRangePicker__start"]' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'opened position top');
    });

    test('opened position bottom', async (context) => {
      await delay(1000);
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(
          context.webdriver.findElement({ css: '[data-tid="position-bottom"] [data-tid="DateRangePicker__start"]' }),
        )
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'opened position bottom');
    });
  });

  story('MobilePicker', () => {
    test('MobilePicker on iphone opened', async (context) => {
      await delay(1000);
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid="DateRangePicker__start"]' }))
        .perform();
      await delay(2000);
      await context.matchImage(await context.webdriver.takeScreenshot(), 'MobilePicker on iphone opened');
    });
  });
});
