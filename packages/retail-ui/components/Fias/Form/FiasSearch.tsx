import * as React from 'react';
import { FiasLocale, FiasLocaleHelper } from '../locale';
import { FiasComboBox, FiasComboBoxChangeEvent } from './FiasComboBox';
import { Address } from '../models/Address';
import { Fields } from '../types';

interface FiasSearchProps {
  source: (query: string) => Promise<Address[]>;
  address: Address;
  onChange: (value: Address) => void;
  limit?: number;
  locale?: FiasLocale;
  width?: number | string;
  error?: boolean;
  warning?: boolean;
}

export class FiasSearch extends React.Component<FiasSearchProps> {
  public static defaultProps = {
    locale: FiasLocaleHelper.get(),
    width: '100%',
  };

  public render() {
    const { address, source, limit, locale, width, error, warning } = this.props;
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
}

export default FiasSearch;
