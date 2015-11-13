import classNames from 'classnames';
import React, {PropTypes} from 'react';

import filterProps from '../filterProps';

import '../ensureOldIEClassName';
import styles from './Input.less';

var polyfillPlaceholder = false;
if (typeof window !== 'undefined' && window.document
    && window.document.createElement) {
  polyfillPlaceholder = !('placeholder' in document.createElement('input'));
}

const INPUT_PASS_PROPS = {
  disabled: true,
  maxLength: true,
  placeholder: true,

  onFocus: true,
  onBlur: true,
  onKeyDown: true,
};

const Input = React.createClass({
  propTypes: {
    disabled: PropTypes.bool,

    maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    placeholder: PropTypes.string,

    value: PropTypes.any,

    defaultValue: PropTypes.any,

    align: PropTypes.oneOf(['left', 'center', 'right']),

    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /**
     * Визуально показать наличие ошибки.
     */
    error: PropTypes.bool,

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
  },

  render() {
    var labelProps = {
      className: classNames({
        [styles.root]: true,
        [this.props.className || '']: true,
        [styles.disabled]: this.props.disabled,
        [styles.error]: this.props.error,
        [styles.padLeft]: this.props.leftIcon,
        [styles.padRight]: this.props.rightIcon,
      }),
      style: {},
    };
    if (this.props.width) {
      labelProps.style.width = this.props.width;
    }

    var placeholder = null;
    if (this.state.polyfillPlaceholder && this.props.placeholder
        && !this.state.value) {
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

    const inputProps = filterProps(this.props, INPUT_PASS_PROPS);
    inputProps.style = {};

    if (this.props.align) {
      inputProps.style.textAlign = this.props.align;
    }

    return (
      <label {...labelProps}>
        <input className={styles.input} {...inputProps} value={this.state.value}
          onChange={this.handleChange}
        />
        {placeholder}
        {leftIcon}
        {rightIcon}
      </label>
    );
  },

  getDefaultProps() {
    return {};
  },

  getInitialState() {
    return {
      value: this.props.value !== undefined ? this.props.value
          : this.props.defaultValue,
    };
  },

  componentDidMount() {
    if (polyfillPlaceholder) {
      this.setState({polyfillPlaceholder: true});
    }
  },

  componentWillReceiveProps(props) {
    if (props.value !== undefined) {
      this.setState({value: props.value});
    }
  },

  focus() {
    React.findDOMNode(this).querySelector('input').focus();
  },

  setSelectionRange(start, end) {
    const input = React.findDOMNode(this).querySelector('input');
    if (input.setSelectionRange) {
      input.focus();
      input.setSelectionRange(start, end);
    } else if (input.createTextRange) {
      var range = input.createTextRange();
      range.collapse(true);
      range.moveEnd('character', end);
      range.moveStart('character', start);
      range.select();
    }
  },

  handleChange(event) {
    if (this.props.value === undefined) {
      this.setState({value: event.target.value});
    }

    if (this.props.onChange) {
      this.props.onChange(event, event.target.value);
    }
  },
});

module.exports = Input;
