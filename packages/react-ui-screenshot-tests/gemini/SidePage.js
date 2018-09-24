const pathTo = require("./utils").pathTo;

const styles = {
  position: "fixed",
  width: "100%",
  height: "100%",
  top: "0",
  width: "0"
};

function createBoundingBox(window) {
  const div = window.document.createElement("div");

  Object.keys(styles).forEach(prop => {
    div.style.setProperty(prop, styles[prop]);
  });

  div.setAttribute("id", "bounding-box");

  return div;
}

gemini.suite("SidePage simple", suite => {
  suite
    .before(actions => {
      actions.executeJS(window => {
        const div = window.document.createElement("div");

        Object.keys(styles).forEach(prop => {
          div.style.setProperty(prop, styles[prop]);
        });

        div.setAttribute("id", "bounding-box");

        // window.document.body.appendChild(createBoundingBox(window));
        window.document.body.appendChild(div);
      });
    })
    .setUrl(pathTo("SidePage", "With scrollable parent content"))
    .setCaptureElements("#bounding-box")
    .capture("open side-page", (actions, find) => {
      actions.click(find("button"));
    });
});

gemini.suite("SidePage left", suite => {
  suite
    .before(actions => {
      actions.executeJS(window => {
        const div = window.document.createElement("div");

        Object.keys(styles).forEach(prop => {
          div.style.setProperty(prop, styles[prop]);
        });

        div.setAttribute("id", "bounding-box");

        // window.document.body.appendChild(createBoundingBox(window));
        window.document.body.appendChild(div);
      });
    })
    .setUrl(pathTo("SidePage", "SidePage with left position"))
    .setCaptureElements("html")
    .capture("plain");
});

gemini.suite("More one SidePage", suite => {
  suite
    .before(actions => {
      actions.executeJS(window => {
        const div = window.document.createElement("div");

        Object.keys(styles).forEach(prop => {
          div.style.setProperty(prop, styles[prop]);
        });

        div.setAttribute("id", "bounding-box");

        // window.document.body.appendChild(createBoundingBox(window));
        window.document.body.appendChild(div);
      });
    })
    .setUrl(pathTo("SidePage", "SidePage over another SidePage"))
    .setCaptureElements("#bounding-box")
    .capture("open side-page", (actions, find) => {
      actions.click(find("button"));
      actions.click(find('[class^="SidePage-body"] button'));
    });
});
