import { story, kind, test } from "creevey";

import { delay } from "../../../lib/utils";

kind("Hint", () => {
  story("SetManualAndOpenedPropOnClick", () => {
    test("click on hint", async function () {
      await this.browser
        .actions()
        .click(this.browser.findElement({ css: "#main" }))
        .perform();
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage(
        "click on hint"
      );
    });
  });

  story("WithSVGIcon", ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        "internal logic being tested and not something UI related": {
          in: [
            "chromeDark",
            "chrome8px",
            "firefox8px",
            "firefox",
            "firefoxFlat8px",
            "firefoxDark",
            "ie118px",
            "ie11",
            "ie11Dark",
          ],
          reason: "internal logic being tested and not something UI related",
        },
      },
    });

    test("idle", async function () {
      await this.expect(await this.takeScreenshot()).to.matchImage("idle");
    });

    test("hover", async function () {
      await this.browser
        .actions()
        .move({
          origin: this.browser.findElement({ css: '[data-tid="icon"]' }),
        })
        .perform();
      await delay(1000);
      await this.expect(await this.browser.takeScreenshot()).to.matchImage(
        "open"
      );
    });
  });
});
