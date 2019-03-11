/* global gemini */

var renderStory = require('./utils').renderStory;

gemini.suite('Textarea', () => {
  gemini.suite('DifferentStates', suite => {
    suite
      .before(renderStory('Textarea', 'Different states'))
      .setCaptureElements('#test-element')
      .capture('Plain')
      .capture('Focus', (actions, find) => {
        actions.focus(find('#TextareaPlain textarea'));
      })
      .capture('Typed', (actions, find) => {
        actions.sendKeys(find('#TextareaPlain textarea'), 'Test...');
      });
  });

  gemini.suite('Placeholder', suite => {
    suite
      .before(renderStory('Textarea', 'Textarea with placeholder'))
      .setCaptureElements('#test-element')
      .capture('Plain', (actions, find) => {
        find('#TextareaWithPlaceholder');
      });
  });

  gemini.suite('With custom width', suite => {
    suite
      .before(renderStory('Textarea', 'Textarea with custom width'))
      .setCaptureElements('#test-element')
      .capture('Plain');
  });

  gemini.suite('Selection', () => {
    gemini.suite('Select all by prop', suite => {
      suite
        .before(renderStory('Textarea', 'Select all by prop'))
        .setCaptureElements('#test-element')
        .capture('Plain')
        .capture('Focused', (actions, find) => {
          actions.click(find('label'));
        });
    });

    gemini.suite('Select all by button', suite => {
      suite
        .before(renderStory('Textarea', 'Select all by button'))
        .setCaptureElements('#test-element')
        .capture('Plain')
        .capture('Selected', (actions, find) => {
          actions.click(find('button'));
        });
    });
  });
});
