const pathTo = require('./utils').pathTo;

describe('Test tokens', function () {
  it('should focus input when click label', function (done) {
    browser.url(pathTo('Tokens', 'empty with reference'));

    const root = $('[data-tid="Tokens"]');
    root.waitForExist();
    const label = root.$('label');
    const input = root.$('input');
    label.click();
    expect(input.hasFocus()).toBeTruthy();

    root.waitForExist('label + noscript');
    browser.call(done);
  });
});
