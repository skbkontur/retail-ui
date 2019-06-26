import * as React from 'react';
import { FiasLocale, FiasLocaleHelper } from '../locale';
import { FiasComboBox, FiasComboBoxChangeEvent } from '../Form/FiasComboBox';
import { Address } from '../models/Address';
import { Fields, APIProvider, SearchOptions, AddressResponse } from '../types';
import { locale } from '../../LocaleProvider/decorators';

interface FiasSearchProps {
  api: APIProvider;
  address?: Address;
  onChange?: (value: Address) => void;
  limit: number;
  width: number | string;
  error?: boolean;
  warning?: boolean;
}

@locale('Fias', FiasLocaleHelper)
export class FiasSearch extends React.Component<FiasSearchProps> {
  public static defaultProps = {
    width: '100%',
    limit: 5,
  };

  private readonly locale!: FiasLocale;

  public render() {
    const { address, limit, width, error, warning } = this.props;
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
        placeholder={this.locale.searchPlaceholder}
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
    return this.locale.searchNotFound;
  };

  private valueToString = (address: Address): string => {
    return address.getText(Fields.room);
  };

  private handleChange = (e: FiasComboBoxChangeEvent, value: Address) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
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
