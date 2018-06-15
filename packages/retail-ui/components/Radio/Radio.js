
import classNames from 'classnames';
import * as React from 'react';

import PropTypes from 'prop-types';

import '../ensureOldIEClassName';
import Upgrades from '../../lib/Upgrades';

const isFlatDesign = Upgrades.isFlatDesignEnabled();

const styles = isFlatDesign
  ? require('./Radio.flat.less')
  : require('./Radio.less');

type Primitive = number | string;

export type SyntheticRadioEvent<T> = {
  target: {
    id: ?string,
    name: ?string,
    checked: ?boolean,
    disabled: ?boolean,
    value: T
  }
};

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
  onChange?: (event: SyntheticRadioEvent<T>, value: T) => mixed,
  onMouseEnter?: (event: SyntheticRadioEvent<T>) => void,
  onMouseLeave?: (event: SyntheticRadioEvent<T>) => void,
  onMouseOver?: (event: SyntheticRadioEvent<T>) => void
};

/**
 * Радиокнопка.
 *
 * Если находится внутри компонента **RadioGroup**, то наследует
 * параметры `checked`, `name` и `onChange`. Также наследует состояния
 * `disabled`, `error` и `warning`
 *
 * ```js
 * type SyntheticRadioEvent<T> = {
   target: {
     id: ?string,
     name: ?string,
     checked: ?boolean,
     disabled: ?boolean,
     value: T
   }
 };
 * ```
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

  static propTypes = {
    checked: PropTypes.bool,
    children: PropTypes.node,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    focused: PropTypes.bool,
    hovered: PropTypes.bool,
    id: PropTypes.string,
    name: PropTypes.string,
    pressed: PropTypes.bool,
    tabIndex: PropTypes.number,
    value: PropTypes.any.isRequired,
    warning: PropTypes.bool,
    onChange: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseOver: PropTypes.func
  };

  _node: ?HTMLInputElement = null;
  _isInRadioGroup = () => Boolean(this.context.name);

  /**
   * @public
   **/
  focus() {
    this._node && this._node.focus();
  }

  /**
   * @public
   **/
  blur() {
    this._node && this._node.blur();
  }

  render() {
    const disabled = this.props.disabled || this.context.disabled;
    const warning = this.props.warning || this.context.warning;
    const error = this.props.error || this.context.error;

    let radioClassNames = classNames({
      [styles.radio]: true,
      [styles.checked]: this.props.checked,
      [styles.focus]: this.props.focused,
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

    const labelProps = {
      className: styles.root,
      onMouseOver: this._handleMouseOver,
      onMouseEnter: this._handleMouseEnter,
      onMouseLeave: this._handleMouseLeave
    };

    if (this._isInRadioGroup()) {
      const checked = this.props.value === this.context.activeItem;
      inputProps.checked = checked;
      inputProps.name = this.context.name;
      radioClassNames = classNames(radioClassNames, checked && styles.checked);
    }

    return (
      <label {...labelProps}>
        <input {...inputProps} />
        <span className={radioClassNames}>
          <span className={styles.placeholder} />
        </span>
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
    event = createSyntheticEvent(this.props);
    if (this.props.onChange) {
      this.props.onChange(event, event.target.value);
    }
    if (this._isInRadioGroup()) {
      this.context.onSelect(event, event.target.value);
    }
  };

  _handleMouseOver = event => {
    event = createSyntheticEvent(this.props);
    if (this.props.onMouseOver) {
      this.props.onMouseOver(event);
    }
  };

  _handleMouseEnter = event => {
    event = createSyntheticEvent(this.props);
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(event);
    }
  };

  _handleMouseLeave = event => {
    event = createSyntheticEvent(this.props);
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(event);
    }
  };
}

function createSyntheticEvent<T>({
  value,
  id,
  name,
  checked,
  disabled
}: Props<T>): SyntheticRadioEvent<T> {
  const target = {
    value,
    id,
    name,
    checked,
    disabled
  };
  const syntheticEvent = {
    target
  };
  return syntheticEvent;
}

export default Radio;
