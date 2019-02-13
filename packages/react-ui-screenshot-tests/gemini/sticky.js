const pathTo = require("./utils").pathTo;
const CAPTURE_FRAME = "#capture-frame";
const CONTROL_BUTTONS = "#control-buttons";
const TOGGLE_FRAME_BUTTON = "#toggle-frame";
const TOP_STICKER_BUTTON = "#scroll-to-the-top";
const BOTTOM_STICKER_BUTTON = "#scroll-to-the-bottom";

/**
 * Note: IE11 behaves correctly, but for some reason captures strange screenshots.
 */

gemini.suite("Sticky", () => {
  gemini.suite("Test", suite => {
    suite
      .setUrl(pathTo("Sticky", "Fixed"))
      .setCaptureElements(CAPTURE_FRAME)
      .ignoreElements(CONTROL_BUTTONS)
      .before((actions, find) => {
        this.toggleFrame = find(TOGGLE_FRAME_BUTTON);
      })
      .capture("without scroll", (actions, find) => {
        actions.click(this.toggleFrame);
      })
      .capture("scroll to the top Sticky", (actions, find) => {
        this.scrollToTop = find(TOP_STICKER_BUTTON);
        actions
          .click(this.toggleFrame)
          .click(this.scrollToTop)
          .click(this.toggleFrame);
      })
      .capture("scroll to the bottom Sticky", (actions, find) => {
        this.scrollToBottom = find(BOTTOM_STICKER_BUTTON);
        actions
          .click(this.toggleFrame)
          .click(this.scrollToBottom)
          .click(this.toggleFrame);
      });
  });
});
