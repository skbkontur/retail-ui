import events from 'add-event-listener';
import classNames from 'classnames';
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

import listenFocusOutside from '../../lib/listenFocusOutside';

import Input from '../Input';
import InputLikeText from '../internal/InputLikeText';
import ScrollContainer from '../ScrollContainer';

import styles from './SearchableSelect.less';

/**
 * DRAFT
 */
export default class SearchableSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      opened: false,
      selected: -1,
      searchText: '',
    };

    this._itemNodes = {};
    this._clearCloseListeners = null;
  }

  render() {
    let input = null;
    if (this.state.opened) {
      input = (
        <Input ref={this._refInput} value={this.state.searchText}
          onChange={this._handleSearch}
        />
      );
    } else {
      const entry = this._getValueEntry();
      const value = entry ? this.props.renderValue(...entry) :
        <span className={styles.placeholder}>{this.props.placeholder}</span>;
      input = (
        <InputLikeText ref={this._refInput}>
          <div>{value}</div>
        </InputLikeText>
      );
    }

    return (
      <label className={styles.root} style={{width: 250}} onClick={this._open}
        onKeyDown={this._handleKey}
      >
        {input}
        <div className={styles.arrow} />
        {this.state.opened && this._renderMenu()}
      </label>
    );
  }

  _renderMenu() {
    return (
      <div className={styles.menuHolder}>
        <div className={styles.menuContainer}>
          <ScrollContainer ref={this._refScrollContainer} maxHeight={120}>
            <div className={styles.menu}>
              {this._getItems().map((entry, i) => {
                const itemProps = {
                  key: i,
                  ref: (el) => this._refItem(el, i),
                  className: classNames({
                    [styles.menuItem]: true,
                    [styles.menuItemSelected]: this.state.selected === i,
                  }),
                  onMouseEnter: () => this._selectItem(i),
                  onMouseLeave: () => this._selectItem(-1),
                  onMouseDown: () => this._activateItem(i, true),
                };
                return (
                  <div {...itemProps}>{this.props.renderItem(...entry)}</div>
                );
              })}
            </div>
          </ScrollContainer>
        </div>
      </div>
    );
  }

  _refInput = (el) => {
    this._input = el;
  };

  _refScrollContainer = (el) => {
    this._scrollContainer = el;
  };

  _refItem = (el, index) => {
    if (el) {
      this._itemNodes[index] = el;
    } else {
      delete this._itemNodes[index];
    }
  };

  _handleKey = (event) => {
    if (this.state.opened) {
      let step = 0;
      switch (event.key) {
        case 'Escape':
          this._close(() => {
            this._input.focus();
          });
          break;

        case 'Enter':
          if (this._getItems()[this.state.selected]) {
            this._activateItem(this.state.selected);
          }
          break;

        case 'ArrowUp':
          step = -1;
          break;

        case 'ArrowDown':
          step = 1;
          break;
      }

      if (step) {
        const items = this._getItems();
        let selected = this.state.selected + step;
        if (selected < 0) {
          selected = items.length - 1;
        }
        if (selected >= items.length) {
          selected = 0;
        }
        this._selectItem(selected);
        this._scrollContainer.scrollTo(this._itemNodes[selected]);

        event.preventDefault();
      }
    } else {
      switch (event.key) {
        case 'ArrowUp':
        case 'ArrowDown':
        case ' ':
          this._open(() => {this._input.focus();});
          event.preventDefault();
          break;
      }
    }
  };

  _handleSearch = (event) => {
    this.setState({searchText: event.target.value});
  };

  _selectItem(index) {
    this.setState({selected: index});
  }

  _activateItem(index, asyncFocus = false) {
    if (this.props.onChange) {
      const value = this._getItems()[index][0];
      this.props.onChange({target: {value}}, value);
    }
    const doFocus = () => {this._input.focus();};
    this._close(!asyncFocus && doFocus);
    if (asyncFocus) {
      process.nextTick(doFocus);
    }
  }

  _open = (callback) => {
    if (this.state.opened) {
      return;
    }
    this.setState({opened: true, searchText: ''}, () => {
      const nodes = [ReactDOM.findDOMNode(this)];
      const docClickListener = (event) => {
        for (const node of nodes) {
          if (node.contains(event.target)) {
            return;
          }
        }
        this._close();
      };

      events.addEventListener(document, 'mousedown', docClickListener);
      const focusSubscribtion = listenFocusOutside(nodes, this._close);

      this._clearCloseListeners = () => {
        events.removeEventListener(document, 'mousedown', docClickListener);
        focusSubscribtion.remove();
      };

      if (typeof callback === 'function') {
        callback();
      }
    });
  };

  _close = (callback) => {
    if (!this.state.opened) {
      return;
    }
    this.setState({opened: false}, () => {
      this._clearCloseListeners();
      this._clearCloseListeners = null;
      if (callback) {
        callback();
      }
    });
  };

  _getItems() {
    const ret = [];
    for (let entry of this.props.items) {
      entry = normalizeEntry(entry);
      if (this.props.filterItem(entry[0], entry[1], this.state.searchText)) {
        ret.push(entry);
      }
    }
    return ret;
  }

  _getValueEntry() {
    for (const entry of this._getItems()) {
      if (entry[0] === this.props.value) {
        return entry;
      }
    }
    return null;
  }
}

function normalizeEntry(entry) {
  if (Array.isArray(entry)) {
    return entry;
  } else {
    return [entry, entry];
  }
}

SearchableSelect.propTypes = {
  value: PropTypes.any.isRequired,

  items: PropTypes.array.isRequired,

  placeholder: PropTypes.string,

  renderValue: PropTypes.func,

  renderItem: PropTypes.func,

  filterItem: PropTypes.func,
};

SearchableSelect.defaultProps = {
  placeholder: 'Начните вводить',

  renderValue(value, item) {
    return item;
  },

  renderItem(value, item) {
    return item;
  },

  filterItem(value, item, pattern) {
    if (typeof item !== 'string') {
      return true;
    }
    return item.toLowerCase().includes(pattern.toLowerCase());
  },
};
