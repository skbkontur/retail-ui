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
    await this.browser.actions({ async: undefined, bridge: true }).click(autocompleteElement).sendKeys('o').perform();
    await delay(1000);
    await this.expect(await screenshotElement.takeScreenshot()).to.matchImage();
  });
};

const mobileHintsTests = () => {
  test('noInputValue', async function () {
    await this.browser
      .actions({
        async: undefined, bridge: true,
      })
      .click(this.browser.findElement({ css: 'input' }))
      .perform();
    await delay(200);
    await this.expect(await this.browser.takeScreenshot()).to.matchImage('noInputValue');
  });

  test('nothingWasFound', async function () {
    await this.browser
      .actions({
        async: undefined, bridge: true,
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
        async: undefined, bridge: true,
      })
      .click(this.browser.findElement({ css: 'input' }))
      .sendKeys('one')
      .perform();
    await delay(200);
    await this.browser
      .actions({
        async: undefined, bridge: true,
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
    await this.browser.actions({ async: undefined, bridge: true }).click(autocompleteElements[0]).sendKeys('o').perform();
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
    await this.browser.actions({ async: undefined, bridge: true }).click(autocompleteElements[1]).sendKeys('o').perform();
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
    await this.browser.actions({ async: undefined, bridge: true }).click(autocompleteElements[2]).sendKeys('o').perform();
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
      await this.browser.actions({ async: undefined, bridge: true }).click(autocompleteElement).perform();
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
          async: undefined, bridge: true,
        })
        .click(this.browser.findElement({ css: 'input' }))
        .perform();
      await delay(200);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('opened');
    });
  });

  story('WithManualPosition', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'no themes': { in: /^(?!\b(chrome|firefox)\b)/ } },
    });

    test('opened top with portal', async function () {
      const screenshotElement = this.browser.findElement({
        css: '#test-element',
      });
      const autocompleteElement = this.browser.findElement({
        css: '[data-comp-name~="Autocomplete"]',
      });
      await this.browser.actions({ async: undefined, bridge: true }).click(autocompleteElement).sendKeys('o').perform();
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
        .actions({ async: undefined, bridge: true })
        .click(this.browser.findElement({ css: '[data-tid~="pos"]' }))
        .click(autocompleteElement)
        .sendKeys('o')
        .perform();
      await delay(1000);
      await this.expect(await screenshotElement.takeScreenshot()).to.matchImage();
    });
  });

  story('Size', () => {
    sizeTests();
  });
});
