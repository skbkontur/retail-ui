import { story, kind, test } from 'creevey';

import { delay } from '../../../lib/delay';
import { SelectDataTids } from '../../../components/Select/tids';

kind('ZIndex', () => {
  story('HintAndModalStory', () => {
    test('Modal covers hint', async (context) => {
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: '[data-tid~="open-modal"]' }))
        .perform();
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: '.modalBody button' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.webdriver.takeScreenshot(), 'Modal covers hint');
    });
  });

  story('BigModalWithLoaderStory', () => {
    test('Header covers Loader', async (context) => {
      await context.webdriver.executeScript(function () {
        const sidePage = window.document.querySelector('[data-tid="modal-container"]') as HTMLElement;

        if (sidePage) {
          sidePage.scrollTop = sidePage.offsetHeight / 3;
        }
      });
      await delay(1000);
      await context.matchImage(await context.webdriver.takeScreenshot(), 'Header covers Loader');
    });
  });

  story('TooltipAndSelectStory', () => {
    test('Menu covers tooltip', async (context) => {
      const element = await context.webdriver.findElement({ css: '.container' });
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: `[data-tid=${SelectDataTids.label}]` }))
        .sendKeys('q')
        .perform();
      await delay(1000);
      await context.matchImage(await element.takeScreenshot(), 'Modal covers hint');
    });
  });

  story('LoaderInSidePageBody', () => {
    test('is covered by Header and Footer', async (context) => {
      await context.webdriver.executeScript(function () {
        const sidePage = window.document.querySelector('[data-tid="SidePage__container"]') as HTMLElement;

        if (sidePage) {
          sidePage.scrollTop = sidePage.offsetHeight;
        }
      });
      await delay(1000);
      await context.matchImage(await context.webdriver.takeScreenshot(), 'is covered by Header and Footer');
    });
  });

  story('SidepageAndSelect', () => {
    test('SidePage covers Select and Tooltip', async (context) => {
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: '.select-container button' }))
        .sendKeys('q')
        .perform();
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: '.open-sidepage-container button' }))
        .perform();
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: '.sidepage-select-continer button' }))
        .sendKeys('q')
        .perform();
      const element = await context.webdriver.findElement({ css: `[data-tid='SidePage__container']` });
      await delay(1000);
      await context.matchImage(await element.takeScreenshot(), 'SidePage covers Select and Tooltip');
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

    test('Open Dropdown while Loader is inactive', async (context) => {
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="Select"]' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.webdriver.takeScreenshot(), 'Open Dropdown while Loader is inactive');
    });

    test('Hide Hint on active Loader', async (context) => {
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="Toggle"]' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.webdriver.takeScreenshot(), 'Hide Hint on active Loader');
    });
  });

  story('LoaderAndSidePageStory', () => {
    test('SidePage shadow cover Loader', async (context) => {
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="Toggle"]' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.webdriver.takeScreenshot(), 'SidePage shadow cover Loader');
    });
  });

  story('StickyAndTooltipsStory', () => {
    test('Sticky covers outside Popup', async (context) => {
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="Select"]' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.webdriver.takeScreenshot(), 'Sticky covers outside Popup');
    });
  });

  story('ModalAndToast', () => {
    test('toastShown', async (context) => {
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="Button"] button' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.webdriver.takeScreenshot());
    });
  });

  story('ToastOverEverything', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'flickering screenshot': { in: /^(?!\b(firefox))/, tests: 'staticToast' } } });

    test('staticToast', async (context) => {
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: '[data-tid~="static-toast"]' }))
        .pause(1000)
        .click(context.webdriver.findElement({ css: 'body' }))
        .perform();
      const shown = await context.webdriver.takeScreenshot(); // Toast rendered by static method doesn't get removed
      // when story switches, so we have to close it manually
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: '[data-tid~="ToastView__close"]' }))
        .pause(500)
        .perform();
      await context.matchImage(shown);
    });

    test('refToast', async (context) => {
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: '[data-tid~="ref-toast"]' }))
        .pause(1000)
        .click(context.webdriver.findElement({ css: 'body' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.webdriver.takeScreenshot());
    });
  });

  story('ModalWithDropdown', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'no themes': { in: /^(?!\b(chrome2022|firefox2022)\b)/ } } });

    test('dropdown overlaps static header', async (context) => {
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: '[data-tid="dropdown_top"]' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.webdriver.takeScreenshot());
    });

    test('dropdown lays under fixed header', async (context) => {
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: '[data-tid="dropdown_top"]' }))
        .perform();
      await delay(1000);
      await context.webdriver.executeScript(function () {
        const scrollContainer = window.document.querySelector('[data-tid="modal-container"]') as HTMLElement;
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      });
      await delay(1000);
      await context.matchImage(await context.webdriver.takeScreenshot());
    });

    test('dropdown lays under fixed footer', async (context) => {
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: '[data-tid="dropdown_bottom"]' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.webdriver.takeScreenshot());
    });

    test('dropdown overlaps static footer', async (context) => {
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: '[data-tid="dropdown_bottom"]' }))
        .perform();
      await delay(1000);
      await context.webdriver.executeScript(function () {
        const scrollContainer = window.document.querySelector('[data-tid="modal-container"]') as HTMLElement;
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      });
      await delay(1000);
      await context.matchImage(await context.webdriver.takeScreenshot());
    });
  });
});
