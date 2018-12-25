/* global gemini */

var pathTo = require("./utils").pathTo;

gemini.suite("Textarea", () => {
  gemini.suite("DifferentStates", suite => {
    suite
      .setUrl(pathTo("Textarea", "Different states"))
      .setCaptureElements("#test-element")
      .capture("Plain")
      .capture("Focus", (actions, find) => {
        actions.focus(find("#TextareaPlain textarea"));
      })
      .capture("Typed", (actions, find) => {
        actions.sendKeys(find("#TextareaPlain textarea"), "Test...");
      });
  });

  gemini.suite("Placeholder", suite => {
    suite
      .setUrl(pathTo("Textarea", "Textarea with placeholder"))
      .setCaptureElements("#test-element")
      .capture("Plain", (actions, find) => {
        find("#TextareaWithPlaceholder");
      });
  });

  gemini.suite("With custom width", suite => {
    suite
      .setUrl(pathTo("Textarea", "Textarea with custom width"))
      .setCaptureElements("#test-element")
      .capture("Plain");
  });

  gemini.suite("Selection", () => {
    gemini.suite("Select all by prop", suite => {
      suite
        .setUrl(pathTo("Textarea", "Select all by prop"))
        .setCaptureElements("#test-element")
        .capture("Plain")
        .capture("Focused", (actions, find) => {
          actions.click(find("label"));
        });
    });

    gemini.suite("Select all by button", suite => {
      suite
        .setUrl(pathTo("Textarea", "Select all by button"))
        .setCaptureElements("#test-element")
        .capture("Plain")
        .capture("Selected", (actions, find) => {
          actions.click(find("button"));
        });
    });
  });
});
