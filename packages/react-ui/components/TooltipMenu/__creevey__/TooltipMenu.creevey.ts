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

kind('TooltipMenu', () => {
  story('SimpleExample', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'story-skip-0': {
          in: ['chrome2022', 'chrome2022Dark'],
          tests: ['clickAfterClickedOnCaption', 'clicked'],
        },

        flaky: { in: ['firefox2022', 'firefox2022Dark'], tests: ['tabPress'] },
      },
    });

    test('plain', async function () {
      await this.expect(await this.takeScreenshot()).to.matchImage('plain');
    });

    test('clickAfterClickedOnCaption', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="PopupMenu"]' }))
        .click(this.browser.findElement({ css: '[data-comp-name~="PopupMenu"]' }))
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('clickAfterClickedOnCaption');
    });

    test('clicked', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="PopupMenu"]' }))
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('clicked');
    });

    test('clickedOutside', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="PopupMenu"]' }))
        .click(this.browser.findElement({ css: 'body' }))
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('clickedOutside');
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

    test('escapePress', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .sendKeys(this.keys.TAB)
        .sendKeys(this.keys.ENTER)
        .sendKeys(this.keys.ESCAPE)
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage('escapePress');
    });
  });

  story('MobileExampleHorizontalPaddings', ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: null });

    test('opened', async function () {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '#test-element' }))
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
