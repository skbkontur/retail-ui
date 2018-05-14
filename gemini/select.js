/* global gemini */
const pathTo = require('./utils').pathTo;

const ROOT_SELECTOR = '[class^="Select-root"]';
const MENU_ITEM_SELECTOR = '[class^="MenuItem-root"]';

const testScenario = suite => {
  suite
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
};

gemini.suite('Select', suite => {
  testScenario(
    suite
      .setUrl(pathTo('Select', 'Simple'))
      .setCaptureElements('.dropdown-test-container')
  );
});

gemini.suite('Select Use Link', suite => {
  testScenario(
    suite
      .setUrl(pathTo('Select', 'use link'))
      .setCaptureElements('.dropdown-test-container')
  );
});

gemini.suite('Select Use Link With Icon', suite => {
  testScenario(
    suite
      .setUrl(pathTo('Select', 'use link with icon'))
      .setCaptureElements('.dropdown-test-container')
  );
});
