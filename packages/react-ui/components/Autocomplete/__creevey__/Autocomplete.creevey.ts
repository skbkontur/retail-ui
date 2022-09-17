import { story, kind, test } from "creevey";

import { delay } from "../../../lib/utils";

const commonTests = () => {
  test("focus and type text", async function () {
    const screenshotElement = this.browser.findElement({
      css: "#test-element",
    });
    const autocompleteElement = this.browser.findElement({
      css: '[data-comp-name~="Autocomplete"]',
    });
    await this.browser
      .actions({ bridge: true })
      .click(autocompleteElement)
      .sendKeys("o")
      .perform();
    await delay(1000);
    await this.expect(await screenshotElement.takeScreenshot()).to.matchImage();
  });
};

kind("Autocomplete", () => {
  story("Simple", () => {
    test("idle", async function () {
      await this.expect(await this.takeScreenshot()).to.matchImage("idle");
    });

    test("focused", async function () {
      const autocompleteElement = this.browser.findElement({
        css: '[data-comp-name~="Autocomplete"]',
      });
      await this.browser
        .actions({ bridge: true })
        .click(autocompleteElement)
        .perform();
      await delay(1000);
      await this.expect(
        await autocompleteElement.takeScreenshot()
      ).to.matchImage();
    });

    commonTests();
  });

  story("WithRenderItem", () => {
    commonTests();
  });

  story("WithBigRenderItemWidth", () => {
    commonTests();
  });

  story("WithFixedMenuSize", () => {
    commonTests();
  });

  story("WithPercentageWidth", () => {
    commonTests();
  });

  story("WithFixedWidth", () => {
    commonTests();
  });

  story("WithZeroWidth", () => {
    commonTests();
  });
});
