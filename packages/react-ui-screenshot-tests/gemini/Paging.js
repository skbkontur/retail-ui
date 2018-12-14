const pathTo = require("./utils").pathTo;

gemini.suite("Paging", () => {
  gemini.suite("Sample", suite => {
    suite
      .setUrl(pathTo("Paging", "GoToAbsensePage"))
      .setCaptureElements("#test-element")
      .capture("plain")
      .capture("hover", (actions, find) => {
        actions.mouseMove(find('[class^="Paging-pageLinkWrapper"]'));
      })
      .capture("change page by number", (actions, find) => {
        actions.click(find('[class^="Paging-pageLinkWrapper"]'));
      })
      .capture("change page by forwardLink", (actions, find) => {
        actions.click(find('[class^="Paging-forwardLink"]'));
      });
  });
});
