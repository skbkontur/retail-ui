// @flow

import classNames from 'classnames';
import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

import Input from '../Input';
import type { Props as InputProps } from '../Input/Input';
import DropdownContainer from '../DropdownContainer/DropdownContainer';

import styles from './Autocomplete.less';

type Props = InputProps & {
  renderItem: any,
  source: any,
};

type State = {
  items: ?Array<any>,
  selected: number,
};

/**
 * Стандартный инпут с подсказками.
 *
 * Все свойства передаются во внутренний *Input*.
 */
export default class Autocomplete extends React.Component {
  static propTypes = {
    /**
     * Функция для отрисовки элемента в выпадающем списке. Единственный аргумент
     * — *item*.
     */
    renderItem: PropTypes.func,

    /**
     * Если передан массив, то совпадения ищутся по этому массиву.
     *
     * Если передается функция, то она должна возвращать thenable, который
     * резолвится уже отфильтрованным массивом. Возвращенный thenable может
     * иметь метод cancel, который будет вызван при отмене поиска (пользователь
     * изменил строку поиска, автокомплит потерял фокус).
     * ```
     * function(pattern) {
     *   return service.findAll(pattern);
     * }
     * ```
     */
    source: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.func
    ])
  };

  static defaultProps = {
    renderItem,
    size: 'small'
  };

  props: Props;
  state: State = {
    items: null,
    selected: -1
  };
  _opened: bool = false;
  _input: Input = null;

  render() {
    var inputProps = {
      onChange: this.handleChange,
      onBlur: this.handleBlur,
      onKeyDown: this.handleKey,
      onMouseEnter: this.props.onMouseEnter,
      onMouseLeave: this.props.onMouseLeave,
      onMouseOver: this.props.onMouseOver,
      ref: this._refInput,
    };
    return (
      <span className={styles.root}>
        <Input {...this.props} {...inputProps} />
        {this.renderMenu()}
      </span>
    );
  }

  renderMenu() {
    var items = this.state.items;
    if (!items || items.length === 0) {
      return null;
    }

    return (
      <DropdownContainer offsetY={1} getParent={() => findDOMNode(this)}>
        <div className={styles.menu}>
          {items.map((item, i) => {
            const rootClass = classNames({
              [styles.item]: true,
              [styles.itemHover]: this.state.selected === i,
              [styles.itemPadLeft]: this.props.leftIcon
            });
            return (
              <div key={i} className={rootClass}
                onMouseDown={(e) => this.handleItemClick(e, i)}
                onMouseEnter={(e) => this.setState({ selected: i })}
                onMouseLeave={(e) => this.setState({ selected: -1 })}
              >
                {this.props.renderItem(item)}
              </div>
            );
          })}
        </div>
      </DropdownContainer>
    );
  }

  componentWillReceiveProps(props: Props) {
    this.updateItems(props.value);
  }

  handleChange = (event: any) => {
    this._opened = true;

    const value: string = event.target.value;

    this.updateItems(value);

    this._fireChange(value);
  };

  handleBlur = (event: SyntheticFocusEvent) => {
    this._opened = false;
    this.setState({ items: null });

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  handleKey = (event: SyntheticKeyboardEvent) => {
    var items = this.state.items;
    var stop = false;
    if ((event.key === 'ArrowUp' || event.key === 'ArrowDown') && items) {
      event.preventDefault();
      stop = true;

      const step = event.key === 'ArrowUp' ? -1 : 1;
      let selected = this.state.selected + step;
      if (selected >= items.length) {
        selected = -1;
      } else if (selected < -1) {
        selected = items.length - 1;
      }
      this.setState({ selected });
    } else if (event.key === 'Enter') {
      if (items && items[this.state.selected]) {
        event.preventDefault();
        stop = true;

        this._choose(this.state.selected);
      } else {
        this._opened = false;
        this.setState({ items: null });
      }
    } else if (event.key === 'Escape' && items && items.length) {
      event.preventDefault(); // Escape clears the input on IE.
      stop = true;

      this._opened = false;
      this.setState({ items: null });
    }

    if (!stop && this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
  };

  handleItemClick(event: SyntheticMouseEvent, index: number) {
    if (event.button !== 0) {
      return;
    }

    event.preventDefault();
    this._choose(index);
  }

  _choose(index: number) {
    if (!this.state.items) {
      return;
    }

    const value = this.state.items[index];

    this._opened = false;
    this.setState({
      selected: -1,
      items: null
    });

    this._fireChange(value);
  }

  updateItems(value: string) {
    if (!this._opened) {
      return;
    }

    const pattern = value.trim();
    const source = this.props.source;
    let promise;
    if (typeof source === 'function') {
      promise = source(pattern);
    } else {
      promise = match(pattern, source);
    }
    promise.then((items) => {
      if (this.props.value === value && this._opened) {
        this.setState({
          items,
          selected: -1
        });
      }
    });
  }

  _fireChange(value: string) {
    if (this.props.onChange) {
      this.props.onChange({ target: { value } }, value);
    }
  }

  focus() {
    if (this._input) {
      this._input.focus();
    }
  }

  _refInput = (el) => {
    this._input = el;
  };
}

function match(pattern, items) {
  if (!pattern || !items) {
    return Promise.resolve(null);
  }

  pattern = pattern.toLowerCase();
  const filteredItems = items.filter(
    item => item.toLowerCase().includes(pattern)
  );
  return Promise.resolve(filteredItems);
}

function renderItem(item) {
  return item;
}
