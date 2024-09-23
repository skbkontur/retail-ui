import { story, kind, test } from 'creevey';

import { delay } from '../../../lib/utils';

const clickedTest = () => {
  test('clicked', async function () {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: '[data-comp-name~="Select"]' }))
      .perform();
    await delay(1000);
    await this.expect(await this.takeScreenshot()).to.matchImage('clicked');
  });
};

const selectTests = () => {
  test('idle', async function () {
    await delay(1000);
    await this.expect(await this.takeScreenshot()).to.matchImage('idle');
  });

  test('clickedTest', async function () {
    clickedTest;
  });

  test('MenuItem hover', async function () {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: '[data-comp-name~="Select"]' }))
      .perform();
    await this.browser
      .actions({
        bridge: true,
      })
      .move({
        origin: this.browser.findElement({ css: '[data-comp-name~="MenuItem"]' }),
      })
      .perform();
    await delay(1000);
    await this.expect(await this.takeScreenshot()).to.matchImage('MenuItem hover');
  });

  test('selected item', async function () {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: '[data-comp-name~="Select"]' }))
      .perform();
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: '[data-comp-name~="MenuItem"]' }))
      .perform();
    await delay(1000);
    await this.expect(await this.takeScreenshot()).to.matchImage('selected item');
  });
};

kind('Select', () => {
  story('Simple', ({ setStoryParameters }) => {
    setStoryParameters({
      captureElement: '.dropdown-test-container',
      skip: {
        'hover does not work in chrome': { in: ['chrome2022', 'chrome2022Dark'], tests: ['MenuItem hover'] },
      },
    });

    selectTests();
  });

  story('MobileWithSearch', () => {
    clickedTest();
  });

  story('MobileWithTitle', () => {
    clickedTest();
  });

  story('MobileWithTitleAndSearch', () => {
    clickedTest();
  });

  story('MobileWithoutTitleAndSearch', () => {
    clickedTest();
  });

  story('UseLink', ({ setStoryParameters }) => {
    setStoryParameters({
      captureElement: '.dropdown-test-container',
      skip: {
        'hover does not work in chrome': { in: ['chrome2022', 'chrome2022Dark'], tests: ['MenuItem hover'] },
      },
    });

    selectTests();
  });

  story('UseLinkWithIcon', ({ setStoryParameters }) => {
    setStoryParameters({
      captureElement: '.dropdown-test-container',
      skip: {
        'hover does not work in chrome': { in: ['chrome2022', 'chrome2022Dark'], tests: ['MenuItem hover'] },
      },
    });

    selectTests();
  });

  story('WithTextOverflow', ({ setStoryParameters }) => {
    setStoryParameters({
      captureElement: '.dropdown-test-container',
      skip: {
        'hover does not work in chrome': { in: ['chrome2022', 'chrome2022Dark'], tests: ['MenuItem hover'] },
      },
    });

    selectTests();
  });

  story('UsingOnKeyDown', () => {
    test('press Enter', async function () {
      const element = await this.browser.findElement({ css: '.dropdown-test-container' });
      await this.browser
        .actions({
          bridge: true,
        })
        .sendKeys(this.keys.TAB)
        .sendKeys(this.keys.ENTER)
        .sendKeys(this.keys.ARROW_DOWN)
        .sendKeys(this.keys.ENTER)
        .perform();
      await delay(1000);
      await this.expect(await element.takeScreenshot()).to.matchImage('press Enter');
    });
  });

  story('WithSearchAndVariousWidth', ({ setStoryParameters }) => {
    setStoryParameters({
      captureElement: '#test-element',
      skip: {
        flaky: { in: ['chrome2022', 'chrome2022Dark'] },
      },
    });

    test('search', async function () {
      const root = await this.browser.findElement({ css: '[data-tid="root"]' });
      const select = await this.browser.findElement({ css: '[data-comp-name~="Select"]' });
      await this.browser
        .actions({
          bridge: true,
        })
        .click(select)
        .pause(500)
        .perform();
      const plainSearch = await root.takeScreenshot();
      await this.browser
        .actions({
          bridge: true,
        })
        .sendKeys(this.keys.ARROW_DOWN)
        .pause(500)
        .perform();
      const pressKeyDown = await root.takeScreenshot();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="Input"]' }))
        .sendKeys('test')
        .pause(500)
        .perform();
      const fullFieldSearch = await root.takeScreenshot();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(select)
        .click(select)
        .pause(500)
        .perform();
      const emptySearch = await root.takeScreenshot();
      await this.expect({ plainSearch, pressKeyDown, fullFieldSearch, emptySearch }).to.matchImages();
    });

    test('and various width', async function () {
      const root = await this.browser.findElement({ css: '[data-tid="root"]' });
      await this.browser
        .actions({ bridge: true })
        .click(await this.browser.findElement({ css: '[data-tid="w100px"]' }))
        .pause(500)
        .perform();
      const w100px = await root.takeScreenshot();
      await this.browser
        .actions({ bridge: true })
        .click(await this.browser.findElement({ css: '[data-tid="w300px"]' }))
        .pause(500)
        .perform();
      const w300px = await root.takeScreenshot();
      await this.browser
        .actions({ bridge: true })
        .click(await this.browser.findElement({ css: '[data-tid="w100prc"]' }))
        .pause(500)
        .perform();
      const w100prc = await root.takeScreenshot();
      await this.expect({ w100px, w300px, w100prc }).to.matchImages();
    });
  });

  story('WithMenuAlignAndVariousWidth', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'no themes': { in: /^(?!\b(chrome)\b)/ } } });

    test('open', async function () {
      const root = await this.browser.findElement({ css: '#test-element' });
      await delay(1000);
      await this.expect(await root.takeScreenshot()).to.matchImage();
    });
  });

  story('WithManualPosition', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'no themes': { in: /^(?!\b(chrome2022|firefox2022)\b)/ } } });

    test('opened top with portal', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="Select"]' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('opened top with portal');
    });

    test('opened bottom with portal', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid~="pos"]' }))
        .pause(1000)
        .click(this.browser.findElement({ css: '[data-comp-name~="Select"]' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('opened bottom with portal');
    });

    test('opened top without portal', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid~="portal"]' }))
        .pause(1000)
        .click(this.browser.findElement({ css: '[data-comp-name~="Select"]' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('opened top without portal');
    });

    test('opened bottom without portal', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid~="portal"]' }))
        .pause(1000)
        .click(this.browser.findElement({ css: '[data-tid~="pos"]' }))
        .pause(1000)
        .click(this.browser.findElement({ css: '[data-comp-name~="Select"]' }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('opened bottom without portal');
    });
  });

  story('Size', () => {
    test('ClickedAll', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid="open-all"]' }))
        .pause(500)
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('ClickedAll');
    });
  });
});
