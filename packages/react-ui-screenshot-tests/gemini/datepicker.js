/* global gemini */

var pathTo = require('./utils').pathTo;

gemini.suite('DatePicker', suite => {
  suite
    .setUrl(pathTo('DatePicker', 'with mouseevent handlers'))
    .setCaptureElements(['[class^="Picker-root"]', '#test-element'])
    .capture('opened', (actions, find) => {
      actions.click(find('[class^="DatePicker-root"]'));
    });
});
