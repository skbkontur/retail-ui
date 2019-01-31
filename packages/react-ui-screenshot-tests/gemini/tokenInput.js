/* global gemini */
var renderStory = require("./utils").renderStory;

gemini.suite("TokenInput", suite => {
  suite
    .before(renderStory("TokenInput", "empty with reference"))
    .setCaptureElements(".tokens-test-container")
    .capture("idle")
    .capture("clicked", (actions, find) => {
      actions.click(find('[data-tid="TokenInput"]'));
    })
    .capture("withText", (actions, find) => {
      actions.sendKeys(find('[data-tid="TokenInput"] input'), "aa");
    })
    .capture("withMenu", (actions, find) => {
      actions.wait(500);
    });
});
