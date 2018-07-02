const pathTo = require('./utils').pathTo;

describe('Test input', function() {
  it('should change input value', function(done) {
    browser
      .url(pathTo('Baseline', 'Input with button'))
      .setValue('#test-input', 'Hello');
    expect(browser.getValue('#test-input')).toBe('Hello');
    browser.call(done);
  });
});
