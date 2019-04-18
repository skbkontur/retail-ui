/* global gemini */

var renderStory = require('./utils').renderStory;

gemini.suite('Radio', suite => {
  suite
    .before(renderStory('Radio', 'Radio with different states'))
    .setCaptureElements('#test-element')
    .capture('different states');
});

gemini.suite('Radio highlighted', suite => {
  suite
    .before(renderStory('Radio', 'Highlighted'))
    .setCaptureElements('#test-element')
    .capture('plain')
    .capture('tabPress', (actions, find) => {
      actions.click(find('body'), 0, [0, 0]);
      actions.sendKeys(gemini.TAB);
    });
});
