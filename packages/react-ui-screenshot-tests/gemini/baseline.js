/* global gemini */
var renderStory = require("./utils").renderStory;

gemini.suite("Small button Baseline", suite => {
  suite
    .before(renderStory("Baseline", "Button and text"))
    .setCaptureElements("#test-element")
    .capture("simple");
});

gemini.suite("Medium button Baseline", suite => {
  suite
    .before(renderStory("Baseline", "Medium Button and text"))
    .setCaptureElements("#test-element")
    .capture("simple");
});

gemini.suite("Large button Baseline", suite => {
  suite
    .before(renderStory("Baseline", "Large Button and text"))
    .setCaptureElements("#test-element")
    .capture("simple");
});

gemini.suite("Link and button Baseline", suite => {
  suite
    .before(renderStory("Baseline", "Button and link"))
    .setCaptureElements("#test-element")
    .capture("simple");
});

gemini.suite("Input and text Baseline", suite => {
  suite
    .before(renderStory("Baseline", "Input and text"))
    .setCaptureElements("#test-element")
    .capture("simple");
});
