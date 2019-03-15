/* global gemini */

var renderStory = require('./utils').renderStory;

gemini.suite('Group', () => {
  gemini.suite('Group with input', suite => {
    suite
      .before(renderStory('Group', 'Simple Group with Input and Button'))
      .setCaptureElements('#test-element')
      .capture('plain')
      .capture('focused input', (actions, find) => {
        actions.focus(find('input'));
      });
  });

  gemini.suite('Group with buttons', suite => {
    suite
      .before(renderStory('Group', 'Button group'))
      .setCaptureElements('#test-element')
      .capture('plain');
  });

  gemini.suite('Group with custom Inputs width', suite => {
    suite
      .before(renderStory('Group', 'Simple Group with custom Inputs width'))
      .setCaptureElements('#test-element')
      .capture('with custom Inputs width');
  });

  gemini.suite('Group with width', suite => {
    suite
      .before(renderStory('Group', 'With width'))
      .setCaptureElements('#test-element')
      .capture('with width');
  });
});
