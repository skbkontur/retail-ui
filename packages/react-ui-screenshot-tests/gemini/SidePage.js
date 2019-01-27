const renderStory = require("./utils").renderStory;

gemini.suite("SidePage", suite => {
  gemini.suite("simple", suite => {
    suite
      .before(renderStory("SidePage", "Simple"))
      .setCaptureElements("html")
      .capture("open side-page", (actions, find) => {
        actions.click(find("button"));
      });
  });

  gemini.suite("left", suite => {
    suite
      .before(renderStory("SidePage", "SidePage with left position"))
      .setCaptureElements("html")
      .capture("plain");
  });

  gemini.suite("SidePage over another SidePage", suite => {
    suite
      .before(renderStory("SidePage", "SidePage over another SidePage"))
      .setCaptureElements("html")
      .capture("open internal side-page", (actions, find) => {
        actions.click(find("button"));
        actions.click(find('[class^="SidePage-body"] button'));
      })
      .capture("close internal side-page", (action, find) => {
        action.click(find('.react-ui:last-child [class^="SidePage-footer"] button'));
      });
  });

  gemini.suite("updateLayout method", suite => {
    suite
      .before(renderStory("SidePage", "test updateLayout method"))
      .setCaptureElements("html")
      .ignoreElements("#buttons")
      .capture("idle")
      .capture("Body content has been changed", (actions, find) => {
        actions.click(find("#toggle-body-content"));
      })
      .capture("child component content has been changed", (actions, find) => {
        actions.click(find("#toggle-body-content"));
        actions.click(find("#toggle-child-component-content"));
      })
      .capture("update layout", (action, find) => {
        action.click(find("#update"));
      });
  });
});
