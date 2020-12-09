import invariant from 'invariant';
import React from 'react';
import raf from 'raf';
import cn from 'classnames';

import { isIE11, isEdge } from '../../lib/utils';
import { isKeyBackspace, isKeyDelete, someKeys } from '../../lib/events/keyboard/identifiers';
import { polyfillPlaceholder } from '../../lib/polyfillPlaceholder';
import { Nullable, Override } from '../../typings/utility-types';
import { MaskedInput } from '../../internal/MaskedInput';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';

import { jsStyles } from './Input.styles';

export type InputSize = 'small' | 'medium' | 'large';
export type InputAlign = 'left' | 'center' | 'right';
export type InputType =
  | 'text'
  | 'color'
  | 'date'
  | 'email'
  | 'month'
  | 'number'
  | 'password'
  | 'range'
  | 'search'
  | 'tel'
  | 'time'
  | 'url'
  | 'week';
export type InputIconType = React.ReactNode | (() => React.ReactNode);

export type InputProps<T = HTMLInputElement> = Override<
  React.InputHTMLAttributes<T>,
  {
    /**
     * Иконка слева
     * Если `ReactNode` применяются дефолтные стили для иконки
     * Если `() => ReactNode` применяются только стили для позиционирование
     */
    leftIcon?: InputIconType;
    /**
     * Иконка справа
     * Если `ReactNode` применяются дефолтные стили для иконки
     * Если `() => ReactNode` применяются только стили для позиционирование
     */
    rightIcon?: InputIconType;
    /** Состояние ошибки */
    error?: boolean;
    /** Состояние предупреждения */
    warning?: boolean;
    /** Режим прозрачной рамки */
    borderless?: boolean;
    /** Выравнивание текста */
    align?: InputAlign;
    /** Паттерн маски */
    mask?: Nullable<string>;
    /** Символ маски */
    maskChar?: Nullable<string>;
    /**
     * Словарь символов-регулярок для задания маски
     * @default { '9': '[0-9]', 'a': '[A-Za-z]', '*': '[A-Za-z0-9]' }
     */
    formatChars?: Record<string, string>;
    /** Показывать символы маски */
    alwaysShowMask?: boolean;
    /** Размер */
    size?: InputSize;
    /** onValueChange */
    onValueChange?: (value: string) => void;
    /** Вызывается на label */
    onMouseEnter?: React.MouseEventHandler<HTMLLabelElement>;
    /** Вызывается на label */
    onMouseLeave?: React.MouseEventHandler<HTMLLabelElement>;
    /** Вызывается на label */
    onMouseOver?: React.MouseEventHandler<HTMLLabelElement>;
    /** Тип */
    type?: InputType;
    /** Значение */
    value?: string;
    capture?: boolean;

    /**
     * Префикс
     * `ReactNode` перед значением, но после иконки
     */
    prefix?: React.ReactNode;
    /**
     * Суффикс
     * `ReactNode` после значения, но перед правой иконкой
     */
    suffix?: React.ReactNode;
    /** Выделять введенное значение при фокусе */
    selectAllOnFocus?: boolean;
    /**
     * Обработчик неправильного ввода.
     * По-умолчанию, инпут вспыхивает синим.
     * Если передан - вызывается переданный обработчик,
     * в таком случае вспыхивание можно вызвать
     * публичным методом инстанса `blink()`.
     *
     * @param value значение инпута.
     */
    onUnexpectedInput?: (value: string) => void;

    'data-tid'?: string;
    'data-testid'?: string;
  }
>;

export interface InputState {
  blinking: boolean;
  focused: boolean;
  polyfillPlaceholder: boolean;
}

/**
 * Интерфес пропсов наследуется от `React.InputHTMLAttributes<HTMLInputElement>`.
 *  Все пропсы кроме перечисленных, `className` и `style` передаются в `<input>`
 */
export class Input extends React.Component<InputProps, InputState> {
  public static __KONTUR_REACT_UI__ = 'Input';

  public static defaultProps: {
    size: InputSize;
    type: InputType;
  } = {
    size: 'small',
    type: 'text',
  };

  public state: InputState = {
    polyfillPlaceholder: false,
    blinking: false,
    focused: false,
  };

  private selectAllId: number | null = null;
  private theme!: Theme;
  private blinkTimeout = 0;
  private input: HTMLInputElement | null = null;

  public componentDidMount() {
    if (polyfillPlaceholder) {
      this.setState({ polyfillPlaceholder: true });
    }
  }

  public componentWillUnmount() {
    if (this.blinkTimeout) {
      clearTimeout(this.blinkTimeout);
    }
    this.cancelDelayedSelectAll();
  }

  public UNSAFE_componentWillReceiveProps(nextProps: InputProps) {
    if (polyfillPlaceholder && !nextProps.value) {
      this.setState({ polyfillPlaceholder: true });
    }
  }

  /**
   * @public
   */
  public focus() {
    invariant(this.input, 'Cannot call "focus" because Input is not mounted');
    this.input!.focus();
  }

  /**
   * @public
   */
  public blur() {
    invariant(this.input, 'Cannot call "blur" because Input is not mounted');
    this.input!.blur();
  }

  /**
   * @public
   */
  public blink() {
    if (this.blinkTimeout) {
      this.cancelBlink(() => {
        // trigger reflow to restart animation
        // @see https://css-tricks.com/restart-css-animation/#article-header-id-0
        void (this.input && this.input.offsetWidth);
        this.blink();
      });
      return;
    }
    this.setState({ blinking: true }, () => {
      this.blinkTimeout = window.setTimeout(this.cancelBlink, 150);
    });
  }

  /**
   * @public
   */
  public setSelectionRange(start: number, end: number) {
    if (!this.input) {
      throw new Error('Cannot call "setSelectionRange" on unmounted Input');
    }

    if (document.activeElement !== this.input) {
      this.focus();
    }

    this.input.setSelectionRange(start, end);
  }

  public get isMaskVisible(): boolean {
    const { mask, alwaysShowMask } = this.props;
    const { focused } = this.state;
    return Boolean(mask && (focused || alwaysShowMask));
  }

  public render(): JSX.Element {
    return (
      <ThemeContext.Consumer>
        {theme => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeContext.Consumer>
    );
  }

  /**
   * @public
   */
  public selectAll = (): void => {
    if (this.input) {
      this.setSelectionRange(0, this.input.value.length);
    }
  };

  private delaySelectAll = (): number => (this.selectAllId = raf(this.selectAll));

  private cancelDelayedSelectAll = (): void => {
    if (this.selectAllId) {
      raf.cancel(this.selectAllId);
      this.selectAllId = null;
    }
  };

  private cancelBlink = (callback?: () => void): void => {
    if (this.blinkTimeout) {
      clearTimeout(this.blinkTimeout);
      this.blinkTimeout = 0;
      if (this.state.blinking) {
        this.setState({ blinking: false }, callback);
        return;
      }
    }
    if (callback) {
      callback();
    }
  };

  private renderMain() {
    const {
      onMouseEnter,
      onMouseLeave,
      onMouseOver,
      onKeyDown,
      onKeyPress,
      onValueChange,
      width,
      error,
      warning,
      leftIcon,
      rightIcon,
      borderless,
      value,
      align,
      mask,
      maskChar,
      alwaysShowMask,
      style,
      className,
      size,
      placeholder,
      selectAllOnFocus,
      disabled,
      onUnexpectedInput,
      prefix,
      suffix,
      formatChars,
      'data-tid': datatid,
      'data-testid': datatestid,
      ...rest
    } = this.props;

    const { blinking, focused } = this.state;

    const labelProps = {
      className: cn(className, jsStyles.root(this.theme), this.getSizeClassName(), {
        [jsStyles.borderless()]: !!borderless,
        [jsStyles.focus(this.theme)]: focused,
        [jsStyles.blink(this.theme)]: !!blinking,
        [jsStyles.warning(this.theme)]: !!warning,
        [jsStyles.error(this.theme)]: !!error,
        [jsStyles.disabled(this.theme)]: !!disabled,
        [jsStyles.focusFallback(this.theme)]: focused && (isIE11 || isEdge),
        [jsStyles.warningFallback(this.theme)]: !!warning && (isIE11 || isEdge),
        [jsStyles.errorFallback(this.theme)]: !!error && (isIE11 || isEdge),
      }),
      style: { width, ...style },
      onMouseEnter,
      onMouseLeave,
      onMouseOver,
      'data-tid': datatid,
      'data-testid': datatestid,
    };

    const inputProps = {
      ...rest,
      className: jsStyles.input(this.theme),
      value,
      onChange: this.handleChange,
      onFocus: this.handleFocus,
      onKeyDown: this.handleKeyDown,
      onKeyPress: this.handleKeyPress,
      onBlur: this.handleBlur,
      style: { textAlign: align },
      ref: this.refInput,
      // type: 'text',
      placeholder: !this.isMaskVisible && !polyfillPlaceholder ? placeholder : undefined,
      disabled,
    };

    // if (type === 'password') {
    //   inputProps.type = type;
    // }

    const input = mask ? this.renderMaskedInput(inputProps, mask) : React.createElement('input', inputProps);

    return (
      <label {...labelProps}>
        <span className={jsStyles.sideContainer()}>
          {this.renderLeftIcon()}
          {this.renderPrefix()}
        </span>
        <span className={jsStyles.wrapper()}>
          {input}
          {this.renderPlaceholder()}
        </span>
        <span className={cn(jsStyles.sideContainer(), jsStyles.rightContainer())}>
          {this.renderSuffix()}
          {this.renderRightIcon()}
        </span>
      </label>
    );
  }

  private renderMaskedInput(
    inputProps: React.InputHTMLAttributes<HTMLInputElement> & {
      capture?: boolean;
    },
    mask: string,
  ) {
    return (
      <MaskedInput
        {...inputProps}
        mask={mask}
        maskChar={this.props.maskChar}
        alwaysShowMask={this.props.alwaysShowMask}
        formatChars={this.props.formatChars}
        onChange={this.props.onChange}
        onValueChange={this.handleMaskedValueChange}
        onUnexpectedInput={this.handleUnexpectedInput}
      />
    );
  }

  private getIconSizeClassname(right = false) {
    switch (this.props.size) {
      case 'large':
        return right ? jsStyles.rightIconLarge(this.theme) : jsStyles.leftIconLarge(this.theme);
      case 'medium':
        return right ? jsStyles.rightIconMedium(this.theme) : jsStyles.leftIconMedium(this.theme);
      case 'small':
      default:
        return right ? jsStyles.rightIconSmall(this.theme) : jsStyles.leftIconSmall(this.theme);
    }
  }

  private renderLeftIcon() {
    return this.renderIcon(this.props.leftIcon, this.getIconSizeClassname());
  }

  private renderRightIcon() {
    return this.renderIcon(this.props.rightIcon, this.getIconSizeClassname(true));
  }

  private renderIcon(icon: InputIconType, sizeClassName: string) {
    if (!icon) {
      return null;
    }

    if (icon instanceof Function) {
      return <span className={cn(jsStyles.icon(), sizeClassName)}>{icon()}</span>;
    }

    return (
      <span
        className={cn(
          cn(jsStyles.icon(), sizeClassName),
          jsStyles.useDefaultColor(this.theme),
          jsStyles.useDefaultColor(this.theme),
        )}
      >
        {icon}
      </span>
    );
  }

  private renderPlaceholder() {
    let placeholder = null;

    if (this.state.polyfillPlaceholder && this.props.placeholder && !this.isMaskVisible && !this.props.value) {
      placeholder = (
        <div
          className={cn(jsStyles.placeholder(this.theme), jsStyles.placeholder(this.theme))}
          style={{ textAlign: this.props.align || 'inherit' }}
        >
          {this.props.placeholder}
        </div>
      );
    }

    return placeholder;
  }

  private getSizeClassName() {
    switch (this.props.size) {
      case 'large':
        return { [jsStyles.sizeLarge(this.theme)]: true, [jsStyles.sizeLargeFallback(this.theme)]: isIE11 || isEdge };
      case 'medium':
        return { [jsStyles.sizeMedium(this.theme)]: true, [jsStyles.sizeMediumFallback(this.theme)]: isIE11 || isEdge };
      case 'small':
      default:
        return { [jsStyles.sizeSmall(this.theme)]: true, [jsStyles.sizeSmallFallback(this.theme)]: isIE11 || isEdge };
    }
  }

  private refInput = (element: HTMLInputElement | MaskedInput | null) => {
    if (element instanceof MaskedInput) {
      this.input = element.input;
    } else {
      this.input = element;
    }
  };

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (polyfillPlaceholder) {
      const fieldIsEmpty = event.target.value === '';
      if (this.state.polyfillPlaceholder !== fieldIsEmpty) {
        this.setState({ polyfillPlaceholder: fieldIsEmpty });
      }
    }

    if (this.props.onValueChange) {
      this.props.onValueChange(event.target.value);
    }

    if (this.props.onChange) {
      this.props.onChange(event);
    }
  };

  private handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    this.setState({
      focused: true,
    });

    if (this.props.selectAllOnFocus) {
      // https://github.com/facebook/react/issues/7769
      this.input ? this.selectAll() : this.delaySelectAll();
    }

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  private handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }

    const isDeleteKey = someKeys(isKeyBackspace, isKeyDelete)(e);

    if (!e.currentTarget.value && isDeleteKey && !e.repeat) {
      this.handleUnexpectedInput();
    }
  };

  private handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (this.props.onKeyPress) {
      this.props.onKeyPress(event);
    }

    if (this.props.maxLength === event.currentTarget.value.length) {
      this.handleUnexpectedInput(event.currentTarget.value);
    }
  };

  private handleMaskedValueChange = (value: string) => {
    if (this.props.onValueChange) {
      this.props.onValueChange(value);
    }
  };

  private handleUnexpectedInput = (value: string = this.props.value || '') => {
    if (this.props.onUnexpectedInput) {
      this.props.onUnexpectedInput(value);
    } else {
      this.blink();
    }
  };

  private handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    this.setState({ focused: false });

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  private renderPrefix = () => {
    const { prefix } = this.props;

    if (!prefix) {
      return null;
    }

    return <span className={jsStyles.prefix(this.theme)}>{prefix}</span>;
  };

  private renderSuffix = () => {
    const { suffix } = this.props;

    if (!suffix) {
      return null;
    }

    return <span className={jsStyles.suffix(this.theme)}>{suffix}</span>;
  };
}
