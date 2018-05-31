import classNames from 'classnames';
import MaskedInput from 'react-input-mask';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import invariant from 'invariant';

import filterProps, { unwidenBool } from '../filterProps';
import polyfillPlaceholder from '../polyfillPlaceholder';
import '../ensureOldIEClassName';
import Upgrades from '../../lib/Upgrades';

import CssStyles from './Input.less';

const isFlatDesign = Upgrades.isFlatDesignEnabled();

const classes: typeof CssStyles = isFlatDesign
  ? require('./Input.flat.less')
  : require('./Input.less');

const INPUT_PASS_PROPS = unwidenBool({
  autoFocus: true,
  disabled: true,
  id: true,
  maxLength: true,
  placeholder: !polyfillPlaceholder,
  title: true,

  onBlur: true,
  onDoubleClick: true,
  onCopy: true,
  onClick: true,
  onMouseUp: true,
  onMouseDown: true,
  onCut: true,
  onFocus: true,
  onInput: true,
  onKeyDown: true,
  onKeyPress: true,
  onKeyUp: true,
  onPaste: true
});

export type InputSize = 'small' | 'medium' | 'large';

export type InputAlign = 'left' | 'center' | 'right';

export type InputType = 'password' | 'text';

export interface InputProps {
  align?: InputAlign;

  /**
   * Показывать маску, даже если ничего не введено.
   */
  alwaysShowMask?: boolean;

  autoFocus?: boolean;

  /**
   * Не отрисовывать рамку.
   */
  borderless?: boolean;
  /** @ignore */
  className?: string; // TODO: kill it

  disabled?: boolean;

  error?: boolean;

  /**
   * ID для использования с элементом label.
   */
  id?: string;

  /**
   * Иконка слева инпута.
   */
  leftIcon?: React.ReactNode;

  /**
   * Маска ввода. Заменяет placeholder и defaultValue, влияет на значение
   * инпута. Позволяет вводить только ограниченное количество символов.
   *
   * Шаблоны:
   *  9: 0-9
   *  a: A-Z, a-z
   *  *: A-Z, a-z, 0-9
   *
   * Можно делать неудаляемую маску, например: `+4\9 99 999 99`. `\` &mdash;
   * экранирует символ шаблона.
   */
  mask?: string;

  /**
   * Символ маски. Если не указан, используется '_'.
   */
  maskChar?: string | null;

  maxLength?: number;

  placeholder?: string;

  /**
   * Иконка справа инпута.
   */
  rightIcon?: React.ReactNode;

  size?: InputSize;

  title?: string;

  type?: InputType;

  value?: string;

  warning?: boolean;

  width?: number | string;

  onBlur?: React.FocusEventHandler<HTMLInputElement>;

  onClick?: React.MouseEventHandler<HTMLInputElement>;

  onDoubleClick?: React.MouseEventHandler<HTMLInputElement>;

  onMouseUp?: React.MouseEventHandler<HTMLInputElement>;

  onMouseDown?: React.MouseEventHandler<HTMLInputElement>;

  onChange?: (e: React.ChangeEvent<HTMLInputElement>, v: string) => void;

  onCopy?: React.ClipboardEventHandler<HTMLInputElement>;

  onCut?: React.ClipboardEventHandler<HTMLInputElement>;

  onFocus?: React.FocusEventHandler<HTMLInputElement>;

  onInput?: React.EventHandler<React.SyntheticEvent<HTMLInputElement>>;

  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;

  onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>;

  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;

  onPaste?: React.ClipboardEventHandler<HTMLInputElement>;

  onMouseEnter?: React.MouseEventHandler<HTMLLabelElement>;

  onMouseLeave?: React.MouseEventHandler<HTMLLabelElement>;

  onMouseOver?: React.MouseEventHandler<HTMLLabelElement>;
}

export interface InputState {
  polyfillPlaceholder: boolean;
  blinking: boolean;
}

class Input extends React.Component<InputProps, InputState> {
  public static defaultProps: {
    size: InputSize;
  } = {
    size: 'small'
  };

  public state: InputState = {
    polyfillPlaceholder: false,
    blinking: false
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
      this.blinkTimeout = window.setTimeout(
        () => this.setState({ blinking: false }),
        150
      );
    });
  }

  /**
   * @public
   */
  public setSelectionRange(start: number, end: number) {
    const { input } = this;
    if (!input) {
      throw new Error('Cannot call "setSelectionRange" on unmounted Input');
    }

    if (input.setSelectionRange) {
      input.focus();
      input.setSelectionRange(start, end);
      // tslint:disable-next-line:no-any
    } else if ((input as any).createTextRange) {
      // tslint:disable-next-line:no-any
      const range = (input as any).createTextRange();
      range.collapse(true);
      range.moveEnd('character', end);
      range.moveStart('character', start);
      range.select();
    }
  }

  public render() {
    const labelProps = {
      className: classNames({
        [classes.root]: true,
        [this.props.className || '']: true,
        [classes.disabled]: this.props.disabled,
        [classes.error]: this.props.error,
        [classes.warning]: this.props.warning,
        [classes.padLeft]: !!this.props.leftIcon,
        [classes.padRight]: !!this.props.rightIcon,
        [this.getSizeClassName()]: true
      }),
      style: { width: this.props.width },
      onMouseEnter: this.props.onMouseEnter,
      onMouseLeave: this.props.onMouseLeave,
      onMouseOver: this.props.onMouseOver
    };

    const inputProps = {
      ...filterProps(this.props, INPUT_PASS_PROPS),
      className: classNames({
        [classes.input]: true,
        [classes.borderless]: this.props.borderless,
        [classes.blink]: this.state.blinking
      }),
      value: this.props.value,
      onChange: this.handleChange,
      style: { textAlign: this.props.align },
      ref: this.refInput,
      type: 'text'
    };

    if (this.props.type === 'password') {
      inputProps.type = this.props.type;
    }

    const input = this.props.mask
      ? this.renderMaskedInput(inputProps, this.props.mask)
      : React.createElement('input', inputProps);

    return (
      <label {...labelProps}>
        {input}
        {this.renderPlaceholder()}
        {this.renderLeftIcon()}
        {this.renderRightIcon()}
      </label>
    );
  }

  private renderMaskedInput(
    inputProps: React.InputHTMLAttributes<HTMLInputElement>,
    mask: string
  ) {
    return (
      <MaskedInput
        {...inputProps}
        mask={mask}
        maskChar={this.props.maskChar === undefined ? '_' : this.props.maskChar}
        alwaysShowMask={this.props.alwaysShowMask}
      />
    );
  }

  private renderLeftIcon() {
    return this.renderIcon(this.props.leftIcon, classes.leftIcon);
  }

  private renderRightIcon() {
    return this.renderIcon(this.props.rightIcon, classes.rightIcon);
  }

  private renderIcon(icon: React.ReactNode, className: string) {
    return icon ? (
      <div className={className}>
        <span className={classes.icon}>{icon}</span>
      </div>
    ) : null;
  }

  private renderPlaceholder() {
    let placeholder = null;

    if (
      this.state.polyfillPlaceholder &&
      this.props.placeholder &&
      !this.props.alwaysShowMask &&
      !this.props.value
    ) {
      placeholder = (
        <div
          className={classes.placeholder}
          style={{ textAlign: this.props.align || 'inherit' }}
        >
          {this.props.placeholder}
        </div>
      );
    }

    return placeholder;
  }

  private getSizeClassName() {
    const SIZE_CLASS_NAMES = {
      small: classes.sizeSmall,
      medium: Upgrades.isSizeMedium16pxEnabled()
        ? classes.sizeMedium
        : classes.DEPRECATED_sizeMedium,
      large: classes.sizeLarge
    };

    return SIZE_CLASS_NAMES[this.props.size!];
  }

  private refInput = (ref: HTMLInputElement | null) => {
    const elem = (ReactDOM.findDOMNode(this) as HTMLElement).querySelector(
      'input'
    );
    this.input = this.props.mask ? elem : ref;
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
}

export default Input;
