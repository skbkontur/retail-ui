/* global gemini */
var pathTo = require("./utils").pathTo;

gemini.suite("Hint", suite => {
  suite
    .setUrl(pathTo("Hint", "default"))
    .setCaptureElements("#test-element")
    .capture("mouseOver");
});

gemini.suite("Hint left", suite => {
  suite
    .setUrl(pathTo("Hint", "left"))
    .setCaptureElements("#test-element")
    .capture("mouseOver");
});

gemini.suite("Hint right", suite => {
  suite
    .setUrl(pathTo("Hint", "right"))
    .setCaptureElements("#test-element")
    .capture("mouseOver");
});

gemini.suite("Hint bottom", suite => {
  suite
    .setUrl(pathTo("Hint", "bottom"))
    .setCaptureElements("#test-element")
    .capture("mouseOver");
});

gemini.suite("With large word", suite => {
  suite
    .setUrl(pathTo("Hint", "with large word"))
    .setCaptureElements("#test-element")
    .capture("mouseOver");
});

gemini.suite("Hint with block caption", suite => {
  suite
    .setUrl(pathTo("Hint", "with block-element"))
    .setCaptureElements("#test-element")
    .capture("mouseOver");
});

gemini.suite("Hint with 100%-width input", suite => {
  suite
    .setUrl(pathTo("Hint", "with 100%-width input"))
    .setCaptureElements("#test-element")
    .capture("mouseOver");
});

gemini.suite("Hint wrap inline-block", suite => {
  suite
    .setUrl(
      pathTo("Hint", "Hints without wrapper around inline-block with 50% width")
    )
    .setCaptureElements("#test-element")
    .capture("mouseOver");
});
