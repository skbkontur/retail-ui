/* global gemini */

var pathTo = require('./utils').pathTo;

gemini.suite('DatePicker', suite => {
  suite
    .setUrl(pathTo('DatePicker', 'with mouseevent handlers'))
    .setCaptureElements(['[class^="Picker-root"]', '#test-element'])
    .capture('opened', (actions, find) => {
      actions.click(find('[class^="Icon-root"]'));
    })
    .capture('opened year', (actions, find) => {
      actions.click(find('[class^="DateSelect-root"]'));
    })
    .capture('opened month', (actions, find) => {
      actions.click(find('[class^="DateSelect-root"]:nth-child(3)'));
    });
});
