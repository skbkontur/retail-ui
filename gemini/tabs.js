/* global gemini */

var pathTo = require('./utils').pathTo;

var TabSelector = '[class^="Tab-root"]';

var tabAtIndex = index => `${TabSelector}:nth-child(${index})`;

var applyTest = testSuite =>
  testSuite
    .setCaptureElements('#test-element')
    .capture('plain')
    .capture('hovered', (actions, find) => {
      actions.mouseMove(find(tabAtIndex(2)));
    })
    .capture('clicked', (actions, find) => {
      actions.click(find(tabAtIndex(2)));
    })
    .capture('mouseLeave', (actions, find) => {
      actions.mouseMove(find('body'), [0, 0]);
    })
    .capture('focused', (actions, find) => {
      actions.focus(find(tabAtIndex(2)));
    })
    .capture('tabPress', (actions, find) => {
      actions.sendKeys(gemini.TAB);
    })
    .capture('enterPress', (actions, find) => {
      actions.sendKeys(gemini.ENTER);
    });

gemini.suite('tabs horizontal', suite => {
  suite.setUrl(pathTo('Tabs', 'simple'));
  applyTest(suite);
});

gemini.suite('tabs vertical', suite => {
  suite.setUrl(pathTo('Tabs', 'vertical'));
  applyTest(suite);
});
