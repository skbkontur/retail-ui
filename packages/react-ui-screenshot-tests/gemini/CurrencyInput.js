const pathTo = require("./utils").pathTo;

gemini.suite("CurrencyInput", () => {
  gemini.suite("Sample", suite => {
    suite
      .setUrl(pathTo("CurrencyInput", "Sample"))
      .setCaptureElements("#test-element")
      .capture("Plain")
      .capture("Focus", (actions, find) => {
        actions.focus(find('[class^="Input-input"]'));
      })
      .capture("Input value", (actions, find) => {
        "1234".split("").forEach(char => {
          actions.wait(500);
          actions.sendKeys(find('[class^="Input-input"]'), char);
        });
      })
      .capture("External focus and input", (actions, find) => {
        actions.click(find("button"));
        "5678".split("").forEach(char => {
          actions.wait(500);
          actions.sendKeys(find('[class^="Input-input"]'), char);
        });
      });
  });
});
