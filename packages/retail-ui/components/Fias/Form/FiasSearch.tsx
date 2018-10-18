import * as React from 'react';
import { HighlightingComboBox } from './HighlightingComboBox';
import { Address } from '../models/Address';

interface FiasSearchProps {
  source: (query: string) => Promise<Address[]>;
  address: Address;
  onChange: (event: any, value: Address) => void;
}

export class FiasSearch extends React.Component<FiasSearchProps> {
  public static defaultProps = {
    onChange: () => null
  };

  public renderItem = (address: Address): string => {
    return address.getText();
  };

  public renderValue = (address: Address): string => {
    return address.getText();
  };

  public valueToString = (address: Address): string => {
    return address.getText();
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
