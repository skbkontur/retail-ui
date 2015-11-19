import classNames from 'classnames';
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

import filterProps from '../filterProps';

import Input from 'ui/Input';

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

    disabled: PropTypes.bool,

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
      width: 250,
    };
  },

  getInitialState() {
    const value = this.props.value !== undefined ? this.props.value : '';
    this.initItem_(value);

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
    if (this.state.opened || !this.state.value) {
      valueEl = this.renderOpenedValue();
    } else {
      valueEl = this.renderClosedValue();
    }
    return (
      <span className={styles.root} style={{width: this.props.width}}>
        {valueEl}
        {this.state.opened && this.renderMenu()}
      </span>
    );
  },

  renderOpenedValue() {
    const inputProps = filterProps(this.props, INPUT_PASS_PROPS);
    return (
      <div className={styles.input}>
        <Input ref={this.refFocusable} {...inputProps}
          value={this.state.searchText} rightIcon={<span />}
          disabled={this.props.disabled}
          onChange={this.handleInputChange} onKeyDown={this.handleInputKey}
          onBlur={this.handleInputBlur}
        />
        <span className={styles.openArrow} onMouseDown={this.handleOpenClick} />
      </div>
    );
  },

  renderClosedValue() {
    let value;
    if (this.props.loader) {
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
      this.resetItem_(newProps.value);
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
    if (pattern) {
      this.props.source(pattern).then((results) => {
        if (this.state.searchText === pattern) {
          this.setState({
            selected: -1,
            results,
          });
        }
      });
    } else {
      this.setState({
        results: null,
      });
    }
  },

  handleInputKey(event) {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        this.moveSelection_(-1);
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.moveSelection_(1);
        break;
      case 'Enter':
        const item = this.state.results &&
          this.state.results[this.state.selected];
        if (item) {
          event.preventDefault();
          this.close_(() => {
            this.focus_();
          });
          this.change_(item);
        }
        break;
      case 'Escape':
        this.close_(() => {
          this.focus_();
        });
        break;
    }
  },

  handleInputBlur() {
    const {searchText} = this.state;
    const item = this.findItemByValue_(searchText);
    this.setState({opened: false});
    if (item) {
      this.change_(item);
    } else {
      this.setState({searchText: this.state.value});
    }
  },

  handleOpenClick() {
    this.setState({opened: true});
    this.focus_();
  },

  handleValueClick() {
    this.setState({
      opened: true,
      searchText: '',
      results: null,
    });
    this.focusAsync_();
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
          this.focus_();
        });
        break;
    }
  },

  handleItemClick(item) {
    this.close_();
    this.change_(item);
    this.focusAsync_();
  },

  initItem_(value) {
    if (value) {
      this.loadItem_(value);
    }
  },

  resetItem_(value) {
    if (this.state.value === value) {
      return;
    }

    const item = this.findItemByValue_(value);
    this.setState({item});
    if (!item && this.props.loader) {
      this.loadItem_(value);
    }
  },

  loadItem_(value) {
    this.props.loader.load(value).then((item) => {
      if (value === this.state.value) {
        this.setState({item});
      }
    });
  },

  focus_() {
    if (this.focusable_) {
      this.focusable_.focus();
    }
  },

  focusAsync_() {
    process.nextTick(this.focus_);
  },

  moveSelection_(step) {
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

  change_(item) {
    const value = this.props.getValue(item);
    if (this.props.value === undefined) {
      this.setState({value});
      this.resetItem_(value);
    }
    if (this.props.onChange) {
      this.props.onChange({target: {value}});
    }
  },

  close_(callback) {
    this.setState({
      opened: false,
      results: null,
    }, callback);
  },

  findItemByValue_(value) {
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
