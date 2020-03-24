import React from 'react';

import { FiasLocale, FiasLocaleHelper } from '../locale';
import { FiasAddress } from '../models/FiasAddress';
import { FiasCountry, FiasAPIProvider } from '../types';
import { locale } from '../../../lib/locale/decorators';

import { FiasComboBox } from './FiasComboBox';

export interface FiasCountrySelectorProps {
  api: FiasAPIProvider;
  country?: FiasCountry;
  onValueChange?: (value?: FiasCountry) => void;
  limit?: number;
}

@locale('Fias', FiasLocaleHelper)
export class FiasCountrySelector extends React.Component<FiasCountrySelectorProps> {
  private readonly locale!: FiasLocale;

  public render() {
    const { country, limit } = this.props;
    const address = new FiasAddress({ country });
    return (
      <FiasComboBox
        getItems={this.createItemsSource}
        value={address}
        renderItem={this.renderItem}
        renderValue={this.renderValue}
        valueToString={this.valueToString}
        onValueChange={this.handleValueChange}
        onUnexpectedInput={this.onUnexpectedInput}
        renderNotFound={this.renderNotFound}
        placeholder={this.locale.countryPlaceholder}
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
              return new FiasAddress({ country });
            }),
          )
        : Promise.reject(error);
    });
  };

  private renderItem = (address: FiasAddress): string => {
    const { country } = address;
    return (country && country.fullName) || '';
  };

  private renderValue = (address: FiasAddress): string => {
    const { country } = address;
    return (country && country.fullName) || '';
  };

  private renderNotFound = (): React.ReactNode => {
    return this.locale.searchNotFound;
  };

  private valueToString = (address: FiasAddress): string => {
    const { country } = address;
    return (country && country.fullName) || '';
  };

  private handleValueChange = (value: FiasAddress) => {
    const { onValueChange } = this.props;
    if (onValueChange) {
      onValueChange(value.country);
    }
  };

  private onUnexpectedInput = (query: string) => {
    if (!query) {
      return new FiasAddress();
    }
  };
}
