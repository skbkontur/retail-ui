import { story, kind, test } from 'creevey';

import 'creevey/playwright';
import { tid } from '../../__creevey__/helpers.mjs';

const differentStatesTest = () => {
  test('Plain', async (context) => {
    const page = context.webdriver;
    const element = page.locator('#input');
    await context.matchImage(await element.screenshot(), 'Plain');
  });

  test('Focused', async (context) => {
    const page = context.webdriver;
    const element = page.locator('#input');
    await page.locator('#input input').click();
    await page.waitForTimeout(500);
    await context.matchImage(await element.screenshot(), 'Focused');
  });

  test('With typed text', async (context) => {
    const page = context.webdriver;
    const element = page.locator('#input');
    await page.locator('#input input').click();
    await page.keyboard.type('Test...');
    await page.waitForTimeout(500);
    await context.matchImage(await element.screenshot(), 'With typed text');
  });

  test('With long typed text', async (context) => {
    const page = context.webdriver;
    const element = page.locator('#input');
    await page.locator('#input input').click();
    await page.keyboard.type('Test...');
    await page.keyboard.type(
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    );
    await page.waitForTimeout(500);
    await context.matchImage(await element.screenshot(), 'With long typed text');
  });
};

const testMaskedInput = () => {
  test('idle, focus, edit, blur', async (context) => {
    const page = context.webdriver;
    const idle = await context.takeScreenshot();
    await page.locator('input').click();
    await page.waitForTimeout(500);
    const focused = await context.takeScreenshot();
    await page.locator('input').click();
    await page.keyboard.type('953');
    const edited = await context.takeScreenshot();
    await page.locator('body').click();
    const blured = await context.takeScreenshot();
    await context.matchImages({ idle, focused, edited, blured });
  });
};

kind('Input', () => {
  story('Default', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { "themes don't affect logic": { in: /^(?!\b(chrome2022|firefox2022)\b)/ } },
    });
    differentStatesTest();
  });

  story('WithMask', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { "themes don't affect logic": { in: /^(?!\b(chrome2022|firefox2022)\b)/ } },
    });
    testMaskedInput();
  });

  story('WithMaskAndCustomUnmaskedValue', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        "themes don't affect logic": { in: /^(?!\bchrome2022\b)/ },
      },
    });

    testMaskedInput();
  });

  story('SelectAllByProp', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { "themes don't affect logic": { in: /^(?!\b(chrome2022|firefox2022)\b)/ } },
    });
    test('Plain', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'Plain');
    });

    test('Focused', async (context) => {
      const page = context.webdriver;
      await page.locator('label').click();
      await context.matchImage(await context.takeScreenshot(), 'Focused');
    });
  });

  story('SelectAllByButton', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { "themes don't affect logic": { in: /^(?!\b(chrome2022|firefox2022)\b)/ } },
    });
    test('Plain', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'Plain');
    });

    test('Selected', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('select-all')).click();
      await context.matchImage(await context.takeScreenshot(), 'Selected');
    });
  });

  story('MaxLength', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        "themes don't affect logic": { in: /^(?!\b(chrome2022|firefox2022)\b)/ },
        flaky: {
          in: ['chrome2022'],
          tests: ['With long typed text'],
        },
      },
    });
    differentStatesTest();
  });

  story('UncontrolledInputWithPlaceholder', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { "themes don't affect logic": { in: /^(?!\b(chrome2022|firefox2022)\b)/ } },
    });
    test('PlainAndTyped', async (context) => {
      const page = context.webdriver;
      const plain = await context.takeScreenshot();
      await page.locator('input').click();
      await page.keyboard.type('text');
      const typed = await context.takeScreenshot();
      await context.matchImages({ plain, typed });
    });
  });

  story('WithMaskAndSelectAllProp', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { "themes don't affect logic": { in: /^(?!\bchrome2022\b)/ } } });

    test('PlainAndSelected', async (context) => {
      const page = context.webdriver;
      const plain = await context.takeScreenshot();
      await page.locator('input').click();
      await page.waitForTimeout(500);
      const selectAllHalfFilledInput = await context.takeScreenshot();
      await page.locator('input').click();
      await page.keyboard.type('1111');
      await page.locator('body').click();
      await page.locator('input').click();
      await page.waitForTimeout(500);
      const selectAllFilledInput = await context.takeScreenshot();
      await context.matchImages({ plain, selectAllHalfFilledInput, selectAllFilledInput });
    });
  });

  story('SearchTypeApi', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'tests only stable in chrome': { in: /^(?!\bchrome2022\b|\bchrome2022Dark\b)/ },
      },
    });

    test('Focused', async (context) => {
      const page = context.webdriver;
      await page.locator('label').click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'Focused');
    });
  });

  story('InputTypeApi', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        "themes don't affect logic": { in: /^(?!\b(chrome|firefox)(2022).*\b)/ },
      },
    });

    test('Focused', async (context) => {
      const page = context.webdriver;
      await page.locator('label').click();
      await context.matchImage(await context.takeScreenshot(), 'Focused');
    });
  });
  story('Type', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'no themes': { in: /^(?!\b(chrome2022)\b)/ } },
    });
  });
  story('TypeApi', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'no themes': { in: /^(?!\b(chrome2022)\b)/ } },
    });
  });
});
