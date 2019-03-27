/* global gemini */
var renderStory = require('./utils').renderStory;

gemini.suite('Hint', suite => {
  suite
    .before(renderStory('Hint', 'default'))
    .setCaptureElements('#test-element')
    .capture('mouseOver');
});

gemini.suite('Hint left', suite => {
  suite
    .before(renderStory('Hint', 'left'))
    .setCaptureElements('#test-element')
    .capture('mouseOver');
});

gemini.suite('Hint right', suite => {
  suite
    .before(renderStory('Hint', 'right'))
    .setCaptureElements('#test-element')
    .capture('mouseOver');
});

gemini.suite('Hint bottom', suite => {
  suite
    .before(renderStory('Hint', 'bottom'))
    .setCaptureElements('#test-element')
    .capture('mouseOver');
});

gemini.suite('With large word', suite => {
  suite
    .before(renderStory('Hint', 'with large word'))
    .setCaptureElements('#test-element')
    .capture('mouseOver');
});

gemini.suite('Hint with block caption', suite => {
  suite
    .before(renderStory('Hint', 'with block-element'))
    .setCaptureElements('#test-element')
    .capture('mouseOver');
});

gemini.suite('Hint with 100%-width input', suite => {
  suite
    .before(renderStory('Hint', 'with 100%-width input'))
    .setCaptureElements('#test-element')
    .capture('mouseOver');
});

gemini.suite('Hint wrap inline-block', suite => {
  suite
    .before(renderStory('Hint', 'Hints without wrapper around inline-block with 50% width'))
    .setCaptureElements('#test-element')
    .capture('mouseOver');
});
