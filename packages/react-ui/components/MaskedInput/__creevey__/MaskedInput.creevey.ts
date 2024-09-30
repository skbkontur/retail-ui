import { story, kind, test } from 'creevey';

const testIdleFocusEditBlur = () => {
  test('idle, focus, edit, blur', async function () {
    const click = (css: string) => {
      return this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css }));
    };
    const idle = await this.takeScreenshot();

    await click('input').pause(500).perform();
    const focused = await this.takeScreenshot();

    await click('input').sendKeys('953').perform();
    const edited = await this.takeScreenshot();

    await click('body').perform();
    const blured = await this.takeScreenshot();

    await this.expect({ idle, focused, edited, blured }).to.matchImages();
  });
};

const testIdleFocusAppendRemoveBlur = () => {
  test('idle, focus, edit, blur', async function () {
    const click = (css: string) => {
      return this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css }));
    };

    const idle = await this.takeScreenshot();

    await click('input').pause(500).perform();
    const focused = await this.takeScreenshot();

    await click('input').sendKeys('953').perform();
    const appended = await this.takeScreenshot();

    await click('input')
      .sendKeys(this.keys.BACK_SPACE)
      .sendKeys(this.keys.BACK_SPACE)
      .sendKeys(this.keys.BACK_SPACE)
      .perform();
    const restored = await this.takeScreenshot();

    await click('body').perform();
    const blured = await this.takeScreenshot();

    await this.expect({ idle, focused, appended, restored, blured }).to.matchImages();
  });
};

const testIdleFocusBlur = () => {
  test('idle, focus, blur', async function () {
    const click = (css: string) => {
      return this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css }));
    };

    const idle = await this.takeScreenshot();

    await click('input').pause(500).perform();
    const focused = await this.takeScreenshot();

    await click('body').perform();
    const blured = await this.takeScreenshot();

    await this.expect({ idle, focused, blured }).to.matchImages();
  });
};

const testRewriteInMiddle = () => {
  test('idle, shift, rewrite', async function () {
    const idle = await this.takeScreenshot();

    const input = await this.browser.findElement({ css: 'input' });
    this.browser
      .actions({ bridge: true })
      .click(input)
      .keyDown(this.keys.ARROW_LEFT)
      .keyDown(this.keys.ARROW_LEFT)
      .sendKeys('12')
      .perform();
    const shift = await this.takeScreenshot();

    this.browser
      .actions({ bridge: true })
      .click(input)
      .keyDown(this.keys.ARROW_LEFT)
      .keyDown(this.keys.ARROW_LEFT)
      .sendKeys('56')
      .perform();
    const rewrite = await this.takeScreenshot();

    await this.expect({ idle, shift, rewrite }).to.matchImages();
  });
};

kind('MaskedInput', () => {
  story('Default', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'other themes will become deprecated': { in: /^(?!.*2022.*)/ } },
    });
    testIdleFocusEditBlur();
  });

  story('IdleFocusEditBlurWithPlaceholder', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'other themes will become deprecated': { in: /^(?!.*2022.*)/ } },
    });
    testIdleFocusEditBlur();
  });

  story('IdleFocusBlurWithPlaceholder', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'other themes will become deprecated': { in: /^(?!.*2022.*)/ } },
    });
    testIdleFocusBlur();
  });

  story('IdleFocusAppendRemoveBlurWithPlaceholder', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'other themes will become deprecated': { in: /^(?!.*2022.*)/ } },
    });
    testIdleFocusAppendRemoveBlur();
  });

  story('IdleFocusBlurWithPrefix', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'other themes will become deprecated': { in: /^(?!.*2022.*)/ } },
    });
    testIdleFocusBlur();
  });

  story('WithCustomUnmaskedValue', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'other themes will become deprecated': { in: /^(?!.*2022.*)/ } },
    });
    testIdleFocusEditBlur();
  });

  story('WithUnmaskedAndFixedValue', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'other themes will become deprecated': { in: 'chrome2022Dark' } },
    });
    testIdleFocusAppendRemoveBlur();
  });

  story('IdleFocusBlurAndUncontrolled', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'other themes will become deprecated': { in: /^(?!.*2022.*)/ } },
    });
    testIdleFocusEditBlur();
  });

  story('RewriteInMiddle', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'other themes will become deprecated': { in: /^(?!.*2022.*)/ } },
    });
    testRewriteInMiddle();
  });

  story('SelectAllByProp', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'other themes will become deprecated': { in: 'firefox2022Dark' } },
    });
    test('Plain focused', async function () {
      const idle = await this.takeScreenshot();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: 'input' }))
        .pause(500)
        .perform();
      const select_half = await this.takeScreenshot();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: 'body' }))
        .click(this.browser.findElement({ css: 'input' }))
        .sendKeys('1234')
        .click(this.browser.findElement({ css: 'body' }))
        .click(this.browser.findElement({ css: 'input' }))
        .pause(500)
        .perform();
      const select_all = await this.takeScreenshot();
      await this.expect({ idle, select_half, select_all }).to.matchImages();
    });
  });

  story('SelectAllByButton', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'other themes will become deprecated': { in: /^(?!.*2022.*)/ } },
    });
    test('Plain focused', async function () {
      const plain = await this.takeScreenshot();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid~="select-all"]' }))
        .perform();
      const select_all = await this.takeScreenshot();
      await this.expect({ plain, select_all }).to.matchImages();
    });
  });

  story('IdleFocusBlurAndUncontrolledWithDefaultValue', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: true,
    });
  });
});
