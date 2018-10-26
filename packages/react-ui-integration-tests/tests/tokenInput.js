const pathTo = require("./utils").pathTo;

describe("Test tokenInput", function() {
  it("should focus input when click label", function(done) {
    browser.url(pathTo("TokenInput", "empty with reference"));

    const root = $('[data-tid="TokenInput"]');
    root.waitForExist();
    const label = root.$("label");
    const input = root.$("input");
    label.click();
    expect(input.hasFocus()).toBeTruthy();

    root.waitForExist("label + noscript");
    browser.call(done);
  });
});
