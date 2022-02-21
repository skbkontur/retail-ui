import React from 'react';

import { Override } from '../../typings/utility-types';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { CommonWrapper, CommonProps, CommonWrapperRestProps } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { keyListener } from '../../lib/events/keyListener';
import { rootNode, TSetRootNode } from '../../lib/rootNode';
import { fixFirefoxModifiedClickOnLabel } from '../../lib/events/fixFirefoxModifiedClickOnLabel';
import { RadioGroupContext, RadioGroupContextType } from '../RadioGroup/RadioGroupContext';

import { styles, globalClasses } from './Radio.styles';

type RadioInterface<T> = {
  /**
   *  Cостояние валидации при ошибке.
   */
  error?: boolean;
  /**
   * Cостояние валидации при предупреждении.
   */
  warning?: boolean;
  /**
   * Функция, вызываемая при изменении `value`.
   */
  onValueChange?: (value: T) => void;
  /**
   * HTML-событие `onmouseenter`
   */
  onMouseEnter?: React.MouseEventHandler<HTMLLabelElement>;
  /**
   * HTML-событие `mouseleave`
   */
  onMouseLeave?: React.MouseEventHandler<HTMLLabelElement>;
  /**
   * HTML-событие `onmouseover`
   */
  onMouseOver?: React.MouseEventHandler<HTMLLabelElement>;
  /**
   * HTML-атрибут `value`.
   */
  value: T;
};

export type RadioProps<T> = Override<React.InputHTMLAttributes<HTMLInputElement>, RadioInterface<T>> &
  CommonProps &
  Partial<DefaultProps>;

export type RadioState = {
  focusedByKeyboard: boolean;
};

type DefaultProps = {
  /**
   * Состояние фокуса.
   */
  focused: boolean;
};

type RadioComponentProps<T> = RadioProps<T> & DefaultProps;

/**
 * Радио-кнопки используются, когда может быть выбран только один вариант из нескольких.
 */
@rootNode
export class Radio<T> extends React.Component<RadioComponentProps<T>, RadioState> {
  public static __KONTUR_REACT_UI__ = 'Radio';

  public state = {
    focusedByKeyboard: false,
  };

  public static defaultProps: DefaultProps = {
    focused: false,
  };

  public static contextType = RadioGroupContext;
  public context: RadioGroupContextType<T> = this.context;

  private inputEl = React.createRef<HTMLInputElement>();
  private setRootNode!: TSetRootNode;
  private theme!: Theme;

  public render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return (
            <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
              {this.renderMain}
            </CommonWrapper>
          );
        }}
      </ThemeContext.Consumer>
    );
  }

  /**
   * @public
   */
  public focus() {
    keyListener.isTabPressed = true;
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
      disabled = this.context.disabled,
      warning = this.context.warning,
      error = this.context.error,
      focused,
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
        [styles.focus(this.theme)]: this.props.focused || this.state.focusedByKeyboard,
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
      className: styles.input(),
      disabled,
      tabIndex: this.props.tabIndex,
      value,
      ref: this.inputEl,
      onChange: this.handleChange,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
    };

    const labelProps = {
      className: cx(styles.root(this.theme), this.props.checked && styles.rootChecked(this.theme)),
      onMouseOver: this.handleMouseOver,
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
      onClick: fixFirefoxModifiedClickOnLabel(this.inputEl),
    };

    if (this._isInRadioGroup()) {
      const checked = this.props.value === this.context.activeItem;
      inputProps.checked = checked;
      inputProps.name = this.context.name;
      inputProps.suppressHydrationWarning = true;
      labelProps.className = cx(styles.root(this.theme), checked && styles.rootChecked(this.theme));
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

  private handleFocus = (e: React.FocusEvent<any>) => {
    if (!this.context.disabled) {
      // focus event fires before keyDown eventlistener
      // so we should check tabPressed in async way
      requestAnimationFrame(() => {
        if (keyListener.isArrowPressed || keyListener.isTabPressed) {
          this.setState({ focusedByKeyboard: true });
        }
      });

      if (this.props.onFocus) {
        this.props.onFocus(e);
      }
    }
  };

  private handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    this.props.onBlur?.(e);
    this.setState({ focusedByKeyboard: false });
  };
}
