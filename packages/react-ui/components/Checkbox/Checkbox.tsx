import React from 'react';
import PropTypes from 'prop-types';

import { Nullable, Override } from '../../typings/utility-types';
import { keyListener } from '../../lib/events/keyListener';
import { Theme } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { OkIcon, SquareIcon } from '../../internal/icons/16px';
import { isEdge, isFirefox, isIE11 } from '../../lib/client';
import { CommonWrapper, CommonProps, CommonWrapperRestProps } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';

import { styles, globalClasses } from './Checkbox.styles';

export interface CheckboxProps
  extends CommonProps,
    Override<
      React.InputHTMLAttributes<HTMLInputElement>,
      {
        /**
         * Контент `label`
         */
        children?: React.ReactNode;
        /**
         * Цветовая схема ошибки.
         */
        error?: boolean;
        /**
         * Цветовая схема предупреждения.
         */
        warning?: boolean;
        /**
         * HTML-событие `mouseenter`.
         */
        onMouseEnter?: React.MouseEventHandler<HTMLLabelElement>;
        /**
         * HTML-событие `mouseleave`.
         */
        onMouseLeave?: React.MouseEventHandler<HTMLLabelElement>;
        /**
         * HTML-событие `mouseover`.
         */
        onMouseOver?: React.MouseEventHandler<HTMLLabelElement>;
        /**
         * Функция, вызываемая при изменении `value`.
         */
        onValueChange?: (value: boolean) => void;
        /**
         * HTML-событие `onblur`.
         */
        onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
        /**
         * [Неопределённое состояние](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#attr-indeterminate) чекбокса из HTML.
         */
        initialIndeterminate?: boolean;
      }
    > {}

export interface CheckboxState {
  focusedByTab: boolean;
  indeterminate: boolean;
}

export class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
  public static __KONTUR_REACT_UI__ = 'Checkbox';

  public static propTypes = {
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    warning: PropTypes.bool,
    onValueChange: PropTypes.func,
    onBlur: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseOver: PropTypes.func,
  };

  public state = {
    focusedByTab: false,
    indeterminate: this.props.initialIndeterminate || false,
  };

  private theme!: Theme;
  private input: Nullable<HTMLInputElement>;

  public componentDidMount = () => {
    if (this.state.indeterminate && this.input) {
      this.input.indeterminate = true;
    }
  };

  public UNSAFE_componentWillReceiveProps(nextProps: CheckboxProps) {
    if (nextProps.checked !== this.props.checked) {
      this.resetIndeterminate();
    }
  }

  public render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return <CommonWrapper {...this.props}>{this.renderMain}</CommonWrapper>;
        }}
      </ThemeContext.Consumer>
    );
  }

  /**
   * Программная установка фокуса чекбоксу.
   * @public
   */
  public focus() {
    keyListener.isTabPressed = true;
    this.input?.focus();
  }

  /**
   * Программное снятие фокуса с чекбокса.
   * @public
   */
  public blur() {
    this.input?.blur();
  }

  /**
   * Устанавливает чекбокс в HTML-состояние `indeterminate`.
   * @public
   */
  public setIndeterminate = () => {
    this.setState({
      indeterminate: true,
    });
    if (this.input) {
      this.input.indeterminate = true;
    }
  };

  /**
   * Снимает с чекбокса HTML-состояние `indeterminate`.
   * @public
   */
  public resetIndeterminate = () => {
    this.setState({
      indeterminate: false,
    });
    if (this.input) {
      this.input.indeterminate = false;
    }
  };

  private renderMain = (props: CommonWrapperRestProps<CheckboxProps>) => {
    const {
      error,
      warning,
      onMouseEnter,
      onMouseLeave,
      onMouseOver,
      onValueChange,
      type,
      initialIndeterminate,
      ...rest
    } = props;
    const isIndeterminate = this.state.indeterminate;

    const rootClass = cx({
      [styles.root(this.theme)]: true,
      [styles.rootFallback()]: isIE11 || isEdge,
      [styles.rootChecked(this.theme)]: props.checked || isIndeterminate,
      [styles.disabled(this.theme)]: Boolean(props.disabled),
    });

    const inputProps = {
      ...rest,
      type: 'checkbox',
      className: styles.input(),
      onChange: this.handleChange,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onClick: this.handleClick,
      ref: this.inputRef,
    };

    let caption = null;
    if (this.props.children) {
      const captionClass = cx({
        [styles.caption(this.theme)]: true,
        [styles.captionIE11()]: isIE11 || isEdge,
        [styles.disabled(this.theme)]: Boolean(props.disabled),
      });
      caption = <span className={captionClass}>{this.props.children}</span>;
    }

    const iconClass = cx({
      [styles.iconUnchecked()]: !props.checked && !isIndeterminate,
      [styles.iconFixBaseline()]: isFirefox || isIE11 || isEdge,
    });

    const box = (
      <span
        className={cx(styles.box(this.theme), globalClasses.box, {
          [styles.boxChecked(this.theme)]: props.checked || isIndeterminate,
          [styles.boxFocus(this.theme)]: this.state.focusedByTab,
          [styles.boxError(this.theme)]: props.error,
          [styles.boxWarning(this.theme)]: props.warning,
          [styles.boxDisabled(this.theme)]: props.disabled,
        })}
      >
        {(isIndeterminate && <SquareIcon className={iconClass} />) || <OkIcon className={iconClass} />}
      </span>
    );

    return (
      <label className={rootClass} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onMouseOver={onMouseOver}>
        <input {...inputProps} />
        {box}
        {caption}
      </label>
    );
  };

  private handleFocus = (e: React.FocusEvent<any>) => {
    if (!this.props.disabled) {
      // focus event fires before keyDown eventlistener
      // so we should check tabPressed in async way
      requestAnimationFrame(() => {
        if (keyListener.isTabPressed) {
          this.setState({ focusedByTab: true });
        }
      });

      if (this.props.onFocus) {
        this.props.onFocus(e);
      }
    }
  };

  private handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    this.props.onBlur?.(e);
    this.setState({ focusedByTab: false });
  };

  private inputRef = (ref: HTMLInputElement | null) => {
    this.input = ref;
  };

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.currentTarget.checked;
    this.props.onValueChange?.(checked);

    this.resetIndeterminate();

    this.props.onChange?.(event);
  };

  private handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    this.props.onClick?.(e);
    // support IE11's and old Edge's special behavior
    // https://github.com/jquery/jquery/issues/1698
    if (this.state.indeterminate && (isIE11 || isEdge)) {
      this.resetIndeterminate();
      // simulate correct behavior only if onValueChange is used
      // because we cant simulate real native onChange event
      if (this.props.onValueChange && this.input) {
        const checked = !this.input.checked;

        if (this.props.checked === undefined) {
          // in case of uncontrolled mode
          this.input.checked = checked;
        }

        this.props.onValueChange(checked);
      }
    }
  };
}
