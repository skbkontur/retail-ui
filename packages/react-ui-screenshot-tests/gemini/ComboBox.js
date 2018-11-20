var pathTo = require("./utils").pathTo;

gemini.suite("ComboBox", () => {
  gemini.suite("View", () => {
    gemini.suite("Input like text", suite => {
      suite
        .setUrl(pathTo("ComboBoxView", "input like text"))
        .setCaptureElements("#test-element")
        .capture("plain")
        .capture("focused first element", (action, find) => {
          action.focus(find('[class^="Input-input"]'));
        });
    });

    gemini.suite("Input like text with placeholder", suite => {
      suite
        .setUrl(pathTo("ComboBoxView", "input like text with placeholder"))
        .setCaptureElements("#test-element")
        .capture("plain");
    });

    gemini.suite("Opened", suite => {
      suite
        .setUrl(pathTo("ComboBoxView", "opened"))
        .setCaptureElements("#test-element")
        .ignoreElements('[class^="Spinner-circle"]')
        .capture("plain");
    });

    gemini.suite("With items", suite => {
      suite
        .setUrl(pathTo("ComboBoxView", "with items"))
        .setCaptureElements("#test-element")
        .capture("plain");
    });
  });
});
