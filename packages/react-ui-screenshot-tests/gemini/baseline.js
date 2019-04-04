/* global gemini */
var renderStory = require('./utils').renderStory;

gemini.suite('Baseline', suite => {
  suite
    .before(renderStory('Baseline', 'Button and text'))
    .setCaptureElements('#test-element')

  gemini.suite('Small button Baseline', suite => {
    suite
      .capture('simple');
  });

  gemini.suite('Medium button Baseline', suite => {
    suite
      .before(renderStory('Baseline', 'Medium Button and text'))
      .setCaptureElements('#test-element')
      .capture('simple');
  });

  gemini.suite('Large button Baseline', suite => {
    suite
      .before(renderStory('Baseline', 'Large Button and text'))
      .setCaptureElements('#test-element')
      .capture('simple');
  });

  gemini.suite('Link and button Baseline', suite => {
    suite
      .before(renderStory('Baseline', 'Button and link'))
      .setCaptureElements('#test-element')
      .capture('simple');
  });

  gemini.suite('Input and text Baseline', suite => {
    suite
      .before(renderStory('Baseline', 'Input and text'))
      .setCaptureElements('#test-element')
      .capture('simple');
  });

  gemini.suite('Baseline Regress', suite => {
    gemini.suite('Text, Input, InputLikeText', suite => {
      suite
        .before(renderStory('Baseline', 'Text, Input, InputLikeText'))
        .setCaptureElements('#test-element')
        .capture('simple');
    });

    gemini.suite('Text, Large Input', suite => {
      suite
        .before(renderStory('Baseline', 'Text, Large Input'))
        .setCaptureElements('#test-element')
        .capture('simple');
    });

    gemini.suite('Text, Buttons', suite => {
      suite
        .before(renderStory('Baseline', 'Text, Buttons'))
        .setCaptureElements('#test-element')
        .capture('simple');
    });

    gemini.suite('Text, Large Button', suite => {
      suite
        .before(renderStory('Baseline', 'Text, Large Button'))
        .setCaptureElements('#test-element')
        .capture('simple');
    });
  });
});
