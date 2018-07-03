const pathTo = require('./utils').pathTo;
const buttonRootSelector = '[class^="Button-caption"]';

describe('Test button', function() {
  it('should submit form', function(done) {
    browser
      .url(pathTo('Baseline', 'Input with button'))
      .setValue('#test-input', 'Hello')
      .click(buttonRootSelector)
      .waitForExist('#test-input-value');
    expect(browser.getText('#test-input-value')).toBe('Hello');
    browser.call(done);
  });
});
