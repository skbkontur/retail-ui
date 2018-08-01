/* global gemini */
var pathTo = require('./utils').pathTo;

gemini.suite('Tokens', suite => {
  suite
    .setUrl(pathTo('Tokens', 'empty with reference'))
    .setCaptureElements('.tokens-test-container')
    .capture('idle')
    .capture('clicked', (actions, find) => {
      actions.click(find('[data-tid="Tokens"]'));
    })
    .capture('withText', (actions, find) => {
      actions.sendKeys(find('[data-tid="Tokens"] input'), 'aa');
    })
    .capture('withMenu', (actions, find) => {
      actions.wait(500);
    })
});
