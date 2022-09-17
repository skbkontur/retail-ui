import { story, kind, test } from "creevey";

import { delay } from "../../../lib/utils";

kind("Radio", () => {
  story("Highlighted", () => {
    test("plain", async function () {
      await this.expect(await this.takeScreenshot()).to.matchImage("plain");
    });

    test("tabPress", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: "body" }))
        .sendKeys(this.keys.TAB)
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage("tabPress");
    });
  });
});
