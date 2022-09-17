import { story, kind, test } from "creevey";

import { delay } from "../../../lib/utils";

const testMaskedInput = () => {
  test("idle, focus, edit, blur", async function () {
    const click = (css: string) => {
      return this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css }));
    };
    const idle = await this.takeScreenshot();
    await click("input").perform();
    const focused = await this.takeScreenshot();
    await click("input").sendKeys("953").perform();
    const edited = await this.takeScreenshot();
    await click("body").perform();
    const blured = await this.takeScreenshot();
    await this.expect({ idle, focused, edited, blured }).to.matchImages();
  });
};

kind("Input", () => {
  story("InputsWithDifferentStates", () => {
    test("Warning small", async function () {
      const element = await this.browser.findElement({
        css: "#warning-small-input-wrapper",
      });
      await this.expect(await element.takeScreenshot()).to.matchImage(
        "Warning small"
      );
    });

    test("Warning large", async function () {
      const element = await this.browser.findElement({
        css: "#warning-large-input-wrapper",
      });
      await this.expect(await element.takeScreenshot()).to.matchImage(
        "Warning large"
      );
    });

    test("Error small", async function () {
      const element = await this.browser.findElement({
        css: "#error-small-input-wrapper",
      });
      await this.expect(await element.takeScreenshot()).to.matchImage(
        "Error small"
      );
    });

    test("Error large", async function () {
      const element = await this.browser.findElement({
        css: "#error-large-input-wrapper",
      });
      await this.expect(await element.takeScreenshot()).to.matchImage(
        "Error large"
      );
    });

    test("Disabled small", async function () {
      const element = await this.browser.findElement({
        css: "#disabled-small-input-wrapper",
      });
      await this.expect(await element.takeScreenshot()).to.matchImage(
        "Disabled small"
      );
    });

    test("Disabled large", async function () {
      const element = await this.browser.findElement({
        css: "#disabled-large-input-wrapper",
      });
      await this.expect(await element.takeScreenshot()).to.matchImage(
        "Disabled large"
      );
    });

    test("Disabled text small", async function () {
      const element = await this.browser.findElement({
        css: "#disabled-text-small-input-wrapper",
      });
      await this.expect(await element.takeScreenshot()).to.matchImage(
        "Disabled text small"
      );
    });

    test("Disabled text large", async function () {
      const element = await this.browser.findElement({
        css: "#disabled-text-large-input-wrapper",
      });
      await this.expect(await element.takeScreenshot()).to.matchImage(
        "Disabled text large"
      );
    });

    test("Placeholder small", async function () {
      const element = await this.browser.findElement({
        css: "#placeholder-small-input-wrapper",
      });
      await this.expect(await element.takeScreenshot()).to.matchImage(
        "Placeholder small"
      );
    });

    test("Placeholder large", async function () {
      const element = await this.browser.findElement({
        css: "#placeholder-large-input-wrapper",
      });
      await this.expect(await element.takeScreenshot()).to.matchImage(
        "Placeholder large"
      );
    });

    test("Password small", async function () {
      const element = await this.browser.findElement({
        css: "#password-small-input-wrapper",
      });
      await this.expect(await element.takeScreenshot()).to.matchImage(
        "Password small"
      );
    });

    test("Password large", async function () {
      const element = await this.browser.findElement({
        css: "#password-large-input-wrapper",
      });
      await this.expect(await element.takeScreenshot()).to.matchImage(
        "Password large"
      );
    });

    test("Borderless small", async function () {
      const element = await this.browser.findElement({
        css: "#borderless-small-input-wrapper",
      });
      await this.expect(await element.takeScreenshot()).to.matchImage(
        "Borderless small"
      );
    });

    test("Borderless large", async function () {
      const element = await this.browser.findElement({
        css: "#borderless-large-input-wrapper",
      });
      await this.expect(await element.takeScreenshot()).to.matchImage(
        "Borderless large"
      );
    });

    test("Left icon small", async function () {
      const element = await this.browser.findElement({
        css: "#left-icon-small-input-wrapper",
      });
      await this.expect(await element.takeScreenshot()).to.matchImage(
        "Left icon small"
      );
    });

    test("Left icon large", async function () {
      const element = await this.browser.findElement({
        css: "#left-icon-large-input-wrapper",
      });
      await this.expect(await element.takeScreenshot()).to.matchImage(
        "Left icon large"
      );
    });

    test("Right icon small", async function () {
      const element = await this.browser.findElement({
        css: "#right-icon-small-input-wrapper",
      });
      await this.expect(await element.takeScreenshot()).to.matchImage(
        "Right icon small"
      );
    });

    test("Right icon large", async function () {
      const element = await this.browser.findElement({
        css: "#right-icon-large-input-wrapper",
      });
      await this.expect(await element.takeScreenshot()).to.matchImage(
        "Right icon large"
      );
    });

    test("Error and Disabled large", async function () {
      const element = await this.browser.findElement({
        css: "#error-disabled-large-input-wrapper",
      });
      await this.expect(await element.takeScreenshot()).to.matchImage(
        "Error and Disabled large"
      );
    });

    test("Error and Disabled small", async function () {
      const element = await this.browser.findElement({
        css: "#error-disabled-small-input-wrapper",
      });
      await this.expect(await element.takeScreenshot()).to.matchImage(
        "Error and Disabled large"
      );
    });
  });

  story("InputsWithDifferentSizes", () => {
    test("Plain small", async function () {
      const element = await this.browser.findElement({
        css: "#small-input-wrapper",
      });
      await this.expect(await element.takeScreenshot()).to.matchImage("Plain");
    });

    test("Focused small", async function () {
      const element = await this.browser.findElement({
        css: "#small-input-wrapper",
      });
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: "#small-input-wrapper input" }))
        .perform();
      await this.expect(await element.takeScreenshot()).to.matchImage(
        "Focused"
      );
    });

    test("With typed text small", async function () {
      const element = await this.browser.findElement({
        css: "#small-input-wrapper",
      });
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: "#small-input-wrapper input" }))
        .sendKeys("Test...")
        .pause(500)
        .perform();
      await this.expect(await element.takeScreenshot()).to.matchImage(
        "With typed text"
      );
    });

    test("With long typed text small", async function () {
      const element = await this.browser.findElement({
        css: "#small-input-wrapper",
      });
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: "#small-input-wrapper input" }))
        .sendKeys("Test...")
        .sendKeys(
          "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        )
        .pause(500)
        .perform();
      await this.expect(await element.takeScreenshot()).to.matchImage(
        "With long typed text"
      );
    });

    test("Plain medium", async function () {
      const element = await this.browser.findElement({
        css: "#medium-input-wrapper",
      });
      await this.expect(await element.takeScreenshot()).to.matchImage("Plain");
    });

    test("Focused medium", async function () {
      const element = await this.browser.findElement({
        css: "#medium-input-wrapper",
      });
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: "#medium-input-wrapper input" }))
        .perform();
      await this.expect(await element.takeScreenshot()).to.matchImage(
        "Focused"
      );
    });

    test("With typed text medium", async function () {
      const element = await this.browser.findElement({
        css: "#medium-input-wrapper",
      });
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: "#medium-input-wrapper input" }))
        .sendKeys("Test...")
        .pause(500)
        .perform();
      await this.expect(await element.takeScreenshot()).to.matchImage(
        "With typed text"
      );
    });

    test("With long typed text medium", async function () {
      const element = await this.browser.findElement({
        css: "#medium-input-wrapper",
      });
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: "#medium-input-wrapper input" }))
        .sendKeys("Test...")
        .sendKeys(
          "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        )
        .pause(500)
        .perform();
      await this.expect(await element.takeScreenshot()).to.matchImage(
        "With long typed text"
      );
    });

    test("Plain large", async function () {
      const element = await this.browser.findElement({
        css: "#large-input-wrapper",
      });
      await this.expect(await element.takeScreenshot()).to.matchImage("Plain");
    });

    test("Focused large", async function () {
      const element = await this.browser.findElement({
        css: "#large-input-wrapper",
      });
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: "#large-input-wrapper input" }))
        .perform();
      await this.expect(await element.takeScreenshot()).to.matchImage(
        "Focused"
      );
    });

    test("With typed text large", async function () {
      const element = await this.browser.findElement({
        css: "#large-input-wrapper",
      });
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: "#large-input-wrapper input" }))
        .sendKeys("Test...")
        .pause(500)
        .perform();
      await this.expect(await element.takeScreenshot()).to.matchImage(
        "With typed text"
      );
    });

    test("With long typed text large", async function () {
      const element = await this.browser.findElement({
        css: "#large-input-wrapper",
      });
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: "#large-input-wrapper input" }))
        .sendKeys("Test...")
        .sendKeys(
          "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        )
        .pause(500)
        .perform();
      await this.expect(await element.takeScreenshot()).to.matchImage(
        "With long typed text"
      );
    });
  });

  story("InputWithMask", () => {
    testMaskedInput();
  });

  story("InputWithMaskAndCustomUnmaskedValue", () => {
    testMaskedInput();
  });

  story("SelectAllByProp", () => {
    test("Plain", async function () {
      await this.expect(await this.takeScreenshot()).to.matchImage("Plain");
    });

    test("Focused", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: "label" }))
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage("Focused");
    });
  });

  story("SelectAllByButton", () => {
    test("Plain", async function () {
      await this.expect(await this.takeScreenshot()).to.matchImage("Plain");
    });

    test("Selected", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: "button" }))
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage("Selected");
    });
  });

  story("PrefixAndSuffixSmall", () => {
    test("Plain", async function () {
      const element = await this.browser.findElement({
        css: "#inputWithPrefixOrSuffx-small",
      });
      await this.expect(await element.takeScreenshot()).to.matchImage("Plain");
    });

    test("First input focused", async function () {
      const element = await this.browser.findElement({
        css: "#inputWithPrefixOrSuffx-small",
      });
      await this.browser
        .actions({
          bridge: true,
        })
        .click(
          this.browser.findElement({
            css: "#inputWithPrefixOrSuffx-small input",
          })
        )
        .perform();
      await this.expect(await element.takeScreenshot()).to.matchImage(
        "First input focused"
      );
    });
  });

  story("PrefixAndSuffixMedium", () => {
    test("Plain", async function () {
      const element = await this.browser.findElement({
        css: "#inputWithPrefixOrSuffx-medium",
      });
      await this.expect(await element.takeScreenshot()).to.matchImage("Plain");
    });

    test("First input focused", async function () {
      const element = await this.browser.findElement({
        css: "#inputWithPrefixOrSuffx-medium",
      });
      await this.browser
        .actions({
          bridge: true,
        })
        .click(
          this.browser.findElement({
            css: "#inputWithPrefixOrSuffx-medium input",
          })
        )
        .perform();
      await this.expect(await element.takeScreenshot()).to.matchImage(
        "First input focused"
      );
    });
  });

  story("PrefixAndSuffixLarge", () => {
    test("Plain", async function () {
      const element = await this.browser.findElement({
        css: "#inputWithPrefixOrSuffx-large",
      });
      await this.expect(await element.takeScreenshot()).to.matchImage("Plain");
    });

    test("First input focused", async function () {
      const element = await this.browser.findElement({
        css: "#inputWithPrefixOrSuffx-large",
      });
      await this.browser
        .actions({
          bridge: true,
        })
        .click(
          this.browser.findElement({
            css: "#inputWithPrefixOrSuffx-large input",
          })
        )
        .perform();
      await this.expect(await element.takeScreenshot()).to.matchImage(
        "First input focused"
      );
    });
  });

  story("UncontrolledInputWithPlaceholder", () => {
    test("PlainAndTyped", async function () {
      const plain = await this.takeScreenshot();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: "input" }))
        .sendKeys("text")
        .perform();
      const typed = await this.takeScreenshot();
      await this.expect({ plain, typed }).to.matchImages();
    });
  });
});
