/* global gemini */

var pathTo = require('./utils').pathTo;

gemini.suite('modal', suite => {
  suite
    .setUrl(pathTo('Modal', 'Modal over another modal'))
    .setCaptureElements('body')
    .capture('open first modal', (actions, find) => {
      actions.click(find('button'));
    })
    .capture('open second modal', (actions, find) => {
      actions.click(find('[class^="Modal-root"] button'));
      actions.mouseMove(find('body'), [0, 0]);
    });
});
