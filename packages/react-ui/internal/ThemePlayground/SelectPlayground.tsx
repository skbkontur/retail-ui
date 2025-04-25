import React from 'react';

import type { SelectProps } from '../../components/Select';
import { Select } from '../../components/Select';

type SelectPlaygroundValue = string;
type SelectPlaygroundItem = string;
type SelectPlaygroundProps = SelectProps<SelectPlaygroundValue, SelectPlaygroundItem>;
interface SelectPlaygroundState {
  value: string;
}
export class SelectPlayground extends React.Component<SelectPlaygroundProps> {
  public state: SelectPlaygroundState = {
    value: capitalize(this.props.size),
  };
  private readonly selectItems = ['Small', 'Medium', 'Large'];

  public render() {
    return (
      <Select<SelectPlaygroundValue, SelectPlaygroundItem>
        {...this.props}
        value={this.state.value}
        items={this.selectItems}
        onValueChange={this.handleChange}
      />
    );
  }

  private handleChange = (value: string) => {
    this.setState({
      value,
    });
  };
}

const capitalize = (input = ''): string => {
  return input.charAt(0).toUpperCase() + input.slice(1);
};
