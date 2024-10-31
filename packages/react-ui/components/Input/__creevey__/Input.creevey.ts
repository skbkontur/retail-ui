import { story, kind, test } from 'creevey';

import { delay } from '../../../lib/utils';

const differentStatesTest = () => {
  test('Plain', async function () {
    const element = await this.browser.findElement({ css: '#input' });
    await this.expect(await element.takeScreenshot()).to.matchImage('Plain');
  });

  test('Focused', async function () {
    const element = await this.browser.findElement({ css: '#input' });
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: '#input input' }))
      .pause(500)
      .perform();
    await this.expect(await element.takeScreenshot()).to.matchImage('Focused');
  });

  test('With typed text', async function () {
    const element = await this.browser.findElement({ css: '#input' });
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: '#input input' }))
      .sendKeys('Test...')
      .pause(500)
      .perform();
    await this.expect(await element.takeScreenshot()).to.matchImage('With typed text');
  });

  test('With long typed text', async function () {
    const element = await this.browser.findElement({ css: '#input' });
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: '#input input' }))
      .sendKeys('Test...')
      .sendKeys('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
      .pause(500)
      .perform();
    await this.expect(await element.takeScreenshot()).to.matchImage('With long typed text');
  });
};

const testMaskedInput = () => {
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
    test('Plain', async function () {
      await this.expect(await this.takeScreenshot()).to.matchImage('Plain');
    });

    test('Focused', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: 'label' }))
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('Focused');
    });
  });

  story('SelectAllByButton', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { "themes don't affect logic": { in: /^(?!\b(chrome2022|firefox2022)\b)/ } },
    });
    test('Plain', async function () {
      await this.expect(await this.takeScreenshot()).to.matchImage('Plain');
    });

    test('Selected', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid~="select-all"]' }))
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('Selected');
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
    test('PlainAndTyped', async function () {
      const plain = await this.takeScreenshot();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: 'input' }))
        .sendKeys('text')
        .perform();
      const typed = await this.takeScreenshot();
      await this.expect({ plain, typed }).to.matchImages();
    });
  });

  story('WithMaskAndSelectAllProp', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { "themes don't affect logic": { in: /^(?!\bchrome2022\b)/ } } });

    test('PlainAndSelected', async function () {
      const plain = await this.takeScreenshot();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: 'input' }))
        .pause(500)
        .perform();
      const selectAllHalfFilledInput = await this.takeScreenshot();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: 'input' }))
        .sendKeys('1111')
        .click(this.browser.findElement({ css: 'body' }))
        .click(this.browser.findElement({ css: 'input' }))
        .pause(500)
        .perform();
      const selectAllFilledInput = await this.takeScreenshot();
      await this.expect({ plain, selectAllHalfFilledInput, selectAllFilledInput }).to.matchImages();
    });
  });

  story('SearchTypeApi', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'tests only stable in chrome': { in: /^(?!\bchrome2022\b|\bchrome2022Dark\b)/ },
      },
    });

    test('Focused', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: 'label' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('Focused');
    });
  });

  story('InputTypeApi', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        "themes don't affect logic": { in: /^(?!\b(chrome|firefox)(2022).*\b)/ },
      },
    });

    test('Focused', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: 'label' }))
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('Focused');
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
