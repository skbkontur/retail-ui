import invariant from 'invariant';
import React from 'react';
import raf from 'raf';

import { isIE11, isEdge } from '../../lib/client';
import { isKeyBackspace, isKeyDelete, someKeys } from '../../lib/events/keyboard/identifiers';
import { polyfillPlaceholder } from '../../lib/polyfillPlaceholder';
import { Nullable, Override } from '../../typings/utility-types';
import { MaskedInput } from '../../internal/MaskedInput';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { CommonWrapper, CommonProps, CommonWrapperRestProps } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { rootNode, TSetRootNode } from '../../lib/rootNode';

import { styles } from './Input.styles';

export type InputSize = 'small' | 'medium' | 'large';
export type InputAlign = 'left' | 'center' | 'right';
export type InputType = 'password' | 'text';
export type InputIconType = React.ReactNode | (() => React.ReactNode);

export interface InputProps
  extends CommonProps,
    Override<
      React.InputHTMLAttributes<HTMLInputElement>,
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
        /**
         * Cостояние валидации при ошибке.
         */
        error?: boolean;
        /**
         * Cостояние валидации при предупреждении.
         */
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
      }
    > {}

export interface InputState {
  blinking: boolean;
  focused: boolean;
  polyfillPlaceholder: boolean;
}

/**
 * Интерфес пропсов наследуется от `React.InputHTMLAttributes<HTMLInputElement>`.
 *  Все пропсы кроме перечисленных, `className` и `style` передаются в `<input>`
 */
@rootNode
export class Input extends React.Component<InputProps, InputState> {
  public static __KONTUR_REACT_UI__ = 'Input';

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
  private setRootNode!: TSetRootNode;

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

  public componentDidUpdate(prevProps: Readonly<InputProps>) {
    if (this.props.value !== prevProps.value) {
      if (polyfillPlaceholder && !this.props.value) {
        this.setState({ polyfillPlaceholder: true });
      }
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
  public getNode() {
    return this.input;
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
   * @param {number} start
   * @param {number} end
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

  private renderMain = (props: CommonWrapperRestProps<InputProps>) => {
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
      type,
      mask,
      maskChar,
      alwaysShowMask,
      size,
      placeholder,
      selectAllOnFocus,
      disabled,
      onUnexpectedInput,
      prefix,
      suffix,
      formatChars,
      ...rest
    } = props;

    const { blinking, focused } = this.state;

    const labelProps = {
      className: cx(styles.root(this.theme), this.getSizeClassName(), {
        [styles.focus(this.theme)]: focused,
        [styles.blink(this.theme)]: blinking,
        [styles.borderless()]: borderless && !focused,
        [styles.disabled(this.theme)]: disabled,
        [styles.warning(this.theme)]: warning,
        [styles.error(this.theme)]: error,
        [styles.focusFallback(this.theme)]: focused && (isIE11 || isEdge),
        [styles.warningFallback(this.theme)]: warning && (isIE11 || isEdge),
        [styles.errorFallback(this.theme)]: error && (isIE11 || isEdge),
      }),
      style: { width },
      onMouseEnter,
      onMouseLeave,
      onMouseOver,
    };

    const inputProps = {
      ...rest,
      className: cx(styles.input(this.theme), {
        [styles.inputFocus(this.theme)]: focused,
        [styles.inputDisabled(this.theme)]: disabled,
      }),
      value,
      onChange: this.handleChange,
      onFocus: this.handleFocus,
      onKeyDown: this.handleKeyDown,
      onKeyPress: this.handleKeyPress,
      onBlur: this.handleBlur,
      style: { textAlign: align },
      ref: this.refInput,
      type: 'text',
      placeholder: !this.isMaskVisible && !polyfillPlaceholder ? placeholder : undefined,
      disabled,
    };

    if (type === 'password') {
      inputProps.type = type;
    }

    const input = mask ? this.renderMaskedInput(inputProps, mask) : React.createElement('input', inputProps);

    return (
      <label {...labelProps}>
        <span className={styles.sideContainer()}>
          {this.renderLeftIcon()}
          {this.renderPrefix()}
        </span>
        <span className={styles.wrapper()}>
          {input}
          {this.renderPlaceholder()}
        </span>
        <span className={cx(styles.sideContainer(), styles.rightContainer())}>
          {this.renderSuffix()}
          {this.renderRightIcon()}
        </span>
      </label>
    );
  };

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
        return right ? styles.rightIconLarge(this.theme) : styles.leftIconLarge(this.theme);
      case 'medium':
        return right ? styles.rightIconMedium(this.theme) : styles.leftIconMedium(this.theme);
      case 'small':
      default:
        return right ? styles.rightIconSmall(this.theme) : styles.leftIconSmall(this.theme);
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
    const { disabled } = this.props;
    const iconNode = icon instanceof Function ? icon() : icon;

    return (
      <span
        className={cx(styles.icon(), sizeClassName, styles.useDefaultColor(this.theme), {
          [styles.iconDisabled()]: disabled,
        })}
      >
        {iconNode}
      </span>
    );
  }

  private renderPlaceholder() {
    const { disabled } = this.props;
    const { focused } = this.state;
    let placeholder = null;

    if (this.state.polyfillPlaceholder && this.props.placeholder && !this.isMaskVisible && !this.props.value) {
      placeholder = (
        <div
          className={cx(styles.placeholder(this.theme), {
            [styles.placeholderDisabled(this.theme)]: disabled,
            [styles.placeholderFocus(this.theme)]: focused,
          })}
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
        return cx({
          [styles.sizeLarge(this.theme)]: true,
          [styles.sizeLargeFallback(this.theme)]: isIE11 || isEdge,
        });
      case 'medium':
        return cx({
          [styles.sizeMedium(this.theme)]: true,
          [styles.sizeMediumFallback(this.theme)]: isIE11 || isEdge,
        });
      case 'small':
      default:
        return cx({
          [styles.sizeSmall(this.theme)]: true,
          [styles.sizeSmallFallback(this.theme)]: isIE11 || isEdge,
        });
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
      this.input && !isIE11 ? this.selectAll() : this.delaySelectAll();
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
    const { prefix, disabled } = this.props;

    if (!prefix) {
      return null;
    }

    return (
      <span className={cx(styles.prefix(this.theme), { [styles.prefixDisabled(this.theme)]: disabled })}>{prefix}</span>
    );
  };

  private renderSuffix = () => {
    const { suffix, disabled } = this.props;

    if (!suffix) {
      return null;
    }

    return (
      <span className={cx(styles.suffix(this.theme), { [styles.suffixDisabled(this.theme)]: disabled })}>{suffix}</span>
    );
  };
}
