import { story, kind, test } from "creevey";

import { delay } from "../../../lib/utils";

kind("Paging", () => {
  story("GoToAbsensePageStory", ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        "story-skip-0": { in: ["ie11", "ie118px", "ie11Dark"], tests: "hover" },

        // TODO @Khlutkova fix after update browsers
        "story-skip-1": {
          in: ["chrome8px", "chromeFlat8px", "chrome", "chromeDark"],
          tests: ["hover", "Move to page by Ender"],
        },
      },
    });

    test("plain", async function () {
      await this.expect(await this.takeScreenshot()).to.matchImage("plain");
    });

    test("hover", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .move({
          origin: this.browser.findElement({
            css: `[data-tid='Paging__pageLinkWrapper']`,
          }),
        })
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage("hover");
    });

    test("change page by number", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(
          this.browser.findElement({
            css: `[data-tid='Paging__pageLinkWrapper']`,
          })
        )
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage(
        "change page by number"
      );
    });

    test("change page by forwardLink", async function () {
      // NOTE Firefox bug if click send right after click from previous test it results as double click
      await delay(500);
      await this.browser
        .actions({
          bridge: true,
        })
        .click(
          this.browser.findElement({ css: `[data-tid='Paging__forwardLink']` })
        )
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage(
        "change page by forwardLink"
      );
    });

    test("focused", async function () {
      // NOTE Firefox bug if click send right after click from previous test it results as double click
      await delay(500);
      await this.browser
        .actions({
          bridge: true,
        })
        .click(
          this.browser.findElement({
            css: `[data-tid='Paging__pageLinkWrapper']`,
          })
        )
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage("focused");
    });

    test("Move focus right", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(
          this.browser.findElement({
            css: `[data-tid='Paging__pageLinkWrapper']`,
          })
        )
        .pause(100)
        .sendKeys(this.keys.ARROW_RIGHT)
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage(
        "Move focus right"
      );
    });

    test("Move to page by Ender", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(
          this.browser.findElement({
            css: `[data-tid='Paging__pageLinkWrapper']`,
          })
        )
        .pause(100)
        .sendKeys(this.keys.ARROW_RIGHT)
        .pause(100)
        .sendKeys(this.keys.ENTER)
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage(
        "Move to page by Ender"
      );
    });
  });
});
