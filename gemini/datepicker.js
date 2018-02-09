/* global gemini */

var pathTo = require('./utils').pathTo;

gemini.suite('DatePicker', suite => {
  suite
    .setUrl(pathTo('DatePicker', 'with mouseevent handlers'))
    .setCaptureElements(['[class^="Picker-root"]', '#test-element'])
    .capture('opened', (actions, find) => {
      actions.click(find('[class^="DatePicker-root"]'));
    })
    .capture('opened year', (actions, find) => {
      actions.click(
        find('[class^="MonthView-headerYear"] [class^="DateSelect-root"]')
      );
    })
    .capture('opened month', (actions, find) => {
      actions.click(
        find('[class^="MonthView-headerMonth"] [class^="DateSelect-root"]')
      );
    });
});
