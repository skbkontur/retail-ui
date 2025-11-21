import { story, kind, test } from 'creevey';
import 'creevey/playwright';

import { tid } from '../../__creevey__/helpers.mjs';

kind('DatePicker', () => {
  story('WithMouseeventHandlers', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        flaky: {
          in: ['chrome2022Dark'],
          tests: ['DateSelect year'],
        },
      },
    });
    test('opened', async (context) => {
      const page = context.webdriver;
      await page.waitForTimeout(1000);
      await page.locator(tid('DatePicker__label')).click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'opened');
    });

    test('DateSelect month', async (context) => {
      const page = context.webdriver;
      await page.waitForTimeout(1000);
      await page.locator(tid('DatePicker__label')).click();
      await page.waitForTimeout(1000);
      await page
        .locator(
          tid('MonthView__month') + ':first-child ' + tid('MonthView__headerMonth') + ' ' + tid('DateSelect__caption'),
        )
        .click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'DateSelect month');
    });

    test('DateSelect year', async (context) => {
      const page = context.webdriver;
      await page.waitForTimeout(1000);
      await page.locator(tid('DatePicker__label')).click();
      await page.waitForTimeout(1000);
      await page
        .locator(
          tid('MonthView__month') + ':first-child ' + tid('MonthView__headerYear') + ' ' + tid('DateSelect__caption'),
        )
        .click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'DateSelect year');
    });
  });

  story('DatePickerWithMinMaxDate', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        flaky: {
          in: /^(?!\b(chrome|ie11)\b)/,
          tests: ['DateSelect months', 'DateSelect years'],
        },
      },
    });

    test('DateSelect months', async (context) => {
      const page = context.webdriver;
      await page.waitForTimeout(1000);
      await page.locator(tid('DatePicker__root')).click();
      await page.waitForTimeout(1000);
      await page
        .locator(
          tid('MonthView__month') + ':first-child ' + tid('MonthView__headerMonth') + ' ' + tid('DateSelect__caption'),
        )
        .click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'DateSelect months');
    });

    test('DateSelect years', async (context) => {
      const page = context.webdriver;
      await page.waitForTimeout(1000);
      await page.locator(tid('DatePicker__root')).click();
      await page.waitForTimeout(1000);
      await page
        .locator(
          tid('MonthView__month') + ':first-child ' + tid('MonthView__headerYear') + ' ' + tid('DateSelect__caption'),
        )
        .click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'DateSelect years');
    });
  });

  story('DatePickerInRelativeBody', () => {
    test('opened', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('toggle-relative-position')).click();
      await page.locator(tid('DatePicker__label')).click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'opened');
    });
  });

  story('WithManualPosition', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'no themes': { in: /^(?!\b(chrome2022|firefox2022)\b)/ } } });

    test('opened top without relative position', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('DatePicker__label')).click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'opened top without relative position');
    });

    test('opened bottom without relative position', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('pos')).click();
      await page.waitForTimeout(1000);
      await page.locator(tid('DatePicker__label')).click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'opened bottom without relative position');
    });

    test('opened top with relative position', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('relative')).click();
      await page.waitForTimeout(1000);
      await page.locator(tid('DatePicker__label')).click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'opened top with relative position');
    });

    test('opened bottom with relative position', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('pos')).click();
      await page.waitForTimeout(1000);
      await page.locator(tid('relative')).click();
      await page.waitForTimeout(1000);
      await page.locator(tid('DatePicker__label')).click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'opened bottom');
    });
  });
  story('MobilePicker', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: null });

    test('MobilePicker on iphone opened', async (context) => {
      const page = context.webdriver;
      await page.waitForTimeout(1000);
      await page.locator(tid('DatePicker__label')).click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'MobilePicker on iphone opened');
    });
  });
});
