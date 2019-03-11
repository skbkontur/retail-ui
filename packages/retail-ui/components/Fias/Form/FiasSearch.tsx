import * as React from 'react';
import { FiasComboBox, FiasComboBoxChangeEvent } from './FiasComboBox';
import { Address } from '../models/Address';
import { defaultLocale } from '../constants/locale';
import { Fields, FiasLocale } from '../types';

interface FiasSearchProps {
  source: (query: string) => Promise<Address[]>;
  address: Address;
  onChange: (value: Address) => void;
  limit?: number;
  locale?: FiasLocale;
}

export class FiasSearch extends React.Component<FiasSearchProps> {
  public static defaultProps = {
    locale: defaultLocale,
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
        renderNotFound={this.renderNotFound}
        placeholder={locale!.searchPlaceholder}
        width={'100%'}
        autocomplete={true}
        limit={limit}
      />
    );
  }

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

  private handleChange = (e: FiasComboBoxChangeEvent, value: Address) => {
    this.props.onChange(value);
  };

  private onUnexpectedInput = (query: string) => {
    if (!query) {
      return new Address();
    }
  };
}

export default FiasSearch;
