import React from 'react';
import PropTypes from 'prop-types';

import { Nullable, Override } from '../../typings/utility-types';
import { cx } from '../../lib/theming/Emotion';
import { ThemeConsumer } from '../ThemeConsumer';
import { Theme } from '../../lib/theming/Theme';

import { jsStyles } from './Radio.styles';
import styles from './Radio.module.less';

export type RadioProps<T> = Override<
  React.InputHTMLAttributes<HTMLInputElement>,
  {
    /** Состояние ошибки */
    error?: boolean;
    /** Состояние Предупреждения */
    warning?: boolean;
    /** Состояние фокуса */
    focused?: boolean;
    /** Состояние нажатия */
    pressed?: boolean;
    /** Состояние hover */
    hovered?: boolean;
    /** Состояние active */
    active?: boolean;
    /** Вызывается при изменении `value` */
    onValueChange?: (value: T) => void;
    /** onChange */
    onMouseEnter?: React.MouseEventHandler<HTMLLabelElement>;
    /** onChange */
    onMouseLeave?: React.MouseEventHandler<HTMLLabelElement>;
    /** onChange */
    onMouseOver?: React.MouseEventHandler<HTMLLabelElement>;
    /** Значение */
    value: T;
  }
>;

export class Radio<T> extends React.Component<RadioProps<T>> {
  public static __KONTUR_REACT_UI__ = 'Radio';

  public static contextTypes = {
    activeItem: PropTypes.any,
    onSelect: PropTypes.func,
    name: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    warning: PropTypes.bool,
  };

  public static defaultProps = {
    focused: false,
  };

  private theme!: Theme;
  private _node: Nullable<HTMLInputElement> = null;

  public render() {
    return (
      <ThemeConsumer>
        {theme => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeConsumer>
    );
  }

  /**
   * @public
   */
  public focus() {
    if (this._node) {
      this._node.focus();
    }
  }

  /**
   * @public
   */
  public blur() {
    if (this._node) {
      this._node.blur();
    }
  }

  private renderMain() {
    const {
      active,
      children,
      disabled = this.context.disabled,
      warning = this.context.warning,
      error = this.context.error,
      focused,
      pressed,
      hovered,
      onMouseOver,
      onMouseEnter,
      onMouseLeave,
      onValueChange,

      className,
      style,

      ...rest
    } = this.props;

    let radioClassNames = cx({
      [styles.radio]: true,
      [jsStyles.radio(this.theme)]: true,
      [styles.checked]: this.props.checked,
      [jsStyles.checked(this.theme)]: this.props.checked,
      [styles.focus]: this.props.focused,
      [jsStyles.focus(this.theme)]: this.props.focused,
      [styles.error]: error,
      [jsStyles.error(this.theme)]: error,
      [styles.warning]: warning,
      [jsStyles.warning(this.theme)]: warning,
      [styles.disabled]: disabled,
      [jsStyles.disabled(this.theme)]: disabled,
    });

    let value: string | number | undefined;
    if (typeof this.props.value === 'string' || typeof this.props.value === 'number') {
      value = this.props.value;
    }

    const inputProps = {
      ...rest,
      type: 'radio',
      className: styles.input,
      disabled,
      tabIndex: this.props.tabIndex,
      value,
      ref: this.ref,
      onChange: this.handleChange,
    };

    const labelProps = {
      className: styles.root,
      onMouseOver: this.handleMouseOver,
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
    };

    if (this._isInRadioGroup()) {
      const checked = this.props.value === this.context.activeItem;
      inputProps.checked = checked;
      inputProps.name = this.context.name;
      radioClassNames = cx(radioClassNames, checked && cx(styles.checked, jsStyles.checked(this.theme)));
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

  private _isInRadioGroup = () => Boolean(this.context.name);

  private renderLabel() {
    const labelClassNames = cx({
      [styles.label]: true,
      [jsStyles.label(this.theme)]: true,
      [styles.labelDisabled]: !!(this.props.disabled || this.context.disabled),
    });

    return <div className={labelClassNames}>{this.props.children}</div>;
  }

  private ref = (element: HTMLInputElement) => {
    this._node = element;
  };

  private handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    if (this.props.onValueChange) {
      this.props.onValueChange(this.props.value);
    }
    if (this.props.onChange) {
      this.props.onChange(e);
    }
    if (this._isInRadioGroup()) {
      this.context.onSelect(this.props.value);
    }
  };

  private handleMouseOver: React.MouseEventHandler<HTMLLabelElement> = e => {
    if (this.props.onMouseOver) {
      this.props.onMouseOver(e);
    }
  };

  private handleMouseEnter: React.MouseEventHandler<HTMLLabelElement> = e => {
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(e);
    }
  };

  private handleMouseLeave: React.MouseEventHandler<HTMLLabelElement> = e => {
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(e);
    }
  };
}
