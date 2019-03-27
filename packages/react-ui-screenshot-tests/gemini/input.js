/* global gemini */
var renderStory = require('./utils').renderStory;

function createPlainSuite(suiteName, selector) {
  return gemini.suite(suiteName, childSuite => {
    childSuite.setCaptureElements(selector).capture('Plain');
  });
}

// Small, medium and large inputs (plain, focused, typed)
gemini.suite('Inputs with different sizes', parentSuite => {
  parentSuite.before(renderStory('Input', 'Inputs with different sizes')).setCaptureElements('#test-element');

  gemini.suite('Small', childSuite => {
    childSuite
      .setCaptureElements('#small-input-wrapper')
      .capture('Plain')
      .capture('Focused', (actions, find) => {
        actions.focus(find('#small-input-wrapper input'));
      })
      .capture('With typed text', (actions, find) => {
        actions.sendKeys(find('#small-input-wrapper input'), 'Test...');
      });
  });

  gemini.suite('Medium', childSuite => {
    childSuite
      .setCaptureElements('#medium-input-wrapper')
      .capture('Plain')
      .capture('Focused', (actions, find) => {
        actions.focus(find('#medium-input-wrapper input'));
      })
      .capture('With typed text', (actions, find) => {
        actions.sendKeys(find('#medium-input-wrapper input'), 'Test...');
      });
  });

  gemini.suite('Large', childSuite => {
    childSuite
      .setCaptureElements('#large-input-wrapper')
      .capture('Plain')
      .capture('Focused', (actions, find) => {
        actions.focus(find('#large-input-wrapper input'));
      })
      .capture('With typed text', (actions, find) => {
        actions.sendKeys(find('#large-input-wrapper input'), 'Test...');
      });
  });
});

// Small and large inputs in next states: warning, error, disabled,
// disabled with text, placeholder, password, borderless
gemini.suite('Inputs with different states', parentSuite => {
  parentSuite.before(renderStory('Input', 'Inputs with different states')).setCaptureElements('#test-element');

  const suites = [
    ['Warning Small', '#warning-small-input-wrapper'],
    ['Warning Large', '#warning-large-input-wrapper'],
    ['Error Small', '#error-small-input-wrapper'],
    ['Error Large', '#error-large-input-wrapper'],
    ['Disabled Small', '#disabled-small-input-wrapper'],
    ['Disabled Large', '#disabled-large-input-wrapper'],
    ['Disabled with text Small', '#disabled-text-small-input-wrapper'],
    ['Disabled with text Large', '#disabled-text-large-input-wrapper'],
    ['Placeholder Small', '#placeholder-small-input-wrapper'],
    ['Placeholder Large', '#placeholder-large-input-wrapper'],
    ['Password Small', '#password-small-input-wrapper'],
    ['Password Large', '#password-large-input-wrapper'],
    ['Borderless Small', '#borderless-small-input-wrapper'],
    ['Borderless Large', '#borderless-large-input-wrapper'],
    ['Left Icon Small', '#left-icon-small-input-wrapper'],
    ['Left Icon Large', '#left-icon-large-input-wrapper'],
    ['Right Icon Small', '#right-icon-small-input-wrapper'],
    ['Right Icon Large', '#right-icon-large-input-wrapper'],
  ];

  suites.forEach(suite => createPlainSuite(suite[0], suite[1]));
});

gemini.suite('Input set selection', () => {
  gemini.suite('Select all by prop', suite => {
    suite
      .before(renderStory('Input', 'Select all by prop'))
      .setCaptureElements('#test-element')
      .capture('Plain')
      .capture('Focused', (actions, find) => {
        actions.click(find('label'));
      });
  });

  gemini.suite('Select all by button', suite => {
    suite
      .before(renderStory('Input', 'Select all by button'))
      .setCaptureElements('#test-element')
      .capture('Plain')
      .capture('Selected', (actions, find) => {
        actions.click(find('button'));
      });
  });
});

gemini.suite('Input with mask', suite => {
  let input;

  suite
    .before(renderStory('Input', 'Input with phone mask'))
    .setCaptureElements('#test-element')
    .capture('Plain')
    .capture('Focused', (action, find) => {
      input = find('input');

      action.click(input);
    })
    .capture('Editing', action => {
      action.sendKeys(input, '9');
    })
    .capture('Blured', action => {
      action.sendKeys(input, gemini.TAB);
    });
});

gemini.suite('Input with placeholder and mask', suite => {
  suite
    .before(renderStory('Input', 'Placeholder and Mask'))
    .setCaptureElements('#test-element')
    .capture('Plain');
});

gemini.suite('Input with prefix and suffix', () => {
  gemini.suite('Size small', suite => {
    suite
      .before(renderStory('Input', 'Prefix and suffix'))
      .setCaptureElements('#inputWithPrefixOrSuffx-small')
      .capture('Plain')
      .capture('First input focused', (actions, find) => {
        actions.focus(find('#inputWithPrefixOrSuffx-small input'));
      });
  });

  gemini.suite('Size medium', suite => {
    suite
      .before(renderStory('Input', 'Prefix and suffix'))
      .setCaptureElements('#inputWithPrefixOrSuffx-medium')
      .capture('Plain')
      .capture('First input focused', (actions, find) => {
        actions.focus(find('#inputWithPrefixOrSuffx-medium input'));
      });
  });

  gemini.suite('Size large', suite => {
    suite
      .before(renderStory('Input', 'Prefix and suffix'))
      .setCaptureElements('#inputWithPrefixOrSuffx-large')
      .capture('Plain')
      .capture('First input focused', (actions, find) => {
        actions.focus(find('#inputWithPrefixOrSuffx-large input'));
      });
  });
});

gemini.suite('Input text styles reset', suite => {
  suite
    .before(renderStory('Input', 'text styles reset'))
    .setCaptureElements('#test-element')
    .capture('plain');
});
