/* global gemini */

var pathTo = require("./utils").pathTo;

gemini.suite("Group", () => {
  gemini.suite("Group with input", suite => {
    suite
      .setUrl(pathTo("Group", "Simple Group with Input and Button"))
      .setCaptureElements("#test-element")
      .capture("plain")
      .capture("focused input", (actions, find) => {
        actions.focus(find("input"));
      });
  });

  gemini.suite("Group with buttons", suite => {
    suite
      .setUrl(pathTo("Group", "Button group"))
      .setCaptureElements("#test-element")
      .capture("plain");
  });

  gemini.suite("Group with custom Inputs width", suite => {
    suite
      .setUrl(pathTo("Group", "Simple Group with custom Inputs width"))
      .setCaptureElements("#test-element")
      .capture("with custom Inputs width");
  });
});
