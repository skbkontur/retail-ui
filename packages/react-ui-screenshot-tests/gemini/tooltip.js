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
    .before(
      renderStory(
        "Tooltip",
        "Tooltips without wrapper around inline-block with 50% width"
      )
    )
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
    .capture("01 - plain")
    .capture("02 - focus", actions => {
      actions.sendKeys(gemini.TAB);
    })
    .capture("03 - blur", (actions, find) => {
      actions.sendKeys(find("button"), gemini.TAB);
    })
    .skip.in(
      "firefox",
      "в firefox завезли поддержку focusin/focusout только с 52ой версии"
    );
});

gemini.suite("Opened tooltip by focus (input)", suite => {
  suite
    .before(renderStory("Tooltip", "focus tooltip (native input)"))
    .setCaptureElements("#test-element")
    .capture("01 - plain")
    .capture("02 - focus", (actions, find) => {
      actions.focus(find("input"));
    })
    .capture("03 - blur", (actions, find) => {
      actions.sendKeys(find("input"), gemini.TAB);
    })
    .skip.in(
      "firefox",
      "в firefox завезли поддержку focusin/focusout только с 52ой версии"
    );
});

gemini.suite("Tooltip with external dynamic content", suite => {
  suite
    .before(renderStory("Tooltip", "Tooltip with external dynamic content"))
    .setCaptureElements("#test-element")
    .capture("01 - plain")

    .capture("02 - changes top position if does not fit", (actions, find) => {
      actions.click(find("#Container-0 button"));
    })
    .capture("03 - does not change position back on shrink", (actions, find) => {
      actions.click(find("#Container-0 button"));
    })

    .capture("04 - does not change top position if fits", (actions, find) => {
      actions.click(find("#Container-1 button"));
    })
    .capture("05 - does not change position on shrink", (actions, find) => {
      actions.click(find("#Container-1 button"));
    })

    .capture("06 - changes left position if does not fit", (actions, find) => {
      actions.click(find("#Container-2 button"));
    })
    .capture("07 - does not change position back on shrink", (actions, find) => {
      actions.click(find("#Container-2 button"));
    })

    .capture("08 - does not change bottom position if fits", (actions, find) => {
      actions.click(find("#Container-3 button"));
    })
    .capture("09 - does not change position on shrink", (actions, find) => {
      actions.click(find("#Container-3 button"));
    })

    .capture("10 - does not change bottom position if does not fit", (actions, find) => {
      actions.click(find("#Container-4 button"));
    })
    .capture("11 - does not change position on shrink", (actions, find) => {
      actions.click(find("#Container-4 button"));
    })
});
