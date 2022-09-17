import { story, kind, test } from "creevey";

import { delay } from "../../../lib/utils";

kind("TooltipMenu", () => {
  story("SimpleExample", ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        // TODO @Khlutkova fix after update browsers
        "story-skip-0": {
          in: ["chrome8px", "chromeFlat8px", "chrome", "chromeDark"],
          tests: ["clickAfterClickedOnCaption", "clicked"],
        },

        "story-skip-1": {
          in: ["firefox8px", "firefoxFlat8px", "firefox", "firefoxDark"],
          tests: ["tabPress"],
        },
      },
    });

    test("plain", async function () {
      await this.expect(await this.takeScreenshot()).to.matchImage("plain");
    });

    test("clickAfterClickedOnCaption", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(
          this.browser.findElement({ css: '[data-comp-name~="PopupMenu"]' })
        )
        .click(
          this.browser.findElement({ css: '[data-comp-name~="PopupMenu"]' })
        )
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage(
        "clickAfterClickedOnCaption"
      );
    });

    test("clicked", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(
          this.browser.findElement({ css: '[data-comp-name~="PopupMenu"]' })
        )
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage("clicked");
    });

    test("clickedOutside", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(
          this.browser.findElement({ css: '[data-comp-name~="PopupMenu"]' })
        )
        .click(this.browser.findElement({ css: "body" }))
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage(
        "clickedOutside"
      );
    });

    test("tabPress", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .sendKeys(this.keys.TAB)
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage("tabPress");
    });

    test("enterPress", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .sendKeys(this.keys.TAB)
        .sendKeys(this.keys.ENTER)
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage(
        "enterPress"
      );
    });

    test("escapePress", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .sendKeys(this.keys.TAB)
        .sendKeys(this.keys.ENTER)
        .sendKeys(this.keys.ESCAPE)
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage(
        "escapePress"
      );
    });
  });
});
