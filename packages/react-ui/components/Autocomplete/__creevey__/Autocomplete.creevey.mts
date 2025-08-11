import { story, kind, test } from 'creevey';

import { delay } from '../../../lib/delay.mjs';

const commonTests = () => {
  test('focus and type text', async (context) => {
    const screenshotElement = context.webdriver.findElement({
      css: '#test-element',
    });
    const autocompleteElement = context.webdriver.findElement({
      css: '[data-comp-name~="Autocomplete"]',
    });
    await context.webdriver.actions({ bridge: true }).click(autocompleteElement).sendKeys('o').perform();
    await delay(1000);
    await context.matchImage(await screenshotElement.takeScreenshot());
  });
};

const mobileHintsTests = () => {
  test('noInputValue', async (context) => {
    await context.webdriver
      .actions({
        bridge: true,
      })
      .click(context.webdriver.findElement({ css: 'input' }))
      .perform();
    await delay(200);
    await context.matchImage(await context.webdriver.takeScreenshot(), 'noInputValue');
  });

  test('nothingWasFound', async (context) => {
    await context.webdriver
      .actions({
        bridge: true,
      })
      .click(context.webdriver.findElement({ css: 'input' }))
      .sendKeys('abc')
      .perform();
    await delay(200);
    await context.matchImage(await context.webdriver.takeScreenshot(), 'nothingWasFound');
  });

  test('updateValue', async (context) => {
    await context.webdriver
      .actions({
        bridge: true,
      })
      .click(context.webdriver.findElement({ css: 'input' }))
      .sendKeys('one')
      .perform();
    await delay(200);
    await context.webdriver
      .actions({
        bridge: true,
      })
      .click(context.webdriver.findElement({ css: '[data-comp-name~="MenuItem"]' }))
      .click(context.webdriver.findElement({ css: 'input' }))
      .perform();
    await delay(200);
    await context.matchImage(await context.webdriver.takeScreenshot(), 'updateValue');
  });
};

const sizeTests = () => {
  test('focus and type text small', async (context) => {
    const screenshotElement = context.webdriver.findElement({
      css: '#test-element',
    });
    const autocompleteElements = await context.webdriver.findElements({
      css: '[data-comp-name~="Autocomplete"]',
    });
    await context.webdriver.actions({ bridge: true }).click(autocompleteElements[0]).sendKeys('o').perform();
    await delay(1000);
    await context.matchImage(await screenshotElement.takeScreenshot());
  });

  test('focus and type text medium', async (context) => {
    const screenshotElement = context.webdriver.findElement({
      css: '#test-element',
    });
    const autocompleteElements = await context.webdriver.findElements({
      css: '[data-comp-name~="Autocomplete"]',
    });
    await context.webdriver.actions({ bridge: true }).click(autocompleteElements[1]).sendKeys('o').perform();
    await delay(1000);
    await context.matchImage(await screenshotElement.takeScreenshot());
  });

  test('focus and type text large', async (context) => {
    const screenshotElement = context.webdriver.findElement({
      css: '#test-element',
    });
    const autocompleteElements = await context.webdriver.findElements({
      css: '[data-comp-name~="Autocomplete"]',
    });
    await context.webdriver.actions({ bridge: true }).click(autocompleteElements[2]).sendKeys('o').perform();
    await delay(1000);
    await context.matchImage(await screenshotElement.takeScreenshot());
  });
};

const menuPosTests = () => {
  test('focus and type text menu top', async (context) => {
    const screenshotElement = context.webdriver.findElement({ css: '#test-element' });
    const autocompleteElements = await context.webdriver.findElements({ css: '[data-comp-name~="Autocomplete"]' });

    await context.webdriver.actions({ bridge: true }).click(autocompleteElements[0]).sendKeys('o').perform();
    await delay(1000);

    await context.matchImage(await screenshotElement.takeScreenshot());
  });
  test('focus and type text menu bottom', async (context) => {
    const screenshotElement = context.webdriver.findElement({ css: '#test-element' });
    const autocompleteElements = await context.webdriver.findElements({ css: '[data-comp-name~="Autocomplete"]' });

    await context.webdriver.actions({ bridge: true }).click(autocompleteElements[1]).sendKeys('o').perform();
    await delay(1000);

    await context.matchImage(await screenshotElement.takeScreenshot());
  });
};

kind('Autocomplete', () => {
  story('Simple', () => {
    test('idle', async (context) => {
      await context.matchImage(await context.takeScreenshot(), 'idle');
    });

    test('focused', async (context) => {
      const autocompleteElement = context.webdriver.findElement({
        css: '[data-comp-name~="Autocomplete"]',
      });
      await context.webdriver.actions({ bridge: true }).click(autocompleteElement).perform();
      await delay(1000);
      await context.matchImage(await autocompleteElement.takeScreenshot());
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

  story('MobileHints', () => {
    mobileHintsTests();
  });

  story('MobileHintsEN', () => {
    mobileHintsTests();
  });

  story('MobileWithTitle', () => {
    test('opened', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: 'input' }))
        .perform();
      await delay(200);
      await context.matchImage(await context.webdriver.takeScreenshot(), 'opened');
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
      const screenshotElement = context.webdriver.findElement({
        css: '#test-element',
      });
      const autocompleteElement = context.webdriver.findElement({
        css: '[data-comp-name~="Autocomplete"]',
      });
      await context.webdriver.actions({ bridge: true }).click(autocompleteElement).sendKeys('o').perform();
      await delay(1000);
      await context.matchImage(await screenshotElement.takeScreenshot());
    });

    test('opened bottom with portal', async (context) => {
      const screenshotElement = context.webdriver.findElement({
        css: '#test-element',
      });
      const autocompleteElement = context.webdriver.findElement({
        css: '[data-comp-name~="Autocomplete"]',
      });
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: '[data-tid~="pos"]' }))
        .click(autocompleteElement)
        .sendKeys('o')
        .perform();
      await delay(1000);
      await context.matchImage(await screenshotElement.takeScreenshot());
    });
  });

  story('Size', () => {
    sizeTests();
  });

  story('WithDisabledPortal', () => {
    commonTests();
    menuPosTests();
  });

  story('MenuPos', () => {
    menuPosTests();
  });

  story('WithPercentageMenuWidth', () => {
    commonTests();
  });
});
