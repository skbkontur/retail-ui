import { story, kind, test } from 'creevey';

import { delay } from '../../../lib/delay';

const topMiddleBottomModalTests = () => {
  test('top', async (context) => {
    await context.matchImage(await context.webdriver.takeScreenshot(), 'top');
  });

  test('middle', async (context) => {
    await context.webdriver.executeScript(function () {
      const modalContainer = window.document.querySelector('[data-tid="modal-container"]') as HTMLElement;
      const modalContent = window.document.querySelector('[data-tid="modal-content"]') as HTMLElement;

      modalContainer.scrollTop = modalContent.offsetHeight / 2;
    });
    await delay(100);
    await context.matchImage(await context.webdriver.takeScreenshot(), 'middle');
  });

  test('bottom', async (context) => {
    await context.webdriver.executeScript(function () {
      const modalContainer = window.document.querySelector('[data-tid="modal-container"]') as HTMLElement;
      const modalContent = window.document.querySelector('[data-tid="modal-content"]') as HTMLElement;

      modalContainer.scrollTop = modalContent.offsetHeight;
    });
    await delay(100);
    await context.matchImage(await context.webdriver.takeScreenshot(), 'bottom');
  });
};

kind('Modal', () => {
  story('ModalWithFooterPanelStory', () => {
    test('open modal', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-comp-name~="Button"]:nth-of-type(1)' }))
        .perform();
      await delay(100);
      await context.matchImage(await context.webdriver.takeScreenshot(), 'open modal');
    });
  });

  story('WithIconInput', () => {
    test('open modal', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid~="open-modal"]' }))
        .perform();
      await delay(1000);
      await context.matchImage(await context.webdriver.takeScreenshot(), 'open modal');
    });
  });

  story('ModalOverAnotherModalStory', () => {
    test('open first modal', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid~="open-first-modal"]' }))
        .perform();
      await delay(200);
      await context.matchImage(await context.webdriver.takeScreenshot(), 'open first modal');
    });

    test('open second modal', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid~="open-first-modal"]' }))
        .perform();
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: '[data-tid~="open-second-modal"]' }))
        .perform();
      await delay(100);
      await context.matchImage(await context.webdriver.takeScreenshot(), 'open second modal');
    });
  });

  story('ModalWithoutFooterPanelStory', () => {
    test('open modal', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid~="open-modal"]' }))
        .perform();
      await delay(200);
      await context.matchImage(await context.webdriver.takeScreenshot(), 'open modal');
    });
  });

  story('ModalWithoutFooterStory', () => {
    test('open modal', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid~="open-modal"]' }))
        .perform();
      await context.matchImage(await context.webdriver.takeScreenshot(), 'open modal');
    });
  });

  story('ModalMobileView', () => {
    test('idle', async (context) => {
      await context.matchImage(await context.webdriver.takeScreenshot(), 'idle');
    });
  });

  story('ModalWithVariableHeightOfContent', () => {
    test('open modal', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid~="open-modal"]' }))
        .perform();
      await delay(100);
      await context.matchImage(await context.webdriver.takeScreenshot(), 'open modal');
    });

    test('toggle content height', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid~="open-modal"]' }))
        .perform();
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: '#modal-inner [data-comp-name~="Toggle"]' }))
        .pause(500)
        .perform();
      await context.matchImage(await context.webdriver.takeScreenshot(), 'toggle content height');
    });
  });

  story('ModalWithoutStickyElements', () => {
    topMiddleBottomModalTests();
  });

  story('SmallModalOnTheTop', () => {
    test('open modal', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid~="open-modal"]' }))
        .perform();
      await delay(100);
      await context.matchImage(await context.webdriver.takeScreenshot(), 'open modal');
    });

    test('close by click on the cross', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid~="open-modal"]' }))
        .perform();
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: '[data-tid="modal-close"]' }))
        .perform();
      await context.matchImage(await context.webdriver.takeScreenshot(), 'close by click on the cross');
    });

    test("doesn't close by click on the content", async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid~="open-modal"]' }))
        .perform();
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: '[data-tid="modal-content-button"]' }))
        .perform();
      await context.matchImage(await context.webdriver.takeScreenshot(), "doesn't close by click on the content");
    });

    test('closes by click on the background', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid~="open-modal"]' }))
        .perform();
      await context.webdriver
        .actions({ bridge: true })
        .click(context.webdriver.findElement({ css: '[data-tid="modal-container"]' }))
        .perform();
      await context.matchImage(await context.webdriver.takeScreenshot(), 'closes by click on the background');
    });
  });

  story('ModalWithChildrenFromOtherComponent', () => {
    topMiddleBottomModalTests();
  });

  story('MobileModal', () => {
    test('top', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid~="open-modal"]' }))
        .perform();
      await delay(200);
      await context.matchImage(await context.webdriver.takeScreenshot(), 'top');
    });

    test('middle', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid~="open-modal"]' }))
        .perform();
      await delay(200);
      await context.webdriver.executeScript(function () {
        const modalContent = window.document.querySelector('.focus-lock-container') as HTMLElement;
        const modalBody = window.document.querySelector('[data-comp-name~="Modal.Body"] ') as HTMLElement;

        modalContent.scrollTop = modalBody.offsetHeight / 2;
      });
      await delay(100);
      await context.matchImage(await context.webdriver.takeScreenshot(), 'middle');
    });

    test('bottom', async (context) => {
      await context.webdriver
        .actions({
          bridge: true,
        })
        .click(context.webdriver.findElement({ css: '[data-tid~="open-modal"]' }))
        .perform();
      await delay(200);
      await context.webdriver.executeScript(function () {
        const modalContent = window.document.querySelector('.focus-lock-container') as HTMLElement;
        const modalBody = window.document.querySelector('[data-comp-name~="Modal.Body"] ') as HTMLElement;

        modalContent.scrollTop = modalBody.offsetHeight;
      });
      await delay(100);
      await context.matchImage(await context.webdriver.takeScreenshot(), 'bottom');
    });
  });
});
