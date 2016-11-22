// @flow

import classNames from 'classnames';
import MaskedInput from 'react-input-mask';
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import invariant from 'invariant';

import filterProps from '../filterProps';
import Upgrades from '../../lib/Upgrades';

import '../ensureOldIEClassName';
import styles from './Input.less';

var polyfillPlaceholder = false;
if (typeof window !== 'undefined' && window.document
    && window.document.createElement) {
  polyfillPlaceholder = !('placeholder' in document.createElement('input'));
}

const INPUT_PASS_PROPS = {
  autoFocus: true,
  disabled: true,
  id: true,
  maxLength: true,
  placeholder: true,
  title: true,

  onBlur: true,
  onCopy: true,
  onCut: true,
  onFocus: true,
  onInput: true,
  onKeyDown: true,
  onKeyPress: true,
  onKeyUp: true,
  onPaste: true,
};

const SIZE_CLASS_NAMES = {
  small: styles.deprecated_sizeSmall,
  default: styles.deprecated_sizeDefault,
  large: styles.deprecated_sizeLarge,
};

export type Props = {
  align?: 'left' | 'center' | 'right',
  alwaysShowMask?: bool,
  borderless?: bool,
  className?: string, // TODO: kill it
  disabled?: bool,
  error?: bool,
  id?: string,
  leftIcon?: React.Element<mixed>,
  mask?: string,
  maskChar?: string,
  maxLength?: number | string,
  placeholder?: string,
  rightIcon?: React.Element<mixed>,
  size?: 'small' | 'default' | 'large',
  title?: string,
  type?: 'password' | 'text',
  value: string,
  warning?: bool,
  width?: number | string,
  onBlur?: (e: SyntheticFocusEvent) => void,
  onChange?: (e: {target: {value: string}}, v: string) => void,
  onCopy?: (e: SyntheticClipboardEvent) => void,
  onCut?: (e: SyntheticClipboardEvent) => void,
  onFocus?: (e: SyntheticFocusEvent) => void,
  onInput?: (e: SyntheticInputEvent) => void,
  onKeyDown?: (e: SyntheticKeyboardEvent) => void,
  onKeyPress?: (e: SyntheticKeyboardEvent) => void,
  onKeyUp?: (e: SyntheticKeyboardEvent) => void,
  onPaste?: (e: SyntheticFocusEvent) => void,
};

type State = {
  polyfillPlaceholder: bool,
};

export default class Input extends React.Component {
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

    /**
     * DEPRECATED
     */
    size: PropTypes.oneOf(['small', 'default', 'large']),

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

    onPaste: PropTypes.func,
  };

  props: Props;
  state: State = {
    polyfillPlaceholder: false,
  };

  input = null;

  render() {
    const className: string = this.props.className || '';
    var labelProps = {
      className: classNames({
        [styles.root]: true,
        [className]: true,
        [styles.disabled]: this.props.disabled,
        [styles.error]: this.props.error,
        [styles.warning]: this.props.warning,
        [styles.padLeft]: this.props.leftIcon,
        [styles.padRight]: this.props.rightIcon,
      }),
      style: {},
    };
    if (this.props.width) {
      labelProps.style.width = this.props.width;
    }

    if (!Upgrades.isHeight34Enabled()) {
      const size = this.props.size || 'default';
      labelProps.className += ' ' + SIZE_CLASS_NAMES[size];
    }

    var placeholder = null;
    if (this.state.polyfillPlaceholder && this.props.placeholder
        && !this.props.mask && !this.props.value) {
      placeholder = (
        <div className={styles.placeholder}>{this.props.placeholder}</div>
      );
    }

    var leftIcon = null;
    if (this.props.leftIcon) {
      leftIcon = <div className={styles.leftIcon}>{this.props.leftIcon}</div>;
    }
    var rightIcon = null;
    if (this.props.rightIcon) {
      rightIcon = (
        <div className={styles.rightIcon}>{this.props.rightIcon}</div>
      );
    }

    const inputProps = {
      ...filterProps(this.props, INPUT_PASS_PROPS),
      className: classNames({
        [styles.input]: true,
        [styles.borderless]: this.props.borderless,
      }),
      value: this.props.value,
      onChange: (e) => this._handleChange(e),
      style: {},
      ref: this.getInputFromRef,
    };

    const type = this.props.type;
    if (type === 'password') {
      inputProps.type = type;
    }

    if (this.props.align) {
      inputProps.style.textAlign = this.props.align;
    }

    let input = null;
    if (this.props.mask) {
      input = (
        <MaskedInput
          {...inputProps}
          mask={this.props.mask}
          maskChar={
            this.props.maskChar === undefined ? '_' : this.props.maskChar
          }
          alwaysShowMask={this.props.alwaysShowMask}
        />
      );
    } else {
      input = (
        <input
          {...inputProps}
        />
      );
    }

    return (
      <label {...labelProps}>
        {input}
        {placeholder}
        {leftIcon}
        {rightIcon}
      </label>
    );
  }

  componentDidMount() {
    if (polyfillPlaceholder) {
      this.setState({polyfillPlaceholder: true});
    }
  }

  getInputFromRef = (ref: any) => {
    this.input = this.props.mask
      ? ReactDOM.findDOMNode(this).querySelector('input')
      : ref;
  };

  /**
   * @api
   */
  focus() {
    invariant(this.input, 'Cannot call "focus" because Input is not mounted');
    this.input.focus();
  }

  /**
   * @api
   */
  blur() {
    invariant(this.input, 'Cannot call "blur" because Input is not mounted');
    this.input.blur();
  }

  /**
   * @api
   */
  setSelectionRange(start: number, end: number) {
    invariant(
      this.input,
      'Cannot call "setSelectionRange" because Input is not mounted'
    );
    if (this.input.setSelectionRange) {
      this.input.focus();
      // $FlowIssue: suppressing the error of possibly null value of this.input
      this.input.setSelectionRange(start, end);
    } else if (this.input.createTextRange) {
      const range = this.input.createTextRange();
      range.collapse(true);
      range.moveEnd('character', end);
      range.moveStart('character', start);
      range.select();
    }
  }

  _handleChange(event) {
    if (this.props.onChange) {
      this.props.onChange(event, event.target.value);
    }
  }
}
