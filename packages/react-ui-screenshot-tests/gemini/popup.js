/* global gemini */
var pathTo = require("./utils").pathTo;

gemini.suite("Popup All pin opened", suite => {
  suite
    .setUrl(pathTo("Popup", "All pin opened"))
    .setCaptureElements("#test-element")
    .capture("plain");
});

gemini.suite("Popup All pin opened on small elements", suite => {
  suite
    .setUrl(pathTo("Popup", "All pin opened on small elements"))
    .setCaptureElements("#test-element")
    .capture("plain");
});

gemini.suite("Popup Hint", suite => {
  suite
    .setUrl(pathTo("Popup", "Hint"))
    .setCaptureElements("#test-element")
    .capture("plain");
});

gemini.suite("Popup Toast", suite => {
  suite
    .setUrl(pathTo("Popup", "Toast"))
    .setCaptureElements("#test-element")
    .capture("plain");
});

gemini.suite("Popup Small width", suite => {
  suite
    .setUrl(pathTo("Popup", "Small width"))
    .setCaptureElements("#test-element")
    .capture("plain");
});

gemini.suite("Popup wrap inline-block", suite => {
  suite
    .setUrl(pathTo("Popup", "Tooltips and Hints everywhere"))
    .setCaptureElements("#test-element")
    .capture("hover", (actions, find) => {
      actions.mouseMove(find("textarea"));
    });
});
