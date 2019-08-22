const renderStory = require('./utils').renderStory;

gemini.suite('SidePage', suite => {
  gemini.suite('simple', suite => {
    suite
      .before(renderStory('SidePage', 'Simple'))
      .setCaptureElements('html')
      .capture('open side-page', (actions, find) => {
        actions.click(find('button'));
      });
  });

  gemini.suite('left', suite => {
    suite
      .before(renderStory('SidePage', 'SidePage with left position'))
      .setCaptureElements('html')
      .capture('plain');
  });

  gemini.suite('SidePage over another SidePage', suite => {
    suite
      .before(renderStory('SidePage', 'SidePage over another SidePage'))
      .setCaptureElements('html')
      .capture('open internal side-page', (actions, find) => {
        actions.click(find('button'));
        actions.click(find('[data-comp-name~="SidePageBody"] button'));
      })
      .capture('close internal side-page', (action, find) => {
        action.click(find('.react-ui:last-child [data-comp-name~="SidePageFooter"] button'));
      });
  });

  gemini.suite('updateLayout method', suite => {
    suite
      .before(renderStory('SidePage', 'test updateLayout method'))
      .setCaptureElements('html')
      .ignoreElements('#buttons')
      .capture('idle')
      .capture('Body content has been changed', (actions, find) => {
        actions.click(find('#toggle-body-content'));
      })
      .capture('child component content has been changed', (actions, find) => {
        actions.click(find('#toggle-body-content'));
        actions.click(find('#toggle-child-component-content'));
      })
      .capture('update layout', (action, find) => {
        action.click(find('#update'));
      });
  });

  gemini.suite('fixed long title', suite => {
    suite
      .before(renderStory('SidePage', 'With long title'))
      .setCaptureElements('html')
      .ignoreElements({ every: 'button' })
      .capture('not fixed')
      .capture('fixed close element', (actions, find) => {
        actions.executeJS(function(window) {
          var sidePageContainer = window.document.querySelector('[class^="SidePage-module-container"]');
          var sidePageHeader = window.document.querySelector('[data-comp-name~="SidePageHeader"]');
          var fixedHeaderHeight = 50;

          sidePageContainer.scrollTop = (sidePageHeader.offsetHeight - fixedHeaderHeight) / 2;
        });
      })
      .capture('fixed header', (actions, find) => {
        actions.executeJS(function(window) {
          var sidePageContainer = window.document.querySelector('[class^="SidePage-module-container"]');
          var sidePageHeader = window.document.querySelector('[data-comp-name~="SidePageHeader"]');
          var fixedHeaderHeight = 50;

          sidePageContainer.scrollTop = sidePageHeader.offsetHeight - fixedHeaderHeight;
        });
      });
  });
});
