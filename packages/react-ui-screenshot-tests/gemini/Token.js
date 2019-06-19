/* global gemini */
var renderStory = require('./utils').renderStory;

gemini.suite('Token', suite => {
  gemini.suite('default', suite => {
    suite
      .before(renderStory('Token', 'default'))
      .setCaptureElements('#test-element')
      .capture('idle');
  });
  gemini.suite('long text', suite => {
    suite
      .before(renderStory('Token', 'long text'))
      .setCaptureElements('#test-element')
      .capture('idle');
  });
  gemini.suite('colored', suite => {
    suite
      .before(renderStory('Token', 'colored'))
      .setCaptureElements('#test-element')
      .capture('idle');
  });
  gemini.suite('validations', suite => {
    suite
      .before(renderStory('Token', 'validations'))
      .setCaptureElements('#test-element')
      .capture('idle');
  });
  gemini.suite('disabled', suite => {
    suite
      .before(renderStory('Token', 'disabled'))
      .setCaptureElements('#test-element')
      .capture('idle');
  });
});
