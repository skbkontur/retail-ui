import { story, kind, test } from "creevey";

import { delay } from "../../../lib/utils";

kind("SidePage", () => {
  story("SidePageOverAnotherSidePageStory", () => {
    test("open internal side-page", async function () {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: "button" }))
        .perform();
      await this.browser
        .actions({ bridge: true })
        .click(
          this.browser.findElement({
            css: '[data-comp-name~="SidePageBody"] button',
          })
        )
        .perform();
      await this.expect(await this.browser.takeScreenshot()).to.matchImage(
        "open internal side-page"
      );
    });

    test("close internal side-page", async function () {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: "button" }))
        .perform();
      await this.browser
        .actions({ bridge: true })
        .click(
          this.browser.findElement({
            css: '[data-comp-name~="SidePageBody"] button',
          })
        )
        .perform();
      await this.browser
        .actions({ bridge: true })
        .click(
          this.browser.findElement({
            css: '.react-ui:last-child [data-comp-name~="SidePageFooter"] button',
          })
        )
        .perform();
      await this.expect(await this.browser.takeScreenshot()).to.matchImage(
        "close internal side-page"
      );
    });
  });

  story("StickySidePageHeaderWhenAnotherSidePageStory", () => {
    test("sticky header, open and close internal side-page", async function () {
      await this.browser
        .actions({ bridge: true })
        .click(this.browser.findElement({ css: "button" }))
        .perform();
      await this.browser
        .actions({ bridge: true })
        .click(
          this.browser.findElement({
            css: '[data-comp-name~="SidePageBody"] button',
          })
        )
        .perform();
      await this.browser.executeScript(function () {
        const sidepageContainer = window.document.querySelector(
          '[data-tid="SidePage__container"]'
        );

        if (sidepageContainer) {
          sidepageContainer.scrollTop = 3000;
        }
      });
      await this.browser
        .actions({ bridge: true })
        .click(
          this.browser.findElement({
            css: '.react-ui:last-child [data-comp-name~="SidePageFooter"] button',
          })
        )
        .perform();
      await this.expect(await this.browser.takeScreenshot()).to.matchImage(
        "sticky header, open and close internal side-page"
      );
    });
  });

  story("Simple", () => {
    test("open side-page", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: "button" }))
        .perform();
      await this.expect(await this.browser.takeScreenshot()).to.matchImage(
        "open side-page"
      );
    });
  });

  story("BodyWithoutFooter", () => {
    test("scroll to bottom", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: "button" }))
        .perform();
      await this.browser.executeScript(function () {
        const sidepageContainer = window.document.querySelector(
          '[data-tid="SidePage__container"]'
        ) as HTMLElement;

        sidepageContainer.scrollTop = 3000;
      });
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage(
        "scroll to bottom"
      );
    });
  });

  story("BodyWithoutHeader", () => {
    test("open side-page without header", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: "button" }))
        .perform();
      await delay(100);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage(
        "open side-page without header"
      );
    });
  });

  story("TestUpdateLayoutMethodStory", () => {
    test("idle", async function () {
      await this.expect(await this.browser.takeScreenshot()).to.matchImage(
        "idle"
      );
    });

    test("Body content has been changed", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(
          this.browser.findElement({ css: '[data-tid="toggle-body-content"]' })
        )
        .perform();
      await this.expect(await this.browser.takeScreenshot()).to.matchImage(
        "Body content has been changed"
      );
    });

    test("child component content has been changed", async function () {
      await delay(1000);
      await this.browser
        .actions({
          bridge: true,
        })
        .click(
          this.browser.findElement({
            css: '[data-tid="toggle-child-component-content"]',
          })
        )
        .perform();
      await this.expect(await this.browser.takeScreenshot()).to.matchImage(
        "child component content has been changed"
      );
    });

    test("update layout", async function () {
      await delay(1000);
      await this.browser
        .actions({
          bridge: true,
        })
        .click(
          this.browser.findElement({
            css: '[data-tid="toggle-child-component-content"]',
          })
        )
        .pause(1000)
        .click(this.browser.findElement({ css: '[data-tid="update"]' }))
        .perform();
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage(
        "update layout"
      );
    });
  });

  story("WithLongTitleStory", () => {
    test("not fixed", async function () {
      await this.expect(await this.browser.takeScreenshot()).to.matchImage(
        "not fixed"
      );
    });

    test("fixed close element", async function () {
      await this.browser.executeScript(function () {
        const sidePageContainer = window.document.querySelector(
          '[data-tid="SidePage__container"]'
        ) as HTMLElement;
        const sidePageHeader = window.document.querySelector(
          '[data-comp-name~="SidePageHeader"]'
        ) as HTMLElement;
        const fixedHeaderHeight = 50;

        sidePageContainer.scrollTop =
          (sidePageHeader.offsetHeight - fixedHeaderHeight) / 2;
      });
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage(
        "fixed close element"
      );
    });

    test("fixed header", async function () {
      await this.browser.executeScript(function () {
        const sidePageContainer = window.document.querySelector(
          '[data-tid="SidePage__container"]'
        ) as HTMLElement;
        const sidePageHeader = window.document.querySelector(
          '[data-comp-name~="SidePageHeader"]'
        ) as HTMLElement;
        const fixedHeaderHeight = 50;

        sidePageContainer.scrollTop =
          sidePageHeader.offsetHeight - fixedHeaderHeight;
      });
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage(
        "fixed header"
      );
    });
  });

  story("SidePageWithChildrenFromOtherComponent", () => {
    test("without header, footer", async function () {
      await this.expect(await this.browser.takeScreenshot()).to.matchImage(
        "without header, footer"
      );
    });

    test("scroll to bottom without header, footer", async function () {
      await this.browser.executeScript(function () {
        const sidepageContainer = window.document.querySelector(
          '[data-tid="SidePage__container"]'
        ) as HTMLElement;

        sidepageContainer.scrollTop = 3000;
      });
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage(
        "scroll to bottom without header, footer"
      );
    });

    test("with header, footer", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(
          this.browser.findElement({
            css: '[data-tid="SidePage__header-toggle"]',
          })
        )
        .pause(1000)
        .click(
          this.browser.findElement({
            css: '[data-tid="SidePage__footer-toggle"]',
          })
        )
        .pause(1000)
        .perform();
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage(
        "with header, footer"
      );
    });

    test("scroll to bottom with header, footer", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(
          this.browser.findElement({
            css: '[data-tid="SidePage__header-toggle"]',
          })
        )
        .pause(1000)
        .click(
          this.browser.findElement({
            css: '[data-tid="SidePage__footer-toggle"]',
          })
        )
        .perform();
      await this.browser.executeScript(function () {
        const sidepageContainer = window.document.querySelector(
          '[data-tid="SidePage__container"]'
        ) as HTMLElement;

        sidepageContainer.scrollTop = 3000;
      });
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage(
        "scroll to bottom with header, footer"
      );
    });

    test("with panel", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(
          this.browser.findElement({
            css: '[data-tid="SidePage__footer-toggle"]',
          })
        )
        .pause(1000)
        .click(
          this.browser.findElement({
            css: '[data-tid="SidePage__panel-toggle"]',
          })
        )
        .perform();
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage(
        "with panel"
      );
    });

    test("scroll to bottom with panel", async function () {
      await this.browser
        .actions({ bridge: true })
        .click(
          this.browser.findElement({
            css: '[data-tid="SidePage__footer-toggle"]',
          })
        )
        .pause(1000)
        .click(
          this.browser.findElement({
            css: '[data-tid="SidePage__panel-toggle"]',
          })
        )
        .perform();
      await this.browser.executeScript(function () {
        const sidepageContainer = window.document.querySelector(
          '[data-tid="SidePage__container"]'
        ) as HTMLElement;

        sidepageContainer.scrollTop = 3000;
      });
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage(
        "scroll to bottom with panel"
      );
    });
  });
});
