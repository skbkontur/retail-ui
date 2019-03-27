import * as React from 'react';
import ComboBox, { ComboBoxProps } from '../../ComboBox';
import { Address } from '../models/Address';
import reactGetTextContent from '../../../lib/reactGetTextContent/reactGetTextContent';

export interface FiasComboBoxProps extends ComboBoxProps<Address> {
  limit?: number;
}

export interface FiasComboBoxChangeEvent {
  target: {
    value: Address;
  };
}

interface FiasComboBoxState {
  searchText: string;
  totalCount: number;
}

export class FiasComboBox extends React.Component<FiasComboBoxProps, FiasComboBoxState> {
  public static defaultProps = ComboBox.defaultProps;
  public state: FiasComboBoxState = {
    searchText: '',
    totalCount: 0,
  };

  private combobox: ComboBox<Address> | null = null;

  public get hasItems() {
    return this.state.totalCount > 0;
  }

  public render() {
    return (
      <ComboBox
        {...this.props}
        getItems={this.getItems}
        renderItem={this.renderItem}
        onChange={this.handleChange}
        onInputChange={this.handleInputChange}
        onFocus={this.handleFocus}
        totalCount={this.state.totalCount}
        renderTotalCount={this.renderTotalCount}
        ref={this.createRef}
      />
    );
  }

  private createRef = (el: ComboBox<Address> | null) => {
    this.combobox = el;
  };

  private getItems = (searchText: string): Promise<Address[]> => {
    const { getItems, limit } = this.props;
    const promise = getItems ? getItems(searchText) : Promise.resolve([]);
    return promise.then(items => {
      this.setState({
        totalCount: items.length,
      });
      return items.slice(0, limit);
    });
  };

  private renderItem = (item: Address & { label?: string }): React.ReactNode => {
    const node: React.ReactNode = this.props.renderItem ? this.props.renderItem(item) : item.label || '';
    return this.highlight(reactGetTextContent(node));
  };

  private renderTotalCount = (found: number, total: number): React.ReactNode => (
    <div>
      <div>Показано {found} результатов.</div>
      <div>Уточните запрос, чтобы увидеть остальные</div>
    </div>
  );

  private handleChange = (event: { target: { value: Address } }, item: Address) => {
    const { onChange, valueToString } = this.props;
    if (onChange) {
      onChange(event, item);
    }
    this.setState({
      searchText: valueToString ? valueToString(item) : '',
    });
  };

  private handleInputChange = (query: string) => {
    if (this.props.onInputChange) {
      this.props.onInputChange(query);
    }
    this.setState({ searchText: query });
  };

  private handleFocus = () => {
    if (this.props.onFocus) {
      this.props.onFocus();
    }
    const { error, warning } = this.props;
    if ((error || warning) && this.hasItems) {
      if (this.combobox) {
        this.combobox.search();
      }
    }
  };

  private highlight(str: string, lastMatchOnly: boolean = true) {
    const { searchText } = this.state;
    const regex = new RegExp(searchText, 'ig');
    const matches = str.match(regex);
    if (!matches || str === searchText) {
      return str;
    }
    const mismatches = str.split(regex);
    const highlightStyle = {
      fontWeight: 'bold',
    };
    const result = mismatches.reduce((spans: Array<React.ReactElement<HTMLSpanElement>>, text: string, i: number) => {
      spans.push(<span>{text}</span>);
      if (matches[i]) {
        const style = lastMatchOnly && matches[i + 1] ? {} : highlightStyle;
        spans.push(<span style={style}>{matches[i]}</span>);
      }
      return spans;
    }, []);
    return (
      <div>
        {result.map((span, i) => {
          return React.cloneElement(span, { key: `${i}` });
        })}
      </div>
    );
  }
}

export default FiasComboBox;
