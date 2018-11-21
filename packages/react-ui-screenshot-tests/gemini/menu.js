/* global gemini */
var pathTo = require('./utils').pathTo;

var TEST_CONTAINER = '#menu-test-container';
var MOVE_BUTTONS_CONTAINER = '#move-buttons';
var MOVE_UP_BUTTON = '#move-up';
var MOVE_DOWN_BUTTON = '#move-down';

var applyTest = (path, suite) =>
  suite
    .setUrl(path)
    .setCaptureElements(TEST_CONTAINER)
    .capture('idle');

gemini.suite('Menu', wrapperSuite => {

  gemini.suite('with Items', suite => {
    applyTest(pathTo('Menu', 'with Items'), suite);
  });

  gemini.suite('with Header', suite => {
    applyTest(pathTo('Menu', 'with Header'), suite);
  });

  gemini.suite('with Separator', suite => {
    applyTest(pathTo('Menu', 'with Separator'), suite);
  });

  gemini.suite('with Custom Child', suite => {
    applyTest(pathTo('Menu', 'with Custom Child'), suite);
  });

  gemini.suite('with maxHeight', suite => {
    applyTest(pathTo('Menu', 'with maxHeight'), suite)
      .before((actions, find) => {
        this.upButton = find(MOVE_UP_BUTTON);
        this.downButton = find(MOVE_DOWN_BUTTON);
      })
      .ignoreElements(MOVE_BUTTONS_CONTAINER)
      .capture('moved up from top to the last Item', (actions, find) => {
        actions
          .click(this.upButton);
      })
      .capture('moved up from bottom to the first Item', (actions, find) => {
        actions
          .click(this.upButton)
          .click(this.upButton);
      })
      .capture('moved down from top to the last Item', (actions, find) => {
        actions
          .click(this.downButton)
          .click(this.downButton);
      })
      .capture('moved down from bottom to the first Item', (actions, find) => {
        actions
          .click(this.downButton);
      });
  });

  gemini.suite('with width', suite => {
    applyTest(pathTo('Menu', 'with width'), suite);
  });

  gemini.suite('with long Items', suite => {
    applyTest(pathTo('Menu', 'with long Items'), suite);
  });

  gemini.suite('without Shadow', suite => {
    applyTest(pathTo('Menu', 'without Shadow'), suite);
  });
});