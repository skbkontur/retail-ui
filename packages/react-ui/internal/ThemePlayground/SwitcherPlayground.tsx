import React from 'react';

import { Switcher, SwitcherProps } from '../../components/Switcher';

const defaultItems = ['Default', 'Error'];

type SwitcherPlaygroundProps = Partial<Pick<SwitcherProps, 'items' | 'disabled'>>;
type SwitcherPlaygroundState = Pick<SwitcherProps, 'value' | 'error'>;
export class SwitcherPlayground extends React.Component<SwitcherPlaygroundProps, SwitcherPlaygroundState> {
  public state: SwitcherPlaygroundState = {
    value: '',
    error: false,
  };

  public render() {
    return (
      <Switcher
        value={this.state.value}
        onValueChange={this.handleValueChange}
        items={this.props.items || defaultItems}
        error={this.state.error}
        {...this.props}
      />
    );
  }

  private handleValueChange = (value: string) => {
    this.setState({ value, error: value === 'Error' });
  };
}
