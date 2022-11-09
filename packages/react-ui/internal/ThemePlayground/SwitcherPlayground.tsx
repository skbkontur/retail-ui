import React from 'react';

import { Switcher, SwitcherProps } from '../../components/Switcher';

const defaultItems = ['Default', 'Error'];

interface SwitcherPlaygroundProps {
  items?: SwitcherProps['items'];
  disabled?: boolean;
}
interface SwitcherPlaygroundState {
  value: string;
  error: boolean;
}
export class SwitcherPlayground extends React.Component<SwitcherPlaygroundProps> {
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
