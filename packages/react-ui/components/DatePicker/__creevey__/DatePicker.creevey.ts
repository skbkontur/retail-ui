import { story, kind, test } from "creevey";

import { delay } from "../../../lib/utils";

kind("DatePicker", () => {
  story("WithMouseeventHandlers", () => {
    test("opened", async function () {
      await delay(1000);
      await this.browser
        .actions({
          bridge: true,
        })
        .click(
          this.browser.findElement({ css: '[data-comp-name~="DatePicker"]' })
        )
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage("opened");
    });

    test("DateSelect month", async function () {
      await delay(1000);
      await this.browser
        .actions({
          bridge: true,
        })
        .click(
          this.browser.findElement({ css: '[data-comp-name~="DatePicker"]' })
        )
        .perform();
      await delay(1000);
      await this.browser
        .actions({ bridge: true })
        .click(
          this.browser.findElement({
            css: '[data-tid="MonthView__month"]:first-child [data-tid="MonthView__headerMonth"] [data-tid="DateSelect__caption"]',
          })
        )
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage(
        "DateSelect month"
      );
    });

    test("DateSelect year", async function () {
      await delay(1000);
      await this.browser
        .actions({
          bridge: true,
        })
        .click(
          this.browser.findElement({ css: '[data-comp-name~="DatePicker"]' })
        )
        .perform();
      await delay(1000);
      await this.browser
        .actions({ bridge: true })
        .click(
          this.browser.findElement({
            css: '[data-comp-name~="MonthView"]:first-child [data-tid="MonthView__headerYear"] [data-tid="DateSelect__caption"]',
          })
        )
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage(
        "DateSelect year"
      );
    });
  });

  story("DatePickerWithMinMaxDate", () => {
    test("DateSelect months", async function () {
      await delay(1000);
      await this.browser
        .actions({
          bridge: true,
        })
        .click(
          this.browser.findElement({ css: '[data-comp-name~="DatePicker"]' })
        )
        .pause(1000)
        .perform();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(
          this.browser.findElement({
            css: '[data-tid="MonthView__month"]:first-child [data-tid="MonthView__headerMonth"] [data-tid="DateSelect__caption"]',
          })
        )
        .pause(1000)
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage(
        "DateSelect months"
      );
    });

    test("DateSelect years", async function () {
      await delay(1000);
      await this.browser
        .actions({
          bridge: true,
        })
        .click(
          this.browser.findElement({ css: '[data-comp-name~="DatePicker"]' })
        )
        .pause(1000)
        .perform();
      await this.browser
        .actions({
          bridge: true,
        })
        .click(
          this.browser.findElement({
            css: '[data-comp-name~="MonthView"]:first-child [data-tid="MonthView__headerYear"] [data-tid="DateSelect__caption"]',
          })
        )
        .pause(1000)
        .perform();
      await this.expect(await this.takeScreenshot()).to.matchImage(
        "DateSelect years"
      );
    });
  });

  story("DatePickerInRelativeBody", () => {
    test("opened", async function () {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: "button" }))
        .click(
          this.browser.findElement({ css: '[data-comp-name~="DatePicker"]' })
        )
        .perform();
      await delay(1000);
      await this.expect(await this.takeScreenshot()).to.matchImage("opened");
    });
  });
});
