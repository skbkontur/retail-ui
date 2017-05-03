    /* global gemini */

var pathTo = require('./utils').pathTo;

gemini.suite('link', (suite) => {
  suite.setUrl(pathTo('Link', 'Simple'))
    .setCaptureElements('#test-element')
    .capture('idle')
    .capture('hover', (actions, find) => {
      actions.mouseMove(find('a'));
    })
    .capture('mouseLeave', (actions, find) => {
      actions.mouseMove(find('body'), [0, 0]);
    })
    .capture('pressed', (actions, find) => {
      actions.mouseDown(find('a'));
    })
    .capture('clicked', (actions, find) => {
      actions.mouseUp(find('a'));
    });
});

gemini.suite('link with Icon', (suite) => {
  suite.setUrl(pathTo('Link', 'With Icon'))
	.setCaptureElements('#test-element')
	.capture('idle')
    .capture('hover', (actions, find) => {
      actions.mouseMove(find('a'));
    })
    .capture('mouseLeave', (actions, find) => {
      actions.mouseMove(find('body'), [0, 0]);
    })
    .capture('pressed', (actions, find) => {
      actions.mouseDown(find('a'));
    })
    .capture('clicked', (actions, find) => {
      actions.mouseUp(find('a'));
    });
});

gemini.suite('link danger', (suite) => {
  suite.setUrl(pathTo('Link', 'Danger'))
	.setCaptureElements('#test-element')
	.capture('idle')
    .capture('hover', (actions, find) => {
      actions.mouseMove(find('a'));
    })
    .capture('mouseLeave', (actions, find) => {
      actions.mouseMove(find('body'), [0, 0]);
    })
    .capture('pressed', (actions, find) => {
      actions.mouseDown(find('a'));
    })
    .capture('clicked', (actions, find) => {
      actions.mouseUp(find('a'));
    });
});

gemini.suite('link Grayed', (suite) => {
  suite.setUrl(pathTo('Link', 'Grayed'))
	.setCaptureElements('#test-element')
	.capture('idle')
    .capture('hover', (actions, find) => {
      actions.mouseMove(find('a'));
    })
    .capture('mouseLeave', (actions, find) => {
      actions.mouseMove(find('body'), [0, 0]);
    })
    .capture('pressed', (actions, find) => {
      actions.mouseDown(find('a'));
    })
    .capture('clicked', (actions, find) => {
      actions.mouseUp(find('a'));
    });
});

gemini.suite('link Disabled', (suite) => {
  suite.setUrl(pathTo('Link', 'Disabled'))
	.setCaptureElements('#test-element')
	.capture('idle')
    .capture('hover', (actions, find) => {
      actions.mouseMove(find('a'));
    })
    .capture('mouseLeave', (actions, find) => {
      actions.mouseMove(find('body'), [0, 0]);
    })
    .capture('pressed', (actions, find) => {
      actions.mouseDown(find('a'));
    })
    .capture('clicked', (actions, find) => {
      actions.mouseUp(find('a'));
    });
});