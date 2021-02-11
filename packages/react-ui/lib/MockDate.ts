import React from 'react';
import MockDateMock from 'mockdate';

export class MockDate extends React.Component<{ date: Date }> {
  public componentDidMount() {
    MockDateMock.set(this.props.date);
  }

  public componentWillUnmount() {
    MockDateMock.reset();
  }

  public render() {
    return null;
  }
}
