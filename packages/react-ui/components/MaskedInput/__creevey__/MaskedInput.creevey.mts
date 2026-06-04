import 'creevey/playwright';
import { kind, story, test } from 'creevey';

import { tid, waitForAnimationFrame } from '../../__creevey__/helpers.mjs';

const testIdleFocusEditBlur = () => {
  test('idle, focus, edit, blur', async (context) => {
    const page = context.webdriver;
    const idle = await context.takeScreenshot();

    await page.locator('input').click();
    await page.waitForTimeout(500);
    const focused = await context.takeScreenshot();

    await page.keyboard.type('953');
    const edited = await context.takeScreenshot();

    await page.locator('body').click();
    const blured = await context.takeScreenshot();

    await context.matchImages({ idle, focused, edited, blured });
  });
};

const testIdleFocusAppendRemoveBlur = () => {
  test('idle, focus, edit, blur', async (context) => {
    const page = context.webdriver;
    const idle = await context.takeScreenshot();

    await page.locator('input').click();
    await page.waitForTimeout(500);
    const focused = await context.takeScreenshot();

    await page.keyboard.type('953');
    const appended = await context.takeScreenshot();

    await page.keyboard.press('Backspace'); // remove space symbol
    await page.keyboard.press('Backspace'); // remove 3 symbol
    await page.keyboard.press('Backspace'); // remove 5 symbol
    await page.keyboard.press('Backspace'); // remove 9 symbol
    const restored = await context.takeScreenshot();

    await page.locator('body').click();
    await page.waitForTimeout(1000);
    const blured = await context.takeScreenshot();

    await context.matchImages({ idle, focused, appended, restored, blured });
  });
};

const testIdleFocusBlur = () => {
  test('idle, focus, blur', async (context) => {
    const page = context.webdriver;
    const idle = await context.takeScreenshot();

    await page.locator('input').click();
    await page.waitForTimeout(500);
    const focused = await context.takeScreenshot();

    await page.locator('body').click();
    await page.waitForTimeout(1000);
    const blured = await context.takeScreenshot();

    await context.matchImages({ idle, focused, blured });
  });
};

const testRewriteInMiddle = () => {
  test('idle, shift, rewrite', async (context) => {
    const page = context.webdriver;
    const idle = await context.takeScreenshot();

    await page.locator('input').click();
    await page.waitForTimeout(500);
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.type('12');
    const shift = await context.takeScreenshot();

    await page.locator('body').click();

    await page.locator('input').click();
    await page.waitForTimeout(500);
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.type('56');
    const rewrite = await context.takeScreenshot();

    await context.matchImages({ idle, shift, rewrite });
  });
};

kind('MaskedInput', () => {
  story('Default', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'enough basic themes': { in: /^(?!^(?:chrome2022|firefox2022)$)/ } },
    });
    testIdleFocusEditBlur();
  });

  story('IdleFocusEditBlurWithPlaceholder', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'enough basic themes': { in: /^(?!^(?:chrome2022|firefox2022)$)/ } },
    });
    testIdleFocusEditBlur();
  });

  story('IdleFocusBlurWithPlaceholder', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'enough basic themes': { in: /^(?!^(?:chrome2022|firefox2022)$)/ } },
    });
    testIdleFocusBlur();
  });

  story('IdleFocusAppendRemoveBlurWithPlaceholder', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'enough basic themes': { in: /^(?!^(?:chrome2022|firefox2022)$)/ } },
    });
    testIdleFocusAppendRemoveBlur();
  });

  story('IdleFocusBlurWithPrefix', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'enough basic themes': { in: /^(?!^(?:chrome2022|firefox2022)$)/ } },
    });
    testIdleFocusBlur();
  });

  story('WithCustomUnmaskedValue', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'enough basic themes': { in: /^(?!^(?:chrome2022|firefox2022)$)/ } },
    });
    testIdleFocusEditBlur();
  });

  story('WithUnmaskedAndFixedValue', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'enough basic themes': { in: /^(?!^(?:chrome2022|firefox2022)$)/ } },
    });
    testIdleFocusAppendRemoveBlur();
  });

  story('IdleFocusBlurAndUncontrolled', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'enough basic themes': { in: /^(?!^(?:chrome2022|firefox2022)$)/ } },
    });
    testIdleFocusEditBlur();
  });

  story('RewriteInMiddle', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'enough basic themes': { in: /^(?!^(?:chrome2022|firefox2022)$)/ } },
    });
    testRewriteInMiddle();
  });

  story('SelectAllByProp', ({ setStoryParameters }) => {
    // React 18 batches focus + state updates differently, so by the time
    // `delaySelectAll` (RAF) fires, imask has already expanded value to its
    // full masked length and the selection covers the placeholder. Other
    // React versions keep the half-selection behavior, so we keep the
    // baseline shared and only skip the affected test under R18.
    setStoryParameters({
      skip: {
        'chrome only': { in: /^(?!\bchrome2022\b)/ },
        ...(process.env.REACT_VERSION === '18'
          ? { 'known render difference on React 18': { tests: ['Plain focused'] } }
          : {}),
      },
    });
    test('Plain focused', async (context) => {
      const page = context.webdriver;
      await page.waitForTimeout(1000);
      const idle = await context.takeScreenshot();

      const input = page.locator('input');
      await input.click();
      // Ждем стабилизации селекта текста (selectAllOnFocus может иметь задержку)
      await page.waitForTimeout(500);
      await waitForAnimationFrame(page);
      await page.waitForTimeout(500);
      const select_half = await context.takeScreenshot();

      await page.locator('body').click();
      await page.waitForTimeout(500);
      await input.click();
      await page.waitForTimeout(500);
      await page.keyboard.type('1');
      await page.keyboard.type('2');
      await page.keyboard.type('3');
      await page.keyboard.type('4');
      await page.waitForTimeout(500);
      await page.locator('body').click();
      await page.waitForTimeout(500);

      await input.click();
      // Ждем стабилизации селекта текста после заполнения
      await page.waitForTimeout(500);
      await waitForAnimationFrame(page);
      await page.waitForTimeout(500);
      const select_all = await context.takeScreenshot();
      await context.matchImages({ idle, select_half, select_all });
    });
  });

  story('SelectAllByButton', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: true, // flaky
    });
    test('Plain focused', async (context) => {
      const page = context.webdriver;
      const plain = await context.takeScreenshot();
      await page.locator(tid('select-all')).click();
      await page.waitForTimeout(500);
      const select_all = await context.takeScreenshot();
      await context.matchImages({ plain, select_all });
    });
  });
});
