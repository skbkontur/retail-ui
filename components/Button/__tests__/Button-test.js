import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import Button from '../Button.js';

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
