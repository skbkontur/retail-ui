const classNames = require('classnames');
import React, {PropTypes} from 'react';

const filterProps = require('../filterProps');
const Fetcher = require('./Fetcher');

const Input = require('ui/Input');

const styles = require('./SearchSelect.less');

const INPUT_PASS_PROPS = {
  placeholder: true,
  width: true,
};

/**
 * DRAFT
 */
const SearchSelect = React.createClass({
  statics: {
    createFetcher(fetchFunc) {
      return new Fetcher(fetchFunc);
    },
  },

  propTypes: {
    value: PropTypes.string,

    placeholder: PropTypes.string,

    source: PropTypes.func,

    fetcher: PropTypes.shape({
      fetch: PropTypes.func,
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
      width: 250,
    };
  },

  getInitialState() {
    const value = this.props.value !== undefined ? this.props.value : '';
    this.initItem_(value);

    return {
      opened: false,
      searchText: value,
      value: value,
      results: null,
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
            onChange={this.handleInputChange} onKeyDown={this.handleInputKey}
            onBlur={this.handleInputBlur} />
        <span className={styles.openArrow} onMouseDown={this.handleOpenClick} />
      </div>
    );
  },

  renderClosedValue() {
    let value;
    if (this.props.fetcher) {
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
          onKeyDown={this.handleValueKey}>
        {value}
        <span className={styles.openArrow} />
      </div>
    );
  },

  renderMenu() {
    const {results} = this.state;
    return (
      <div className={styles.menuHolder}>
        <div className={styles.menu}>
          {results && results.map((item, i) => {
            const className = classNames({
              [styles.menuItem]: true,
              [styles.menuItemSelected]: this.state.selected === i,
            });
            return (
              <div key={i} className={className}
                  onMouseDown={e => this.handleItemClick(item)}
                  onMouseEnter={e => this.setState({selected: i})}
                  onMouseLeave={e => this.setState({selected: -1})}>
                {this.props.renderItem(item)}
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
    this.focusable_ = el && (el.focus ? el : React.findDOMNode(el));
  },

  handleInputChange(event) {
    const pattern = event.target.value;
    this.setState({
      opened: true,
      searchText: pattern,
    });
    this.props.source(pattern).then(results => {
      if (this.state.searchText === pattern) {
        this.setState({
          selected: -1,
          results,
        });
      }
    });
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
          this.setState({opened: false});
          this.change_(item);
          this.focus_();
        }
        break;
    }
  },

  handleInputBlur() {
    let value = null;
    const {getValue} = this.props;
    const {searchText, results} = this.state;
    const item = this.findItemByValue_(searchText);;
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
    this.setState({opened: true});
    this.focus_();
  },

  handleValueKey(event) {
    switch (event.key) {
      case ' ':
      case 'ArrowUp':
      case 'ArrowDown':
        event.preventDefault();
        this.setState({opened: true});
        this.focus_();
        break;
    }
  },

  handleItemClick(item) {
    const value = this.props.getValue(item);
    this.setState({
      searchText: value,
      opened: false,
    });
    this.change_(item);
    this.focus_();
  },

  initItem_(value) {
    if (value) {
      this.fetchItem_(value);
    }
  },

  resetItem_(value) {
    if (this.state.value === value) return;

    const item = this.findItemByValue_(value);
    this.setState({item});
    if (!item && this.props.fetcher) {
      this.fetchItem_(value);
    }
  },

  fetchItem_(value) {
    this.props.fetcher.fetch(value).then(item => {
      if (value === this.state.value) {
        this.setState({item});
      }
    });
  },

  focus_() {
    setTimeout(() => {
      if (this.focusable_) {
        this.focusable_.focus();
      }
    }, 0);
  },

  moveSelection_(step) {
    if (!this.state.results) return;

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

  findItemByValue_(value) {
    const {results} = this.state;
    return results && results.find(item => this.props.getValue(item) == value);
  },
});

function getValue(item) {
  return item;
}

function renderItem(item) {
  return item;
}

module.exports = SearchSelect;
