/* global gemini */

var pathTo = require("./utils").pathTo;

gemini.suite("modal", suite => {
  suite
    .setUrl(pathTo("Modal", "Modal over another modal"))
    .setCaptureElements("html")
    .capture("open first modal", (actions, find) => {
      actions.click(find("button"));
    })
    .capture("open second modal", (actions, find) => {
      actions.click(find('[class^="Modal-body"] button'));
    });
});

gemini.suite("modal with panel in footer", suite => {
  suite
    .setUrl(pathTo("Modal", "Modal with footer panel"))
    .setCaptureElements("html")
    .capture("open modal", (actions, find) => {
      actions.click(find("button"));
    });
});

gemini.suite("modal without panel in footer", suite => {
  suite
    .setUrl(pathTo("Modal", "Modal without footer panel"))
    .setCaptureElements("html")
    .capture("open modal", (actions, find) => {
      actions.click(find("button"));
    });
});

gemini.suite("modal without footer", suite => {
  suite
    .setUrl(pathTo("Modal", "Modal without footer"))
    .setCaptureElements("html")
    .capture("open modal", (actions, find) => {
      actions.click(find("button"));
    });
});

gemini.suite("modal without header", suite => {
  suite
    .setUrl(pathTo("Modal", "Modal without header"))
    .setCaptureElements("html")
    .capture("open modal");
});

gemini.suite("modal with variable height of content", suite => {
  suite
    .setUrl(pathTo("Modal", "Modal with variable height of content"))
    .setCaptureElements("html")
    .capture("open modal", (actions, find) => {
      actions.click(find("button"));
    })
    .capture("toggle content height", (actions, find) => {
      actions.click(find('#modal-inner [class^="Toggle-wrapper"]')).wait(500);
    });
});
