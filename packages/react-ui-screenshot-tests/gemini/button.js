/* global gemini */

const renderStory = require('./utils').renderStory;

gemini.suite('Button', suite => {
  const testScenario = suite => {
    suite
      .capture('idle')
      .capture('hover', (actions, find) => {
        actions.mouseMove(find('button'));
      })
      .capture('mouseLeave', (actions, find) => {
        actions.mouseMove(find('body'), [0, 0]);
      })
      .capture('pressed', (actions, find) => {
        actions.mouseDown(find('button'));
      })
      .capture('clicked', (actions, find) => {
        actions.mouseUp(find('button'));
      })
      .capture('clickedOutside', (actions, find) => {
        actions.click(find('body'), 0, [1, 1]);
      })
      .capture('tabPress', (actions, find) => {
        actions.sendKeys(gemini.TAB);
      });
  };

  gemini.suite('button', suite => {
    testScenario(suite.before(renderStory('Button', 'playground')).setCaptureElements('#test-element'));
  });

  gemini.suite('button use link', suite => {
    testScenario(suite.before(renderStory('Button', 'use link')).setCaptureElements('#test-element'));
  });

  gemini.suite('button use link with icon', suite => {
    testScenario(suite.before(renderStory('Button', 'use link with icon')).setCaptureElements('#test-element'));
  });

  gemini.suite('button link multiline', suite => {
    testScenario(
      suite.before(renderStory('Button', 'multiline text with link button')).setCaptureElements('#test-element'),
    );
  });

  gemini.suite('button use link with error', suite => {
    testScenario(suite.before(renderStory('Button', 'with error')).setCaptureElements('#test-element'));
  });

  gemini.suite('different content', suite => {
    suite
      .before(renderStory('Button', 'different content'))
      .setCaptureElements('#test-element')
      .capture('plain');
  });

  gemini.suite('Button text styles reset', suite => {
    suite
      .before(renderStory('Button', 'text styles reset'))
      .setCaptureElements('#test-element')
      .capture('plain');
  });

  gemini.suite('Button states', () => {
    const paginatedScenario = (suite, pagesCount) => {
      var paginatedSuite = suite
        .before((actions, find) => {
          this.nextPage = find('#next-page');
        })
        .ignoreElements('#paginator')
        .setCaptureElements('#test-element');

      for (var page = 1; page <= pagesCount; page++) {
        paginatedSuite.capture('page - ' + page, (actions, find) => {
          if (page > 1) {
            actions.click(this.nextPage);
          }
        });
      }
    };

    gemini.suite('different aligns', suite => {
      suite
        .before(renderStory('Button', 'different aligns'))
        .setCaptureElements('#test-element')
        .capture('plain');
    });

    gemini.suite('default combination', suite => {
      paginatedScenario(suite.before(renderStory('Button', 'default combinations')), 5);
    });

    gemini.suite('combinations with warning', suite => {
      paginatedScenario(suite.before(renderStory('Button', 'combinations with warning')), 5);
    });

    gemini.suite('combinations with error', suite => {
      paginatedScenario(suite.before(renderStory('Button', 'combinations with error')), 5);
    });

    gemini.suite('combinations with focus', suite => {
      paginatedScenario(suite.before(renderStory('Button', 'combinations with focus')), 5);
    });

    gemini.suite('loading combinations', suite => {
      paginatedScenario(suite.before(renderStory('Button', 'loading combinations')), 5);
    });

    gemini.suite('disabled combinations', suite => {
      paginatedScenario(suite.before(renderStory('Button', 'disabled combinations')), 5);
    });

    gemini.suite('active combinations', suite => {
      paginatedScenario(suite.before(renderStory('Button', 'active combinations')), 5);
    });

    gemini.suite('checked combinations', suite => {
      paginatedScenario(suite.before(renderStory('Button', 'checked combinations')), 5);
    });
  });
});
