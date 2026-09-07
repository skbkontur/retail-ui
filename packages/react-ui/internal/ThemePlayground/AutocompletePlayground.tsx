import React from 'react';

import { Autocomplete } from '../../components/Autocomplete/index.js';
import type { AutocompleteProps } from '../../components/Autocomplete/index.js';

const items = ['Абакан', 'Алексин', 'Алматы', 'Альметьевск', 'Алтайский край', 'Амурская область'];

interface AutocompletePlaygroundState {
  value: string;
}

export class AutocompletePlayground extends React.Component<Partial<AutocompleteProps>> {
  public state: AutocompletePlaygroundState = { value: items[0] };

  public render() {
    return (
      <Autocomplete
        placeholder="Введите город на букву А"
        width={200}
        {...this.props}
        source={items}
        value={this.state.value}
        onValueChange={this.handleChange}
      />
    );
  }

  private handleChange = (value: string) => {
    this.setState({ value });
  };
}
