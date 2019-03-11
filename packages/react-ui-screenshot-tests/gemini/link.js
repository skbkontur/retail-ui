/* global gemini */

var renderStory = require('./utils').renderStory;

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
  suite.before(renderStory('Link', 'Simple'));
  applyTest(suite);
});

gemini.suite('link with Icon', suite => {
  suite.before(renderStory('Link', 'With Icon'));
  applyTest(suite);
});

gemini.suite('link danger', suite => {
  suite.before(renderStory('Link', 'Danger'));
  applyTest(suite);
});

gemini.suite('link Grayed', suite => {
  suite.before(renderStory('Link', 'Grayed'));
  applyTest(suite);
});

gemini.suite('link Disabled', suite => {
  suite.before(renderStory('Link', 'Disabled'));
  applyTest(suite);
});
