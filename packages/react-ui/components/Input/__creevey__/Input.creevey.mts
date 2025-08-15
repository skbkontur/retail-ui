import { story, kind, test } from 'creevey';

import { delay } from '../../../lib/delay.mjs';

const differentStatesTest = () => {
  test('Plain', async (context) => {
    const element = await context.webdriver.findElement({ css: '#input' });
    await context.matchImage(await element.takeScreenshot(), 'Plain');
  });

  test('Focused', async (context) => {
    const element = await context.webdriver.findElement({ css: '#input' });
    await context.webdriver
      .actions({
        bridge: true,
      })
      .click(context.webdriver.findElement({ css: '#input input' }))
      .pause(500)
      .perform();
    await context.matchImage(await element.takeScreenshot(), 'Focused');
  });

  test('With typed text', async (context) => {
    const element = await context.webdriver.findElement({ css: '#input' });
    await context.webdriver
      .actions({
        bridge: true,
      })
      .click(context.webdriver.findElement({ css: '#input input' }))
      .sendKeys('Test...')
      .pause(500)
      .perform();
    await context.matchImage(await element.takeScreenshot(), 'With typed text');
  });

  test('With long typed text', async (context) => {
    const element = await context.webdriver.findElement({ css: '#input' });
    await context.webdriver
      .actions({
        bridge: true,
      })
      .click(context.webdriver.findElement({ css: '#input input' }))
      .sendKeys('Test...')
      .sendKeys('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
      .pause(500)
      .perform();
    await context.matchImage(await element.takeScreenshot(), 'With long typed text');
  });
};

const testMaskedInput = () => {
  test('idle, focus, edit, blur', async (context) => {
    const click = (css: string) => {
      return context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css }));
    };
    const idle = await context.takeScreenshot();
    await click('input').pause(500).perform();
    const focused = await context.takeScreenshot();
    await click('input').sendKeys('953').perform();
    const edited = await context.takeScreenshot();
    await click('body').perform();
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
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: 'label' }))
        .perform();
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
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid~="select-all"]' }))
        .perform();
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
      const plain = await context.takeScreenshot();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: 'input' }))
        .sendKeys('text')
        .perform();
      const typed = await context.takeScreenshot();
      await context.matchImages({ plain, typed });
    });
  });

  story('WithMaskAndSelectAllProp', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { "themes don't affect logic": { in: /^(?!\bchrome2022\b)/ } } });

    test('PlainAndSelected', async (context) => {
      const plain = await context.takeScreenshot();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: 'input' }))
        .pause(500)
        .perform();
      const selectAllHalfFilledInput = await context.takeScreenshot();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: 'input' }))
        .sendKeys('1111')
        .click(context.webdriver.findElement({ css: 'body' }))
        .click(context.webdriver.findElement({ css: 'input' }))
        .pause(500)
        .perform();
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
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: 'label' }))
        .perform();
      await delay(1000);
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
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: 'label' }))
        .perform();
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
