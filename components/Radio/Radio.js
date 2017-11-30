// @flow
import classNames from 'classnames';
import * as React from 'react';

import PropTypes from 'prop-types';

import '../ensureOldIEClassName';

import styles from './Radio.less';

type Primitive = number | string;

type Props<T> = {
  id?: string,
  name?: string,
  tabIndex?: number,
  checked?: boolean,
  disabled?: boolean,
  error?: boolean,
  focused?: boolean,
  hovered?: boolean,
  pressed?: boolean,
  warning?: boolean,
  children?: React.Node,
  value: T,
  onChange?: (event: SyntheticInputEvent<HTMLInputElement>, value: T) => mixed,
  onMouseEnter?: (e: SyntheticMouseEvent<>) => void,
  onMouseLeave?: (e: SyntheticMouseEvent<>) => void,
  onMouseOver?: (e: SyntheticMouseEvent<>) => void
};

/**
 * Индикатор для радио-кнопок. Используется в RadioGroup. Может быть
 * использована для кастомных радио-кнопок.
 */
class Radio<T: Primitive> extends React.Component<Props<T>> {
  static contextTypes = {
    activeItem: PropTypes.any,
    onSelect: PropTypes.func,
    name: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    warning: PropTypes.bool
  };

  static defaultProps = {
    focused: false
  };

  static PropTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    tabIndex: PropTypes.number,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    focused: PropTypes.bool,
    hovered: PropTypes.bool,
    pressed: PropTypes.bool,
    warning: PropTypes.bool,
    children: PropTypes.node,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseOver: PropTypes.func
  };

  _node: ?HTMLInputElement = null;
  _isInRadioGroup = () => Boolean(this.context.name);

  /**
   * @api
   **/
  focus() {
    this._node && this._node.focus();
  }

  /**
   * @api
   **/
  blur() {
    this._node && this._node.blur();
  }

  render() {
    const disabled = this.props.disabled || this.context.disabled;
    const warning = this.props.warning || this.context.warning;
    const error = this.props.error || this.context.error;

    const radioClassNames = classNames({
      [styles.radio]: true,
      [styles.withLabel]: this.props.children,
      [styles.checked]: this.props.checked,
      [styles.focus]: this.props.focused,
      [styles.hovered]: this.props.hovered,
      [styles.pressed]: this.props.pressed,
      [styles.error]: error,
      [styles.warning]: warning,
      [styles.disabled]: disabled
    });

    const inputProps = {
      type: 'radio',
      className: styles.input,
      id: this.props.id,
      name: this.props.name,
      checked: this.props.checked,
      disabled,
      tabIndex: this.props.tabIndex,
      value: this.props.value,
      ref: this._ref,
      onChange: this._handleChange,
      onMouseOver: this.props.onMouseOver,
      onMouseEnter: this.props.onMouseEnter,
      onMouseLeave: this.props.onMouseLeave
    };

    if (this._isInRadioGroup) {
      const checked = this.props.value === this.context.activeItem;
      inputProps.checked = checked;
      inputProps.name = this.context.name;
    }

    return (
      <label className={styles.root}>
        <input {...inputProps} />
        <span className={radioClassNames} />
        {this.props.children && this.renderLabel()}
      </label>
    );
  }

  renderLabel() {
    const labelClassNames = classNames({
      [styles.label]: true,
      [styles.labelDisabled]: this.props.disabled
    });

    return <div className={labelClassNames}>{this.props.children}</div>;
  }

  _ref = el => {
    this._node = el;
  };

  _handleChange = event => {
    if (this.props.onChange) {
      this.props.onChange(event, event.target.value);
    }
    if (this._isInRadioGroup) {
      this.context.onSelect(event, event.target.value);
    }
  };
}

export default Radio;
