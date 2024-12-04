import { story, kind, test } from 'creevey';

import { delay } from '../../../lib/utils';

const commonTests = () => {
  test('focus and type text', async function () {
    const screenshotElement = this.browser.findElement({
      css: '#test-element',
    });
    const autocompleteElement = this.browser.findElement({
      css: '[data-comp-name~="Autocomplete"]',
    });
    await this.browser.actions({ bridge: true }).click(autocompleteElement).sendKeys('o').perform();
    await delay(1000);
    await this.expect(await screenshotElement.takeScreenshot()).to.matchImage();
  });
};

const mobileHintsTests = () => {
  test('noInputValue', async function () {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: 'input' }))
      .perform();
    await delay(200);
    await this.expect(await this.browser.takeScreenshot()).to.matchImage('noInputValue');
  });

  test('nothingWasFound', async function () {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: 'input' }))
      .sendKeys('abc')
      .perform();
    await delay(200);
    await this.expect(await this.browser.takeScreenshot()).to.matchImage('nothingWasFound');
  });

  test('updateValue', async function () {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: 'input' }))
      .sendKeys('one')
      .perform();
    await delay(200);
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: '[data-comp-name~="MenuItem"]' }))
      .click(this.browser.findElement({ css: 'input' }))
      .perform();
    await delay(200);
    await this.expect(await this.browser.takeScreenshot()).to.matchImage('updateValue');
  });
};

const sizeTests = () => {
  test('focus and type text small', async function () {
    const screenshotElement = this.browser.findElement({
      css: '#test-element',
    });
    const autocompleteElements = await this.browser.findElements({
      css: '[data-comp-name~="Autocomplete"]',
    });
    await this.browser.actions({ bridge: true }).click(autocompleteElements[0]).sendKeys('o').perform();
    await delay(1000);
    await this.expect(await screenshotElement.takeScreenshot()).to.matchImage();
  });

  test('focus and type text medium', async function () {
    const screenshotElement = this.browser.findElement({
      css: '#test-element',
    });
    const autocompleteElements = await this.browser.findElements({
      css: '[data-comp-name~="Autocomplete"]',
    });
    await this.browser.actions({ bridge: true }).click(autocompleteElements[1]).sendKeys('o').perform();
    await delay(1000);
    await this.expect(await screenshotElement.takeScreenshot()).to.matchImage();
  });

  test('focus and type text large', async function () {
    const screenshotElement = this.browser.findElement({
      css: '#test-element',
    });
    const autocompleteElements = await this.browser.findElements({
      css: '[data-comp-name~="Autocomplete"]',
    });
    await this.browser.actions({ bridge: true }).click(autocompleteElements[2]).sendKeys('o').perform();
    await delay(1000);
    await this.expect(await screenshotElement.takeScreenshot()).to.matchImage();
  });
};

const menuPosTests = () => {
  test('focus and type text menu top', async function () {
    const screenshotElement = this.browser.findElement({ css: '#test-element' });
    const autocompleteElements = await this.browser.findElements({ css: '[data-comp-name~="Autocomplete"]' });

    await this.browser.actions({ bridge: true }).click(autocompleteElements[0]).sendKeys('o').perform();
    await delay(1000);

    await this.expect(await screenshotElement.takeScreenshot()).to.matchImage();
  });
  test('focus and type text menu bottom', async function () {
    const screenshotElement = this.browser.findElement({ css: '#test-element' });
    const autocompleteElements = await this.browser.findElements({ css: '[data-comp-name~="Autocomplete"]' });

    await this.browser.actions({ bridge: true }).click(autocompleteElements[1]).sendKeys('o').perform();
    await delay(1000);

    await this.expect(await screenshotElement.takeScreenshot()).to.matchImage();
  });
};

kind('Autocomplete', () => {
  story('Simple', () => {
    test('idle', async function () {
      await this.expect(await this.takeScreenshot()).to.matchImage('idle');
    });

    test('focused', async function () {
      const autocompleteElement = this.browser.findElement({
        css: '[data-comp-name~="Autocomplete"]',
      });
      await this.browser.actions({ bridge: true }).click(autocompleteElement).perform();
      await delay(1000);
      await this.expect(await autocompleteElement.takeScreenshot()).to.matchImage();
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
    test('opened', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: 'input' }))
        .perform();
      await delay(200);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('opened');
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

    test('opened top with portal', async function () {
      const screenshotElement = this.browser.findElement({
        css: '#test-element',
      });
      const autocompleteElement = this.browser.findElement({
        css: '[data-comp-name~="Autocomplete"]',
      });
      await this.browser.actions({ bridge: true }).click(autocompleteElement).sendKeys('o').perform();
      await delay(1000);
      await this.expect(await screenshotElement.takeScreenshot()).to.matchImage();
    });

    test('opened bottom with portal', async function () {
      const screenshotElement = this.browser.findElement({
        css: '#test-element',
      });
      const autocompleteElement = this.browser.findElement({
        css: '[data-comp-name~="Autocomplete"]',
      });
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '[data-tid~="pos"]' }))
        .click(autocompleteElement)
        .sendKeys('o')
        .perform();
      await delay(1000);
      await this.expect(await screenshotElement.takeScreenshot()).to.matchImage();
    });
  });

  story('WithOnBlurOnFocusHandlers', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'no themes': { in: /^(?!\b(chrome2022)\b)/ },
      },
    });

    test('idle-focus-input-select(blur) on keys', async function () {
      const idle = await this.takeScreenshot();

      await this.browser.actions({ bridge: true }).keyDown(this.keys.TAB).perform();
      const focus = await this.takeScreenshot();

      await this.browser.actions({ bridge: true }).sendKeys('a').perform();
      const input = await this.takeScreenshot();

      await this.browser.actions({ bridge: true }).keyDown(this.keys.ARROW_DOWN).keyDown(this.keys.ENTER).perform();
      const select = await this.takeScreenshot();

      await this.expect({ idle, focus, input, select }).to.matchImages();
    });

    test('idle-focus-input-select(blur) on click', async function () {
      const idle = await this.takeScreenshot();

      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '[data-comp-name~="Autocomplete"]' }))
        .perform();
      const focus = await this.takeScreenshot();

      await this.browser.actions({ bridge: true }).sendKeys('a').perform();
      const input = await this.takeScreenshot();

      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '[data-comp-name~="MenuItem"]' }))
        .perform();
      const select = await this.takeScreenshot();

      await this.expect({ idle, focus, input, select }).to.matchImages();
    });

    test('idle-focus-input-blur on clickOutside', async function () {
      const idle = await this.takeScreenshot();

      await this.browser.actions({ bridge: true }).keyDown(this.keys.TAB).perform();
      const focus = await this.takeScreenshot();

      await this.browser.actions({ bridge: true }).sendKeys('a').perform();
      const input = await this.takeScreenshot();

      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: 'body' }))
        .perform();
      const blur = await this.takeScreenshot();

      await this.expect({ idle, focus, input, blur }).to.matchImages();
    });

    test('idle-focus-input-blur on input.blur()', async function () {
      const idle = await this.takeScreenshot();

      await this.browser.actions({ bridge: true }).keyDown(this.keys.TAB).perform();
      const focus = await this.takeScreenshot();

      await this.browser.actions({ bridge: true }).sendKeys('a').perform();
      const input = await this.takeScreenshot();

      await this.browser.executeScript(() => {
        document.querySelector('input')?.blur();
      });
      const blur = await this.takeScreenshot();

      await this.expect({ idle, focus, input, blur }).to.matchImages();
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
});
