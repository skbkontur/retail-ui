/* global gemini */

var renderStory = require('./utils').renderStory;

gemini.suite('Radio', suite => {
  suite
    .before(renderStory('Radio', 'Radio with different states'))
    .setCaptureElements('#test-element')
    .capture('different states');
});
