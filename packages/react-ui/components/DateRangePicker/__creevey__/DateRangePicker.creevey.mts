import { story, kind, test } from 'creevey';
import 'creevey/playwright';

import { tid, waitForPopup } from '../../__creevey__/helpers.mjs';

kind('DateRangePicker', () => {
  story('MinMax', () => {
    test('opened', async (context) => {
      const page = context.webdriver;
      await page.waitForTimeout(1000);
      await page.locator(tid('DateRangePicker__start')).click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'opened');
    });

    test('DateSelect month', async (context) => {
      const page = context.webdriver;
      await page.waitForTimeout(1000);
      await page.locator(tid('DateRangePicker__start')).click();
      await page.waitForTimeout(1000);
      await page
        .locator(
          tid('MonthView__month') + ':first-child ' + tid('MonthView__headerMonth') + ' ' + tid('DateSelect__caption'),
        )
        .click();
      await page.locator('body').hover();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'DateSelect month');
    });

    test('DateSelect year', async (context) => {
      const page = context.webdriver;
      await page.waitForTimeout(1000);
      await page.locator(tid('DateRangePicker__start')).click();
      await page.waitForTimeout(1000);
      await page
        .locator(
          tid('MonthView__month') + ':first-child ' + tid('MonthView__headerYear') + ' ' + tid('DateSelect__caption'),
        )
        .click();
      await page.locator('body').hover();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'DateSelect year');
    });
  });

  story('TodayButton', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'no themes': { in: /^(?!\b(chrome2022|firefox2022)\b)/ } } });

    test('opened', async (context) => {
      const page = context.webdriver;
      await page.waitForTimeout(1000);
      await page.locator(tid('DateRangePicker__start')).click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'opened');
    });
  });

  story('OptionalRange', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'no themes': { in: /^(?!\b(chrome2022|firefox2022)\b)/ } } });

    test('opened', async (context) => {
      const page = context.webdriver;
      await page.waitForTimeout(1000);
      await page.locator(tid('DateRangePicker__start')).first().click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'opened');
    });
  });

  story('OptionalRangeWithTodayButton', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'no themes': { in: /^(?!\b(chrome2022|firefox2022)\b)/ } } });

    test('opened', async (context) => {
      const page = context.webdriver;
      await page.waitForTimeout(1000);
      await page.locator(tid('DateRangePicker__start')).first().click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'opened');
    });
  });

  story('MenuPos', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'no themes': { in: /^(?!\b(chrome2022|firefox2022)\b)/ } } });

    test('opened position top', async (context) => {
      const page = context.webdriver;
      await page.waitForTimeout(1000);
      await page.locator(tid('position-top') + ' ' + tid('DateRangePicker__start')).click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'opened position top');
    });

    test('opened position bottom', async (context) => {
      const page = context.webdriver;
      await page.waitForTimeout(1000);
      await page.locator('[data-tid="position-bottom"] [data-tid="DateRangePicker__start"]').click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'opened position bottom');
    });
  });

  story('MobilePicker', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: null });

    test('MobilePicker on iphone opened', async (context) => {
      const page = context.webdriver;
      await page.waitForTimeout(1000);
      await page.locator(tid('DateRangePicker__start')).click();
      await page.waitForTimeout(2000);
      await context.matchImage(await context.takeScreenshot(), 'MobilePicker on iphone opened');
    });
  });

  story('CustomMenuAnchorElement', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'no themes': { in: /^(?!\b(chrome2022)\b)/ } } });

    test('opened in various menuAnchorElement', async (context) => {
      const page = context.webdriver;

      await page.locator(tid('StartFocused')).click();
      await waitForPopup(page);
      const start = await context.takeScreenshot();

      await page.locator(tid('EndFocused')).click();
      await waitForPopup(page);
      const end = await context.takeScreenshot();

      await page.locator(tid('Custom')).click();
      await waitForPopup(page);
      const custom = await context.takeScreenshot();

      await context.matchImages({ start, end, custom });
    });
  });
});
