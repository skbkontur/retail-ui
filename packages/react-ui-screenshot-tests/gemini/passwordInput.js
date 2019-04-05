/* global gemini */

var renderStory = require('./utils').renderStory;

gemini.suite('PasswordInput', suite => {
  suite
    .before(renderStory('PasswordInput', 'Plain'))
    .setCaptureElements('#test-element')
    .capture('Plain')
    .capture('With typed password', (actions, find) => {
      actions.sendKeys(find('input'), 'Test...');
    })
    .capture('With visible password', (actions, find) => {
      actions.click(find('[data-tid="PasswordInputEyeIcon"]'));
    });
});

gemini.suite('PasswordInput with CapsLock', suite => {
  suite
    .before(renderStory('PasswordInput', 'CapsLock label'))
    .setCaptureElements('#test-element')
    .capture('Plain');
});
