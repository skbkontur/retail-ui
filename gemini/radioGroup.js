/* global gemini */

var pathTo = require('./utils').pathTo;

gemini.suite('RadioGroup', suite => {
  suite.setUrl(pathTo('RadioGroup', 'playground'))
    .setUrl(pathTo('RadioGroup', 'vertical'))
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

gemini.suite('RadioGroup inline', (suite) => {
  suite.setUrl(pathTo('RadioGroup', 'inline'))
    .setCaptureElements('#test-element')
	.capture('RadioGroup inline');
});