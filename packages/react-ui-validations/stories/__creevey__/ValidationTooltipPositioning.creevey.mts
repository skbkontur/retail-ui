import 'creevey/playwright';
import type { CreeveyTestContext } from 'creevey';
import { kind, story, test } from 'creevey';

import { tid, waitForValidationTooltip } from './helpers.mjs';

const submitAndShowTooltip = async (
  context: CreeveyTestContext,
  controlTid: string,
  { click = true }: { click?: boolean } = {},
) => {
  const page = context.webdriver;
  const control = page.locator(tid(controlTid));

  await page.locator(tid('validation-tooltip-submit')).click();
  await control.scrollIntoViewIfNeeded();

  if (click) {
    await control.click();
  } else {
    await page.keyboard.press('Escape');
  }

  await control.hover();
  await waitForValidationTooltip(page);
  await context.matchImage(await context.takeScreenshot());
};

kind('ValidationTooltip positioning', () => {
  story('CustomInputControl', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: null });

    test('tooltip position', async (context) => {
      await submitAndShowTooltip(context, 'validation-tooltip-custom-input');
    });
  });

  story('InputControl', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: null });

    test('tooltip position', async (context) => {
      await submitAndShowTooltip(context, 'validation-tooltip-input');
    });
  });

  story('TextareaControl', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: null });

    test('tooltip position', async (context) => {
      await submitAndShowTooltip(context, 'validation-tooltip-textarea');
    });
  });

  story('PasswordInputControl', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: null });

    test('tooltip position', async (context) => {
      await submitAndShowTooltip(context, 'validation-tooltip-password-input');
    });
  });

  story('CurrencyInputControl', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: null });

    test('tooltip position', async (context) => {
      await submitAndShowTooltip(context, 'validation-tooltip-currency-input');
    });
  });

  story('MaskedInputControl', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: null });

    test('tooltip position', async (context) => {
      await submitAndShowTooltip(context, 'validation-tooltip-masked-input');
    });
  });

  story('FxInputControl', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: null });

    test('tooltip position', async (context) => {
      await submitAndShowTooltip(context, 'validation-tooltip-fx-input');
    });
  });

  story('DateInputControl', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: null });

    test('tooltip position', async (context) => {
      await submitAndShowTooltip(context, 'validation-tooltip-date-input');
    });
  });

  story('SelectControl', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: null });

    test('tooltip position', async (context) => {
      await submitAndShowTooltip(context, 'validation-tooltip-select', { click: false });
    });
  });

  story('ComboBoxControl', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: null });

    test('tooltip position', async (context) => {
      await submitAndShowTooltip(context, 'validation-tooltip-combobox', { click: false });
    });
  });

  story('AutocompleteControl', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: null });

    test('tooltip position', async (context) => {
      await submitAndShowTooltip(context, 'validation-tooltip-autocomplete', { click: false });
    });
  });

  story('DatePickerControl', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: null });

    test('tooltip position', async (context) => {
      await submitAndShowTooltip(context, 'validation-tooltip-date-picker', { click: false });
    });
  });
});
