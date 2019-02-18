/* global gemini */
var renderStory = require("./utils").renderStory;

gemini.suite("Tooltip", suite => {
  suite
    .before(renderStory("Tooltip", "static tooltip"))
    .setCaptureElements("#test-element")
    .capture("simple");
});

gemini.suite("Tooltip left", suite => {
  suite
    .before(renderStory("Tooltip", "tooltip left"))
    .setCaptureElements("#test-element")
    .capture("plain");
});

gemini.suite("Tooltip right", suite => {
  suite
    .before(renderStory("Tooltip", "tooltip right"))
    .setCaptureElements("#test-element")
    .capture("plain");
});

gemini.suite("Tooltip bottom", suite => {
  suite
    .before(renderStory("Tooltip", "tooltip bottom"))
    .setCaptureElements("#test-element")
    .capture("plain");
});

gemini.suite("Tooltip wrap inline-block", suite => {
  suite
    .before(renderStory("Tooltip", "Tooltips without wrapper around inline-block with 50% width"))
    .setCaptureElements("#test-element")
    .capture("hover", (actions, find) => {
      actions.mouseMove(find("textarea"));
    });
});

gemini.suite("Opened tooltip without wrapper", suite => {
  suite
    .before(renderStory("Tooltip", "Opened tooltip without wrapper"))
    .setCaptureElements("#test-element")
    .capture("plain");
});

gemini.suite("Opened tooltip by focus (Button)", suite => {
  suite
    .before(renderStory("Tooltip", "focus tooltip"))
    .setCaptureElements("#test-element")
    .capture("plain")
    .capture("focus", (actions, find) => {
        actions.focus(find("button"));
    })
    .capture("blur", (actions) => {
        actions.executeJS(function(window) {
            if (window.document.activeElement) {
                window.document.activeElement.blur();
            }
        });
    });
});

gemini.suite("Opened tooltip by focus (input)", suite => {
  suite
      .before(renderStory("Tooltip", "focus tooltip (native input)"))
      .setCaptureElements("#test-element")
      .capture("plain")
      .capture("focus", (actions, find) => {
          actions.focus(find("input"));
      })
      .capture("blur", (actions) => {
          actions.executeJS(function(window) {
              if (window.document.activeElement) {
                  window.document.activeElement.blur();
              }
          });
      });
});
