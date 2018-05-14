/* global gemini */

const pathTo = require('./utils').pathTo;

const testScenario = suite => {
  suite
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
};

gemini.suite('button', suite => {
  testScenario(
    suite
      .setUrl(pathTo('Button', 'playground'))
      .setCaptureElements('#test-element')
  );
});

gemini.suite('button use link', suite => {
  testScenario(
    suite
      .setUrl(pathTo('Button', 'use link'))
      .setCaptureElements('#test-element')
  );
});

gemini.suite('button use link with icon', suite => {
  testScenario(
    suite
      .setUrl(pathTo('Button', 'use link with icon'))
      .setCaptureElements('#test-element')
  );
});

gemini.suite('button link multiline', suite => {
  testScenario(
    suite
      .setUrl(pathTo('Button', 'multiline text with link button'))
      .setCaptureElements('#test-element')
  );
});
