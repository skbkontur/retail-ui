/* global gemini */
var renderStory = require('./utils').renderStory;

gemini.suite('TokenInput', suite => {
  suite
    .before(renderStory('TokenInput', 'empty with reference'))
    .setCaptureElements('.tokens-test-container')
    .capture('idle')
    .capture('clicked', (actions, find) => {
      actions.click(find('[data-comp-name~="TokenInput"]'));
    })
    .capture('withText', (actions, find) => {
      actions.sendKeys(find('[data-comp-name~="TokenInput"] input'), 'aa');
    })
    .capture('withMenu', (actions, find) => {
      actions.wait(500);
    });
  gemini.suite('disabled', suite => {
    suite
      .before(renderStory('TokenInput', 'disabled'))
      .setCaptureElements('#test-element')
      .capture('idle');
  });
});
