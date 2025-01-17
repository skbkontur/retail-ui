import { story, kind, test } from 'creevey';

import { delay } from '../../../lib/utils';

const topMiddleBottomModalTests = () => {
  test('top', async function () {
    await this.expect(await this.browser.takeScreenshot()).to.matchImage('top');
  });

  test('middle', async function () {
    await this.browser.executeScript(function () {
      const modalContainer = window.document.querySelector('[data-tid="modal-container"]') as HTMLElement;
      const modalContent = window.document.querySelector('[data-tid="modal-content"]') as HTMLElement;

      modalContainer.scrollTop = modalContent.offsetHeight / 2;
    });
    await delay(100);
    await this.expect(await this.browser.takeScreenshot()).to.matchImage('middle');
  });

  test('bottom', async function () {
    await this.browser.executeScript(function () {
      const modalContainer = window.document.querySelector('[data-tid="modal-container"]') as HTMLElement;
      const modalContent = window.document.querySelector('[data-tid="modal-content"]') as HTMLElement;

      modalContainer.scrollTop = modalContent.offsetHeight;
    });
    await delay(100);
    await this.expect(await this.browser.takeScreenshot()).to.matchImage('bottom');
  });
};

kind('Modal', () => {
  story('ModalWithFooterPanelStory', () => {
    test('open modal', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="Button"]:nth-of-type(1)' }))
        .perform();
      await delay(100);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('open modal');
    });
  });

  story('WithIconInput', () => {
    test('open modal', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid~="open-modal"]' }))
        .perform();
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('open modal');
    });
  });

  story('ModalOverAnotherModalStory', () => {
    test('open first modal', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid~="open-first-modal"]' }))
        .perform();
      await delay(200);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('open first modal');
    });

    test('open second modal', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid~="open-first-modal"]' }))
        .perform();
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '[data-tid~="open-second-modal"]' }))
        .perform();
      await delay(100);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('open second modal');
    });
  });

  story('ModalWithoutFooterPanelStory', () => {
    test('open modal', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid~="open-modal"]' }))
        .perform();
      await delay(200);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('open modal');
    });
  });

  story('ModalWithoutFooterStory', () => {
    test('open modal', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid~="open-modal"]' }))
        .perform();
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('open modal');
    });
  });

  story('ModalMobileView', () => {
    test('idle', async function () {
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('idle');
    });
  });

  story('ModalWithVariableHeightOfContent', () => {
    test('open modal', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid~="open-modal"]' }))
        .perform();
      await delay(100);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('open modal');
    });

    test('toggle content height', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid~="open-modal"]' }))
        .perform();
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '#modal-inner [data-comp-name~="Toggle"]' }))
        .pause(500)
        .perform();
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('toggle content height');
    });
  });

  story('ModalWithoutStickyElements', () => {
    topMiddleBottomModalTests();
  });

  story('SmallModalOnTheTop', () => {
    test('open modal', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid~="open-modal"]' }))
        .perform();
      await delay(100);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('open modal');
    });

    test('close by click on the cross', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid~="open-modal"]' }))
        .perform();
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '[data-tid="modal-close"]' }))
        .perform();
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('close by click on the cross');
    });

    test("doesn't close by click on the content", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid~="open-modal"]' }))
        .perform();
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '[data-tid="modal-content-button"]' }))
        .perform();
      await this.expect(await this.browser.takeScreenshot()).to.matchImage("doesn't close by click on the content");
    });

    test('closes by click on the background', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid~="open-modal"]' }))
        .perform();
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '[data-tid="modal-container"]' }))
        .perform();
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('closes by click on the background');
    });
  });

  story('ModalWithChildrenFromOtherComponent', () => {
    topMiddleBottomModalTests();
  });

  story('MobileModal', () => {
    test('top', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid~="open-modal"]' }))
        .perform();
      await delay(200);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('top');
    });

    test('middle', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid~="open-modal"]' }))
        .perform();
      await delay(200);
      await this.browser.executeScript(function () {
        const modalContent = window.document.querySelector('.focus-lock-container') as HTMLElement;
        const modalBody = window.document.querySelector('[data-comp-name~="Modal.Body"] ') as HTMLElement;

        modalContent.scrollTop = modalBody.offsetHeight / 2;
      });
      await delay(100);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('middle');
    });

    test('bottom', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid~="open-modal"]' }))
        .perform();
      await delay(200);
      await this.browser.executeScript(function () {
        const modalContent = window.document.querySelector('.focus-lock-container') as HTMLElement;
        const modalBody = window.document.querySelector('[data-comp-name~="Modal.Body"] ') as HTMLElement;

        modalContent.scrollTop = modalBody.offsetHeight;
      });
      await delay(100);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage('bottom');
    });
  });

  story('ChangeAllModalContent', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'themes dont affect logic': { in: /^(?!\bchrome2022\b)/ } },
    });
    test('idle', async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid~="open-first-modal"]' }))
        .perform();
      await delay(500);
      const firstModal = await this.browser.takeScreenshot();
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: `[data-tid~="open-second-modal"] button` }))
        .perform();
      await delay(500);
      const secondModal = await this.browser.takeScreenshot();
      await this.expect({firstModal, secondModal}).to.matchImages();
    });
  });
});
