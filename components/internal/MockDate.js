// @flow

import * as React from 'react';
import MockDate from 'mockdate';

class MockDateComponent extends React.Component<{ date: Date }> {
  componentDidMount() {
    MockDate.set(this.props.date);
  }

  componentWillUnmount() {
    MockDate.clear();
  }

  render() {
    return null;
  }
}

export default MockDateComponent;
