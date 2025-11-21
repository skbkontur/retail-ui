import { story, kind, test } from 'creevey';
import 'creevey/playwright';

import { tid } from '../../../components/__creevey__/helpers.mjs';

kind('ZIndex', () => {
  story('HintAndModalStory', () => {
    test('Modal covers hint', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('open-modal')).click();
      await page.locator('.modalBody button').click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'Modal covers hint');
    });
  });

  story('BigModalWithLoaderStory', () => {
    test('Header covers Loader', async (context) => {
      const page = context.webdriver;
      await page.evaluate(() => {
        const sidePage = window.document.querySelector('[data-tid="modal-container"]') as HTMLElement;

        if (sidePage) {
          sidePage.scrollTop = sidePage.offsetHeight / 3;
        }
      });
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'Header covers Loader');
    });
  });

  story('TooltipAndSelectStory', () => {
    test('Menu covers tooltip', async (context) => {
      const page = context.webdriver;
      const element = page.locator('.container');
      await page.locator(tid('Select__label')).click();
      await page.keyboard.type('q');
      await page.waitForTimeout(1000);
      await context.matchImage(await element.screenshot(), 'Modal covers hint');
    });
  });

  story('LoaderInSidePageBody', () => {
    test('is covered by Header and Footer', async (context) => {
      const page = context.webdriver;
      await page.evaluate(() => {
        const sidePage = window.document.querySelector('[data-tid="SidePage__container"]') as HTMLElement;

        if (sidePage) {
          sidePage.scrollTop = sidePage.offsetHeight;
        }
      });
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'is covered by Header and Footer');
    });
  });

  story('SidepageAndSelect', () => {
    test('SidePage covers Select and Tooltip', async (context) => {
      const page = context.webdriver;
      await page.locator('.select-container button').click();
      await page.keyboard.type('q');
      await page.locator('.open-sidepage-container button').click();
      await page.locator('.sidepage-select-continer button').click();
      await page.keyboard.type('q');
      const element = page.locator('[data-tid="SidePage__container"]');
      await page.waitForTimeout(1000);
      await context.matchImage(await element.screenshot(), 'SidePage covers Select and Tooltip');
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
      const page = context.webdriver;
      await page.locator('[data-tid~="Select__root"]').click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'Open Dropdown while Loader is inactive');
    });

    test('Hide Hint on active Loader', async (context) => {
      const page = context.webdriver;
      await page.locator('[data-tid~="Toggle__root"]').click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'Hide Hint on active Loader');
    });
  });

  story('LoaderAndSidePageStory', () => {
    test('SidePage shadow cover Loader', async (context) => {
      const page = context.webdriver;
      await page.locator('[data-tid~="Toggle__root"]').click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'SidePage shadow cover Loader');
    });
  });

  story('StickyAndTooltipsStory', () => {
    test('Sticky covers outside Popup', async (context) => {
      const page = context.webdriver;
      await page.locator('[data-tid~="Select__root"]').click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'Sticky covers outside Popup');
    });
  });

  story('ModalAndToast', () => {
    test('toastShown', async (context) => {
      const page = context.webdriver;
      await page.locator('[data-tid~="Button__root"] button').click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot());
    });
  });

  story('ToastOverEverything', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'flickering screenshot': { in: /^(?!\b(firefox))/, tests: 'staticToast' } },
      captureElement: null,
    });

    test('staticToast', async (context) => {
      const page = context.webdriver;
      await page.locator('[data-tid~="static-toast"]').click();
      await page.waitForTimeout(1000);
      await page.locator('body').click();
      const shown = await context.takeScreenshot(); // Toast rendered by static method doesn't get removed
      // when story switches, so we have to close it manually
      await page.locator('[data-tid~="ToastView__close"]').click();
      await page.waitForTimeout(500);
      await context.matchImage(shown);
    });

    test('refToast', async (context) => {
      const page = context.webdriver;
      await page.locator('[data-tid~="ref-toast"]').click();
      await page.waitForTimeout(1000);
      await page.locator('body').click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot());
    });
  });

  story('ModalWithDropdown', ({ setStoryParameters }) => {
    setStoryParameters({ skip: { 'no themes': { in: /^(?!\b(chrome2022|firefox2022)\b)/ } } });

    test('dropdown overlaps static header', async (context) => {
      const page = context.webdriver;
      await page.locator('[data-tid="dropdown_top"]').click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot());
    });

    test('dropdown lays under fixed header', async (context) => {
      const page = context.webdriver;
      await page.locator('[data-tid="dropdown_top"]').click();
      await page.waitForTimeout(1000);
      await page.evaluate(() => {
        const scrollContainer = window.document.querySelector('[data-tid="modal-container"]') as HTMLElement;
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      });
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot());
    });

    test('dropdown lays under fixed footer', async (context) => {
      const page = context.webdriver;
      await page.locator('[data-tid="dropdown_bottom"]').click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot());
    });

    test('dropdown overlaps static footer', async (context) => {
      const page = context.webdriver;
      await page.locator('[data-tid="dropdown_bottom"]').click();
      await page.waitForTimeout(1000);
      await page.evaluate(() => {
        const scrollContainer = window.document.querySelector('[data-tid="modal-container"]') as HTMLElement;
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      });
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot());
    });
  });
});
