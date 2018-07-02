const pathTo = require('./utils').pathTo;

describe('Test input', function() {
  it('should change input value', function(done) {
    browser
      .url(pathTo('Baseline', 'Input with button'))
      .setValue('#test-input', 'Hello')
      .getValue('#test-input').should.be.equal('Hello');
    browser.call(done);
  });
});
