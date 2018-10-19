/* global gemini */
var pathTo = require("./utils").pathTo;

gemini.suite("Icon", suite => {
  suite
    .setUrl(pathTo("Icon", "All icons"))
    .setCaptureElements("#test-element")
    .capture("idle");
});
