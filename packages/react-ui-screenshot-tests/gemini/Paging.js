const renderStory = require('./utils').renderStory;

gemini.suite('Paging', () => {
  gemini.suite('Sample', suite => {
    suite
      .before(renderStory('Paging', 'GoToAbsensePage'))
      .setCaptureElements('#test-element')
      .capture('plain')
      .capture('hover', (actions, find) => {
        actions.mouseMove(find('[class^="Paging-module-pageLinkWrapper"]'));
      })
      .capture('change page by number', (actions, find) => {
        actions.click(find('[class^="Paging-module-pageLinkWrapper"]'));
      })
      .capture('change page by forwardLink', (actions, find) => {
        actions.click(find('[class^="Paging-module-forwardLink"]'));
      });
  });

  gemini.suite('Keyboard control', () => {
    gemini.suite('Sample', suite => {
      suite
        .before(renderStory('Paging', 'GoToAbsensePage'))
        .setCaptureElements('#test-element')
        .capture('focused', (actions, find) => {
          actions.focus(find('[data-comp-name~="Paging"]'));
        })
        .capture('Move focus right', actions => {
          actions.sendKeys(gemini.ARROW_RIGHT);
        })
        .capture('Move to page by Ender', actions => {
          actions.sendKeys(gemini.ENTER);
        })
        .capture('Next page', actions => {
          actions.sendKeys([gemini.CONTROL, gemini.ARROW_RIGHT]);
        })
        .skip.in('ie11', 'в ie11 не получается "нажать" `gemini.CONTROL + gemini.ARROW_RIGHT`');
    });

    gemini.suite('Sample ie11', suite => {
      suite
        .before(renderStory('Paging', 'GoToAbsensePage'))
        .setCaptureElements('#test-element')
        .capture('focused', (actions, find) => {
          actions.focus(find('[data-comp-name~="Paging"]'));
        })
        .capture('Move focus right', actions => {
          actions.sendKeys(gemini.ARROW_RIGHT);
        })
        .capture('Move to page by Ender', actions => {
          actions.sendKeys(gemini.ENTER);
        })
        .only.in('ie11');
    });
  });
});
