/* global gemini */
var pathTo = require('./utils').pathTo;

gemini.suite('Input small size', (suite) => {
  suite.setUrl(pathTo('Input', 'Small Input'))
    .setCaptureElements('#test-element')
    .capture('simple')
    .capture('focused', (actions, find) => {
      actions.focus(find('input'));
    })
    .capture('typed text', (actions, find) => {
      actions.sendKeys(find('input'), 'Test...');
    });
});

gemini.suite('Input medium size', (suite) => {
  suite.setUrl(pathTo('Input', 'Medium Input'))
    .setCaptureElements('#test-element')
    .capture('simple')
    .capture('focused', (actions, find) => {
      actions.focus(find('input'));
    })
    .capture('typed text', (actions, find) => {
      actions.sendKeys(find('input'), 'Test...');
    });
});

gemini.suite('Input large size', (suite) => {
  suite.setUrl(pathTo('Input', 'Large Input'))
    .setCaptureElements('#test-element')
    .capture('simple')
    .capture('focused', (actions, find) => {
      actions.focus(find('input'));
    })
    .capture('typed text', (actions, find) => {
      actions.sendKeys(find('input'), 'Test...');
    });
});
