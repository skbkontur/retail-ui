import * as React from 'react';
import Switcher from '../../Switcher';

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
        onChange={this.handleChange}
        items={this.props.items || defaultItems}
        error={this.state.error}
        {...this.props}
      />
    );
  }

  private handleChange = (el: { target: { value: string } }) => {
    const { value } = el.target;
    this.setState({ value, error: value === 'Error' });
  };
}
