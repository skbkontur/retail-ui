import classNames from 'classnames';
import * as React from 'react';

import * as PropTypes from 'prop-types';

import '../ensureOldIEClassName';
import Upgrades from '../../lib/Upgrades';
import { Nullable } from '../../typings/utility-types';

const isFlatDesign = Upgrades.isFlatDesignEnabled();

const styles = isFlatDesign
  ? require('./Radio.flat.less')
  : require('./Radio.less');

export interface SyntheticRadioEvent<T> {
  target: {
    id: Nullable<string>;
    name: Nullable<string>;
    checked: Nullable<boolean>;
    disabled: Nullable<boolean>;
    value: T;
  };
}

export interface RadioProps<T> {
  id?: string;
  name?: string;
  tabIndex?: number;
  checked?: boolean;
  disabled?: boolean;
  error?: boolean;
  focused?: boolean;
  hovered?: boolean;
  pressed?: boolean;
  warning?: boolean;
  children?: React.ReactNode;
  value: T;
  onChange?: (event: SyntheticRadioEvent<T>, value: T) => void;
  onMouseEnter?: (event: SyntheticRadioEvent<T>) => void;
  onMouseLeave?: (event: SyntheticRadioEvent<T>) => void;
  onMouseOver?: (event: SyntheticRadioEvent<T>) => void;
}

/**
 * Радиокнопка.
 *
 * Если находится внутри компонента **RadioGroup**, то наследует
 * параметры `checked`, `name` и `onChange`. Также наследует состояния
 * `disabled`, `error` и `warning`
 *
 * ```js
 * type SyntheticRadioEvent<T> = {
 * target: {
 *    id: ?string,
 *    name: ?string,
 *    checked: ?boolean,
 *    disabled: ?boolean,
 *    value: T
 *  }
 * };
 * ```
 */
class Radio<T> extends React.Component<RadioProps<T>> {
  public static contextTypes = {
    activeItem: PropTypes.any,
    onSelect: PropTypes.func,
    name: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    warning: PropTypes.bool
  };

  public static defaultProps = {
    focused: false
  };

  public static propTypes = {
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

  private _node: Nullable<HTMLInputElement> = null;

  public render() {
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

    let value: string | number | undefined;
    if (
      typeof this.props.value === 'string' ||
      typeof this.props.value === 'number'
    ) {
      value = this.props.value;
    }

    const inputProps = {
      type: 'radio',
      className: styles.input,
      id: this.props.id,
      name: this.props.name,
      checked: this.props.checked,
      disabled,
      tabIndex: this.props.tabIndex,
      value,
      ref: this._ref,
      onChange: this._handleChange,
      onMouseOver: () => {
        if (this.props.onMouseOver) {
          this.props.onMouseOver(createSyntheticEvent(this.props));
        }
      },
      onMouseEnter: () => {
        if (this.props.onMouseEnter) {
          this.props.onMouseEnter(createSyntheticEvent(this.props));
        }
      },
      onMouseLeave: () => {
        if (this.props.onMouseLeave) {
          this.props.onMouseLeave(createSyntheticEvent(this.props));
        }
      }
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

  public focus() {
    if (this._node) {
      this._node.focus();
    }
  }

  public blur() {
    if (this._node) {
      this._node.blur();
    }
  }

  private _isInRadioGroup = () => Boolean(this.context.name);

  private renderLabel() {
    const labelClassNames = classNames({
      [styles.label]: true,
      [styles.labelDisabled]: this.props.disabled
    });

    return <div className={labelClassNames}>{this.props.children}</div>;
  }

  private _ref = (element: HTMLInputElement) => {
    this._node = element;
  };

  private _handleChange = () => {
    const event = createSyntheticEvent(this.props);
    if (this.props.onChange) {
      this.props.onChange(event, event.target.value);
    }
    if (this._isInRadioGroup()) {
      this.context.onSelect(event, event.target.value);
    }
  };

  private _handleMouseOver = () => {
    const event = createSyntheticEvent(this.props);
    if (this.props.onMouseOver) {
      this.props.onMouseOver(event);
    }
  };

  private _handleMouseEnter = () => {
    const event = createSyntheticEvent(this.props);
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(event);
    }
  };

  private _handleMouseLeave = () => {
    const event = createSyntheticEvent(this.props);
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
}: RadioProps<T>): SyntheticRadioEvent<T> {
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
