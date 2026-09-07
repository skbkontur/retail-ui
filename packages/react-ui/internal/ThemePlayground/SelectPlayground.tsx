import React from 'react';

import { Select } from '../../components/Select/index.js';
import type { SelectProps } from '../../components/Select/index.js';

type SelectPlaygroundValue = string;
type SelectPlaygroundItem = string;
type SelectPlaygroundProps = SelectProps<SelectPlaygroundValue, SelectPlaygroundItem>;
interface SelectPlaygroundState {
  value: string;
}

const defaultItems = ['Small', 'Medium', 'Large'];

const getSelectItems = (props: SelectPlaygroundProps): string[] => {
  if (props.items?.length) {
    return props.items.filter((item): item is string => typeof item === 'string');
  }
  return defaultItems;
};

const getInitialValue = (props: SelectPlaygroundProps): string => {
  if (typeof props.value === 'string' && props.value) {
    return props.value;
  }
  const items = getSelectItems(props);
  if (props.items?.length) {
    return items[0] ?? '';
  }
  return capitalize(props.size);
};

export class SelectPlayground extends React.Component<SelectPlaygroundProps> {
  public state: SelectPlaygroundState = {
    value: getInitialValue(this.props),
  };
  private readonly selectItems = getSelectItems(this.props);

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
