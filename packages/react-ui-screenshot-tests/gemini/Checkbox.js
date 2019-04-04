/* global gemini */

var renderStory = require('./utils').renderStory;

gemini.suite('Checkbox', suite => {
  suite.before(renderStory('Checkbox', 'plain')).setCaptureElements('#test-element');

  gemini.suite('Checkbox plain', suite => {
    suite
      .capture('plain')
      .capture('hovered', (actions, find) => {
        actions.mouseMove(find('span'));
      })
      .capture('clicked', (actions, find) => {
        actions.click(find('span'));
      })
      .capture('mouseLeave', (actions, find) => {
        actions.click(find('body'), 0, [0, 0]);
      })
      .capture('tabPress', (actions, find) => {
        actions.sendKeys(gemini.TAB);
      })
      .capture('spacePress', (actions, find) => {
        actions.sendKeys(gemini.SPACE);
      });
  });

  gemini.suite('Checkbox disabled', suite => {
    suite
      .before(renderStory('Checkbox', 'disabled'))
      .setCaptureElements('#test-element')
      .capture('Checkbox disabled');
  });

  gemini.suite('Checkbox disabled checked', suite => {
    suite
      .before(renderStory('Checkbox', 'disabled checked'))
      .setCaptureElements('#test-element')
      .capture('Checkbox disabled checked');
  });

  gemini.suite('Checkbox error', suite => {
    suite
      .before(renderStory('Checkbox', 'error'))
      .setCaptureElements('#test-element')
      .capture('Checkbox error');
  });

  gemini.suite('Checkbox with a long label', suite => {
    suite
      .before(renderStory('Checkbox', 'with a long label'))
      .setCaptureElements('#test-element')
      .capture('plain');
  });

  gemini.suite('Checkbox without label', suite => {
    suite
      .before(renderStory('Checkbox', 'w/o label'))
      .setCaptureElements('#test-element')
      .capture('plain');
  });

  gemini.suite('Checkbox indeterminate', suite => {
    suite
      .before(renderStory('Checkbox', 'indeterminate'))
      .setCaptureElements('#screenshot-capture')
      .capture('plain')
      .capture('hovered', (actions, find) => {
        actions.mouseMove(find('label'));
      })
      .capture('tabPress', (actions, find) => {
        actions.click(find('body'), 0, [0, 0]);
        actions.sendKeys(gemini.TAB);
      });
  });
});
