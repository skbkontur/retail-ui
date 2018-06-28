/* global gemini */

var pathTo = require('./utils').pathTo;

gemini.suite('toggle', suite => {
  suite
    .setUrl(pathTo('Toggle', 'plain'))
    .setCaptureElements('#test-element')
    .capture('plain')
    .capture('pressed', (actions, find) => {
      actions.mouseDown(find('span'));
    })
    .capture('clicked', (actions, find) => {
      actions.mouseUp(find('span'));
    });
});
