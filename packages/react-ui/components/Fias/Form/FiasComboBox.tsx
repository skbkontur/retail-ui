import React from 'react';

import { ComboBox, ComboBoxProps } from '../../ComboBox';
import { Address } from '../models/Address';
import { reactGetTextContent } from '../../../lib/reactGetTextContent';
import { escapeRegExpSpecChars } from '../../../lib/utils';

export interface FiasComboBoxProps extends ComboBoxProps<Address> {
  limit?: number;
}

interface FiasComboBoxState {
  searchText: string;
  totalCount: number;
}

const HighlightedText: React.FunctionComponent = ({ children }) => {
  const style: React.CSSProperties = {
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    color: 'inherit',
  };
  return <mark style={style}>{children}</mark>;
};

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
        onValueChange={this.handleChange}
        onInputValueChange={this.handleInputChange}
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

  private handleChange = (item: Address) => {
    const { onValueChange, valueToString } = this.props;
    if (onValueChange) {
      onValueChange(item);
    }
    this.setState({
      searchText: valueToString ? valueToString(item) : '',
    });
  };

  private handleInputChange = (query: string) => {
    if (this.props.onInputValueChange) {
      this.props.onInputValueChange(query);
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

  private highlight(str: string, lastMatchOnly = true) {
    const { searchText } = this.state;
    const regex = new RegExp(escapeRegExpSpecChars(searchText), 'ig');
    const matches = str.match(regex);
    if (!searchText || !matches || str === searchText) {
      return str;
    }
    const mismatches = str.split(regex);
    const result = mismatches.reduce((elements: JSX.Element[], text: string, i: number) => {
      elements.push(<span>{text}</span>);
      const match = matches[i];
      if (match) {
        const isHighlighted = lastMatchOnly && !Boolean(matches[i + 1]);
        elements.push(isHighlighted ? <HighlightedText>{match}</HighlightedText> : <span>{match}</span>);
      }
      return elements;
    }, []);
    return (
      <div>
        {result.map((element, i) => {
          return React.cloneElement(element, { key: i });
        })}
      </div>
    );
  }
}
