import * as React from 'react';
import { FiasLocale, FiasLocaleHelper } from '../locale';
import { FiasComboBox, FiasComboBoxChangeEvent } from './FiasComboBox';
import { Address } from '../models/Address';
import { Fields } from '../types';

interface InternalFiasSearchProps {
  source: (query: string) => Promise<Address[]>;
  address: Address;
  onChange: (value: Address) => void;
  limit?: number;
  locale?: FiasLocale;
}

export class InternalFiasSearch extends React.Component<InternalFiasSearchProps> {
  public static defaultProps = {
    locale: FiasLocaleHelper.get(),
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
        drawArrow={false}
        searchOnFocus={false}
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

export default InternalFiasSearch;
