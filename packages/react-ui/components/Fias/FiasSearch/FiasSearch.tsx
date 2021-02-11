import React from 'react';
import warning from 'warning';

import { FiasLocale, FiasLocaleHelper } from '../locale';
import { FiasComboBox, FiasComboBoxProps } from '../Form/FiasComboBox';
import { FiasAddressResponse, FiasAPIProvider, FiasFields, FiasSearchOptions } from '../types';
import { locale } from '../../../lib/locale/decorators';
import { CommonWrapper, CommonProps, CommonWrapperRestProps } from '../../../internal/CommonWrapper';
import { filterProps } from '../../../lib/filterProps';

import { FiasAddress } from '..';

const COMBOBOX_PASS_PROPS = {
  limit: true,
  align: true,
  searchOnFocus: true,
  drawArrow: true,
  autoFocus: true,
  borderless: true,
  disablePortal: true,
  disabled: true,
  error: true,
  maxLength: true,
  menuAlign: true,
  onBlur: true,
  onFocus: true,
  onInputValueChange: true,
  placeholder: true,
  size: true,
  warning: true,
  width: true,
  maxMenuHeight: true,
  onMouseEnter: true,
  onMouseOver: true,
  onMouseLeave: true,
};

export interface FiasSearchProps extends CommonProps, Pick<FiasComboBoxProps, keyof typeof COMBOBOX_PASS_PROPS> {
  api: FiasAPIProvider;
  address?: FiasAddress;
  onValueChange?: (address: FiasAddress) => void;
}

/**
 * @deprecated Контур-специфичный компонент, будет удален в 3.0.0, перенесен в `@skbkontur/react-ui-addons` смотри [миграцию](https://github.com/skbkontur/retail-ui/blob/master/packages/react-ui/MIGRATION.md)
 */

@locale('Fias', FiasLocaleHelper)
export class FiasSearch extends React.Component<FiasSearchProps> {
  public static __KONTUR_REACT_UI__ = 'FiasSearch';

  public static defaultProps = {
    width: '100%',
    limit: 5,
    drawArrow: false,
    searchOnFocus: false,
  };

  private readonly locale!: FiasLocale;

  public constructor(props: FiasSearchProps) {
    super(props);
    warning(
      false,
      `FiasSearch has been deprecated, use FiasSearch from @skbkontur/react-ui-addons instead, see [migration](https://github.com/skbkontur/retail-ui/blob/master/packages/react-ui/MIGRATION.md)`,
    );
  }

  public render() {
    return <CommonWrapper {...this.props}>{this.renderMain}</CommonWrapper>;
  }

  public renderMain = (props: CommonWrapperRestProps<FiasSearchProps>) => {
    const restComboBoxProps = filterProps(props, COMBOBOX_PASS_PROPS);
    return (
      <FiasComboBox
        getItems={this.getItems}
        value={this.props.address}
        renderItem={this.renderItem}
        renderValue={this.renderValue}
        valueToString={this.valueToString}
        onValueChange={this.onValueChange}
        onUnexpectedInput={this.onUnexpectedInput}
        renderNotFound={this.renderNotFound}
        {...restComboBoxProps}
      />
    );
  };

  private renderItem = (address: FiasAddress): string => {
    return address.getText();
  };

  private renderValue = (address: FiasAddress): string => {
    return address.getText(FiasFields.room);
  };

  private renderNotFound = (): React.ReactNode => {
    return this.locale.searchNotFound;
  };

  private valueToString = (address: FiasAddress): string => {
    return address.getText(FiasFields.room);
  };

  private onValueChange = (address: FiasAddress) => {
    const { onValueChange } = this.props;
    if (onValueChange) {
      onValueChange(address);
    }
  };

  private onUnexpectedInput = (query: string) => {
    if (!query) {
      return new FiasAddress();
    }
  };

  private getItems = async (searchText: string) => {
    const { api, limit } = this.props;

    const options: FiasSearchOptions = {
      searchText,
      fullAddress: true,
      directParent: false,
      limit: (limit || FiasSearch.defaultProps.limit) + 1, // +1 to detect if there are more items
    };

    return api.search(options).then(result => {
      const { success, data, error } = result;
      return success && data
        ? Promise.resolve(data.map((item: FiasAddressResponse) => FiasAddress.createFromResponse(item)))
        : Promise.reject(error);
    });
  };
}
