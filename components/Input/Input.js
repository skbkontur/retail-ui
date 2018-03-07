// @flow

import classNames from 'classnames';
import MaskedInput from 'react-input-mask/dist/react-input-mask';
import * as React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import invariant from 'invariant';
import styled from '../internal/styledRender';

import filterProps from '../filterProps';
import polyfillPlaceholder from '../polyfillPlaceholder';
import '../ensureOldIEClassName';
import Upgrades from '../../lib/Upgrades';

const isFlatDesign = Upgrades.isFlatDesignEnabled();

let cssStyles;
let jssStyles;
if (process.env.EXPERIMENTAL_CSS_IN_JS) {
  jssStyles = require('./Input.styles').default;
} else {
  cssStyles = isFlatDesign
    ? require('./Input.flat.less')
    : require('./Input.less');
}

const INPUT_PASS_PROPS = {
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
};

export type Props = {
  align?: 'left' | 'center' | 'right',
  alwaysShowMask?: boolean,
  autoFocus?: boolean,
  borderless?: boolean,
  /** @ignore */
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
  size: 'small' | 'medium' | 'large',
  title?: string,
  type?: 'password' | 'text',
  value?: string,
  warning?: boolean,
  width?: number | string,
  onBlur?: (e: SyntheticFocusEvent<HTMLInputElement>) => void,
  onClick?: (e: SyntheticMouseEvent<HTMLInputElement>) => void,
  onDoubleClick?: (e: SyntheticMouseEvent<HTMLInputElement>) => void,
  onMouseUp?: (e: SyntheticMouseEvent<HTMLInputElement>) => void,
  onMouseDown?: (e: SyntheticMouseEvent<HTMLInputElement>) => void,
  onChange?: (e: SyntheticInputEvent<HTMLInputElement>, v: string) => void,
  onCopy?: (e: SyntheticClipboardEvent<HTMLInputElement>) => void,
  onCut?: (e: SyntheticClipboardEvent<HTMLInputElement>) => void,
  onFocus?: (e: SyntheticFocusEvent<HTMLInputElement>) => void,
  onInput?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onKeyDown?: (e: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  onKeyPress?: (e: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  onKeyUp?: (e: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  onPaste?: (e: SyntheticClipboardEvent<HTMLInputElement>) => void,
  onMouseEnter?: (e: SyntheticMouseEvent<HTMLInputElement>) => void,
  onMouseLeave?: (e: SyntheticMouseEvent<HTMLInputElement>) => void,
  onMouseOver?: (e: SyntheticMouseEvent<HTMLInputElement>) => void
};

type State = {
  polyfillPlaceholder: boolean,
  blinking: boolean
};

class Input extends React.Component<Props, State> {
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

  _blinkTimeout;

  state: State = {
    polyfillPlaceholder: false,
    blinking: false
  };

  input: ?HTMLInputElement = null;

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

  componentWillReceiveProps(nextProps: Props) {
    if (polyfillPlaceholder && !nextProps.value) {
      this.setState({ polyfillPlaceholder: true });
    }
  }

  /**
   * @public
   */
  focus() {
    invariant(this.input, 'Cannot call "focus" because Input is not mounted');
    this.input.focus();
  }

  /**
   * @public
   */
  blur() {
    invariant(this.input, 'Cannot call "blur" because Input is not mounted');
    this.input.blur();
  }

  /**
   * @public
   */
  blink() {
    this.setState({ blinking: true }, () => {
      this._blinkTimeout = setTimeout(
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
    invariant(input, 'Cannot call "setSelectionRange" on unmounted Input');

    if (input.setSelectionRange) {
      input.focus();
      input.setSelectionRange(start, end);
    } else if (input.createTextRange) {
      const range = input.createTextRange();
      range.collapse(true);
      range.moveEnd('character', end);
      range.moveStart('character', start);
      range.select();
    }
  }

  render = styled(cssStyles, jssStyles, classes => {
    const labelProps = {
      className: classNames({
        [classes.root]: true,
        [this.props.className || '']: true,
        [classes.disabled]: this.props.disabled,
        [classes.error]: this.props.error,
        [classes.warning]: this.props.warning,
        [classes.padLeft]: this.props.leftIcon,
        [classes.padRight]: this.props.rightIcon,
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
      ref: this._refInput
    };

    if (this.props.type === 'password') {
      inputProps.type = this.props.type;
    }

    let input = this.props.mask
      ? this._renderMaskedInput(inputProps)
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

  _renderMaskedInput(inputProps) {
    return (
      <MaskedInput
        {...inputProps}
        mask={this.props.mask}
        maskChar={this.props.maskChar === undefined ? '_' : this.props.maskChar}
        alwaysShowMask={this.props.alwaysShowMask}
      />
    );
  }

  _renderLeftIcon(classes) {
    return this._renderIcon(this.props.leftIcon, classes.leftIcon, classes);
  }

  _renderRightIcon(classes) {
    return this._renderIcon(this.props.rightIcon, classes.rightIcon, classes);
  }

  _renderIcon(icon, className, classes) {
    return icon ? (
      <div className={className}>
        <span className={classes.icon}>{icon}</span>
      </div>
    ) : null;
  }

  _renderPlaceholder(classes) {
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

  _getSizeClassName(classes) {
    const SIZE_CLASS_NAMES = {
      small: classes.sizeSmall,
      medium: Upgrades.isSizeMedium16pxEnabled()
        ? classes.sizeMedium
        : classes.DEPRECATED_sizeMedium,
      large: classes.sizeLarge
    };

    return SIZE_CLASS_NAMES[this.props.size];
  }

  _refInput = (ref: HTMLInputElement | MaskedInput | null) => {
    // $FlowIssue
    const elem: HTMLElement = ReactDOM.findDOMNode(this);
    // $FlowIssue should return HTMLInputElement
    this.input = this.props.mask ? elem.querySelector('input') : ref;
  };

  _handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
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
