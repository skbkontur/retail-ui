import { story, kind, test } from 'creevey';

import 'creevey/playwright';
import { tid, waitForByTid } from './helpers.mjs';

const validationMessage = 'Значение должно состоять из двух слов';

kind('Input', () => {
  story('TwoWordsRequired', () => {
    test('invalidText', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('test-input')).fill('test');
      await page.keyboard.press('Tab');
      await page.getByText(validationMessage).waitFor();
      await context.matchImage(await context.takeScreenshot());
    });
  });

  story('ReactElementInMessage', () => {
    test('invalidText', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('test-input')).fill('test');
      await page.keyboard.press('Tab');
      await page.getByText(validationMessage).waitFor();
      await context.matchImage(await context.takeScreenshot());
    });
  });

  story('ScrollMessage', ({ setStoryParameters }) => {
    setStoryParameters({
      captureElement: null,
    });
    test('invalidText', async (context) => {
      const page = context.webdriver;

      await page.locator(tid('top-submit')).click();
      await page.waitForTimeout(500);
      const autoscrollAfterTopSubmit = await context.takeScreenshot();

      await page.evaluate(() => {
        window.scrollBy(0, -100);
      });
      await page.locator(tid('center-submit')).click();
      await page.waitForTimeout(500);
      const noScrollAfterCenterSubmit = await context.takeScreenshot();

      await page.evaluate(() => {
        window.scroll(0, window.document.body.scrollHeight);
      });
      await page.locator(tid('bottom-submit')).click();
      await page.waitForTimeout(1000);
      const autoscrollAfterBottomSubmit = await context.takeScreenshot();

      await context.matchImages({
        autoscrollAfterTopSubmit,
        noScrollAfterCenterSubmit,
        autoscrollAfterBottomSubmit,
      });
    });
  });

  story('DependentFields', () => {
    test('maleInSelectAndAnotherInInput', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('select')).click();
      await page.locator('[data-tid="MenuItem__root"]').first().click();
      await page.locator(tid('test-input')).fill('m');
      await page.locator(tid('submit')).click();
      await context.matchImage(await context.takeScreenshot());
    });
  });

  story('ScrollInsideTheContainer', () => {
    test('clickSubmit', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('submit')).click();
      await page.waitForTimeout(500);
      await context.matchImage(await context.takeScreenshot());
    });
  });

  story('SelectFirstControlForValidation', ({ setStoryParameters }) => {
    setStoryParameters({
      captureElement: null,
    });
    test('invalidText', async (context) => {
      const page = context.webdriver;
      const submit = await page.locator(tid('submit'));
      await submit.click();
      await page.waitForTimeout(500);
      await page.keyboard.type("i'm active!");
      const focusedThenFilledWhenSubmitAndAllEmpty = await context.takeScreenshot();

      await submit.click();
      const secondFocusedWhenSubmitAndFirstFull = await context.takeScreenshot();
      await context.matchImages({ focusedThenFilledWhenSubmitAndAllEmpty, secondFocusedWhenSubmitAndFirstFull });
    });
  });

  story('ScrollWithFixedPlaceBottom', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: null });

    test('invalidText', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('submit')).click();
      await page.waitForTimeout(500);
      await context.matchImage(await context.takeScreenshot());
    });
  });

  story('ValidationWithLevelWarning', () => {
    test('validateImmediate', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('immediate-validation-input')).fill('test');
      await context.matchImage(await context.takeScreenshot());
    });

    test('validateOnLostfocus', async (context) => {
      const page = context.webdriver;
      const lostfocusValidationInput = await page.locator(tid('lostfocus-validation-input'));
      await lostfocusValidationInput.fill('test');
      const noTooltipImmediate = await context.takeScreenshot();
      await page.locator('body').click();
      await lostfocusValidationInput.hover();
      await waitForByTid(page, 'PopupContent');
      const tooltipOnHover = await context.takeScreenshot();
      await context.matchImages({ noTooltipImmediate, tooltipOnHover });
    });

    test('validateOnSubmit', async (context) => {
      const page = context.webdriver;
      const submitValidationInput = await page.locator(tid('submit-validation-input'));
      await submitValidationInput.fill('test');
      await page.locator('body').click();
      const noTooltipOnBlur = await context.takeScreenshot();

      const submit = await page.locator('[data-tid~="submit"]');
      await submit.click();
      await submitValidationInput.fill('test');
      await submitValidationInput.hover();
      await page.locator('[data-tid~="PopupContent"]').waitFor();
      const tooltipOnSubmitAndHover = await context.takeScreenshot();

      await context.matchImages({ noTooltipOnBlur, tooltipOnSubmitAndHover });
    });
  });

  story('TooltipTopLeft', () => {
    test('invalidTooltip', async (context) => {
      const page = context.webdriver;
      const input = await page.getByRole('textbox');
      await input.fill('test');
      await page.locator('body').click();
      await input.hover();
      await waitForByTid(page, 'PopupContent');
      await context.matchImage(await context.takeScreenshot());
    });
  });
});
