/* global gemini */

var pathTo = require('./utils').pathTo;

gemini.suite('PasswordInput', suite => {
  suite
    .setUrl(pathTo('PasswordInput', 'Plain'))
    .setCaptureElements('#test-element')
    .capture('Plain')
    .capture('With typed password', (actions, find) => {
      actions.sendKeys(find('input'), 'Test...');
    })
    .capture('With visible password', (actions, find) => {
      actions.click(find('[class^="Input-rightIcon"]'));
    });
});

gemini.suite('PasswordInput with CapsLock', suite => {
  suite
    .setUrl(pathTo('PasswordInput', 'CapsLock label'))
    .setCaptureElements('#test-element')
    .capture('Plain');
});
