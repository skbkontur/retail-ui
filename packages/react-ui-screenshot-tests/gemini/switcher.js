/* global gemini */
var renderStory = require("./utils").renderStory;

var prefix = '-flat';

var BUTTON_SELECTOR = '[class^="Button' + prefix + '-root"]';

gemini.suite("Switcher", suite => {
  suite
    .before(renderStory("Switcher", "horizontal"))
    .setCaptureElements("#test-element")
    .capture("idle")
    .capture("clicked", (actions, find) => {
      actions.click(find(BUTTON_SELECTOR));
    });
});

gemini.suite("Switcher errored", suite => {
  suite
    .before(renderStory("Switcher", "errored"))
    .setCaptureElements("#test-element")
    .capture("idle");
});
