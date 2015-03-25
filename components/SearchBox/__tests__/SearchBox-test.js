var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var Input = require('../../Input');
jest.dontMock('../SearchBox.jsx');
var SearchBox = require('../SearchBox.jsx');

describe('SearchBox', function() {
  it('handles change event', function() {
    var handler = jest.genMockFn();
    var searchBox = TestUtils.renderIntoDocument(
      <SearchBox  onChange={handler} />
    );

    var input = TestUtils.findRenderedComponentWithType(searchBox, Input);
    input.props.onChange({target: {value: 'foo'}});

    expect(handler.mock.calls.length).toBe(1);
    expect(handler.mock.calls[0][0].target.value).toBe('foo');
  });
});
