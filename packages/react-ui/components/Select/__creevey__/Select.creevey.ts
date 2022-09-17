import { story, kind, test } from "creevey";

import { delay } from "../../../lib/utils";

const selectTests = () => {
  test("idle", async function () {
    await delay(1000);
    await this.expect(await this.takeScreenshot()).to.matchImage("idle");
  });

  test("clicked", async function () {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: '[data-comp-name~="Select"]' }))
      .perform();
    await delay(1000);
    await this.expect(await this.takeScreenshot()).to.matchImage("clicked");
  });

  test("MenuItem hover", async function () {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: '[data-comp-name~="Select"]' }))
      .perform();
    await this.browser
      .actions({
        bridge: true,
      })
      .move({
        origin: this.browser.findElement({
          css: '[data-comp-name~="MenuItem"]',
        }),
      })
      .perform();
    await delay(1000);
    await this.expect(await this.takeScreenshot()).to.matchImage(
      "MenuItem hover"
    );
  });

  test("selected item", async function () {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: '[data-comp-name~="Select"]' }))
      .perform();
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: '[data-comp-name~="MenuItem"]' }))
      .perform();
    await delay(1000);
    await this.expect(await this.takeScreenshot()).to.matchImage(
      "selected item"
    );
  });
};

kind("Select", () => {
  story("Simple", ({ setStoryParameters }) => {
    setStoryParameters({
      captureElement: ".dropdown-test-container",
      skip: {
        "story-skip-0": {
          in: ["ie11", "ie118px", "ie11Dark"],
          tests: "MenuItem hover",
        },

        // TODO @Khlutkova fix after update browsers
        "story-skip-1": {
          in: ["chrome8px", "chromeFlat8px", "chrome", "chromeDark"],
          tests: ["MenuItem hover"],
        },
      },
    });

    selectTests();
  });

  story("UseLink", ({ setStoryParameters }) => {
    setStoryParameters({
      captureElement: ".dropdown-test-container",
      skip: {
        "story-skip-0": {
          in: ["ie11", "ie118px", "ie11Dark"],
          tests: "MenuItem hover",
        },

        // TODO @Khlutkova fix after update browsers
        "story-skip-1": {
          in: ["chrome8px", "chromeFlat8px", "chrome", "chromeDark"],
          tests: ["MenuItem hover"],
        },
      },
    });

    selectTests();
  });

  story("UseLinkWithIcon", ({ setStoryParameters }) => {
    setStoryParameters({
      captureElement: ".dropdown-test-container",
      skip: {
        "story-skip-0": {
          in: ["ie11", "ie118px", "ie11Dark"],
          tests: "MenuItem hover",
        },

        // TODO @Khlutkova fix after update browsers
        "story-skip-1": {
          in: ["chrome8px", "chromeFlat8px", "chrome", "chromeDark"],
          tests: ["MenuItem hover"],
        },
      },
    });

    selectTests();
  });

  story("WithTextOverflow", ({ setStoryParameters }) => {
    setStoryParameters({
      captureElement: ".dropdown-test-container",
      skip: {
        "story-skip-0": {
          in: ["ie11", "ie118px", "ie11Dark"],
          tests: "MenuItem hover",
        },

        // TODO @Khlutkova fix after update browsers
        "story-skip-1": {
          in: ["chrome8px", "chromeFlat8px", "chrome", "chromeDark"],
          tests: ["MenuItem hover"],
        },
      },
    });

    selectTests();
  });

  story("UsingOnKeyDown", () => {
    test("press Enter", async function () {
      const element = await this.browser.findElement({
        css: ".dropdown-test-container",
      });
      await this.browser
        .actions({
          bridge: true,
        })
        .sendKeys(this.keys.TAB)
        .sendKeys(this.keys.ENTER)
        .sendKeys(this.keys.ARROW_DOWN)
        .sendKeys(this.keys.ENTER)
        .perform();
      await delay(1000);
      await this.expect(await element.takeScreenshot()).to.matchImage(
        "press Enter"
      );
    });
  });

  story("WithSearchAndVariousWidth", ({ setStoryParameters }) => {
    setStoryParameters({ captureElement: "#test-element" });

    test("search", async function () {
      const root = await this.browser.findElement({ css: '[data-tid="root"]' });
      const select = await this.browser.findElement({
        css: '[data-comp-name~="Select"]',
      });
      await this.browser
        .actions({
          bridge: true,
        })
        .click(select)
        .pause(500)
        .perform();
      const plainSearch = await root.takeScreenshot();
      await this.browser
        .actions({
          bridge: true,
        })
        .sendKeys(this.keys.ARROW_DOWN)
        .pause(500)
        .perform();
      const pressKeyDown = await root.takeScreenshot();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-comp-name~="Input"]' }))
        .sendKeys("test")
        .pause(500)
        .perform();
      const fullFieldSearch = await root.takeScreenshot();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(select)
        .click(select)
        .pause(500)
        .perform();
      const emptySearch = await root.takeScreenshot();
      await this.expect({
        plainSearch,
        pressKeyDown,
        fullFieldSearch,
        emptySearch,
      }).to.matchImages();
    });

    test("and various width", async function () {
      const root = await this.browser.findElement({ css: '[data-tid="root"]' });
      await this.browser
        .actions({ bridge: true })
        .click(await this.browser.findElement({ css: '[data-tid="w100px"]' }))
        .pause(500)
        .perform();
      const w100px = await root.takeScreenshot();
      await this.browser
        .actions({ bridge: true })
        .click(await this.browser.findElement({ css: '[data-tid="w300px"]' }))
        .pause(500)
        .perform();
      const w300px = await root.takeScreenshot();
      await this.browser
        .actions({ bridge: true })
        .click(await this.browser.findElement({ css: '[data-tid="w100prc"]' }))
        .pause(500)
        .perform();
      const w100prc = await root.takeScreenshot();
      await this.expect({ w100px, w300px, w100prc }).to.matchImages();
    });
  });

  story("WithMenuAlignAndVariousWidth", () => {
    test("open", async function () {
      const root = await this.browser.findElement({ css: "#test-element" });
      await delay(1000);
      await this.expect(await root.takeScreenshot()).to.matchImage();
    });
  });
});
