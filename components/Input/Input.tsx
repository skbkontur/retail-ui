import * as classNames from 'classnames';
import * as MaskedInput from 'react-input-mask';
import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as ReactDOM from 'react-dom';
import * as invariant from 'invariant';
import * as styled from '../internal/styledRender';

import filterProps, { unwidenBool } from '../filterProps';
import polyfillPlaceholder from '../polyfillPlaceholder';
import '../ensureOldIEClassName';
import Upgrades from '../../lib/Upgrades';

const isFlatDesign = Upgrades.isFlatDesignEnabled();

import CssStyles = require('./Input.less');
import JssStyles from './Input.styles';
import { IconName } from '../Icon';

let cssStyles: typeof CssStyles;
let jssStyles: typeof JssStyles;
if (process.env.EXPERIMENTAL_CSS_IN_JS) {
  jssStyles = require('./Input.styles').default;
} else {
  cssStyles = isFlatDesign
    ? require('./Input.flat.less')
    : require('./Input.less');
}

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
  alwaysShowMask?: boolean;
  autoFocus?: boolean;
  borderless?: boolean;
  /** @ignore */
  className?: string; // TODO: kill it
  disabled?: boolean;
  error?: boolean;
  id?: string;
  leftIcon?: React.ReactNode;
  mask?: string;
  maskChar?: string | null;
  maxLength?: number;
  placeholder?: string;
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
  static propTypes = {
    align: PropTypes.oneOf(['left', 'center', 'right']),

    /**
     * Показывать маску, даже если ничего не введено.
     */
    alwaysShowMask: PropTypes.bool,

    /**
     * Не отрисовывать рамку.
     */
    borderless: PropTypes.bool,

    disabled: PropTypes.bool,

    /**
     * Визуально показать наличие ошибки.
     */
    error: PropTypes.bool,

    /**
     * ID для использования с элементом label.
     */
    id: PropTypes.string,

    /**
     * Иконка слева инпута.
     */
    leftIcon: PropTypes.element,

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
    mask: PropTypes.string,

    /**
     * Символ маски. Если не указан, используется '_'.
     */
    maskChar: PropTypes.string,

    maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    placeholder: PropTypes.string,

    /**
     * Иконка справа инпута.
     */
    rightIcon: PropTypes.element,

    size: PropTypes.oneOf(['small', 'medium', 'large']),

    title: PropTypes.string,

    type: PropTypes.oneOf(['password', 'text']),

    value: PropTypes.string.isRequired,

    /**
     * Визуально показать наличие предупреждения.
     */
    warning: PropTypes.bool,

    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    onBlur: PropTypes.func,

    /**
     * Вызывается при вводе каждого символа.
     */
    onChange: PropTypes.func,

    onCopy: PropTypes.func,

    onCut: PropTypes.func,

    onFocus: PropTypes.func,

    onInput: PropTypes.func,

    onKeyDown: PropTypes.func,

    onKeyPress: PropTypes.func,

    onKeyUp: PropTypes.func,

    onMouseEnter: PropTypes.func,

    onMouseLeave: PropTypes.func,

    onMouseOver: PropTypes.func,

    onPaste: PropTypes.func
  };

  static defaultProps: {
    size: InputSize;
  } = {
    size: 'small'
  };

  public state: InputState = {
    polyfillPlaceholder: false,
    blinking: false
  };

  private _blinkTimeout: number = 0;

  private input: HTMLInputElement | null = null;

  componentDidMount() {
    if (polyfillPlaceholder) {
      this.setState({ polyfillPlaceholder: true });
    }
  }

  componentWillUnmount() {
    if (this._blinkTimeout) {
      clearTimeout(this._blinkTimeout);
    }
  }

  componentWillReceiveProps(nextProps: InputProps) {
    if (polyfillPlaceholder && !nextProps.value) {
      this.setState({ polyfillPlaceholder: true });
    }
  }

  /**
   * @public
   */
  focus() {
    invariant(this.input, 'Cannot call "focus" because Input is not mounted');
    this.input!.focus();
  }

  /**
   * @public
   */
  blur() {
    invariant(this.input, 'Cannot call "blur" because Input is not mounted');
    this.input!.blur();
  }

  /**
   * @public
   */
  blink() {
    this.setState({ blinking: true }, () => {
      this._blinkTimeout = window.setTimeout(
        () => this.setState({ blinking: false }),
        150
      );
    });
  }

  /**
   * @public
   */
  setSelectionRange(start: number, end: number) {
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

  render() {
    return styled.element(cssStyles, jssStyles, classes => {
      const labelProps = {
        className: classNames({
          [classes.root]: true,
          [this.props.className || '']: true,
          [classes.disabled]: this.props.disabled,
          [classes.error]: this.props.error,
          [classes.warning]: this.props.warning,
          [classes.padLeft]: !!this.props.leftIcon,
          [classes.padRight]: !!this.props.rightIcon,
          [this._getSizeClassName(classes)]: true
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
        onChange: this._handleChange,
        style: { textAlign: this.props.align },
        ref: this._refInput,
        type: 'text'
      };

      if (this.props.type === 'password') {
        inputProps.type = this.props.type;
      }

      let input = this.props.mask
        ? this._renderMaskedInput(inputProps, this.props.mask)
        : React.createElement('input', inputProps);

      return (
        <label {...labelProps}>
          {input}
          {this._renderPlaceholder(classes)}
          {this._renderLeftIcon(classes)}
          {this._renderRightIcon(classes)}
        </label>
      );
    });
  }

  _renderMaskedInput(
    inputProps: React.InputHTMLAttributes<HTMLInputElement>,
    mask: string
  ) {
    // TODO: fix MaskedInput definitions
    // tslint:disable-next-line:no-any
    return React.createElement(MaskedInput as any, {
      ...inputProps,
      mask,
      maskChar: this.props.maskChar === undefined ? '_' : this.props.maskChar,
      alwaysShowMask: this.props.alwaysShowMask
    });
  }

  _renderLeftIcon(classes: typeof CssStyles) {
    return this._renderIcon(this.props.leftIcon, classes.leftIcon, classes);
  }

  _renderRightIcon(classes: typeof CssStyles) {
    return this._renderIcon(this.props.rightIcon, classes.rightIcon, classes);
  }

  _renderIcon(
    icon: React.ReactNode,
    className: string,
    classes: typeof CssStyles
  ) {
    return icon ? (
      <div className={className}>
        <span className={classes.icon}>{icon}</span>
      </div>
    ) : null;
  }

  _renderPlaceholder(classes: typeof CssStyles) {
    var placeholder = null;

    if (
      this.state.polyfillPlaceholder &&
      this.props.placeholder &&
      !this.props.mask &&
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

  _getSizeClassName(classes: typeof CssStyles) {
    const SIZE_CLASS_NAMES = {
      small: classes.sizeSmall,
      medium: Upgrades.isSizeMedium16pxEnabled()
        ? classes.sizeMedium
        : classes.DEPRECATED_sizeMedium,
      large: classes.sizeLarge
    };

    return SIZE_CLASS_NAMES[this.props.size!];
  }

  _refInput = (ref: HTMLInputElement | null) => {
    const elem = ReactDOM.findDOMNode(this).querySelector('input');
    this.input = this.props.mask ? elem : ref;
  };

  _handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
