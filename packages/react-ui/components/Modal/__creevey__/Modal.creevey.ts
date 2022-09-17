import { story, kind, test } from "creevey";

import { delay } from "../../../lib/utils";

const TopMiddleBottomModalTests = () => {
  test("top", async function () {
    await this.expect(await this.browser.takeScreenshot()).to.matchImage("top");
  });

  test("middle", async function () {
    await this.browser.executeScript(function () {
      const modalContainer = window.document.querySelector(
        '[data-tid="modal-container"]'
      ) as HTMLElement;
      const modalContent = window.document.querySelector(
        '[data-tid="modal-content"]'
      ) as HTMLElement;

      modalContainer.scrollTop = modalContent.offsetHeight / 2;
    });
    await delay(100);
    await this.expect(await this.browser.takeScreenshot()).to.matchImage(
      "middle"
    );
  });

  test("bottom", async function () {
    await this.browser.executeScript(function () {
      const modalContainer = window.document.querySelector(
        '[data-tid="modal-container"]'
      ) as HTMLElement;
      const modalContent = window.document.querySelector(
        '[data-tid="modal-content"]'
      ) as HTMLElement;

      modalContainer.scrollTop = modalContent.offsetHeight;
    });
    await delay(100);
    await this.expect(await this.browser.takeScreenshot()).to.matchImage(
      "bottom"
    );
  });
};

kind("Modal", () => {
  story("WithIconInput", () => {
    test("open modal", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: "button" }))
        .perform();
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage(
        "open modal"
      );
    });
  });

  story("ModalOverAnotherModalStory", () => {
    test("open first modal", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: "button" }))
        .perform();
      await delay(200);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage(
        "open first modal"
      );
    });

    test("open second modal", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: "button" }))
        .perform();
      await this.browser
        .actions({ bridge: true })
        .click(
          this.browser.findElement({
            css: '[data-comp-name~="ModalBody"] button',
          })
        )
        .perform();
      await delay(100);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage(
        "open second modal"
      );
    });
  });

  story("ModalWithFooterPanelStory", () => {
    test("open modal", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: "button" }))
        .perform();
      await delay(100);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage(
        "open modal"
      );
    });
  });

  story("ModalWithoutFooterPanelStory", () => {
    test("open modal", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: "button" }))
        .perform();
      await delay(200);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage(
        "open modal"
      );
    });
  });

  story("ModalWithoutFooterStory", () => {
    test("open modal", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: "button" }))
        .perform();
      await this.expect(await this.browser.takeScreenshot()).to.matchImage(
        "open modal"
      );
    });
  });

  story("ModalWithVariableHeightOfContent", () => {
    test("open modal", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: "button" }))
        .perform();
      await delay(100);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage(
        "open modal"
      );
    });

    test("toggle content height", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: "button" }))
        .perform();
      await this.browser
        .actions({ bridge: true })
        .click(
          this.browser.findElement({
            css: '#modal-inner [data-comp-name~="Toggle"]',
          })
        )
        .pause(500)
        .perform();
      await this.expect(await this.browser.takeScreenshot()).to.matchImage(
        "toggle content height"
      );
    });
  });

  story("ModalWithoutStickyElements", () => {
    TopMiddleBottomModalTests();
  });

  story("SmallModalOnTheTop", () => {
    test("open modal", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: "button" }))
        .perform();
      await delay(100);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage(
        "open modal"
      );
    });

    test("close by click on the cross", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: "button" }))
        .perform();
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: '[data-tid="modal-close"]' }))
        .perform();
      await this.expect(await this.browser.takeScreenshot()).to.matchImage(
        "close by click on the cross"
      );
    });

    test("doesn't close by click on the content", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: "button" }))
        .perform();
      await this.browser
        .actions({ bridge: true })
        .click(
          this.browser.findElement({ css: '[data-tid="modal-content-button"]' })
        )
        .perform();
      await this.expect(await this.browser.takeScreenshot()).to.matchImage(
        "doesn't close by click on the content"
      );
    });

    test("closes by click on the background", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: "button" }))
        .perform();
      await this.browser
        .actions({ bridge: true })
        .click(
          this.browser.findElement({ css: '[data-tid="modal-container"]' })
        )
        .perform();
      await this.expect(await this.browser.takeScreenshot()).to.matchImage(
        "closes by click on the background"
      );
    });
  });

  story("ModalWithChildrenFromOtherComponent", ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        "story-skip-0": {
          in: ["ie11", "ie118px", "ie11Flat8px", "ie11Dark"],
          tests: ["top", "middle"],
        },
      },
    });

    TopMiddleBottomModalTests();
  });

  story("MobileModal", () => {
    test("top", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: "button" }))
        .perform();
      await delay(200);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage(
        "top"
      );
    });

    test("middle", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: "button" }))
        .perform();
      await delay(200);
      await this.browser.executeScript(function () {
        const modalContent = window.document.querySelector(
          ".focus-lock-container"
        ) as HTMLElement;
        const modalBody = window.document.querySelector(
          '[data-comp-name~="ModalBody"] '
        ) as HTMLElement;

        modalContent.scrollTop = modalBody.offsetHeight / 2;
      });
      await delay(100);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage(
        "middle"
      );
    });

    test("bottom", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: "button" }))
        .perform();
      await delay(200);
      await this.browser.executeScript(function () {
        const modalContent = window.document.querySelector(
          ".focus-lock-container"
        ) as HTMLElement;
        const modalBody = window.document.querySelector(
          '[data-comp-name~="ModalBody"] '
        ) as HTMLElement;

        modalContent.scrollTop = modalBody.offsetHeight;
      });
      await delay(100);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage(
        "bottom"
      );
    });
  });
});
