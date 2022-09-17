import { story, kind, test } from "creevey";

import { delay } from "../../../lib/utils";

kind("PasswordInput", () => {
  story("Plain", ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        // TODO @Khlutkova fix after update browsers
        "story-skip-0": {
          in: ["chrome8px", "chromeFlat8px", "chrome", "chromeDark"],
          tests: ["With visible password"],
        },
      },
    });

    test("Plain", async function () {
      await this.expect(await this.takeScreenshot()).to.matchImage("Plain");
    });

    test("With typed password", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[type="password"]' }))
        .sendKeys("Test...")
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage(
        "With typed password"
      );
    });

    test("With visible password", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[type="password"]' }))
        .sendKeys("Test...")
        .click(
          this.browser.findElement({ css: '[data-tid="PasswordInputEyeIcon"]' })
        )
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage(
        "With visible password"
      );
    });
  });
});
