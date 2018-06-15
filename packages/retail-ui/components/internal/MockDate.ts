import * as React from 'react';
import MockDate from 'mockdate';

class MockDateComponent extends React.Component<{ date: Date }> {
  public componentDidMount() {
    MockDate.set(this.props.date);
  }

  public componentWillUnmount() {
    MockDate.reset();
  }

  public render() {
    return null;
  }
}

export default MockDateComponent;
