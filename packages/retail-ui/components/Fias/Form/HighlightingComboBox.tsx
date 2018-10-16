import * as React from 'react';
import ComboBox, { ComboBoxProps } from '../../ComboBox';

export interface HighlightingComboBoxProps<T> extends ComboBoxProps<T> {}

interface HighlightingComboBoxState {
  searchText: string;
}

export class HighlightingComboBox<T> extends React.Component<
  HighlightingComboBoxProps<T>,
  HighlightingComboBoxState
> {
  public static defaultProps = {
    onChange: () => null
  };
  public state: HighlightingComboBoxState = {
    searchText: ''
  };

  // TODO: downgrade refs to old react versions
  private comboboxRef: React.RefObject<ComboBox<T>> = React.createRef();

  public reset = () => {
    const combobox = this.comboboxRef.current;
    if (combobox) {
      combobox.reset();
    }
  };

  public renderItem = (item: T & { label?: string }): React.ReactNode => {
    const text = this.props.renderItem
      ? this.props.renderItem(item)
      : item.label;
    return typeof text === 'string' ? this.highlight(text) : item;
  };

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
        renderItem={this.renderItem}
        onInputChange={this.handleInputChange}
        ref={this.comboboxRef}
      />
    );
  }

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

export default HighlightingComboBox;
