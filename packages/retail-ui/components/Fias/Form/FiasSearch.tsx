import * as React from 'react';
import { FiasLocale, FiasLocaleHelper } from '../locale';
import { FiasComboBox, FiasComboBoxChangeEvent } from './FiasComboBox';
import { Address } from '../models/Address';
import { Fields, APIProvider, SearchOptions, AddressResponse } from '../types';

interface FiasSearchProps {
  api: APIProvider;
  address: Address;
  onChange: (value: Address) => void;
  limit: number;
  locale: FiasLocale;
  width?: number | string;
  error?: boolean;
  warning?: boolean;
}

export class FiasSearch extends React.Component<FiasSearchProps> {
  public static defaultProps = {
    locale: FiasLocaleHelper.get(),
    width: '100%',
    limit: 5,
  };

  public render() {
    const { address, limit, locale, width, error, warning } = this.props;
    return (
      <FiasComboBox
        getItems={this.getItems}
        value={address}
        renderItem={this.renderItem}
        renderValue={this.renderValue}
        valueToString={this.valueToString}
        onChange={this.handleChange}
        onUnexpectedInput={this.onUnexpectedInput}
        renderNotFound={this.renderNotFound}
        placeholder={locale!.searchPlaceholder}
        width={width}
        drawArrow={false}
        searchOnFocus={false}
        limit={limit}
        error={error}
        warning={warning}
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

  private getItems = async (searchText: string) => {
    const { api, limit } = this.props;

    const options: SearchOptions = {
      searchText,
      fullAddress: true,
      directParent: false,
      limit: limit + 1, // +1 to detect if there are more items
    };

    return api.search(options).then(result => {
      const { success, data, error } = result;
      return success && data
        ? Promise.resolve(data.map((item: AddressResponse) => Address.createFromResponse(item)))
        : Promise.reject(error);
    });
  };
}

export default FiasSearch;
