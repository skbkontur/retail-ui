import * as React from 'react';
import { FiasComboBox, FiasComboBoxChangeEvent } from './FiasComboBox';
import { Address } from '../models/Address';
import { Nullable } from '../../../typings/utility-types';
import { FiasLocale, defaultLocale } from '../constants/locale';

interface FiasSearchProps {
  source: (query: string) => Promise<Address[]>;
  address: Address;
  onChange: (value: Address, fullChange: boolean) => void;
  limit?: number;
  locale?: FiasLocale;
}

export class FiasSearch extends React.Component<FiasSearchProps> {
  public static defultProps = {
    locale: defaultLocale
  };

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
    const { address, source, limit, locale } = this.props;
    return (
      <FiasComboBox
        getItems={source}
        value={address}
        renderItem={this.renderItem}
        renderValue={this.renderValue}
        valueToString={this.valueToString}
        onChange={this.handleChange}
        onUnexpectedInput={this.onUnexpectedInput}
        placeholder={locale!.searchPlaceholder}
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
