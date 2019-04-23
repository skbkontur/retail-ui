/* global gemini */

var renderStory = require('./utils').renderStory;

gemini.suite('modal', suite => {
  suite
    .before(renderStory('Modal', 'Modal over another modal'))
    .setCaptureElements('html')
    .capture('open first modal', (actions, find) => {
      actions.click(find('button'));
    })
    .capture('open second modal', (actions, find) => {
      actions.click(find('[data-comp-name="Body"] button'));
    });
});

gemini.suite('modal with panel in footer', suite => {
  suite
    .before(renderStory('Modal', 'Modal with footer panel'))
    .setCaptureElements('html')
    .capture('open modal', (actions, find) => {
      actions.click(find('button'));
    });
});

gemini.suite('modal without panel in footer', suite => {
  suite
    .before(renderStory('Modal', 'Modal without footer panel'))
    .setCaptureElements('html')
    .capture('open modal', (actions, find) => {
      actions.click(find('button'));
    });
});

gemini.suite('modal without footer', suite => {
  suite
    .before(renderStory('Modal', 'Modal without footer'))
    .setCaptureElements('html')
    .capture('open modal', (actions, find) => {
      actions.click(find('button'));
    });
});

gemini.suite('modal without header', suite => {
  suite
    .before(renderStory('Modal', 'Modal without header'))
    .setCaptureElements('html')
    .capture('open modal');
});

gemini.suite('modal with icon input', suite => {
  suite
    .before(renderStory('Modal', 'With Icon Input'))
    .setCaptureElements('html')
    .capture('open modal', (actions, find) => {
      actions.click(find('button'));
    });
});

gemini.suite('modal with variable height of content', suite => {
  suite
    .before(renderStory('Modal', 'Modal with variable height of content'))
    .setCaptureElements('html')
    .capture('open modal', (actions, find) => {
      actions.click(find('button'));
    })
    .capture('toggle content height', (actions, find) => {
      actions.click(find('#modal-inner [data-comp-name="Toggle"]')).wait(500);
    });
});

gemini.suite('modal without sticky elements', suite => {
  suite
    .before(renderStory('Modal', 'Modal without sticky elements'))
    .setCaptureElements('html')
    .capture('top')
    .capture('middle', actions => {
      actions.executeJS(function(window) {
        var modalContainer = window.document.querySelector('[class^="Modal-container"]');
        var modalContent = window.document.querySelector('[class^="Modal-centerContainer"]');

        modalContainer.scrollTop = modalContent.offsetHeight / 2;
      });
    })
    .capture('bottom', actions => {
      actions.executeJS(function(window) {
        var modalContainer = window.document.querySelector('[class^="Modal-container"]');
        var modalContent = window.document.querySelector('[class^="Modal-centerContainer"]');

        modalContainer.scrollTop = modalContent.offsetHeight;
      });
    });
});

gemini.suite('modal with align to the top', suite => {
  suite
    .before(renderStory('Modal', 'With alignTop'))
    .setCaptureElements('html')
    .capture('alignTop');
});
