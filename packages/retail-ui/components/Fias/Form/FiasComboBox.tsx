import * as React from 'react';
import ComboBox, { ComboBoxProps } from '../../ComboBox';
import { Nullable } from '../../../typings/utility-types';
import { Address } from '../models/Address';

export interface FiasComboBoxProps extends ComboBoxProps<Address> {}

export interface FiasComboBoxChangeEvent {
  target: {
    value: Address;
  };
}

interface FiasComboBoxState {
  searchText: string;
  totalCount: number;
}

export class FiasComboBox extends React.Component<
  FiasComboBoxProps,
  FiasComboBoxState
> {
  public static defaultProps = {
    onChange: () => null
  };
  public state: FiasComboBoxState = {
    searchText: '',
    totalCount: 0
  };

  private combobox: Nullable<ComboBox<Address>> = null;

  public reset = () => {
    if (this.combobox) {
      this.combobox.reset();
    }
  };

  public getItems = (searchText: string): Promise<Address[]> => {
    return this.props.getItems
      ? this.props.getItems(searchText).then(items => {
          this.setState({
            totalCount: items.length
          });
          return items.slice(0, 15);
        })
      : Promise.resolve([]);
  };

  public renderItem = (item: Address & { label?: string }): React.ReactNode => {
    const text = this.props.renderItem
      ? this.props.renderItem(item)
      : item.label;
    return typeof text === 'string' ? this.highlight(text) : item;
  };

  public renderTotalCount = (found: number, total: number): React.ReactNode => (
    <div>
      <div>
        Показано {found} из {total} найденных результатов.
      </div>
      <div>Уточните запрос, чтобы увидеть остальные</div>
    </div>
  );

  public handleInputChange = (query: string) => {
    if (this.props.onInputChange) {
      this.props.onInputChange(query);
    }
    this.setState({ searchText: query });
  };

  public render() {
    const props = this.props;
    return (
      <ComboBox
        {...props}
        getItems={this.getItems}
        renderItem={this.renderItem}
        onInputChange={this.handleInputChange}
        totalCount={this.state.totalCount}
        renderTotalCount={this.renderTotalCount}
        ref={this.createRef}
      />
    );
  }

  private createRef = (element: ComboBox<Address>) => {
    this.combobox = element;
  };

  private highlight(str: string, lastonly: boolean = true) {
    const { searchText } = this.state;

    if (!str || !searchText || str === searchText) {
      return str;
    }
    const highlightedStyles = { fontWeight: 'bold' };
    const regex = new RegExp(searchText, 'ig');
    const spans = str.split(regex);
    const matches = str.match(regex);
    const result = spans.reduce(
      (
        current: Array<React.ReactElement<HTMLSpanElement>>,
        span: string,
        i: number
      ) => {
        current.push(<span>{span}</span>);
        if (matches && matches[i]) {
          const styles =
            lastonly && i < matches.length - 1 ? {} : highlightedStyles;
          current.push(<span style={styles}>{matches[i]}</span>);
        }
        return current;
      },
      []
    );
    return (
      <div>
        {result.map((element, i) => {
          return React.cloneElement(element, { key: `${i}` });
        })}
      </div>
    );
  }
}

export default FiasComboBox;
