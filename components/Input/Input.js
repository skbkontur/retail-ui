// @flow

import classNames from 'classnames';
import MaskedInput from 'react-input-mask';
import * as React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import invariant from 'invariant';

import filterProps from '../filterProps';
import polyfillPlaceholder from '../polyfillPlaceholder';
import '../ensureOldIEClassName';
import styles from './Input.less';

const INPUT_PASS_PROPS = {
  autoFocus: true,
  disabled: true,
  id: true,
  maxLength: true,
  placeholder: !polyfillPlaceholder,
  title: true,

  onBlur: true,
  onCopy: true,
  onCut: true,
  onFocus: true,
  onInput: true,
  onKeyDown: true,
  onKeyPress: true,
  onKeyUp: true,
  onPaste: true
};

const SIZE_CLASS_NAMES = {
  small: styles.sizeSmall,
  medium: styles.sizeMedium,
  large: styles.sizeLarge
};

export type Props = {
  align?: 'left' | 'center' | 'right',
  alwaysShowMask?: boolean,
  borderless?: boolean,
  className?: string, // TODO: kill it
  disabled?: boolean,
  error?: boolean,
  id?: string,
  leftIcon?: React.Node,
  mask?: string,
  maskChar?: ?string,
  maxLength?: number | string,
  placeholder?: string,
  rightIcon?: React.Node,
  size?: 'small' | 'medium' | 'large',
  title?: string,
  type?: 'password' | 'text',
  value?: string,
  warning?: boolean,
  width?: number | string,
  onBlur?: (e: Event) => void,
  onChange?: (e: SyntheticInputEvent<HTMLInputElement>, v: string) => void,
  onCopy?: (e: SyntheticClipboardEvent<>) => void,
  onCut?: (e: SyntheticClipboardEvent<>) => void,
  onFocus?: (e: SyntheticFocusEvent<>) => void,
  onInput?: (e: SyntheticInputEvent<>) => void,
  onKeyDown?: (e: SyntheticKeyboardEvent<>) => void,
  onKeyPress?: (e: SyntheticKeyboardEvent<>) => void,
  onKeyUp?: (e: SyntheticKeyboardEvent<>) => void,
  onPaste?: (e: SyntheticFocusEvent<>) => void,
  onMouseEnter?: (e: SyntheticMouseEvent<>) => void,
  onMouseLeave?: (e: SyntheticMouseEvent<>) => void,
  onMouseOver?: (e: SyntheticMouseEvent<>) => void
};

type State = {
  polyfillPlaceholder: boolean
};

export default class Input extends React.Component<Props, State> {
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

  static defaultProps = {
    size: 'small'
  };

  state: State = {
    polyfillPlaceholder: false
  };

  input: ?HTMLInputElement = null;

  render() {
    const className: string = this.props.className || '';
    const sizeClassName =
      SIZE_CLASS_NAMES[this.props.size || Input.defaultProps.size];
    var labelProps = {
      className: classNames({
        [styles.root]: true,
        [className]: true,
        [styles.disabled]: this.props.disabled,
        [styles.error]: this.props.error,
        [styles.warning]: this.props.warning,
        [styles.padLeft]: this.props.leftIcon,
        [styles.padRight]: this.props.rightIcon,
        [sizeClassName]: true
      }),
      style: {},
      onMouseEnter: this.props.onMouseEnter,
      onMouseLeave: this.props.onMouseLeave,
      onMouseOver: this.props.onMouseOver
    };
    if (this.props.width) {
      labelProps.style.width = this.props.width;
    }

    var placeholder = null;

    if (
      this.state.polyfillPlaceholder &&
      this.props.placeholder &&
      !this.props.mask &&
      !this.props.value
    ) {
      placeholder = (
        <div
          className={styles.placeholder}
          style={{ textAlign: this.props.align || 'inherit' }}
        >
          {this.props.placeholder}
        </div>
      );
    }

    var leftIcon = null;
    if (this.props.leftIcon) {
      leftIcon = (
        <div className={styles.leftIcon}>
          {this.props.leftIcon}
        </div>
      );
    }
    var rightIcon = null;
    if (this.props.rightIcon) {
      rightIcon = (
        <div className={styles.rightIcon}>
          {this.props.rightIcon}
        </div>
      );
    }

    const inputProps = {
      ...filterProps(this.props, INPUT_PASS_PROPS),
      className: classNames({
        [styles.input]: true,
        [styles.borderless]: this.props.borderless
      }),
      value: this.props.value,
      onChange: e => this._handleChange(e),
      style: {},
      ref: this.getInputFromRef
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
      input = <input {...inputProps} />;
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
      this.setState({ polyfillPlaceholder: true });
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (polyfillPlaceholder && !nextProps.value) {
      this.setState({ polyfillPlaceholder: true });
    }
  }

  getInputFromRef = (ref: HTMLInputElement | MaskedInput) => {
    // $FlowIssue
    const elem: HTMLInputElement = ReactDOM.findDOMNode(this);
    // $FlowIssue should return HTMLInputElement
    this.input = this.props.mask ? elem.querySelector('input') : ref;
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
    if (polyfillPlaceholder) {
      const fieldIsEmpty = event.target.value === '';
      if (this.state.polyfillPlaceholder !== fieldIsEmpty) {
        this.setState({ polyfillPlaceholder: fieldIsEmpty });
      }
    }

    if (this.props.onChange) {
      this.props.onChange(event, event.target.value);
    }
  }
}
