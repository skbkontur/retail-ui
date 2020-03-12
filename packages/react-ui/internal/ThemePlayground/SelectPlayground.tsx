import React from 'react';

import { Select, SelectProps } from '../../components/Select';

export class SelectPlayground extends React.Component<SelectProps<string, string>, { value: string | undefined }> {
  public state = {
    value: capitalize(this.props.size),
  };
  private readonly selectItems = ['Small', 'Medium', 'Large'];

  public render() {
    return (
      <Select<string, string>
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
