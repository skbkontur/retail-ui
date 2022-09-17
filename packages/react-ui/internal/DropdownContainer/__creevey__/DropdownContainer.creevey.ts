import { story, kind, test } from "creevey";

import { delay } from "../../../lib/utils";

kind("DropdownContainer", () => {
  story(
    "VariousAlignsPortalsItemsAndScrollsStory",
    ({ setStoryParameters }) => {
      setStoryParameters({ delay: 2000 });

      test("short Items", async function () {
        await delay(1000);
        await this.expect(await this.browser.takeScreenshot()).to.matchImage(
          "short Items"
        );
      });

      test("short Items scroll", async function () {
        await this.browser.executeScript(function () {
          const innerScroll = window.document.querySelector(
            "#inner-scroll"
          ) as HTMLElement;
          innerScroll.scrollTop = innerScroll.scrollHeight;
          innerScroll.scrollLeft = innerScroll.scrollWidth;
        });
        await delay(1000);
        await this.expect(await this.browser.takeScreenshot()).to.matchImage(
          "short Items scroll"
        );
      });

      test("long Items", async function () {
        await this.browser
          .actions({ bridge: true })
          .click(this.browser.findElement({ css: "#buttons button" }))
          .perform();
        await delay(2000);
        await this.expect(await this.browser.takeScreenshot()).to.matchImage(
          "long Items"
        );
      });

      test("long Items scroll", async function () {
        await this.browser
          .actions({ bridge: true })
          .click(this.browser.findElement({ css: "#buttons button" }))
          .perform();
        await delay(2000);
        await this.browser.executeScript(function () {
          const innerScroll = window.document.querySelector(
            "#inner-scroll"
          ) as HTMLElement;
          innerScroll.scrollTop = innerScroll.scrollHeight;
          innerScroll.scrollLeft = innerScroll.scrollWidth;
        });
        await delay(2000);
        await this.expect(await this.browser.takeScreenshot()).to.matchImage(
          "long Items scroll"
        );
      });
    }
  );
});
