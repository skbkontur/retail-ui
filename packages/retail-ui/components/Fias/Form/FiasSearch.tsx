import * as React from 'react';
import { FiasComboBox, FiasComboBoxChangeEvent } from './FiasComboBox';
import { Address } from '../models/Address';
import { Nullable } from '../../../typings/utility-types';

interface FiasSearchProps {
  source: (query: string) => Promise<Address[]>;
  address: Address;
  onChange: (value: Address, fullChange: boolean) => void;
  limit?: number;
}

export class FiasSearch extends React.Component<FiasSearchProps> {
  private combobox: Nullable<FiasComboBox> = null;

  public renderItem = (address: Address): string => {
    return address.getText('planningstructure');
  };

  public renderValue = (address: Address): string => {
    return address.getText('planningstructure');
  };

  public valueToString = (address: Address): string => {
    return address.getText('planningstructure', true, ' ');
  };

  public handleChange = (
    e: Nullable<FiasComboBoxChangeEvent>,
    value: Address
  ) => {
    this.props.onChange(value, true);
  };

  public onUnexpectedInput = (query: string) => {
    if (!query) {
      this.handleChange(null, new Address({}));
    }
    this.reset();
  };

  public reset = () => {
    if (this.combobox) {
      this.combobox.reset();
    }
  };

  public render() {
    const { address, source, limit } = this.props;
    return (
      <FiasComboBox
        getItems={source}
        value={address}
        renderItem={this.renderItem}
        renderValue={this.renderValue}
        valueToString={this.valueToString}
        onChange={this.handleChange}
        onUnexpectedInput={this.onUnexpectedInput}
        placeholder={'Начните вводить адрес, например: Москва, Внуково'}
        width={'100%'}
        autocomplete={true}
        limit={limit}
        ref={this.comboboxRef}
      />
    );
  }

  private comboboxRef = (element: FiasComboBox) => {
    this.combobox = element;
  };
}

export default FiasSearch;
