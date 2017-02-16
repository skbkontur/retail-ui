/* global gemini */
var pathTo = require('./utils').pathTo;

var ROOT_SELECTOR = '[class^="Select-root"]';
var MENU_ITEM_SELECTOR = '[class^="MenuItem-root"]';

gemini.suite('Select', (suite) => {
  suite.setUrl(pathTo('Select', 'Simple'))
    .setCaptureElements('.dropdown-test-container')
    .capture('idle')
    .capture('clicked', (actions, find) => {
      actions.click(find(ROOT_SELECTOR));
    })
    .capture('MenuItem hover', (actions, find) => {
      actions.mouseMove(find(MENU_ITEM_SELECTOR));
    })
    .capture('selected item', (actions, find) => {
      actions.click(find(MENU_ITEM_SELECTOR));
    });
});
