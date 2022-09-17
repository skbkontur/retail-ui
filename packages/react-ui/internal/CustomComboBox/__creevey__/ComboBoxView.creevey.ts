import { story, kind, test } from "creevey";

import { delay } from "../../../lib/utils";

kind("ComboBoxView", () => {
  story("InputLikeText", ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        // TODO @Khlutkova fix after update browsers
        "story-skip-0": {
          in: ["firefox8px", "firefoxFlat8px", "firefox", "firefoxDark"],
          tests: ["focused first element"],
        },
      },
    });

    test("plain", async function () {
      await this.expect(await this.takeScreenshot()).to.matchImage("plain");
    });

    test("focused first element", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(
          this.browser.findElement({ css: '[data-comp-name~="InputLikeText"]' })
        )
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage(
        "focused first element"
      );
    });
  });
});
