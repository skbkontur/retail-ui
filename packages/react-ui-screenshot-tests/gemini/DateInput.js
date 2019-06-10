var renderStory = require('./utils').renderStory;

gemini.suite('DateInput', () => {
  gemini.suite('simple', suite => {
    suite
      .before(renderStory('DateInput', 'simple'))
      .setCaptureElements('#test-element')
      .capture('idle')
      .capture('focus', actions => actions.click("[data-comp-name*='DateInput']"));
  });

  gemini.suite('disabled', suite => {
    suite
      .before(renderStory('DateInput', 'disabled'))
      .setCaptureElements('#test-element')
      .capture('idle')
      .capture('focus', actions => actions.click("[data-comp-name*='DateInput']"));
  });

  gemini.suite('with width', suite => {
    suite
      .before(renderStory('DateInput', 'with width'))
      .setCaptureElements('#test-element')
      .capture('idle')
      .capture('focus', actions => actions.click("[data-comp-name*='DateInput']"));
  });

  gemini.suite('different formatting', suite => {
    suite
      .before(renderStory('DateInput', 'different formatting'))
      .setCaptureElements('#test-element')
      .capture('idle');
  });
});
