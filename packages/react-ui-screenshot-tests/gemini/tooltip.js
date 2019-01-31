/* global gemini */
var renderStory = require("./utils").renderStory;

gemini.suite("Tooltip", suite => {
  suite
    .before(renderStory("Tooltip", "static tooltip"))
    .setCaptureElements("#test-element")
    .capture("simple");
});

gemini.suite("Tooltip left", suite => {
  suite
    .before(renderStory("Tooltip", "tooltip left"))
    .setCaptureElements("#test-element")
    .capture("plain");
});

gemini.suite("Tooltip right", suite => {
  suite
    .before(renderStory("Tooltip", "tooltip right"))
    .setCaptureElements("#test-element")
    .capture("plain");
});

gemini.suite("Tooltip bottom", suite => {
  suite
    .before(renderStory("Tooltip", "tooltip bottom"))
    .setCaptureElements("#test-element")
    .capture("plain");
});

gemini.suite("Tooltip wrap inline-block", suite => {
  suite
    .before(renderStory("Tooltip", "Tooltips without wrapper around inline-block with 50% width"))
    .setCaptureElements("#test-element")
    .capture("hover", (actions, find) => {
      actions.mouseMove(find("textarea"));
    });
});

gemini.suite("Opened tooltip without wrapper", suite => {
  suite
    .before(renderStory("Tooltip", "Opened tooltip without wrapper"))
    .setCaptureElements("#test-element")
    .capture("plain");
});
