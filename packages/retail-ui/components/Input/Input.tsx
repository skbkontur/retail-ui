import classNames from 'classnames';
import * as React from 'react';

import polyfillPlaceholder from '../polyfillPlaceholder';
import '../ensureOldIEClassName';
import Upgrades from '../../lib/Upgrades';

import CssStyles from './Input.less';
import { Override, Nullable } from '../../typings/utility-types';
import invariant from 'invariant';
import MaskedInput from '../internal/MaskedInput/MaskedInput';

const isFlatDesign = Upgrades.isFlatDesignEnabled();

const classes: typeof CssStyles = isFlatDesign ? require('./Input.flat.less') : require('./Input.less');

const isDeleteKey = (key: string) => {
  return key === 'Backspace' || key === 'Delete';
};

export type InputSize = 'small' | 'medium' | 'large';

export type InputAlign = 'left' | 'center' | 'right';

export type InputType = 'password' | 'text';

export type IconType = React.ReactNode | (() => React.ReactNode);

export type InputProps = Override<
  React.InputHTMLAttributes<HTMLInputElement>,
  {
    /**
     * Иконка слева
     * Если `ReactNode` применяются дефолтные стили для иконки
     * Если `() => ReactNode` применяются только стили для позиционирование
     */
    leftIcon?: IconType;
    /**
     * Иконка справа
     * Если `ReactNode` применяются дефолтные стили для иконки
     * Если `() => ReactNode` применяются только стили для позиционирование
     */
    rightIcon?: IconType;
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
    /** onChange */
    onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
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

    /**
     * @deprecated
     * 100% ширина в группе, лучше явно передать ширину в компонент
     */
    mainInGroup?: boolean;
    /** Выделять введенное значение при фокусе */
    selectAllOnFocus?: boolean;
    /**
     * Обработчик неправильного ввода.
     * По-умолчанию, инпут вспыхивает синим.
     * Если передан - вызывается переданный обработчик,
     * в таком случае вспыхивание можно вызвать
     * публичным методом инстанса `blink()`
     */
    onUnexpectedInput?: () => void;
  }
>;

export interface InputVisibilityState {
  blinking: boolean;
  focused: boolean;
}

export interface InputState extends InputVisibilityState {
  polyfillPlaceholder: boolean;
}

/**
 * Интерфес пропсов наследуется от `React.InputHTMLAttributes<HTMLInputElement>`.
 *  Все пропсы кроме перечисленных, `className` и `style` передаются в `<input>`
 */
class Input extends React.Component<InputProps, InputState> {
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

  private blinkTimeout: number = 0;

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
  }

  public componentWillReceiveProps(nextProps: InputProps) {
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
    this.setState({ blinking: true }, () => {
      this.blinkTimeout = window.setTimeout(() => this.setState({ blinking: false }), 150);
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
    const {
      onMouseEnter,
      onMouseLeave,
      onMouseOver,
      onKeyDown,
      onKeyPress,
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
      style,
      className,
      size,
      placeholder,
      mainInGroup,
      selectAllOnFocus,
      disabled,
      onUnexpectedInput,
      prefix,
      suffix,
      formatChars,
      ...rest
    } = this.props;

    const { blinking, focused } = this.state;

    const labelProps = {
      className: classNames(classes.root, this.getSizeClassName(), {
        [classes.disabled]: disabled,
        [classes.error]: error,
        [classes.warning]: warning,
        [classes.borderless]: borderless,
        [classes.blink]: blinking,
        [classes.focus]: focused,
      }),
      style: { width },
      onMouseEnter,
      onMouseLeave,
      onMouseOver,
    };

    const inputProps = {
      ...rest,
      className: classNames(classes.input),
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

    const input = !!mask ? this.renderMaskedInput(inputProps, mask) : React.createElement('input', inputProps);

    return (
      <label {...labelProps}>
        <span className={classes.sideContainer}>
          {this.renderLeftIcon()}
          {this.renderPrefix()}
        </span>
        <span className={classes.wrapper}>
          {input}
          {this.renderPlaceholder()}
        </span>
        <span className={classNames(classes.sideContainer, classes.rightContainer)}>
          {this.renderSuffix()}
          {this.renderRightIcon()}
        </span>
      </label>
    );
  }

  /**
   * @public
   */
  public selectAll = () => {
    if (this.input) {
      this.setSelectionRange(0, this.input.value.length);
    }
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
        maskChar={this.props.maskChar === undefined ? '_' : this.props.maskChar}
        alwaysShowMask={this.props.alwaysShowMask}
        onUnexpectedInput={this.handleUnexpectedInput}
        formatChars={this.props.formatChars}
      />
    );
  }

  private renderLeftIcon() {
    return this.renderIcon(this.props.leftIcon, classes.leftIcon);
  }

  private renderRightIcon() {
    return this.renderIcon(this.props.rightIcon, classes.rightIcon);
  }

  private renderIcon(icon: IconType, className: string) {
    if (!icon) {
      return null;
    }

    if (icon instanceof Function) {
      return <span className={className}>{icon()}</span>;
    }

    return <span className={classNames(className, classes.useDefaultColor)}>{icon}</span>;
  }

  private renderPlaceholder() {
    let placeholder = null;

    if (this.state.polyfillPlaceholder && this.props.placeholder && !this.isMaskVisible && !this.props.value) {
      placeholder = (
        <div className={classes.placeholder} style={{ textAlign: this.props.align || 'inherit' }}>
          {this.props.placeholder}
        </div>
      );
    }

    return placeholder;
  }

  private getSizeClassName() {
    const SIZE_CLASS_NAMES = {
      small: classes.sizeSmall,
      medium: Upgrades.isSizeMedium16pxEnabled() ? classes.sizeMedium : classes.DEPRECATED_sizeMedium,
      large: classes.sizeLarge,
    };

    return SIZE_CLASS_NAMES[this.props.size!];
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

    if (this.props.onChange) {
      this.props.onChange(event, event.target.value);
    }
  };

  private handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    this.setState({
      focused: true,
    });

    if (this.props.selectAllOnFocus) {
      this.selectAll();
    }

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  private handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }

    if (!event.currentTarget.value && isDeleteKey(event.key) && !event.repeat) {
      this.handleUnexpectedInput();
    }
  };

  private handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (this.props.onKeyPress) {
      this.props.onKeyPress(event);
    }

    if (this.props.maxLength === event.currentTarget.value.length) {
      this.handleUnexpectedInput();
    }
  };

  private handleUnexpectedInput = () => {
    if (this.props.onUnexpectedInput) {
      this.props.onUnexpectedInput();
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

    return <span className={classes.prefix}>{prefix}</span>;
  };

  private renderSuffix = () => {
    const { suffix } = this.props;

    if (!suffix) {
      return null;
    }

    return <span className={classes.suffix}>{suffix}</span>;
  };
}

export default Input;
