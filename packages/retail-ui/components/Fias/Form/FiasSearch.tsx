import * as React from 'react';
import { Address } from '../types';
import { HighlightingComboBox } from './HighlightingComboBox';
import { getAddressText } from '../utils';

interface FiasSearchProps {
  source: (query: string) => Promise<Address[]>;
  address: Address;
  onChange: (event: any, value: Address) => void;
}

export class FiasSearch extends React.Component<FiasSearchProps> {
  public static defaultProps = {
    onChange: () => null
  };

  public renderItem = (item: Address): string => {
    return getAddressText(item);
  };

  public renderValue = (value: Address): string => {
    return getAddressText(value);
  };

  public valueToString = (value: Address): string => {
    return getAddressText(value);
  };

  public render() {
    const { address, source, onChange } = this.props;
    return (
      <HighlightingComboBox
        getItems={source}
        value={address}
        renderItem={this.renderItem}
        renderValue={this.renderValue}
        valueToString={this.valueToString}
        onChange={onChange}
        placeholder={''}
        width={'100%'}
        autocomplete={true}
      />
    );
  }
}

export default FiasSearch;
