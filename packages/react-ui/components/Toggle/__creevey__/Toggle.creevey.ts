import { story, kind, test } from "creevey";

import { delay } from "../../../lib/utils";

kind("Toggle", () => {
  story("Plain", () => {
    test("plain", async function () {
      await this.expect(await this.takeScreenshot()).to.matchImage("plain");
    });

    test("pressed", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .move({
          origin: this.browser.findElement({ css: "label" }),
        })
        .press()
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage("pressed");
      await this.browser
        .actions({
          bridge: true,
        })
        .release()
        .perform();
    });

    test("clicked", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: "label" }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage("clicked");
    });
  });

  story("DisabledWithTooltip", () => {
    test("pressed", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .move({
          origin: this.browser.findElement({ css: "label" }),
        })
        .press()
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage("pressed");
      await this.browser
        .actions({
          bridge: true,
        })
        .release()
        .perform();
    });
  });

  story("WithChildren", () => {
    test("plain", async function () {
      await this.expect(await this.takeScreenshot()).to.matchImage("plain");
    });
  });

  story("WithLongDescription", () => {
    test("plain", async function () {
      await this.expect(await this.takeScreenshot()).to.matchImage("plain");
    });

    test("clicked", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: "label" }))
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage("clicked");
    });
  });
});
