// @flow
import * as React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import invariant from 'invariant';
import uuidv1 from 'uuid/v1';

import Radio from '../Radio';

import styles from './RadioGroup.less';

type Props = {
  disabled?: boolean,
  error?: boolean,
  inline?: boolean,
  items?: Array<string | [string, mixed]>,
  name?: string,
  value?: string,
  defaultValue?: string,
  warning?: boolean,
  width?: number | string,
  children?: React.Node,
  renderItem: (value: string, data: mixed) => React.Node,
  onChange?: (
    event: SyntheticInputEvent<HTMLInputElement>,
    value: string
  ) => void,
  onMouseEnter?: (e: SyntheticMouseEvent<>) => void,
  onMouseLeave?: (e: SyntheticMouseEvent<>) => void,
  onMouseOver?: (e: SyntheticMouseEvent<>) => void
};

type State = {
  activeItem: ?string
};

class RadioGroup extends React.Component<Props, State> {
  static childContextTypes = {
    error: PropTypes.bool,
    name: PropTypes.string,
    warning: PropTypes.bool,
    disabled: PropTypes.bool,
    activeItem: PropTypes.any,
    onSelect: PropTypes.func
  };

  static defaultProps = {
    renderItem
  };

  _name: string = uuidv1();
  _node: ?HTMLElement = null;

  state = {
    activeItem: this.props.defaultValue
  };

  getChildContext() {
    return {
      activeItem: this._getValue(),
      onSelect: this._handleSelect,
      name: this._getName(),
      disabled: this.props.disabled,
      error: this.props.error,
      warning: this.props.warning
    };
  }

  /**
   * @api
   **/
  focus() {
    const node = this._node;
    if (!node) {
      return;
    }

    let radio = node.querySelector('input[type="radio"]:checked');

    // If no checked radios, try get first radio
    if (!radio || radio.disabled) {
      radio = node.querySelector('input[type="radio"]');
    }
    radio && radio.focus();
  }

  _getValue = () =>
    this._isControlled() ? this.props.value : this.state.activeItem;

  _getName = () => this.props.name || this._name;

  _isControlled = () => this.props.value != null;

  _handleSelect = (event: *, value: string) => {
    if (!this._isControlled()) {
      this.setState({ activeItem: value });
    }
    if (this.props.onChange) {
      this.props.onChange(event, value);
    }
  };

  render() {
    const { width, onMouseLeave, onMouseOver, onMouseEnter } = this.props;
    const style = {
      width: width != null ? width : 'auto'
    };
    const handlers = {
      onMouseOver,
      onMouseEnter,
      onMouseLeave
    };
    return (
      <span ref={this._ref} style={style} className={styles.root} {...handlers}>
        {this._renderChildren()}
      </span>
    );
  }

  _renderChildren() {
    const { items, children } = this.props;
    invariant(
      !items || !children,
      'Either items or children must be passed, not both'
    );
    return items ? mapItems(this._renderRadio, items) : children;
  }

  _renderRadio = (itemValue: string, data: mixed, i: number) => {
    const itemProps = {
      key: itemValue.toString(),
      className: classNames({
        [styles.item]: true,
        [styles.itemFirst]: i === 0,
        [styles.itemInline]: this.props.inline
      })
    };

    return (
      <span {...itemProps}>
        <Radio value={itemValue}>
          {this.props.renderItem(itemValue, data)}
        </Radio>
      </span>
    );
  };

  _ref = el => {
    this._node = el;
  };
}

export default RadioGroup;

function renderItem(value, data) {
  return data;
}

function mapItems(fn, items) {
  const result = [];
  let index = 0;
  for (const entry of items) {
    const [value, data] = normalizeEntry(entry);
    result.push(fn(value, data, index));
    ++index;
  }
  return result;
}

function normalizeEntry(entry) {
  if (!Array.isArray(entry)) {
    return [entry, entry];
  }
  return entry;
}
