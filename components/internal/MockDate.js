// @flow

import React from 'react';
import MockDate from 'mockdate';

class MockDateComponent extends React.Component {
  props: {
    date: Date
  };

  componentDidMount() {
    MockDate.set(this.props.date);
  }

  componentWillUnmount() {
    MockDate.reset();
  }

  render() {
    return null;
  }
}

export default MockDateComponent;
