/* global gemini */

var pathTo = require("./utils").pathTo;

gemini.suite("Textarea Simple", suite => {
  suite
    .setUrl(pathTo("Textarea", "Simple"))
    .setCaptureElements("#test-element")
    .capture("Textarea Simple");
});

gemini.suite("Textarea Filled", suite => {
  suite
    .setUrl(pathTo("Textarea", "Filled"))
    .setCaptureElements("#test-element")
    .capture("Textarea Filled");
});

gemini.suite("Textarea With error", suite => {
  suite
    .setUrl(pathTo("Textarea", "With error"))
    .setCaptureElements("#test-element")
    .capture("Textarea With error");
});

gemini.suite("Textarea with custom width", suite => {
  suite
    .setUrl(pathTo("Textarea", "Textarea with custom width"))
    .setCaptureElements("#test-element")
    .capture("Textarea with custom width");
});
