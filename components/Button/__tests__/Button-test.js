const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

jest.dontMock('../Button');
const Button = require('../Button').default;

describe('Button', function() {
  it('has correct label', function() {
    const button = TestUtils.renderIntoDocument(
      <Button>Foo</Button>
    );
    const buttonNode = ReactDOM.findDOMNode(button);

    expect(buttonNode.textContent).toBe('Foo');
  });

  it('handles click event', function() {
    const handler = jest.genMockFn();
    const button = TestUtils.renderIntoDocument(
      <Button onClick={handler} />
    );
    const buttonNode = ReactDOM.findDOMNode(button);

    TestUtils.Simulate.click(buttonNode);

    expect(handler.mock.calls.length).toBe(1);
  });
});
