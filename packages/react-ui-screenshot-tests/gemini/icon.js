/* global gemini */
var renderStory = require("./utils").renderStory;

gemini.suite("Icon", suite => {
  suite
    .before(renderStory("Icon", "All icons"))
    .setCaptureElements("#test-element")
    .capture("idle");
});
