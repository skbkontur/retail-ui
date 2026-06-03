import { story, kind, test } from 'creevey';
import 'creevey/playwright';
import { tid } from '../../../components/__creevey__/helpers.mjs';

kind('ThemeVersions/6_0', () => {
  story('Calendar6_0', () => {
    test('selected date hover', async (context) => {
      const page = context.webdriver;
      await page
        .locator(tid('DayCellView__root'), { has: page.getByText('12') })
        .nth(0)
        .hover();

      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'selected date hover');
    });

    test('selected weekend date hover', async (context) => {
      const page = context.webdriver;
      await page
        .locator(tid('DayCellView__root'), { has: page.getByText('14') })
        .nth(0)
        .click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'selected weekend date hover');
    });
  });

  story('AutocompleteMobile6_0', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'mobile only': { in: /^(?!\b(chromeMobile)\b)/ },
      },
      captureElement: null,
    });

    test('opened', async (context) => {
      const page = context.webdriver;
      await page.waitForTimeout(500);
      await page.locator(`${tid('Autocomplete__root')} input`).click();
      await page.locator(tid('MobilePopup__root')).waitFor();
      await page.waitForTimeout(500);
      await context.matchImage(await context.takeScreenshot(), 'opened');
    });
  });

  story('SelectMobile6_0', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'mobile only': { in: /^(?!\b(chromeMobile)\b)/ },
      },
      captureElement: null,
    });

    test('opened', async (context) => {
      const page = context.webdriver;
      await page.waitForTimeout(500);
      await page.locator(tid('Select__label')).click();
      await page.locator(tid('MobilePopup__root')).waitFor();
      await page.waitForTimeout(500);
      await context.matchImage(await context.takeScreenshot(), 'opened');
    });
  });

  story('DatePickerMobile6_0', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'mobile only': { in: /^(?!\b(chromeMobile)\b)/ },
      },
      captureElement: null,
    });

    test('MobilePicker on iphone opened', async (context) => {
      const page = context.webdriver;
      await page.waitForTimeout(1000);
      await page.locator(tid('DatePicker__label')).click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'MobilePicker on iphone opened');
    });
  });

  story('DateRangePickerMobile6_0', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'mobile only': { in: /^(?!\b(chromeMobile)\b)/ },
      },
      captureElement: null,
    });

    test('MobilePicker on iphone opened', async (context) => {
      const page = context.webdriver;
      await page.waitForTimeout(1000);
      await page.locator(tid('DateRangePicker__start')).click();
      await page.waitForTimeout(2000);
      await context.matchImage(await context.takeScreenshot(), 'MobilePicker on iphone opened');
    });
  });

  story('ComboBoxMobile6_0', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'mobile only': { in: /^(?!\b(chromeMobile)\b)/ },
      },
      captureElement: null,
    });

    test('opened', async (context) => {
      const page = context.webdriver;
      await page.waitForTimeout(500);
      await page.locator(tid('ComboBoxView__root')).click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'opened');
    });
  });

  story('TextareaCounter6_0', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'flacky scrollbars height': {
          in: ['firefox', 'firefox8px', 'firefoxFlat8px', 'firefoxDark', 'firefox2022', 'firefox2022Dark'],
        },
      },
    });

    test('Focus', async (context) => {
      const page = context.webdriver;
      await page.locator('#CounterPlain textarea').click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'Focus');
    });

    test('FocusAutoresize', async (context) => {
      const page = context.webdriver;
      await page.locator('#CounterAutoresizeTextarea textarea').first().click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'FocusAutoresize');
    });

    test('CounterWithHelp', async (context) => {
      const page = context.webdriver;
      await page.locator('#CounterWithHelp textarea').click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'CounterWithHelp');
    });

    test('CounterWithHelpOpened', async (context) => {
      const page = context.webdriver;
      await page.locator('#CounterWithHelp textarea').click();
      await page.locator(tid('TextareaCounter__helpIcon')).click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'CounterWithHelpOpened');
    });
  });
});
