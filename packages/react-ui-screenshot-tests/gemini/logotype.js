/* global gemini */

var renderStory = require("./utils").renderStory;
var TOGGLE_WIDGET = "#toggle-widget";

gemini.suite("Logotype", suite => {
  suite
    .before(renderStory("Logotype", "with widget"))
    .setCaptureElements("#test-element")
    .ignoreElements(TOGGLE_WIDGET)
    .capture("without widget")
    .before((actions, find) => {
      this.toggleWidget = find(TOGGLE_WIDGET);
    })
    .capture("with widget", actions => {
      actions.click(this.toggleWidget);
    });
});
