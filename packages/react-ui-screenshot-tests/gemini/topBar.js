/* global gemini */

var renderStory = require("./utils").renderStory;

gemini.suite("TopBar", () => {
  gemini.suite("TopBar Old", suite => {
    suite
      .before(renderStory("TopBar", "TopBar Old"))
      .setCaptureElements("#test-element")
      .capture("TopBar Old");
  });

  gemini.suite("TopBar New", suite => {
    suite
      .before(renderStory("TopBar", "TopBar New"))
      .setCaptureElements("#test-element")
      .capture("TopBar New");
  });
});
