import { story, kind, test } from 'creevey';

import { PopupMenuDataTids } from '../../../internal/PopupMenu';
import { delay } from '../../../lib/utils';
const textAlignmentTests = () => {
  test('opened', async function () {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: `[data-tid~="${PopupMenuDataTids.caption}"]` }))
      .perform();
    await delay(1000);
    await this.expect(await this.takeScreenshot()).to.matchImage('opened');
  });
};

const kebabTests = () => {
  test('plain', async function () {
    await this.expect(await this.takeScreenshot()).to.matchImage('plain');
  });

  test('hovered', async function () {
    await this.browser
      .actions({
        bridge: true,
      })
      .move({
        origin: this.browser.findElement({ css: '[data-comp-name~="Kebab"]' }),
      })
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('hovered');
  });

  test('clicked', async function () {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: '[data-comp-name~="Kebab"]' }))
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('clicked');
  });

  test('clickedOnButton2ndTime', async function () {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: '[data-comp-name~="Kebab"]' }))
      .click(this.browser.findElement({ css: '[data-comp-name~="Kebab"]' }))
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('clickedOnButton2ndTime');
  });

  test('tabPress', async function () {
    await this.browser
      .actions({
        bridge: true,
      })
      .sendKeys(this.keys.TAB)
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('tabPress');
  });

  test('enterPress', async function () {
    await this.browser
      .actions({
        bridge: true,
      })
      .sendKeys(this.keys.TAB)
      .sendKeys(this.keys.ENTER)
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('enterPress');
  });
};

kind('Kebab', () => {
  story('Small', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'hover does not work in chrome': {
          in: ['chrome2022', 'chrome2022Dark'],
          tests: ['hovered', 'clickedOnButton2ndTime'],
        },
      },
    });

    kebabTests();
  });

  story('Medium', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'hover does not work in chrome': {
          in: ['chrome2022', 'chrome2022Dark'],
          tests: ['hovered', 'clickedOnButton2ndTime'],
        },
      },
    });

    kebabTests();
  });

  story('Large', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'hover does not work in chrome': {
          in: ['chrome2022', 'chrome2022Dark'],
          tests: ['hovered', 'clickedOnButton2ndTime'],
        },
      },
    });

    kebabTests();
  });

  story('MobileExampleWithHorizontalPadding', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: null });

    test('opened', async function () {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '[data-comp-name~="Kebab"]' }))
        .perform();
      await delay(200);
      await this.browser
        .actions({ bridge: true })
        .move({ origin: this.browser.findElement({ css: '[data-comp-name~="MenuItem"]' }) })
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage('opened');
    });
  });
  story('WithItemsAndIcons', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'themes dont affect logic': { in: /^(?!\bchrome2022\b)/ } } });

    textAlignmentTests();
  });

  story('WithItemsAndIconsWithoutTextAlignment', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'themes dont affect logic': { in: /^(?!\bchrome2022\b)/ } } });

    textAlignmentTests();
  });
});
