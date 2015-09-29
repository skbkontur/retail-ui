var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

jest.dontMock('../Button.jsx');
var Button = require('../Button.jsx');

describe('Button', function() {
  it('has correct label', function() {
    var button = TestUtils.renderIntoDocument(
      <Button>Foo</Button>
    );

    expect(button.getDOMNode().textContent).toBe('Foo');
  });

  it('handles click event', function() {
    var handler = jest.genMockFn();
    var button = TestUtils.renderIntoDocument(
      <Button onClick={handler} />
    );

    TestUtils.Simulate.click(button.getDOMNode());

    expect(handler.mock.calls.length).toBe(1);
  });
});
