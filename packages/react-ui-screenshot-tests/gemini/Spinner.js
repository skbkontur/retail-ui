var renderStory = require('./utils').renderStory;

gemini.suite('Spinner', () => {
  gemini.suite('String caption', suite => {
    suite
      .before(renderStory('Spinner', 'Normal'))
      .setCaptureElements('#test-element')
      .capture('plain');
  });

  gemini.suite('ReactNode caption', suite => {
    suite
      .before(renderStory('Spinner', 'With ReactNode in caption'))
      .setCaptureElements('#test-element')
      .capture('plain');
  });
});
