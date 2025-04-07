import { story, kind, test } from 'creevey';

import { delay } from '../../../lib/delay';

kind('DateRangePicker', () => {
  story('DateRangePicker', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        flaky: {
          in: ['chrome2022Dark'],
          tests: ['DateSelect year'],
        },
      },
    });
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
        .click(context.webdriver.findElement({ css: '[data-tid="DateRangePicker__start]' }))
        .perform();
      await delay(1000);
      await context.webdriver
        .actions({ bridge: true })
        .click(
          context.webdriver.findElement({
            css: '[data-tid="MonthView__month"]:first-child [data-tid="MonthView__headerMonth"] [data-tid="DateSelect__caption"]',
          }),
        )
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
        .click(context.webdriver.findElement({ css: '[data-tid="DateRangePicker__start]' }))
        .perform();
      await delay(1000);
      await context.webdriver
        .actions({ bridge: true })
        .click(
          context.webdriver.findElement({
            css: '[data-comp-name~="MonthView"]:first-child [data-tid="MonthView__headerYear"] [data-tid="DateSelect__caption"]',
          }),
        )
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'DateSelect year');
    });
  });

  story('MinMax', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        flaky: {
          in: /^(?!\b(chrome|ie11)\b)/,
          tests: ['DateSelect months', 'DateSelect years'],
        },
      },
    });

    test('DateSelect months', async (context) => {
      await delay(1000);
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid="DateRangePicker__start"]' }))
        .pause(1000)
        .perform();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(
          context.webdriver.findElement({
            css: '[data-tid="MonthView__month"]:first-child [data-tid="MonthView__headerMonth"] [data-tid="DateSelect__caption"]',
          }),
        )
        .pause(1000)
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'DateSelect months');
    });

    test('DateSelect years', async (context) => {
      await delay(1000);
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid="DateRangePicker__start]' }))
        .pause(1000)
        .perform();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(
          context.webdriver.findElement({
            css: '[data-comp-name~="MonthView"]:first-child [data-tid="MonthView__headerYear"] [data-tid="DateSelect__caption"]',
          }),
        )
        .pause(1000)
        .perform();
      await context.matchImage(await context.takeScreenshot(), 'DateSelect years');
    });
  });

  story('WithManualPosition', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'no themes': { in: /^(?!\b(chrome2022|firefox2022)\b)/ } } });

    test('opened top without relative position', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid="DateRangePicker__start"]' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'opened top without relative position');
    });

    test('opened bottom without relative position', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid~="pos"]' }))
        .pause(1000)
        .click(context.webdriver.findElement({ css: '[data-tid="DateRangePicker__start"]' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'opened bottom without relative position');
    });

    test('opened top with relative position', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid~="relative"]' }))
        .pause(1000)
        .click(context.webdriver.findElement({ css: '[data-tid="DateRangePicker__start"]' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'opened top with relative position');
    });

    test('opened bottom with relative position', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid~="pos"]' }))
        .pause(1000)
        .click(context.webdriver.findElement({ css: '[data-tid~="relative"]' }))
        .pause(1000)
        .click(context.webdriver.findElement({ css: '[data-tid="DateRangePicker__start"]' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.takeScreenshot(), 'opened bottom');
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
      await delay(1000);
      await context.matchImage(await context.webdriver.takeScreenshot(), 'MobilePicker on iphone opened');
    });
  });
});
