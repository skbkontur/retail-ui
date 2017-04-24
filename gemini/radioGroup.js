/* global gemini */

var pathTo = require('./utils').pathTo;

gemini.suite('RadioGroup', (suite) => {
  suite.setUrl(pathTo('RadioGroup', 'playground'))
    .setCaptureElements('#test-element')
    .capture('plain')
    .capture('hovered', (actions, find) => {
      actions.mouseMove(find('span'));
    })
    .capture('pressed', (actions, find) => {
      actions.mouseDown(find('span'));
    })
    .capture('unpressed', (actions, find) => {
      actions.mouseUp(find('span'));
    });
});
