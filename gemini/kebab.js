/* global gemini */

var pathTo = require('./utils').pathTo;

const KEBAB_SELECTOR = '[class^="Kebab-kebab"]';

var applyTest = testSuite =>
  testSuite
    .setCaptureElements('#test-element')
    .capture('plain')
    .capture('hovered', (actions, find) => {
      actions.mouseMove(find(KEBAB_SELECTOR));
    })
    .capture('clicked', (actions, find) => {
      actions.click(find(KEBAB_SELECTOR));
    })
    .capture('clickedOutside', (actions, find) => {
      actions.click(find('body'), 0, [1, 1]);
    })
    .capture('tabPress', (actions, find) => {
      actions.sendKeys(gemini.TAB);
    })
    .capture('enterPress', (actions, find) => {
      actions.sendKeys(gemini.ENTER);
    })
    .capture('escapePress', (actions, find) => {
      actions.sendKeys(gemini.ESCAPE);
    });

gemini.suite('Kebab menu 14px', suite => {
  suite.setUrl(pathTo('Kebab', '14px'));
  applyTest(suite);
});

gemini.suite('Kebab menu 20px', suite => {
  suite.setUrl(pathTo('Kebab', '20px'));
  applyTest(suite);
});
