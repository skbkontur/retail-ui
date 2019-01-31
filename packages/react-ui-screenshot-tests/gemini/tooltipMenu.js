/* global gemini */

var renderStory = require("./utils").renderStory;

const DROPDOWN_MENU_SELECTOR = '[class^="TooltipMenu-container"]';
const CAPTION_SELECTOR = '[class^="PopupMenu-caption"]';

var applyTest = testSuite =>
  testSuite
    .setCaptureElements("#test-element")
    .before((actions, find) => {
      this.dropdownMenu = find(DROPDOWN_MENU_SELECTOR);
      this.captionElement = find(CAPTION_SELECTOR);
    })
    .capture("plain")
    .capture("clickAfterClickedOnCaption", (actions, find) => {
      actions.click(this.captionElement).click(this.captionElement);
    })
    .capture("clicked", actions => {
      actions.click(this.captionElement);
    })
    .capture("clickedOutside", (actions, find) => {
      actions.click(find("body"));
    })
    .capture("tabPress", (actions, find) => {
      actions.sendKeys(gemini.TAB);
    })
    .capture("enterPress", (actions, find) => {
      actions.sendKeys(gemini.ENTER);
    })
    .capture("escapePress", (actions, find) => {
      actions.sendKeys(gemini.ESCAPE);
    });

gemini.suite("TooltipMenu simple", suite => {
  suite.before(renderStory("TooltipMenu", "Simple example"));
  applyTest(suite);
});
