import React from 'react';
import PropTypes from 'prop-types';

import { Override } from '../../typings/utility-types';
import { theme } from '../../lib/theming/decorators';
import { Theme } from '../../lib/theming/Theme';
import { CommonWrapper, CommonProps, CommonWrapperRestProps } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';

import { styles, globalClasses } from './Radio.styles';

export interface RadioProps<T>
  extends CommonProps,
    Override<
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
        onMouseEnter?: React.MouseEventHandler<HTMLLabelElement>;
        onMouseLeave?: React.MouseEventHandler<HTMLLabelElement>;
        onMouseOver?: React.MouseEventHandler<HTMLLabelElement>;
        /** Значение */
        value: T;
      }
    > {}

@theme
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

  private readonly theme!: Theme;
  private inputEl = React.createRef<HTMLInputElement>();

  public render() {
    return <CommonWrapper {...this.props}>{this.renderMain}</CommonWrapper>;
  }

  /**
   * @public
   */
  public focus() {
    this.inputEl.current?.focus();
  }

  /**
   * @public
   */
  public blur() {
    this.inputEl.current?.blur();
  }

  public renderMain = (props: CommonWrapperRestProps<RadioProps<T>>) => {
    const {
      active,
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
      ...rest
    } = props;

    const radioProps = {
      className: cx({
        [styles.radio(this.theme)]: true,
        [styles.checked(this.theme)]: this.props.checked,
        [styles.focus(this.theme)]: this.props.focused,
        [styles.error(this.theme)]: error,
        [styles.warning(this.theme)]: warning,
        [styles.disabled(this.theme)]: disabled,
        [styles.checkedDisabled(this.theme)]: this.props.checked && disabled,
        [globalClasses.radio]: true,
      }),
    };

    let value: string | number | undefined;
    if (typeof this.props.value === 'string' || typeof this.props.value === 'number') {
      value = this.props.value;
    }

    const inputProps = {
      ...rest,
      type: 'radio',
      className: styles.input(this.theme),
      disabled,
      tabIndex: this.props.tabIndex,
      value,
      ref: this.inputEl,
      onChange: this.handleChange,
    };

    const labelProps = {
      className: cx(styles.root(this.theme), this.props.checked && styles.rootChecked(this.theme)),
      onMouseOver: this.handleMouseOver,
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
    };

    if (this._isInRadioGroup()) {
      const checked = this.props.value === this.context.activeItem;
      inputProps.checked = checked;
      inputProps.name = this.context.name;
      inputProps.suppressHydrationWarning = true;
      radioProps.className = cx(radioProps.className, {
        [styles.checked(this.theme)]: checked,
        [styles.checkedDisabled(this.theme)]: checked && disabled,
      });
    }

    return (
      <label {...labelProps}>
        <input {...inputProps} />
        <span {...radioProps}>
          <span className={styles.placeholder()} />
        </span>
        {this.props.children && this.renderLabel()}
      </label>
    );
  };

  private _isInRadioGroup = () => Boolean(this.context.name);

  private renderLabel() {
    const labelClassNames = cx({
      [styles.label(this.theme)]: true,
      [styles.labelDisabled()]: !!(this.props.disabled || this.context.disabled),
    });

    return <div className={labelClassNames}>{this.props.children}</div>;
  }

  private handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    this.props.onValueChange?.(this.props.value);

    if (this._isInRadioGroup()) {
      this.context.onSelect(this.props.value);
    }

    this.props.onChange?.(e);
  };

  private handleMouseOver: React.MouseEventHandler<HTMLLabelElement> = (e) => {
    this.props.onMouseOver?.(e);
  };

  private handleMouseEnter: React.MouseEventHandler<HTMLLabelElement> = (e) => {
    this.props.onMouseEnter?.(e);
  };

  private handleMouseLeave: React.MouseEventHandler<HTMLLabelElement> = (e) => {
    this.props.onMouseLeave?.(e);
  };
}
