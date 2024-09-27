import { story, kind, test } from 'creevey';

import { delay } from '../../../lib/utils';

kind('Calendar', () => {
  story('CalendarWithMinMaxDate', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { "themes don't affect logic": { in: /^(?!\b(chrome2022|firefox2022)\b)/ } },
    });
    test('DateSelect months', async function () {
      await delay(1000);
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="Calendar"]' }))
        .pause(1000)
        .click(
          this.browser.findElement({
            css: '[data-tid="MonthView__month"]:first-child [data-tid="MonthView__headerMonth"] [data-tid="DateSelect__caption"]',
          }),
        )
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('DateSelect months');
    });

    test('DateSelect years', async function () {
      await delay(1000);
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="Calendar"]' }))
        .pause(1000)
        .click(
          this.browser.findElement({
            css: '[data-comp-name~="MonthView"]:first-child [data-tid="MonthView__headerYear"] [data-tid="DateSelect__caption"]',
          }),
        )
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('DateSelect years');
    });
  });

  story('ScrollsCalendarOnDateChange', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { "themes don't affect logic": { in: /^(?!\b(chrome2022|firefox2022)\b)/ } },
    });
    test('initial date', async function () {
      await this.expect(await this.takeScreenshot()).to.matchImage('initial date');
    });

    test('scrolls to new date on date change', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid="change-date-button"]' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('scrolls to new date on date change');
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
