/* global gemini */
var pathTo = require("./utils").pathTo;

gemini.suite("TokenInput", suite => {
  suite
    .setUrl(pathTo("TokenInput", "empty with reference"))
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
