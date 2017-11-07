/* global gemini */
var pathTo = require('./utils').pathTo;

var BUTTON_SELECTOR = '[class^="Button-root"]';

gemini.suite('Switcher', suite => {
  suite
    .setUrl(pathTo('Switcher', 'horizontal'))
    .setCaptureElements('#test-element')
    .capture('idle')
    .capture('clicked', (actions, find) => {
      actions.click(find(BUTTON_SELECTOR));
    });
});

gemini.suite('Switcher errored', suite => {
  suite
    .setUrl(pathTo('Switcher', 'errored'))
    .setCaptureElements('#test-element')
    .capture('idle');
});
