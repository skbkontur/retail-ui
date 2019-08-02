var pathTo = require("./utils").pathTo;

gemini.suite("ComboBox", () => {
  gemini.suite("View", () => {
    gemini.suite("Input like text", suite => {
      suite
        .setUrl(pathTo("ComboBoxView", "input like text"))
        .setCaptureElements("#test-element")
        .ignoreElements('[class^="Spinner-spinner"]')
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
        .ignoreElements('[class^="Spinner-spinner"]')
        .capture("plain");
    });

    gemini.suite("With items", suite => {
      suite
        .setUrl(pathTo("ComboBoxView", "with items"))
        .setCaptureElements("#test-element")
        .capture("plain");
    });
  });

  gemini.suite("Component", () => {
    let targetMenuItem;

    gemini.suite("Simple", suite => {
      suite
        .setUrl(pathTo("ComboBox", "simple combobox"))
        .setCaptureElements("#test-element")
        .capture("plain")
        .capture("opened", (action, find) => {
          action.click(find('[class^="Input-root"]'));
        })
        .capture("hovered", (action, find) => {
          targetMenuItem = find('[class^="MenuItem-root"]:nth-of-type(4)');
          action.mouseMove(targetMenuItem);
        })
        .capture("selected", action => {
          action.click(targetMenuItem);
        });
    });

    gemini.suite("Open to top", suite => {
      suite
        .setUrl(pathTo("ComboBox", "open to top"))
        .setCaptureElements("#test-element")
        .capture("plain")
        .capture("opened", (action, find) => {
          action.click(find('[class^="Input-root"]'));
        })
        .capture("hovered", (action, find) => {
          targetMenuItem = find('[class^="MenuItem-root"]:nth-of-type(4)');
          action.mouseMove(targetMenuItem);
        })
        .capture("selected", action => {
          action.click(targetMenuItem);
        });
    });

    gemini.suite("Search", suite => {
      suite
        .setUrl(pathTo("ComboBox", "simple combobox"))
        .setCaptureElements("#test-element")
        .capture("search result", (action, find) => {
          action.click(find('[class^="Input-root"]'));
          action.sendKeys("input", "Second");
        })
        .capture("selcted", action => {
          action.sendKeys(gemini.ENTER);
        })
        .capture("opened again", (action, find) => {
          action.click(find('[class^="Input-root"]'));
        });
    });

    gemini.suite("RenderNotFound", suite => {
      suite
        .setUrl(pathTo("ComboBox", "simple combobox"))
        .setCaptureElements("#test-element")
        .capture("search result", (action, find) => {
          action.click(find('[class^="Input-root"]'));
          action.sendKeys("input", "Такого точно нету");
        });
    });

    gemini.suite("External control", suite => {
      suite
        .setUrl(pathTo("ComboBox", "with external value"))
        .setCaptureElements("#test-element")
        .capture("initial value")
        .capture("reset value", (action, find) => {
          const resetButton = find('[class^="Button-wrap"]:nth-of-type(2)');

          action.click(resetButton);
        })
        .capture("set value", (action, find) => {
          const setButton = find('[class^="Button-wrap"]:nth-of-type(1)');

          action.click(setButton);
        });
    });

    gemini.suite("Keyboard control", suite => {
      suite
        .setUrl(pathTo("ComboBox", "simple combobox"))
        .setCaptureElements("#test-element")
        .capture("select", (action, find) => {
          action.click(find('[class^="Input-root"]'));
          action.sendKeys(gemini.ARROW_DOWN);
          action.sendKeys(gemini.ARROW_DOWN);
          action.sendKeys(gemini.ARROW_DOWN);
        })
        .capture("submit", action => {
          action.sendKeys(gemini.ENTER);
        });
    });

    gemini.suite("External toggle error and set value", suite => {
      suite
        .setUrl(pathTo("ComboBox", "toogle error"))
        .setCaptureElements("#test-element")
        .capture("plain")
        .capture("with error", (action, find) => {
          action.click(find("[class^='Toggle-wrapper']"));
        })
        .capture("plain again", (action, find) => {
          action.click(find("[class^='Toggle-wrapper']"));
        });
    });

    gemini.suite("AutoFocus", suite => {
      suite
        .setUrl(pathTo("ComboBox", "with autoFocus"))
        .setCaptureElements("#test-element")
        .capture("plain");
    });

    gemini.suite("select element if only one in dropdown", suite => {
      suite
        .setUrl(pathTo("ComboBox", "simple combobox"))
        .setCaptureElements("#test-element")
        .capture("editing", (action, find) => {
          action.click(find('[class^="Input-root"]'));
          action.sendKeys("input", "Second");
        })
        .capture("select", (action, find) => {
          action.click(find("body"));
        })
        .capture("selected", (action, find) => {
          action.click(find('[class^="Input-root"]'));
        });
    });

    gemini.suite('focus flow', suite => {
      suite
        .setUrl(pathTo('ComboBox', 'focus flow'))
        .setCaptureElements('#test-element')
        .capture('before')
        .capture('after Enter on Item', action => {
          action.sendKeys(gemini.ENTER);
        })
        .capture('after Tab press', action => {
          action.sendKeys(gemini.TAB);
        });
    });
  });
});
