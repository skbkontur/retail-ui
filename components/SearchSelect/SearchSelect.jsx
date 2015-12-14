import classNames from 'classnames';
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

import filterProps from '../filterProps';

import Input from '../Input';

import styles from './SearchSelect.less';

const INPUT_PASS_PROPS = {
  placeholder: true,
  width: true,
};

/**
 * DRAFT
 */
const SearchSelect = React.createClass({
  propTypes: {
    value: PropTypes.any,

    placeholder: PropTypes.string,

    source: PropTypes.func.isRequired,

    loader: PropTypes.shape({
      load: PropTypes.func,
    }),

    getValue: PropTypes.func,

    renderValue: PropTypes.func,

    renderItem: PropTypes.func,

    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    onChange: PropTypes.func,
  },

  getDefaultProps() {
    return {
      getValue,
      renderItem,
      renderValue,
      placeholder: 'Пусто',
      width: 250,
    };
  },

  getInitialState() {
    const value = this.props.value !== undefined ? this.props.value : null;
    this._initItem(value);

    return {
      opened: false,
      searchText: value,
      value,
      results: null,
      selected: -1,
    };
  },

  render() {
    let valueEl;
    if (this.state.opened) {
      valueEl = this.renderOpenedValue();
    } else {
      valueEl = this.renderClosedValue();
    }
    return (
      <label className={styles.root} style={{width: this.props.width}}>
        {valueEl}
        {this.state.opened && this.renderMenu()}
        <div className={styles.arrow} />
      </label>
    );
  },

  renderOpenedValue() {
    const inputProps = filterProps(this.props, INPUT_PASS_PROPS);
    return (
      <div className={styles.input}>
        <Input ref={this.refFocusable} {...inputProps}
          value={this.state.searchText} rightIcon={<span />}
          onChange={this.handleInputChange} onKeyDown={this.handleInputKey}
          onBlur={this.handleInputBlur}
        />
        <span className={styles.openArrow} onMouseDown={this.handleOpenClick} />
      </div>
    );
  },

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
      value = this.props.renderValue(this.state.value);
    }

    return (
      <div ref={this.refFocusable} className={styles.value}
        tabIndex="0" onClick={this.handleValueClick}
        onKeyDown={this.handleValueKey}
        onKeyPress={this.handleValueKeyPress}
      >
        {value}
        <span className={styles.openArrow} />
      </div>
    );
  },

  renderMenu() {
    const {results} = this.state;
    if (!results || results.length === 0) {
      return null;
    }
    return (
      <div className={styles.menuHolder}>
        <div className={styles.menu}>
          {results.map((item, i) => {
            const className = classNames({
              [styles.menuItem]: true,
              [styles.menuItemSelected]: this.state.selected === i,
            });
            return (
              <div key={i} className={className}
                onMouseDown={(e) => this.handleItemClick(item)}
                onMouseEnter={(e) => this.setState({selected: i})}
                onMouseLeave={(e) => this.setState({selected: -1})}
              >
                {this.props.renderItem(this.props.getValue(item), item)}
              </div>
            );
          })}
        </div>
      </div>
    );
  },

  componentWillReceiveProps(newProps) {
    if (newProps.value !== undefined) {
      this.setState({value: newProps.value});
      this._resetItem(newProps.value);
    }
  },

  refFocusable(el) {
    this.focusable_ = el && (el.focus ? el : ReactDOM.findDOMNode(el));
  },

  handleInputChange(event) {
    const pattern = event.target.value;
    this.setState({
      opened: true,
      searchText: pattern,
    });
    this._fetchList(pattern);
  },

  handleInputKey(event) {
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
        const item = this.state.results &&
          this.state.results[this.state.selected];
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
  },

  handleInputBlur() {
    const {searchText} = this.state;
    const item = this._findItemByValue(searchText);
    this.setState({opened: false});
    if (item) {
      this._change(item);
    } else {
      this.setState({searchText: this.state.value});
    }
  },

  handleOpenClick() {
    this.setState({opened: true});
    this._focus();
  },

  handleValueClick() {
    this.setState({
      opened: true,
      searchText: '',
      results: null,
    });
    this._focusAsync();
    this._fetchList('');
  },

  handleValueKeyPress(event) {
    // Set input value to empty string and then back to the real value to make
    // cursor appear at the and.
    const str = String.fromCharCode(event.charCode);
    this.setState(
      {
        opened: true,
        searchText: '',
      },
      () => {
        this.focusable_.focus();
      }
    );
  },

  handleValueKey(event) {
    switch (event.key) {
      case ' ':
      case 'Enter':
      case 'ArrowUp':
      case 'ArrowDown':
        event.preventDefault();
        this.setState({
          opened: true,
          searchText: '',
        }, () => {
          this._focus();
        });
        this._fetchList('');
        break;
    }
  },

  handleItemClick(item) {
    this._close();
    this._change(item);
    this._focusAsync();
  },

  _initItem(value) {
    if (value) {
      this._loadItem(value);
    }
  },

  _resetItem(value) {
    if (this.state.value === value) {
      return;
    }

    const item = this._findItemByValue(value);
    this.setState({item});
    if (!item && this.props.loader) {
      this._loadItem(value);
    }
  },

  _loadItem(value) {
    this.props.loader.load(value).then((item) => {
      if (value === this.state.value) {
        this.setState({item});
      }
    });
  },

  _fetchList(pattern) {
    this.props.source(pattern).then((results) => {
      if (this.state.searchText === pattern) {
        this.setState({
          selected: -1,
          results,
        });
      }
    });
  },

  _focus() {
    if (this.focusable_) {
      this.focusable_.focus();
    }
  },

  _focusAsync() {
    process.nextTick(this._focus);
  },

  _moveSelection(step) {
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
    this.setState({selected});
  },

  _change(item) {
    const value = this.props.getValue(item);
    if (this.props.value === undefined) {
      this.setState({value});
      this._resetItem(value);
    }
    if (this.props.onChange) {
      this.props.onChange({target: {value}});
    }
  },

  _close(callback) {
    this.setState({
      opened: false,
      results: null,
    }, callback);
  },

  _findItemByValue(value) {
    const {results} = this.state;
    return results && results.find(
      (item) => this.props.getValue(item) === value
    );
  },
});

function getValue(item) {
  return item;
}

function renderValue(value, item) {
  return item;
}

function renderItem(value, item) {
  return item;
}

module.exports = SearchSelect;
