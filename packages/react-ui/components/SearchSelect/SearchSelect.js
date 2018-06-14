/* eslint-disable */

import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import warning from 'warning';

import filterProps from '../filterProps';

import Input from '../Input';

import styles from './SearchSelect.less';

const INPUT_PASS_PROPS = {
  width: true
};

type Value = any;
type Data = any;

type Props = {
  value: ?Value,
  disabled?: boolean,
  placeholder?: string,
  source: (searchString: string) => Promise<Array<Data>>,
  loader: { load: (id: Value) => Promise<Data> },
  getValue: (data: Data) => Value,
  renderValue: (value: Value, data: ?Data) => any,
  renderItem: (value: Value, data: Data) => any,
  width: number | string,
  onChange: (event: { target: { value: Value } }, value: Value) => void
};

type State = {
  opened: boolean,
  searchText: string,
  value: any,
  item: any,
  results: ?Array<Data>,
  selected: number
};

warning(false, 'Component SearchSelect is deprecated use ComboBox instead.');

/**
 * DEPRECATED. Use ComboBox instead.
 */
class SearchSelect extends React.Component<Props, State> {
  static propTypes = {
    value: PropTypes.any,

    disabled: PropTypes.bool,

    placeholder: PropTypes.string,

    source: PropTypes.func.isRequired,

    loader: PropTypes.shape({
      load: PropTypes.func
    }),

    getValue: PropTypes.func,

    renderValue: PropTypes.func,

    renderItem: PropTypes.func,

    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    onChange: PropTypes.func
  };

  static defaultProps = {
    getValue,
    renderItem,
    renderValue,
    placeholder: 'Пусто',
    width: 250
  };

  _focusable: ?HTMLElement;

  constructor(props: Props, context: any) {
    super(props, context);

    this.state = {
      opened: false,
      searchText: '',
      value: props.value !== undefined ? props.value : null,
      item: null,
      results: null,
      selected: -1
    };
    this._focusable = null;
  }

  render() {
    let valueEl;
    if (this.state.opened) {
      valueEl = this.renderOpenedValue();
    } else {
      valueEl = this.renderClosedValue();
    }
    return (
      <label className={styles.root} style={{ width: this.props.width }}>
        {valueEl}
        {this.state.opened && this.renderMenu()}
        <div className={styles.arrow} />
      </label>
    );
  }

  renderOpenedValue() {
    const inputProps = filterProps(this.props, INPUT_PASS_PROPS);
    return (
      <div className={styles.input}>
        <Input
          ref={this._refFocusable}
          {...inputProps}
          value={this.state.searchText}
          rightIcon={<span />}
          disabled={this.props.disabled}
          onChange={this._handleInputChange}
          onKeyDown={this._handleInputKey}
          onBlur={this._handleInputBlur}
        />
        <span
          className={styles.openArrow}
          onMouseDown={this._handleOpenClick}
        />
      </div>
    );
  }

  renderClosedValue() {
    let value;
    if (this.state.value == null) {
      value = (
        <span className={styles.placeholder}>{this.props.placeholder}</span>
      );
    } else if (this.props.loader) {
      if (this.state.item) {
        value = this.props.renderValue(this.state.value, this.state.item);
      } else {
        value = <i>Загрузка</i>;
      }
    } else {
      value = this.props.renderValue(this.state.value, null);
    }

    return (
      <div
        ref={this._refFocusable}
        className={styles.value}
        tabIndex="0"
        onClick={this._handleValueClick}
        onKeyDown={this._handleValueKey}
        onKeyPress={this._handleValueKeyPress}
      >
        {value}
        <span className={styles.openArrow} />
      </div>
    );
  }

  renderMenu() {
    const { results } = this.state;
    if (!results || results.length === 0) {
      return null;
    }
    return (
      <div className={styles.menuHolder}>
        <div className={styles.menu}>
          {results.map((item, i) => {
            const className = classNames({
              [styles.menuItem]: true,
              [styles.menuItemSelected]: this.state.selected === i
            });
            return (
              <div
                key={i}
                className={className}
                onMouseDown={e => this._handleItemClick(e, item)}
                onMouseEnter={e => this.setState({ selected: i })}
                onMouseLeave={e => this.setState({ selected: -1 })}
              >
                {this.props.renderItem(this.props.getValue(item), item)}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  componentWillMount() {
    if (this.state.value != null) {
      this._loadItem(this.state.value);
    }
  }

  componentWillReceiveProps(newProps: Props) {
    if (newProps.value !== undefined) {
      this.setState({ value: newProps.value });
      this._resetItem(newProps.value);
    }
  }

  _refFocusable = (el: ?HTMLElement) => {
    this._focusable = el && (el.focus ? el : (ReactDOM.findDOMNode(el): any));
  };

  _handleInputChange = (event: any) => {
    const pattern = event.target.value;
    this.setState({
      opened: true,
      searchText: pattern
    });
    this._fetchList(pattern);
  };

  _handleInputKey = event => {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        this._moveSelection(-1);
        break;
      case 'ArrowDown':
        event.preventDefault();
        this._moveSelection(1);
        break;
      case 'Enter':
        const item =
          this.state.results && this.state.results[this.state.selected];
        if (item) {
          event.preventDefault();
          this._close(() => {
            this._focus();
          });
          this._change(item);
        }
        break;
      case 'Escape':
        this._close(() => {
          this._focus();
        });
        break;
    }
  };

  _handleInputBlur = () => {
    const { searchText } = this.state;
    const item = this._findItemByValue(searchText);
    this.setState({ opened: false });
    if (item) {
      this._change(item);
    } else {
      this.setState({ searchText: this.state.value });
    }
  };

  _handleOpenClick = () => {
    this.setState({ opened: true });
    this._focus();
  };

  _handleValueClick = () => {
    this.setState({
      opened: true,
      searchText: '',
      results: null
    });
    this._focusAsync();
    this._fetchList('');
  };

  _handleValueKeyPress = event => {
    // Set input value to empty string and then back to the real value to make
    // cursor appear at the and.
    this.setState(
      {
        opened: true,
        searchText: ''
      },
      () => {
        if (this._focusable) {
          this._focusable.focus();
        }
      }
    );
  };

  _handleValueKey = event => {
    switch (event.key) {
      case ' ':
      case 'Enter':
      case 'ArrowUp':
      case 'ArrowDown':
        event.preventDefault();
        this.setState(
          {
            opened: true,
            searchText: ''
          },
          () => {
            this._focus();
          }
        );
        this._fetchList('');
        break;
    }
  };

  _handleItemClick(event: MouseEvent, item: any) {
    if (event.button !== 0) {
      return;
    }

    this._close();
    this._change(item);
    this._focusAsync();
  }

  _resetItem(value: any) {
    if (this.state.value === value) {
      return;
    }

    const item = this._findItemByValue(value);
    this.setState({ item });
    if (!item && this.props.loader) {
      this._loadItem(value);
    }
  }

  _loadItem(value: any) {
    this.props.loader.load(value).then(item => {
      if (value === this.state.value) {
        this.setState({ item });
      }
    });
  }

  _fetchList(pattern: string) {
    this.props.source(pattern).then(results => {
      if (this.state.searchText === pattern) {
        this.setState({
          selected: -1,
          results
        });
      }
    });
  }

  _focus = () => {
    if (this._focusable) {
      this._focusable.focus();
    }
  };

  _focusAsync() {
    process.nextTick(this._focus);
  }

  _moveSelection(step: number) {
    if (!this.state.results) {
      return;
    }

    let selected = this.state.selected + step;
    if (selected < 0) {
      selected = this.state.results.length - 1;
    }
    if (selected >= this.state.results.length) {
      selected = 0;
    }
    this.setState({ selected });
  }

  _change(item: any) {
    const value = this.props.getValue(item);
    if (this.props.value === undefined) {
      this.setState({ value });
      this._resetItem(value);
    }
    if (this.props.onChange) {
      this.props.onChange({ target: { value } }, value);
    }
  }

  _close(callback: any) {
    this.setState(
      {
        opened: false,
        results: null
      },
      callback
    );
  }

  _findItemByValue(value: any): any {
    const { results } = this.state;
    return results && results.find(item => this.props.getValue(item) === value);
  }
}

function getValue(item) {
  return item;
}

function renderValue(value, item) {
  return item;
}

function renderItem(value, item) {
  return item;
}

export default SearchSelect;
