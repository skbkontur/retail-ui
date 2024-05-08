import { story, kind, test } from 'creevey';

import { delay } from '../../../lib/utils';

kind('Calendar', () => {
  story('CalendarWithMinMaxDate', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { "themes don't affect logic": { in: /^(?!\bchrome\b|\bfirefox\b|\bie11\b)/ } },
    });
    test('DateSelect months', async function () {
      await delay(1000);
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="Calendar"]' }))
        .perform();
      await delay(1000);
      await this.browser
        .actions({ bridge: true })
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
        .perform();
      await delay(1000);
      await this.browser
        .actions({ bridge: true })
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
      skip: { "themes don't affect logic": { in: /^(?!\bchrome\b|\bfirefox\b|\bie11\b)/ } },
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
        "8px and 2022 themes don't affect the bottom separator": {
          in: /^(?!\b(chrome|chromeDark|firefox|firefoxDark)\b)/,
        },
      },
    });
  });
});
