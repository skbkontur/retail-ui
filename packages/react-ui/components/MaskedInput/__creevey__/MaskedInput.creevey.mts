import { story, kind, test } from 'creevey';
import { Key } from 'selenium-webdriver';

import { delay } from '../../../lib/delay';

const testIdleFocusEditBlur = () => {
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

const testIdleFocusAppendRemoveBlur = () => {
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
    const appended = await context.takeScreenshot();

    await click('input').sendKeys(Key.BACK_SPACE).sendKeys(Key.BACK_SPACE).sendKeys(Key.BACK_SPACE).perform();
    const restored = await context.takeScreenshot();

    await click('body').perform();
    const blured = await context.takeScreenshot();

    await context.matchImages({ idle, focused, appended, restored, blured });
  });
};

const testIdleFocusBlur = () => {
  test('idle, focus, blur', async (context) => {
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

    await click('body').perform();
    const blured = await context.takeScreenshot();

    await context.matchImages({ idle, focused, blured });
  });
};

const testRewriteInMiddle = () => {
  test('idle, shift, rewrite', async (context) => {
    const click = (css: string) => {
      return context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css }))
        .pause(500);
    };

    const idle = await context.takeScreenshot();

    click('input').keyDown(Key.ARROW_LEFT).keyDown(Key.ARROW_LEFT).sendKeys('12').perform();
    const shift = await context.takeScreenshot();

    click('body');

    click('input').keyDown(Key.ARROW_LEFT).keyDown(Key.ARROW_LEFT).sendKeys('56').perform();
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
    setStoryParameters({
      skip: { 'enough basic themes': { in: /^(?!^(?:chrome2022|firefox2022)$)/ } },
    });
    test('Plain focused', async (context) => {
      const idle = await context.takeScreenshot();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: 'input' }))
        .pause(1000)
        .perform();
      const select_half = await context.takeScreenshot();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: 'body' }))
        .click(context.webdriver.findElement({ css: 'input' }))
        .pause(1000)
        .sendKeys('1')
        .sendKeys('2')
        .sendKeys('3')
        .sendKeys('4')
        .pause(1000)
        .click(context.webdriver.findElement({ css: 'body' }))
        .click(context.webdriver.findElement({ css: 'input' }))
        .pause(1000)
        .perform();
      const select_all = await context.takeScreenshot();
      await context.matchImages({ idle, select_half, select_all });
    });
  });

  story('SelectAllByButton', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: true, // flaky
    });
    test('Plain focused', async (context) => {
      const plain = await context.takeScreenshot();
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid~="select-all"]' }))
        .perform();
      await delay(500);
      const select_all = await context.takeScreenshot();
      await context.matchImages({ plain, select_all });
    });
  });
});
