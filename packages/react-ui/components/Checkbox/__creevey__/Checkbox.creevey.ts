import { story, kind, test } from "creevey";

import { delay } from "../../../lib/utils";

const checkboxTests = () => {
  test("idle", async function () {
    await this.expect(await this.takeScreenshot()).to.matchImage("idle");
  });

  test("hovered", async function () {
    await this.browser
      .actions({
        bridge: true,
      })
      .move({
        origin: this.browser.findElement({ css: "span" }),
      })
      .perform();
    await delay(1000);
    await this.expect(await this.takeScreenshot()).to.matchImage("hovered");
  });

  test("pressed", async function () {
    await this.browser
      .actions({
        bridge: true,
      })
      .move({
        origin: this.browser.findElement({ css: "span" }),
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
      .click(this.browser.findElement({ css: "span" }))
      .perform();
    await delay(1000);
    await this.expect(await this.takeScreenshot()).to.matchImage("clicked");
  });

  test("tabPress", async function () {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: "span" }))
      .perform();
    await this.browser
      .actions({
        bridge: true,
      })
      .move({ origin: this.browser.findElement({ css: "body" }) })
      .press()
      .release()
      .sendKeys(this.keys.TAB)
      .perform();
    await delay(1000);
    await this.expect(await this.takeScreenshot()).to.matchImage("tabPress");
  });

  test("spacePress", async function () {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: "span" }))
      .perform();
    await this.browser
      .actions({
        bridge: true,
      })
      .move({ origin: this.browser.findElement({ css: "body" }) })
      .press()
      .release()
      .sendKeys(this.keys.TAB)
      .pause(1000)
      .sendKeys(this.keys.SPACE)
      .pause(1000)
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage("spacePress");
  });
};

kind("Checkbox", () => {
  story("Plain", ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        "story-skip-0": {
          in: ["ie11", "ie118px", "ie11Flat8px", "ie11Dark"],
          tests: "hovered",
        },

        // TODO @Khlutkova fix after update browsers
        "story-skip-1": {
          in: ["chrome8px", "chromeFlat8px", "chrome", "chromeDark"],
          tests: ["hovered", "pressed", "clicked"],
        },
      },
    });

    checkboxTests();
  });

  story("Checked", ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        "story-skip-0": {
          in: ["ie11", "ie118px", "ie11Flat8px", "ie11Dark"],
          tests: "hovered",
        },

        // TODO @Khlutkova fix after update browsers
        "story-skip-1": {
          in: ["chrome8px", "chromeFlat8px", "chrome", "chromeDark"],
          tests: ["hovered", "pressed", "clicked"],
        },
      },
    });

    test("idle", async function () {
      await this.expect(await this.takeScreenshot()).to.matchImage("idle");
    });

    test("hovered", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .move({
          origin: this.browser.findElement({ css: "span" }),
        })
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage("hovered");
    });

    test("pressed", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .move({
          origin: this.browser.findElement({ css: "span" }),
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

  story("Indeterminate", ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        "story-skip-0": {
          in: ["ie11", "ie118px", "ie11Flat8px", "ie11Dark"],
          tests: "hovered",
        },

        // TODO @Khlutkova fix after update browsers
        "story-skip-1": {
          in: ["chrome8px", "chromeFlat8px", "chrome", "chromeDark"],
          tests: ["hovered", "clicked"],
        },
      },
    });

    test("plain", async function () {
      const element = await this.browser.findElement({
        css: "#screenshot-capture",
      });
      await delay(1000);
      await this.expect(await element.takeScreenshot()).to.matchImage("plain");
    });

    test("hovered", async function () {
      const element = await this.browser.findElement({
        css: "#screenshot-capture",
      });
      await this.browser
        .actions({
          bridge: true,
        })
        .move({
          origin: this.browser.findElement({ css: "label" }),
        })
        .perform();
      await delay(1000);
      await this.expect(await element.takeScreenshot()).to.matchImage(
        "hovered"
      );
    });

    test("tabPress", async function () {
      const element = await this.browser.findElement({
        css: "#screenshot-capture",
      });
      await this.browser
        .actions({
          bridge: true,
        })
        .sendKeys(this.keys.TAB)
        .perform();
      await delay(1000);
      await this.expect(await element.takeScreenshot()).to.matchImage(
        "tabPress"
      );
    });

    test("clicked", async function () {
      const element = await this.browser.findElement({
        css: "#screenshot-capture",
      });
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: "label" }))
        .perform();
      await delay(1000);
      await this.expect(await element.takeScreenshot()).to.matchImage(
        "clicked"
      );
    });
  });

  story("Highlighted", () => {
    test("plain", async function () {
      await this.expect(await this.takeScreenshot()).to.matchImage("plain");
    });

    test("tabPress", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .sendKeys(this.keys.TAB)
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage("tabPress");
    });
  });

  story("CheckboxLabelSelectionWithPressedShift", () => {
    test("plain", async function () {
      await this.expect(await this.takeScreenshot()).to.matchImage("plain");
    });

    test("selected with pressed shift", async function () {
      const checkbox = await this.browser.findElement({
        css: '[data-comp-name~="Checkbox"]',
      });
      await this.browser
        .actions({ bridge: true })
        .keyDown(this.keys.SHIFT)
        .click(checkbox)
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage(
        "selected with pressed shift"
      );
      await this.browser
        .actions({ bridge: true })
        .keyUp(this.keys.SHIFT)
        .perform();
    });
  });
});
