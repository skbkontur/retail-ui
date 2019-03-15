/* global gemini */

var renderStory = require('./utils').renderStory;

gemini.suite('FxInput', () => {
  gemini.suite('Type text', suite => {
    suite
      .before(renderStory('FxInput', 'type text'))
      .setCaptureElements('#test-element')
      .capture('type text');
  });

  gemini.suite('Type currency', suite => {
    suite
      .before(renderStory('FxInput', 'type currency'))
      .setCaptureElements('#test-element')
      .capture('type currency');
  });

  gemini.suite('Borderless', suite => {
    suite
      .before(renderStory('FxInput', 'borderless'))
      .setCaptureElements('#test-element')
      .capture('borderless');
  });

  gemini.suite('With width', suite => {
    suite
      .before(renderStory('FxInput', 'with width'))
      .setCaptureElements('#test-element')
      .ignoreElements('#toggle-width')
      .capture('inside auto container')
      .capture('inside fixed container', (actions, find) => {
        actions.click('#toggle-width');
      });
  });
});
