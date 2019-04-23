/* global gemini */
var renderStory = require('./utils').renderStory;

gemini.suite('Switcher', suite => {
  suite
    .before(renderStory('Switcher', 'horizontal'))
    .setCaptureElements('#test-element')
    .capture('idle')
    .capture('clicked', (actions, find) => {
      actions.click(find('[data-comp-name="Button"]'));
    });
});

gemini.suite('Switcher errored', suite => {
  suite
    .before(renderStory('Switcher', 'errored'))
    .setCaptureElements('#test-element')
    .capture('idle');
});
