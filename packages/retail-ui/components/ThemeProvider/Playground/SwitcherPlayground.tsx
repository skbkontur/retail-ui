import * as React from 'react';
import Switcher from '../../Switcher';

const defaultItems = ['One', 'Two', 'Three'];

export class SwitcherPlayground extends React.Component<{ items?: string[]; error?: boolean }, { value: string }> {
  public state = {
    value: '',
  };

  public render() {
    return (
      <Switcher
        value={this.state.value}
        onChange={this.handleChange}
        items={this.props.items || defaultItems}
        {...this.props}
      />
    );
  }

  private handleChange = (el: { target: { value: string } }) => {
    this.setState({ value: el.target.value });
  };
}
