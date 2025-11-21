import { story, kind, test } from 'creevey';

import 'creevey/playwright';
import { tid, waitForPopup } from '../../__creevey__/helpers.mjs';

kind('Calendar', () => {
  story('CalendarWithMinMaxDate', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { "themes don't affect logic": { in: /^(?!\b(chrome2022|firefox2022)\b)/ } },
    });
    test('DateSelect months', async (context) => {
      const page = context.webdriver;
      await page.waitForTimeout(1000);
      await page.locator(tid('Calendar__root')).click();
      await page.waitForTimeout(1000);
      await page
        .locator(
          tid('MonthView__month') + ':first-child ' + tid('MonthView__headerMonth') + ' ' + tid('DateSelect__caption'),
        )
        .click();
      await context.matchImage(await context.takeScreenshot(), 'DateSelect months');
    });

    test('DateSelect years', async (context) => {
      const page = context.webdriver;
      await page.waitForTimeout(1000);
      await page.locator(tid('Calendar__root')).click();
      await page.waitForTimeout(1000);
      await page
        .locator(
          tid('MonthView__month') + ':first-child ' + tid('MonthView__headerYear') + ' ' + tid('DateSelect__caption'),
        )
        .click();
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
      const page = context.webdriver;
      await page.locator('[data-tid="change-date-button"]').click();
      await page.waitForTimeout(1000);
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

  story('CalendarWithDateSelectMiddlePosition', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { "themes don't affect logic": { in: /^(?!\b(chrome2022|firefox2022)\b)/ } },
    });
    test('DateSelect months', async (context) => {
      const page = context.webdriver;
      await page.waitForTimeout(1000);
      await page.locator(tid('Calendar__root')).click();
      await page.waitForTimeout(1000);
      const dateSelectCaption = page.locator(
        tid('MonthView__month') + ':first-child ' + tid('MonthView__headerMonth') + ' ' + tid('DateSelect__caption'),
      );
      await dateSelectCaption.waitFor();
      await dateSelectCaption.click();
      await page.waitForTimeout(500);
      await waitForPopup(page);
      await page.waitForTimeout(500);
      await context.matchImage(await context.takeScreenshot(), 'months');
    });

    test('DateSelect years', async (context) => {
      const page = context.webdriver;
      await page.waitForTimeout(1000);
      await page.locator(tid('Calendar__root')).click();
      await page.waitForTimeout(1000);
      await page
        .locator(
          tid('MonthView__month') + ':first-child ' + tid('MonthView__headerYear') + ' ' + tid('DateSelect__caption'),
        )
        .click();
      await context.matchImage(await context.takeScreenshot(), 'years');
    });
  });
});
