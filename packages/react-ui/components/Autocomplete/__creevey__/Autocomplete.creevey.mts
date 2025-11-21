import { story, kind, test } from 'creevey';

import 'creevey/playwright';
import { tid, waitForPopup } from '../../__creevey__/helpers.mjs';

const commonTests = () => {
  test('focus and type text', async (context) => {
    const page = context.webdriver;
    await page.keyboard.press('Tab'); // focus on input
    await page.keyboard.type('o');
    await waitForPopup(page);
    await context.matchImage(await context.takeScreenshot());
  });
};

const mobileHintsTests = () => {
  test('noInputValue', async (context) => {
    const page = context.webdriver;
    await page.locator('input').click();
    await context.matchImage(await context.takeScreenshot(), 'noInputValue');
  });

  test('nothingWasFound', async (context) => {
    const page = context.webdriver;
    await page.locator('input').click();
    await page.keyboard.type('abc');
    await context.matchImage(await context.takeScreenshot(), 'nothingWasFound');
  });

  test('updateValue', async (context) => {
    const page = context.webdriver;
    await page.locator('input').click();
    await page.keyboard.type('one');
    await page.waitForTimeout(200);
    await page.locator(tid('MenuItem__root')).click();
    await page.waitForTimeout(200);
    await context.matchImage(await context.takeScreenshot(), 'updateValue');
  });
};

const sizeTests = () => {
  test('focus and type text small', async (context) => {
    const page = context.webdriver;
    const autocompleteElements = page.locator(tid('Autocomplete__root'));
    await autocompleteElements.nth(0).click();
    await page.keyboard.type('o');
    await waitForPopup(page);
    await context.matchImage(await context.takeScreenshot());
  });

  test('focus and type text medium', async (context) => {
    const page = context.webdriver;
    const autocompleteElements = page.locator(tid('Autocomplete__root'));
    await autocompleteElements.nth(1).click();
    await page.keyboard.type('o');
    await waitForPopup(page);
    await context.matchImage(await context.takeScreenshot());
  });

  test('focus and type text large', async (context) => {
    const page = context.webdriver;
    const autocompleteElements = page.locator(tid('Autocomplete__root'));
    await autocompleteElements.nth(2).click();
    await page.keyboard.type('o');
    await waitForPopup(page);
    await context.matchImage(await context.takeScreenshot());
  });
};

const menuPosTests = () => {
  test('focus and type text menu top', async (context) => {
    const page = context.webdriver;
    const autocompleteElements = page.locator(tid('Autocomplete__root'));

    await autocompleteElements.nth(0).click();
    await page.keyboard.type('o');
    await waitForPopup(page);
    await context.matchImage(await context.takeScreenshot());
  });
  test('focus and type text menu bottom', async (context) => {
    const page = context.webdriver;
    const autocompleteElements = page.locator(tid('Autocomplete__root'));

    await autocompleteElements.nth(1).click();
    await page.keyboard.type('o');
    await waitForPopup(page);
    await context.matchImage(await context.takeScreenshot());
  });
};

kind('Autocomplete', () => {
  story('Simple', () => {
    test('idle', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'idle');
    });

    test('focused', async (context) => {
      const page = context.webdriver;
      const autocompleteElement = page.locator(tid('Autocomplete__root'));
      await autocompleteElement.click();
      await context.matchImage(await autocompleteElement.screenshot());
    });

    commonTests();
  });

  story('WithRenderItem', () => {
    commonTests();
  });

  story('WithBigRenderItemWidth', () => {
    commonTests();
  });

  story('WithFixedMenuSize', () => {
    commonTests();
  });

  story('WithPercentageWidth', () => {
    commonTests();
  });

  story('WithFixedWidth', () => {
    commonTests();
  });

  story('WithZeroWidth', () => {
    commonTests();
  });

  story('MobileHints', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: null });
    mobileHintsTests();
  });

  story('MobileHintsEN', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: null });
    mobileHintsTests();
  });

  story('MobileWithTitle', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: null });

    test('opened', async (context) => {
      const page = context.webdriver;
      await page.locator('input').click();
      await context.matchImage(await context.takeScreenshot(), 'opened');
    });
  });

  story('WithManualPosition', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'no themes': { in: /^(?!\b(chrome2022|firefox2022)\b)/ },
        flaky: {
          in: ['firefox2022'],
          tests: ['opened top with portal', 'opened bottom with portal'],
        },
      },
    });

    test('opened top with portal', async (context) => {
      const page = context.webdriver;
      const autocompleteElement = page.locator(tid('Autocomplete__root'));
      await autocompleteElement.click();
      await page.keyboard.type('o');
      await waitForPopup(page);
      await context.matchImage(await context.takeScreenshot());
    });

    test('opened bottom with portal', async (context) => {
      const page = context.webdriver;
      const autocompleteElement = page.locator(tid('Autocomplete__root'));
      await page.locator(tid('pos')).click();
      await autocompleteElement.click();
      await page.keyboard.type('o');
      await waitForPopup(page);
      await context.matchImage(await context.takeScreenshot());
    });
  });

  story('Size', () => {
    sizeTests();
  });

  story('WithDisabledPortal', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: null });
    commonTests();
    menuPosTests();
  });

  story('MenuPos', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: null });
    menuPosTests();
  });

  story('WithPercentageMenuWidth', () => {
    commonTests();
  });

  story('WithMask', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'no themes': { in: /^(?!\b(chrome2022)\b)/ },
      },
    });

    test('search with mask select without input value', async (context) => {
      const page = context.webdriver;
      const autocompleteElement = page.locator(tid('Autocomplete__root'));
      await autocompleteElement.click();
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot());
    });

    test('search with mask', async (context) => {
      const page = context.webdriver;
      const autocompleteElement = page.locator(tid('Autocomplete__root'));
      await autocompleteElement.click();
      await page.keyboard.type('912');
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot());
    });
  });
});
