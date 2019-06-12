import * as React from 'react';
import { FiasLocale, FiasLocaleHelper } from '../locale';
import { FiasComboBox, FiasComboBoxChangeEvent } from './FiasComboBox';
import { Address } from '../models/Address';
import { FiasCountry, APIProvider } from '../types';

export interface FiasCountrySelectorProps {
  api: APIProvider;
  country?: FiasCountry;
  onChange: (value: FiasCountry | undefined) => void;
  limit?: number;
  locale?: FiasLocale;
}

export class FiasCountrySelector extends React.Component<FiasCountrySelectorProps> {
  public static defaultProps = {
    locale: FiasLocaleHelper.get(),
  };

  public render() {
    const { country, limit, locale } = this.props;
    const address = new Address({ country });
    return (
      <FiasComboBox
        getItems={this.createItemsSource}
        value={address}
        renderItem={this.renderItem}
        renderValue={this.renderValue}
        valueToString={this.valueToString}
        onChange={this.handleChange}
        onUnexpectedInput={this.onUnexpectedInput}
        renderNotFound={this.renderNotFound}
        placeholder={(locale && locale.countryPlaceholder) || ''}
        width={'100%'}
        drawArrow={false}
        searchOnFocus={false}
        limit={limit}
      />
    );
  }

  private createItemsSource = async (prefix: string) => {
    const { api, limit } = this.props;
    return api.searchCountry({ prefix, limit }).then(result => {
      const { success, data, error } = result;
      return success && data
        ? Promise.resolve(
            data.map((country: FiasCountry) => {
              return new Address({ country });
            }),
          )
        : Promise.reject(error);
    });
  };

  private renderItem = (address: Address): string => {
    const { country } = address;
    return (country && country.fullName) || '';
  };

  private renderValue = (address: Address): string => {
    const { country } = address;
    return (country && country.fullName) || '';
  };

  private renderNotFound = (): React.ReactNode => {
    return this.props.locale!.searchNotFound;
  };

  private valueToString = (address: Address): string => {
    const { country } = address;
    return (country && country.fullName) || '';
  };

  private handleChange = (e: FiasComboBoxChangeEvent, value: Address) => {
    this.props.onChange(value.country);
  };

  private onUnexpectedInput = (query: string) => {
    if (!query) {
      return new Address();
    }
  };
}

export default FiasCountrySelector;
