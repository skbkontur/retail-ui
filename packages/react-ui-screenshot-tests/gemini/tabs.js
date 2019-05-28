/* global gemini */

var renderStory = require('./utils').renderStory;

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
  suite.before(renderStory('Tabs', 'simple'));
  applyTest(suite);
});

gemini.suite('tabs vertical', suite => {
  suite.before(renderStory('Tabs', 'vertical'));
  applyTest(suite);
});

gemini.suite('Tabs keyboard control', suite => {
  suite
    .before(renderStory('Tabs', 'simple'))
    .setCaptureElements('#test-element')
    .capture('move focus forward', (actions, find) => {
      actions.focus(find(tabAtIndex(1)));
      actions.sendKeys(gemini.ARROW_RIGHT);
      actions.sendKeys(gemini.ARROW_DOWN);
    })
    .capture('move focus backward', (actions, find) => {
      actions.sendKeys(gemini.ARROW_LEFT);
      actions.sendKeys(gemini.ARROW_UP);
    })
    .capture('reset focus after click', (actions, find) => {
      actions.click(find(tabAtIndex(3)));
    })
});
