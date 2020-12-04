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
import { extractProps } from '../../lib/filterProps';

import { jsStyles } from './Input.styles';

export type InputSize = 'small' | 'medium' | 'large';
export type InputAlign = 'left' | 'center' | 'right';
export type InputIconType = React.ReactNode | (() => React.ReactNode);

export type InputProps<T = HTMLLabelElement> = Override<
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
    /** Значение */
    value?: string;
    defaultValue?: string;
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

    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;

    onChange?: React.FormEventHandler<HTMLInputElement>;
    onInput?: React.FormEventHandler<HTMLInputElement>;
    onBeforeInput?: React.FormEventHandler<HTMLInputElement>;
    onInvalid?: React.FormEventHandler<HTMLInputElement>;

    onCopy?: React.ClipboardEventHandler<HTMLInputElement>;
    onCut?: React.ClipboardEventHandler<HTMLInputElement>;
    onPaste?: React.ClipboardEventHandler<HTMLInputElement>;

    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
    onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>;
    onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
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

  public static extractProps = <T extends InputProps>(props: T) => extractProps(props, INPUT_PROPS);
  public static extractCustomProps = <T extends InputProps>(props: T) => extractProps(props, INPUT_CUSTOM_PROPS);
  public static extractNativeProps = <T extends InputProps>(props: T) => extractProps(props, INPUT_NATIVE_PROPS);

  public static defaultProps: {
    size: InputSize;
  } = {
    size: 'small',
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
    const [customProps, otherProps] = Input.extractCustomProps(this.props);
    const [nativeProps, restProps] = Input.extractNativeProps(otherProps);
    const { width, style, className, ...wrapperProps } = restProps;
    const { borderless, warning, error, align, mask } = customProps;

    const { blinking, focused } = this.state;

    const labelProps = {
      ...wrapperProps,
      className: cn(className, jsStyles.root(this.theme), this.getSizeClassName(), {
        [jsStyles.borderless()]: !!borderless,
        [jsStyles.focus(this.theme)]: focused,
        [jsStyles.blink(this.theme)]: !!blinking,
        [jsStyles.warning(this.theme)]: !!warning,
        [jsStyles.error(this.theme)]: !!error,
        [jsStyles.disabled(this.theme)]: !!nativeProps.disabled,
        [jsStyles.focusFallback(this.theme)]: focused && (isIE11 || isEdge),
        [jsStyles.warningFallback(this.theme)]: !!warning && (isIE11 || isEdge),
        [jsStyles.errorFallback(this.theme)]: !!error && (isIE11 || isEdge),
      }),
      style: { width, ...style },
    };

    const inputProps = {
      ...nativeProps,
      className: jsStyles.input(this.theme),
      style: { textAlign: align },
      ref: this.refInput,
      placeholder: !this.isMaskVisible && !polyfillPlaceholder ? nativeProps.placeholder : undefined,

      onChange: this.handleChange,
      onFocus: this.handleFocus,
      onKeyDown: this.handleKeyDown,
      onKeyPress: this.handleKeyPress,
      onBlur: this.handleBlur,
    };

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

    this.props.onChange?.(event);
  };

  private handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    this.setState({
      focused: true,
    });

    if (this.props.selectAllOnFocus) {
      // https://github.com/facebook/react/issues/7769
      this.input ? this.selectAll() : this.delaySelectAll();
    }

    this.props.onFocus?.(event);
  };

  private handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    this.props.onKeyDown?.(e);

    const isDeleteKey = someKeys(isKeyBackspace, isKeyDelete)(e);

    if (!e.currentTarget.value && isDeleteKey && !e.repeat) {
      this.handleUnexpectedInput();
    }
  };

  private handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    this.props.onKeyPress?.(event);

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

    this.props.onBlur?.(event);
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

const INPUT_CUSTOM_PROPS = {
  error: true,
  warning: true,
  leftIcon: true,
  rightIcon: true,
  borderless: true,
  align: true,
  mask: true,
  maskChar: true,
  alwaysShowMask: true,
  size: true,
  selectAllOnFocus: true,
  onUnexpectedInput: true,
  prefix: true,
  suffix: true,
  formatChars: true,
  onValueChange: true,
};

const INPUT_NATIVE_PROPS = {
  accept: true,
  alt: true,
  autoComplete: true,
  autoFocus: true,
  capture: true,
  checked: true,
  defaultChecked: true,
  defaultValue: true,
  disabled: true,
  form: true,
  formAction: true,
  formEncType: true,
  formMethod: true,
  formNoValidate: true,
  formTarget: true,
  height: true,
  inputMode: true,
  hidden: true,
  list: true,
  max: true,
  maxLength: true,
  min: true,
  minLength: true,
  multiple: true,
  name: true,
  pattern: true,
  placeholder: true,
  readOnly: true,
  required: true,
  src: true,
  step: true,
  type: true,
  value: true,

  onFocus: true,
  onBlur: true,
  onChange: true,
  onInput: true,
  onBeforeInput: true,
  onInvalid: true,
  onCopy: true,
  onCut: true,
  onPaste: true,
  onKeyDown: true,
  onKeyPress: true,
  onKeyUp: true,

  id: true,
  tabIndex: true,
  'aria-label': true,
  'aria-labelledby': true,
};

const INPUT_PROPS = {
  ...INPUT_CUSTOM_PROPS,
  ...INPUT_NATIVE_PROPS,
};
