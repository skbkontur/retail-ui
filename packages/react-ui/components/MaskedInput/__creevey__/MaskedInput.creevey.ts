import { story, kind, test } from 'creevey';

const testMaskedInput = () => {
  test('idle, focus, edit, blur', async function () {
    const click = (css: string) => {
      return this.browser
        .actions({
          async: undefined, bridge: true,
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

const testIdleFocusBlur = () => {
  test('idle, focus, blur', async function () {
    const click = (css: string) => {
      return this.browser
        .actions({
          async: undefined, bridge: true,
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
      .actions({ async: undefined, bridge: true })
      .click(input)
      .keyDown(this.keys.ARROW_LEFT)
      .keyDown(this.keys.ARROW_LEFT)
      .sendKeys('12')
      .perform();
    const shift = await this.takeScreenshot();
    this.browser
      .actions({ async: undefined, bridge: true })
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
      skip: { "themes don't affect logic": { in: /^(?!\bchrome\b|\bfirefox\b|\bie11\b)/ } },
    });
    testMaskedInput();
  });

  story('IdleFocusBlur', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { "themes don't affect logic": { in: /^(?!\bchrome\b|\bfirefox\b|\bie11\b)/ } },
    });
    testIdleFocusBlur();
  });

  story('IdleFocusBlurWithPrefix', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { "themes don't affect logic": { in: /^(?!\bchrome\b|\bfirefox\b|\bie11\b)/ } },
    });
    testIdleFocusBlur();
  });

  story('WithCustomUnmaskedValue', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { "themes don't affect logic": { in: /^(?!\bchrome\b)/ } },
    });
    testMaskedInput();
  });

  story('SelectAllByProp', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { "themes don't affect logic": { in: /^(?!\bchrome\b|\bfirefox\b|\bie11\b)/ } },
    });
    test('Plain focused', async function () {
      const plain = await this.takeScreenshot();
      await this.browser
        .actions({
          async: undefined, bridge: true,
        })
        .click(this.browser.findElement({ css: 'label' }))
        .perform();
      const focused = await this.takeScreenshot();
      await this.expect({ plain, focused }).to.matchImages();
    });
  });

  story('SelectAllByButton', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { "themes don't affect logic": { in: /^(?!\bchrome\b|\bfirefox\b|\bie11\b)/ } },
    });
    test('Plain, selected', async function () {
      const plain = await this.takeScreenshot();
      await this.browser
        .actions({
          async: undefined, bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid~="select-all"]' }))
        .perform();
      const selected = await this.takeScreenshot();
      await this.expect({ plain, selected }).to.matchImages();
    });
  });

  story('UncontrolledInputWithPlaceholder', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { "themes don't affect logic": { in: /^(?!\bchrome\b|\bfirefox\b|\bie11\b)/ } },
    });
    test('PlainAndTyped', async function () {
      const plain = await this.takeScreenshot();
      await this.browser
        .actions({
          async: undefined, bridge: true,
        })
        .click(this.browser.findElement({ css: 'input' }))
        .sendKeys('text')
        .perform();
      const typed = await this.takeScreenshot();
      await this.expect({ plain, typed }).to.matchImages();
    });
  });

  story('RewriteInMiddle', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { "themes don't affect logic": { in: /^(?!\bchrome\b)/ } },
    });
    testRewriteInMiddle();
  });
});
