const pathTo = require("./utils").pathTo;

gemini.suite("SidePage simple", suite => {
  suite
    .setUrl(pathTo("SidePage", "Simple"))
    .setCaptureElements("html")
    .capture("open side-page", (actions, find) => {
      actions.click(find("button"));
    });
});

gemini.suite("SidePage left", suite => {
  suite
    .setUrl(pathTo("SidePage", "SidePage with left position"))
    .setCaptureElements("html")
    .capture("plain");
});

gemini.suite("More one SidePage", suite => {
  suite
    .setUrl(pathTo("SidePage", "SidePage over another SidePage"))
    .setCaptureElements("html")
    .capture("open side-page", (actions, find) => {
      actions.click(find("button"));
      actions.click(find('[class^="SidePage-body"] button'));
    });
});
