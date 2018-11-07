import * as React from 'react';
import {FiasComboBox, FiasComboBoxChangeEvent} from './FiasComboBox';
import {Address} from '../models/Address';
import {Nullable} from '../../../typings/utility-types';
import {defaultLocale} from '../constants/locale';
import {Fields, FiasLocale} from "../types";

interface FiasSearchProps {
  source: (query: string) => Promise<Address[]>;
  address: Address;
  onChange: (value: Address) => void;
  limit?: number;
  locale?: FiasLocale;
}

export class FiasSearch extends React.Component<FiasSearchProps> {
  public static defultProps = {
    locale: defaultLocale
  };

  private combobox: Nullable<FiasComboBox> = null;

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
        renderNotFound={this.renderNotFound}
        placeholder={locale!.searchPlaceholder}
        width={'100%'}
        autocomplete={true}
        limit={limit}
        ref={this.createRef}
      />
    );
  }

  private createRef = (element: FiasComboBox) => {
    this.combobox = element;
  };

  private renderItem = (address: Address): string => {
    return address.getText();
  };

  private renderValue = (address: Address): string => {
    return address.getText(Fields.room);
  };

  private renderNotFound = (): React.ReactNode => {
    return this.props.locale!.searchNotFound;
  };

  private valueToString = (address: Address): string => {
    return address.getText(Fields.room);
  };

  private handleChange = (
    e: Nullable<FiasComboBoxChangeEvent>,
    value: Address
  ) => {
    this.props.onChange(value);
  };

  private onUnexpectedInput = (query: string) => {
    if (!query) {
      this.handleChange(null, new Address({}));
    }
    this.resetCombobox();
  };

  private resetCombobox = () => {
    if (this.combobox) {
      this.combobox.reset();
    }
  };
}

export default FiasSearch;
