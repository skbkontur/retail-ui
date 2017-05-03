/* global gemini */

var pathTo = require('./utils').pathTo;

gemini.suite('link', suite => {
  suite
    .setUrl(pathTo('Link', 'Simple'))
    .setCaptureElements('#test-element')
    .capture('idle')
    .capture('hover', (actions, find) => {
      actions.mouseMove(find('span'));
    })
    .capture('mouseLeave', (actions, find) => {
      actions.mouseMove(find('body'), [0, 0]);
    });
});

gemini.suite('link with Icon', suite => {
  suite
    .setUrl(pathTo('Link', 'With Icon'))
    .setCaptureElements('#test-element')
    .capture('idle')
    .capture('hover', (actions, find) => {
      actions.mouseMove(find('span'));
    })
    .capture('mouseLeave', (actions, find) => {
      actions.mouseMove(find('body'), [0, 0]);
    });
});

gemini.suite('link danger', suite => {
  suite
    .setUrl(pathTo('Link', 'Danger'))
    .setCaptureElements('#test-element')
    .capture('idle')
    .capture('hover', (actions, find) => {
      actions.mouseMove(find('span'));
    })
    .capture('mouseLeave', (actions, find) => {
      actions.mouseMove(find('body'), [0, 0]);
    });
});
