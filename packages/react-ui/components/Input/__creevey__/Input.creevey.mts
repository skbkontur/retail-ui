import 'creevey/playwright';
import { kind, story, test } from 'creevey';

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

kind('Input', () => {
  story('Default', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { "themes don't affect logic": { in: /^(?!\b(chrome2022|firefox2022)\b)/ } },
    });
    differentStatesTest();
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

  story('Counter', () => {
    test('base', async (context) => {
      const page = context.webdriver;

      const input = page.locator(tid('Input__root'));
      await input.click();
      await page.waitForTimeout(500);
      const focused = await context.takeScreenshot();

      await page.keyboard.type('Text');
      await page.waitForTimeout(500);
      const typed = await context.takeScreenshot();

      await page.keyboard.type('MoreText');
      await page.waitForTimeout(500);
      const typedOverLimit = await context.takeScreenshot();

      await context.matchImages({ focused, typed, typedOverLimit });
    });
  });

  story('CounterHelp', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'no themes': { in: /^(?!\b(chrome2022)\b)/ } } });
    test('base', async (context) => {
      const page = context.webdriver;

      const input = page.locator(tid('Input__root'));
      await input.click();
      await page.waitForTimeout(500);
      const focused = await context.takeScreenshot();

      const helpIcon = page.locator(tid('Input__counterHelpIcon'));
      await helpIcon.click();
      await page.waitForTimeout(500);
      const opened = await context.takeScreenshot();

      const crossIcon = page.locator(tid('Tooltip__crossIcon'));
      await crossIcon.click();
      await page.waitForTimeout(500);
      const closed = await context.takeScreenshot();

      await context.matchImages({ focused, opened, closed });
    });
  });

  story('CounterHelpFunction', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'no themes': { in: /^(?!\b(chrome2022)\b)/ } } });
    test('base', async (context) => {
      const page = context.webdriver;
      const input = page.locator(tid('Input__root'));
      await input.click();
      await page.waitForTimeout(500);
      const helpIcon = page.locator(tid('customHelpIcon'));
      await helpIcon.hover();
      await page.waitForTimeout(500);
      await context.matchImage(await context.takeScreenshot(), 'opened');
    });
  });

  story('CounterWithSize', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'no themes': { in: /^(?!\b(chrome2022)\b)/ } } });
    test('base', async (context) => {
      const page = context.webdriver;

      await page.locator(tid('inputSmall')).click();
      await page.waitForTimeout(500);
      const small = await context.takeScreenshot();

      await page.locator(tid('inputMedium')).click();
      await page.waitForTimeout(500);
      const medium = await context.takeScreenshot();

      await page.locator(tid('inputLarge')).click();
      await page.waitForTimeout(500);
      const large = await context.takeScreenshot();

      await context.matchImages({ small, medium, large });
    });
  });

  story('CounterWithOtherProps', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'no themes': { in: /^(?!\b(chrome2022)\b)/ } } });
    test('base', async (context) => {
      const page = context.webdriver;

      await page.locator(tid('inputSuffix')).click();
      await page.waitForTimeout(500);
      const suffix = await context.takeScreenshot();

      await page.locator(tid('inputRightIcon')).click();
      await page.waitForTimeout(500);
      const rightIcon = await context.takeScreenshot();

      await page.locator(tid('inputCross')).click();
      await page.keyboard.type('Text');
      await page.waitForTimeout(500);
      const cross = await context.takeScreenshot();

      await page.locator(tid('inputCrossSuffix')).click();
      await page.keyboard.type('Text');
      await page.waitForTimeout(500);
      const crossSuffix = await context.takeScreenshot();

      await page.locator(tid('inputCrossHelp')).click();
      await page.keyboard.type('Text');
      await page.waitForTimeout(500);
      const crossHelp = await context.takeScreenshot();

      await context.matchImages({ suffix, rightIcon, cross, crossSuffix, crossHelp });
    });
  });
});
