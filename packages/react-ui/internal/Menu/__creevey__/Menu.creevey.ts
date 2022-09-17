import { story, kind, test } from "creevey";

import { delay } from "../../../lib/utils";

kind("Menu", () => {
  story("WithMaxHeight", ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: '[data-tid="menu-container"' });

    test("idle", async function () {
      await this.expect(await this.takeScreenshot()).to.matchImage("idle");
    });

    test("moved up from top to the last Item", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: "#move-up" }))
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage(
        "moved up from top to the last Item"
      );
    });

    test("moved up from bottom to the first Item", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: "#move-up" }))
        .click(this.browser.findElement({ css: "#move-up" }))
        .click(this.browser.findElement({ css: "#move-up" }))
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage(
        "moved up from bottom to the first Item"
      );
    });

    test("moved down from top to the last Item", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: "#move-up" }))
        .click(this.browser.findElement({ css: "#move-up" }))
        .click(this.browser.findElement({ css: "#move-up" }))
        .click(this.browser.findElement({ css: "#move-down" }))
        .click(this.browser.findElement({ css: "#move-down" }))
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage(
        "moved down from top to the last Item"
      );
    });

    test("moved down from bottom to the first Item", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: "#move-up" }))
        .click(this.browser.findElement({ css: "#move-up" }))
        .click(this.browser.findElement({ css: "#move-up" }))
        .click(this.browser.findElement({ css: "#move-down" }))
        .click(this.browser.findElement({ css: "#move-down" }))
        .click(this.browser.findElement({ css: "#move-down" }))
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage(
        "moved down from bottom to the first Item"
      );
    });
  });

  story("WithDisabledMenuItem", ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        // TODO @Khlutkova fix after update browsers
        "story-skip-0": {
          in: ["chrome8px", "chromeFlat8px", "chrome", "chromeDark"],
          tests: ["mouseenter"],
        },
      },
    });

    test("mouseenter", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(
          this.browser.findElement({ css: '[data-tid="menuitem-notdisabled"]' })
        )
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage(
        "mouseenter"
      );
    });
  });
});
