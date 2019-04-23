/* global gemini */
var renderStory = require('./utils').renderStory;

var ROOT_SELECTOR = '[data-comp-name^="Dropdown"]';
var MENU_ITEM_SELECTOR = '[data-comp-name="MenuItem"]';

gemini.suite('Dropdown', suite => {
  suite
    .before(renderStory('Dropdown', 'Simple Dropdown'))
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
    .before(renderStory('Dropdown', 'With fixed width'))
    .setCaptureElements('.dropdown-test-container')
    .capture('idle');
});

gemini.suite('Dropdown with overflow', suite => {
  suite
    .before(renderStory('Dropdown', 'With overflow'))
    .setCaptureElements('.dropdown-test-container')
    .capture('idle');
});

gemini.suite('Dropdown with icon', suite => {
  suite
    .before(renderStory('Dropdown', 'With icon'))
    .setCaptureElements('.dropdown-test-container')
    .capture('idle');
});

gemini.suite('Dropdown with icon and overflow', suite => {
  suite
    .before(renderStory('Dropdown', 'With icon and overflow'))
    .setCaptureElements('.dropdown-test-container')
    .capture('idle');
});

gemini.suite('Dropdown with MenuItem icon', suite => {
  suite
    .before(renderStory('Dropdown', 'With MenuItem icon'))
    .setCaptureElements('.dropdown-test-container')
    .capture('clicked', (actions, find) => {
      actions.click(find(ROOT_SELECTOR));
    });
});
