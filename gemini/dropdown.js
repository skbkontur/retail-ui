/* global gemini */
var pathTo = require('./utils').pathTo;

var ROOT_SELECTOR = '[class^="Select-root"]';
var MENU_ITEM_SELECTOR = '[class^="MenuItem-root"]';

gemini.suite('Dropdown', suite => {
  suite
    .setUrl(pathTo('Dropdown', 'Simple Dropdown'))
    .setCaptureElements('.dropdown-test-container')
    .capture('idle')
    .capture('clicked', (actions, find) => {
      actions.click(find(ROOT_SELECTOR));
    })
    .capture('MenuItem hover', (actions, find) => {
      actions.mouseMove(find(MENU_ITEM_SELECTOR));
    })
    .capture('selected item', (actions, find) => {
      actions.click(find(ROOT_SELECTOR));
    });
});

gemini.suite('Dropdown with fixed width', suite => {
  suite
    .setUrl(pathTo('Dropdown', 'With fixed width'))
    .setCaptureElements('.dropdown-test-container')
    .capture('idle');
});

gemini.suite('Dropdown with overflow', suite => {
  suite
    .setUrl(pathTo('Dropdown', 'With overflow'))
    .setCaptureElements('.dropdown-test-container')
    .capture('idle');
});

gemini.suite('Dropdown with icon', suite => {
  suite
    .setUrl(pathTo('Dropdown', 'With icon'))
    .setCaptureElements('.dropdown-test-container')
    .capture('idle');
});

gemini.suite('Dropdown with icon and overflow', suite => {
  suite
    .setUrl(pathTo('Dropdown', 'With icon and overflow'))
    .setCaptureElements('.dropdown-test-container')
    .capture('idle');
});

gemini.suite('Dropdown with MenuItem icon', suite => {
  suite
    .setUrl(pathTo('Dropdown', 'With MenuItem icon'))
    .setCaptureElements('.dropdown-test-container')
    .capture('clicked', (actions, find) => {
      actions.click(find(ROOT_SELECTOR));
    });
});
