/* global gemini */

var renderStory = require('./utils').renderStory;

gemini.suite('toggle', suite => {
  suite
    .before(renderStory('Toggle', 'plain'))
    .setCaptureElements('#test-element')
    .capture('plain')
    .capture('pressed', (actions, find) => {
      actions.mouseDown(find('label'));
    })
    .capture('clicked', (actions, find) => {
      actions.mouseUp(find('label'));
    });
});

gemini.suite('disabled toggle', suite => {
  suite
    .before(renderStory('Toggle', 'playground'))
    .setCaptureElements('#test-element')
    .capture('plain');
});
