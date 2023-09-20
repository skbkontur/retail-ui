import React from 'react';

import { FxInput } from '../../components/FxInput';

interface FxInputPlaygroundState {
  auto: boolean;
  value: string;
}
export class FxInputPlayground extends React.Component {
  public state: FxInputPlaygroundState = {
    auto: true,
    value: 'auto',
  };

  public render(): JSX.Element {
    return (
      <FxInput
        auto={this.state.auto}
        type={'text'}
        value={this.state.value}
        onRestore={this.handleRestore}
        onValueChange={this.onValueChange}
        width={150}
      />
    );
  }

  private onValueChange = (value: string) => {
    this.setState({ value, auto: false });
  };

  private handleRestore = () => {
    this.setState({
      value: 'auto',
      auto: true,
    });
  };
}
