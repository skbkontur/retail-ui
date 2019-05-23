/* global gemini */
var renderStory = require('./utils').renderStory;

gemini.suite('Customization', () => {
  gemini.suite('playground', suite => {
    suite
      .before(renderStory('ThemeProvider', 'playground'))
      .setCaptureElements('#test-element')
      .capture('default theme')
      .capture('flat theme', (actions, find) => {
        actions.click(find('[data-prop-id="flat"]'));
      })
      .capture('dark theme', (actions, find) => {
        actions.click(find('[data-prop-id="dark"]'));
      });
  });
});
