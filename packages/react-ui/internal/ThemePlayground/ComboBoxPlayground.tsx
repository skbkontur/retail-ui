import React from 'react';

import { ComboBox } from '../../components/ComboBox/index.js';
import type { ComboBoxItem, ComboBoxProps } from '../../components/ComboBox/index.js';

const items: ComboBoxItem[] = [
  { value: '1', label: 'Абакан' },
  { value: '2', label: 'Алексин' },
  { value: '3', label: 'Алматы' },
  { value: '4', label: 'Альметьевск' },
  { value: '5', label: 'Анадырь' },
  { value: '6', label: 'Анапа' },
];

async function getItems(query: string) {
  return items.filter((x) => x.label.toLowerCase().includes(query.toLowerCase()) || x.value === query);
}

interface ComboBoxPlaygroundState {
  value: ComboBoxItem | null;
}

export class ComboBoxPlayground extends React.Component<Partial<ComboBoxProps<ComboBoxItem>>> {
  public state: ComboBoxPlaygroundState = { value: items[0] };

  public render() {
    return (
      <ComboBox
        placeholder="Введите или выберите из списка"
        width={200}
        {...this.props}
        getItems={getItems}
        value={this.state.value}
        onValueChange={this.handleChange}
      />
    );
  }

  private handleChange = (value: ComboBoxItem) => {
    this.setState({ value });
  };
}
