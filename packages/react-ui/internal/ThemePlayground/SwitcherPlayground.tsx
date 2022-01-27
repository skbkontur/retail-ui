import React from 'react';

import { Switcher } from '../../components/Switcher';

const defaultItems = ['Default', 'Error'];

export class SwitcherPlayground extends React.Component<
  { items?: string[]; disabled?: boolean },
  { value: string; error: boolean }
> {
  public state = {
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
