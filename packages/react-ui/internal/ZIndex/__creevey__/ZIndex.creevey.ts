import { story, kind, test } from 'creevey';

import { delay } from '../../../lib/utils';
import { SelectDataTids } from '../../../components/Select';

kind('ZIndex', () => {
  story('HintAndModalStory', () => {
    test('Modal covers hint', async function () {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '[data-tid~="open-modal"]' }))
        .perform();
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '.modalBody button' }))
        .perform();
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('Modal covers hint');
    });
  });

  story('BigModalWithLoaderStory', () => {
    test('Header covers Loader', async function () {
      await this.browser.executeScript(function () {
        const sidePage = window.document.querySelector('[data-tid="modal-container"]') as HTMLElement;

        if (sidePage) {
          sidePage.scrollTop = sidePage.offsetHeight / 3;
        }
      });
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('Header covers Loader');
    });
  });

  story('TooltipAndSelectStory', () => {
    test('Menu covers tooltip', async function () {
      const element = await this.browser.findElement({ css: '.container' });
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: `[data-tid=${SelectDataTids.label}]` }))
        .sendKeys('q')
        .perform();
      await delay(1000);
      await this.expect(await element.takeScreenshot()).to.matchImage('Modal covers hint');
    });
  });

  story('LoaderInSidePageBody', () => {
    test('is covered by Header and Footer', async function () {
      await this.browser.executeScript(function () {
        const sidePage = window.document.querySelector('[data-tid="SidePage__container"]') as HTMLElement;

        if (sidePage) {
          sidePage.scrollTop = sidePage.offsetHeight;
        }
      });
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('is covered by Header and Footer');
    });
  });

  story('SidepageAndSelect', () => {
    test('SidePage covers Select and Tooltip', async function () {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '.select-container button' }))
        .sendKeys('q')
        .perform();
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '.open-sidepage-container button' }))
        .perform();
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '.sidepage-select-continer button' }))
        .sendKeys('q')
        .perform();
      const element = await this.browser.findElement({ css: `[data-tid='SidePage__container']` });
      await delay(1000);
      await this.expect(await element.takeScreenshot()).to.matchImage('SidePage covers Select and Tooltip');
    });
  });

  story('ElementsInLoaderInModalStory', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'flaky test': {
          in: ['chrome2022Dark'],
          tests: ['Hide Hint on active Loader'],
        },
      },
    });

    test('Open Dropdown while Loader is inactive', async function () {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '[data-comp-name~="Select"]' }))
        .perform();
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('Open Dropdown while Loader is inactive');
    });

    test('Hide Hint on active Loader', async function () {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '[data-comp-name~="Toggle"]' }))
        .perform();
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('Hide Hint on active Loader');
    });
  });

  story('LoaderAndSidePageStory', () => {
    test('SidePage shadow cover Loader', async function () {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '[data-comp-name~="Toggle"]' }))
        .perform();
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('SidePage shadow cover Loader');
    });
  });

  story('StickyAndTooltipsStory', () => {
    test('Sticky covers outside Popup', async function () {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '[data-comp-name~="Select"]' }))
        .perform();
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('Sticky covers outside Popup');
    });
  });

  story('ModalAndToast', () => {
    test('toastShown', async function () {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '[data-comp-name~="Button"] button' }))
        .perform();
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage();
    });
  });

  story('ToastOverEverything', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'flickering screenshot': { in: /^(?!\b(firefox))/, tests: 'staticToast' } } });

    test('staticToast', async function () {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '[data-tid~="static-toast"]' }))
        .pause(1000)
        .click(this.browser.findElement({ css: 'body' }))
        .perform();
      const shown = await this.browser.takeScreenshot(); // Toast rendered by static method doesn't get removed
      // when story switches, so we have to close it manually
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '[data-tid~="ToastView__close"]' }))
        .pause(500)
        .perform();
      await this.expect(shown).to.matchImage();
    });

    test('refToast', async function () {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '[data-tid~="ref-toast"]' }))
        .pause(1000)
        .click(this.browser.findElement({ css: 'body' }))
        .perform();
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage();
    });
  });

  story('ModalWithDropdown', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'no themes': { in: /^(?!\b(chrome2022|firefox2022)\b)/ } } });

    test('dropdown overlaps static header', async function () {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '[data-tid="dropdown_top"]' }))
        .perform();
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage();
    });

    test('dropdown lays under fixed header', async function () {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '[data-tid="dropdown_top"]' }))
        .perform();
      await delay(1000);
      await this.browser.executeScript(function () {
        const scrollContainer = window.document.querySelector('[data-tid="modal-container"]') as HTMLElement;
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      });
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage();
    });

    test('dropdown lays under fixed footer', async function () {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '[data-tid="dropdown_bottom"]' }))
        .perform();
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage();
    });

    test('dropdown overlaps static footer', async function () {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '[data-tid="dropdown_bottom"]' }))
        .perform();
      await delay(1000);
      await this.browser.executeScript(function () {
        const scrollContainer = window.document.querySelector('[data-tid="modal-container"]') as HTMLElement;
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      });
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage();
    });
  });
});
