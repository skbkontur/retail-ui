var pathTo = require("./utils").pathTo;

gemini.suite("Spinner", () => {
  gemini.suite("String caption", suite => {
    suite
      .setUrl(pathTo("Spinner", "Normal"))
      .setCaptureElements("#test-element")
      .ignoreElements({ every: "[class^='Spinner-inner']" })
      .capture("plain");
  });

  gemini.suite("ReactNode caption", suite => {
    suite
      .setUrl(pathTo("Spinner", "With ReactNode in caption"))
      .setCaptureElements("#test-element")
      .ignoreElements({ every: "[class^='Spinner-inner']" })
      .capture("plain");
  });
});
