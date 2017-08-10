/* global gemini */

var pathTo = require('./utils').pathTo;

var applyTest = suite =>
  suite
    .setCaptureElements('#test-element')
    .capture('idle')
    .capture('hover', (actions, find) => {
      actions.mouseMove(find('a'));
    })
    .capture('mouseLeave', (actions, find) => {
      actions.mouseMove(find('body'), [0, 0]);
    });

gemini.suite('link', suite => {
  suite.setUrl(pathTo('Link', 'Simple'));
  applyTest(suite);
});

gemini.suite('link with Icon', suite => {
  suite.setUrl(pathTo('Link', 'With Icon'));
  applyTest(suite);
});

gemini.suite('link danger', suite => {
  suite.setUrl(pathTo('Link', 'Danger'));
  applyTest(suite);
});

gemini.suite('link Grayed', suite => {
  suite.setUrl(pathTo('Link', 'Grayed'));
  applyTest(suite);
});

gemini.suite('link Disabled', suite => {
  suite.setUrl(pathTo('Link', 'Disabled'));
  applyTest(suite);
});
