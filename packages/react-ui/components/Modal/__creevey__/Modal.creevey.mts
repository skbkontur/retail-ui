import { story, kind, test } from 'creevey';
import 'creevey/playwright';

import { tid } from '../../__creevey__/helpers.mjs';

const topMiddleBottomModalTests = () => {
  test('top', async (context) => {
    await context.matchImage(await context.takeScreenshot(), 'top');
  });

  test('middle', async (context) => {
    const page = context.webdriver;
    await page.evaluate(() => {
      const modalContainer = window.document.querySelector('[data-tid="modal-container"]') as HTMLElement;
      const modalContent = window.document.querySelector('[data-tid="modal-content"]') as HTMLElement;

      modalContainer.scrollTop = modalContent.offsetHeight / 2;
    });
    await page.waitForTimeout(100);
    await context.matchImage(await context.takeScreenshot(), 'middle');
  });

  test('bottom', async (context) => {
    const page = context.webdriver;
    await page.evaluate(() => {
      const modalContainer = window.document.querySelector('[data-tid="modal-container"]') as HTMLElement;
      const modalContent = window.document.querySelector('[data-tid="modal-content"]') as HTMLElement;

      modalContainer.scrollTop = modalContent.offsetHeight;
    });
    await page.waitForTimeout(100);
    await context.matchImage(await context.takeScreenshot(), 'bottom');
  });
};

kind('Modal', () => {
  story('ModalWithFooterPanelStory', () => {
    test('open modal', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('Button__root')).nth(0).click();
      await page.waitForTimeout(100);
      await context.matchImage(await context.takeScreenshot(), 'open modal');
    });
  });

  story('WithIconInput', () => {
    test('open modal', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('open-modal')).click();
      await page.waitForTimeout(1000);
      await context.matchImage(await context.takeScreenshot(), 'open modal');
    });
  });

  story('ModalOverAnotherModalStory', () => {
    test('open first modal', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('open-first-modal')).click();
      await page.waitForTimeout(200);
      await context.matchImage(await context.takeScreenshot(), 'open first modal');
    });

    test('open second modal', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('open-first-modal')).click();
      await page.locator(tid('open-second-modal')).click();
      await page.waitForTimeout(100);
      await context.matchImage(await context.takeScreenshot(), 'open second modal');
    });
  });

  story('ModalWithoutFooterPanelStory', () => {
    test('open modal', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('open-modal')).click();
      await page.waitForTimeout(200);
      await context.matchImage(await context.takeScreenshot(), 'open modal');
    });
  });

  story('ModalWithoutFooterStory', () => {
    test('open modal', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('open-modal')).click();
      await context.matchImage(await context.takeScreenshot(), 'open modal');
    });
  });

  story('ModalWithVariableHeightOfContent', () => {
    test('open modal', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('open-modal')).click();
      await page.waitForTimeout(100);
      await context.matchImage(await context.takeScreenshot(), 'open modal');
    });

    test('toggle content height', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('open-modal')).click();
      await page.locator('#modal-inner ' + tid('Toggle__root')).click();
      await page.waitForTimeout(500);
      await context.matchImage(await context.takeScreenshot(), 'toggle content height');
    });
  });

  story('ModalWithoutStickyElements', () => {
    topMiddleBottomModalTests();
  });

  story('SmallModalOnTheTop', () => {
    test('open modal', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('open-modal')).click();
      await page.waitForTimeout(100);
      await context.matchImage(await context.takeScreenshot(), 'open modal');
    });

    test('close by click on the cross', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('open-modal')).click();
      await page.locator(tid('modal-close')).click();
      await context.matchImage(await context.takeScreenshot(), 'close by click on the cross');
    });

    test("doesn't close by click on the content", async (context) => {
      const page = context.webdriver;
      await page.locator(tid('open-modal')).click();
      await page.locator(tid('modal-content-button')).click();
      await context.matchImage(await context.takeScreenshot(), "doesn't close by click on the content");
    });

    test('closes by click on the background', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('open-modal')).click();
      await page.locator(tid('modal-container')).click();
      await context.matchImage(await context.takeScreenshot(), 'closes by click on the background');
    });
  });

  story('ModalWithChildrenFromOtherComponent', () => {
    topMiddleBottomModalTests();
  });

  story('ChangeAllModalContent', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'themes dont affect logic': { in: /^(?!\bchrome2022\b)/ } },
      captureElement: null,
    });
    test('idle', async (context) => {
      const page = context.webdriver;
      await page.locator(tid('open-first-modal')).click();
      await page.waitForTimeout(500);
      const firstModal = await context.takeScreenshot();
      await page.locator(tid('open-second-modal') + ' button').click();
      await page.waitForTimeout(500);
      const secondModal = await context.takeScreenshot();
      await context.matchImages({ firstModal, secondModal });
    });
  });

  story('CrossFocusedByTab', () => {
    test('idle', async (context) => {
      const page = context.webdriver;
      await page.keyboard.press('Tab');
      await page.waitForTimeout(200);
      await context.matchImage(await context.takeScreenshot());
    });
  });

  story('WithCutTitleOnStuck', ({ setStoryParameters }) => {
    setStoryParameters({
      captureElement: 'body',
    });

    test('after scrolling', async (context) => {
      const page = context.webdriver;
      await page.evaluate(() => {
        const modalContainer = window.document.querySelector('[data-tid="modal-container"]') as HTMLElement;
        modalContainer.scrollTop = 300;
      });
      await context.matchImage(await context.takeScreenshot(), 'after scrolling');
    });
  });
});
