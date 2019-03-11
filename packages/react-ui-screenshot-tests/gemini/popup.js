/* global gemini */
var renderStory = require('./utils').renderStory;

gemini.suite('Popup All pin opened', suite => {
  suite
    .before(renderStory('Popup', 'All pin opened'))
    .setCaptureElements('#test-element')
    .capture('plain');
});

gemini.suite('Popup All pin opened on small elements', suite => {
  suite
    .before(renderStory('Popup', 'All pin opened on small elements'))
    .setCaptureElements('#test-element')
    .capture('plain');
});

gemini.suite('Popup Hint', suite => {
  suite
    .before(renderStory('Popup', 'Hint'))
    .setCaptureElements('#test-element')
    .capture('plain');
});

gemini.suite('Popup Toast', suite => {
  suite
    .before(renderStory('Popup', 'Toast'))
    .setCaptureElements('#test-element')
    .capture('plain');
});

gemini.suite('Popup Small width', suite => {
  suite
    .before(renderStory('Popup', 'Small width'))
    .setCaptureElements('#test-element')
    .capture('plain');
});
