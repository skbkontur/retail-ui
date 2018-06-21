/* global gemini */
var pathTo = require('./utils').pathTo;

function createPlainSuite(suiteName, selector) {
  return gemini.suite(suiteName, childSuite => {
    childSuite.setCaptureElements(selector).capture('Plain');
  });
}

// Small, medium and large inputs (plain, focused, typed)
gemini.suite('Inputs with different sizes', parentSuite => {
  parentSuite
    .setUrl(pathTo('Input', 'Inputs with different sizes'))
    .setCaptureElements('#test-element');

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
  parentSuite
    .setUrl(pathTo('Input', 'Inputs with different states'))
    .setCaptureElements('#test-element');

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
    ['Right Icon Large', '#right-icon-large-input-wrapper']
  ];

  suites.forEach(suite => createPlainSuite(suite[0], suite[1]));
});
