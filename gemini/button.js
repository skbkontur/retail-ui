/* global gemini */

var pathTo = require('./utils').pathTo;

gemini.suite('button', suite => {
  suite
    .setUrl(pathTo('Button', 'playground'))
    .setCaptureElements('#test-element')
    .capture('idle')
    .capture('hover', (actions, find) => {
      actions.mouseMove(find('button'));
    })
    .capture('mouseLeave', (actions, find) => {
      actions.mouseMove(find('body'), [0, 0]);
    })
    .capture('pressed', (actions, find) => {
      actions.mouseDown(find('button'));
    })
    .capture('clicked', (actions, find) => {
      actions.mouseUp(find('button'));
    })
    .capture('clickedOutside', (actions, find) => {
      actions.click(find('body'), 0, [1, 1]);
    })
    .capture('tabPress', (actions, find) => {
      actions.sendKeys(gemini.TAB);
    });
});
