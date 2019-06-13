import * as React from 'react';
import InternalFiasSearch from '../Form/InternalFiasSearch';
import { Address } from '../models/Address';
import { AddressResponse, SearchOptions } from '../types';
import { FiasViewBaseProps } from '../Fias';

export interface FiasSearchProps {
  error?: boolean;
  warning?: boolean;
  limit: number;
  onChange: (address: Address) => void;
  width?: number | string;
}

export class FiasSearch extends React.Component<FiasViewBaseProps & FiasSearchProps> {
  public static defaultProps = {
    limit: 5,
  };

  public render() {
    const { width, error, warning } = this.props;
    return (
      <InternalFiasSearch
        source={this.getItems}
        locale={this.props.locale}
        address={this.props.address}
        onChange={this.props.onChange}
        width={width}
        error={error}
        warning={warning}
        limit={this.props.limit || FiasSearch.defaultProps.limit}
      />
    );
  }

  private getItems = async (searchText: string) => {
    const limit = this.props.limit || FiasSearch.defaultProps.limit;

    const options: SearchOptions = {
      searchText,
      fullAddress: true,
      directParent: false,
      limit: limit + 1, // +1 to detect if there are more items
    };
    return this.props.api.search(options).then(result => {
      const { success, data, error } = result;
      return success && data
        ? Promise.resolve(data.map((item: AddressResponse) => Address.createFromResponse(item)))
        : Promise.reject(error);
    });
  };
}

export default FiasSearch;
