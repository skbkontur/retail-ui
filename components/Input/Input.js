import classNames from 'classnames';
import MaskedInput from 'react-input-mask';
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

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

  onFocus: true,
  onBlur: true,
  onKeyDown: true,
};

const SIZE_CLASS_NAMES = {
  small: styles.deprecated_sizeSmall,
  default: styles.deprecated_sizeDefault,
  large: styles.deprecated_sizeLarge,
};

const PASS_TYPES = {
  password: true,
};

class Input extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool,

    /**
     * ID для использования с элементом label.
     */
    id: PropTypes.string,

    maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    placeholder: PropTypes.string,

    title: PropTypes.string,

    value: PropTypes.any,

    defaultValue: PropTypes.any,

    align: PropTypes.oneOf(['left', 'center', 'right']),

    /**
     * DEPRECATED
     */
    size: PropTypes.oneOf(['small', 'default', 'large']),

    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /**
     * Визуально показать наличие ошибки.
     */
    error: PropTypes.bool,

    /**
     * Визуально показать наличие предупреждения.
     */
    warning: PropTypes.bool,

    /**
     * Иконка слева инпута.
     */
    leftIcon: PropTypes.element,

    /**
     * Иконка справа инпута.
     */
    rightIcon: PropTypes.element,

    /**
     * Вызывается при вводе каждого символа.
     */
    onChange: PropTypes.func,

    onBlur: PropTypes.func,

    onKeyDown: PropTypes.func,

    /**
     * Не отрисовывать рамку.
     */
    borderless: PropTypes.bool,

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

    /**
     * Показывать маску, даже если ничего не введено.
     */
    alwaysShowMask: PropTypes.bool,

    type: PropTypes.oneOf(['password']),
  };

  static defaultProps = {
    size: 'default',
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      value: props.value !== undefined ? props.value
          : (props.mask ? null : props.defaultValue),
    };
  }

  render() {
    var labelProps = {
      className: classNames({
        [styles.root]: true,
        [this.props.className || '']: true,
        [styles.borderless]: this.props.borderless,
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

    if (!Upgrades.__height34) {
      labelProps.className += ' ' + SIZE_CLASS_NAMES[this.props.size];
    }

    var placeholder = null;
    if (this.state.polyfillPlaceholder && this.props.placeholder
        && !this.props.mask && !this.state.value) {
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
      className: styles.input,
      value: this.state.value,
      onChange: (e) => this.handleChange(e),
      style: {},
    };
    
    const type = this.props.type;
    if (PASS_TYPES[type]) {
      inputProps.type = type;
    }

    if (this.props.align) {
      inputProps.style.textAlign = this.props.align;
    }

    let input = null;
    if (this.props.mask) {
      input = (
        <MaskedInput {...inputProps} mask={this.props.mask}
          maskChar={this.props.maskChar === undefined ? '_' : this.props.maskChar}
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
      this.setState({polyfillPlaceholder: true});
    }
  }

  componentWillReceiveProps(props) {
    if (props.value !== undefined) {
      this.setState({value: props.value});
    }
  }

  /**
   * @api
   */
  focus() {
    ReactDOM.findDOMNode(this).querySelector('input').focus();
  }

  /**
   * @api
   */
  setSelectionRange(start, end) {
    const input = ReactDOM.findDOMNode(this).querySelector('input');
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

  handleChange(event) {
    if (this.props.value === undefined) {
      this.setState({value: event.target.value});
    }

    if (this.props.onChange) {
      this.props.onChange(event, event.target.value);
    }
  }
}

export default Input;
