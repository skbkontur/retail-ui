/* global gemini */
var renderStory = require('./utils').renderStory;

gemini.suite('Customization', () => {
  gemini.suite('playground', suite => {
    suite
      .before(renderStory('ThemeProvider', 'playground'))
      .setCaptureElements('#test-element')
      .capture('default theme', actions => {
        actions.executeJS(function(window) {
          const documentElement = window.document.documentElement;
          documentElement.scrollTop = 0;
        });
      })
      .capture('flat theme', (actions, find) => {
        actions.click(find('[data-prop-id="flat"]'));
      })
      .capture('dark theme', (actions, find) => {
        actions.click(find('[data-prop-id="dark"]'));
      });
  });
});
