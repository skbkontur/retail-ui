import classNames from 'classnames';
import React from 'react';

import PropTypes from 'prop-types';

import filterProps from '../filterProps';
import polyfillPlaceholder from '../polyfillPlaceholder';
import '../ensureOldIEClassName';

import styles from './Textarea.less';

const PASS_PROPS = {
  autoFocus: true,
  defaultValue: true,
  disabled: true,
  maxLength: true,
  placeholder: !polyfillPlaceholder,
  rows: true,
  title: true,
  value: true,

  onFocus: true,
  onBlur: true,

  onMouseEnter: true,
  onMouseLeave: true,
  onMouseOver: true
};

class Textarea extends React.Component {
  static propTypes = {
    defaultValue: PropTypes.string,

    disabled: PropTypes.bool,

    /**
     * Визуально показать наличие ошибки.
     */
    error: PropTypes.bool,

    maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    placeholder: PropTypes.string,

    /**
     * Количество строк
     */
    rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    title: PropTypes.string,

    value: PropTypes.string.isRequired,

    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    onBlur: PropTypes.func,

    onChange: PropTypes.func,

    onFocus: PropTypes.func,

    onMouseEnter: PropTypes.func,

    onMouseLeave: PropTypes.func,

    onMouseOver: PropTypes.func
  };

  static defaultProps = {
    rows: '3'
  };

  _node;

  constructor(props, context) {
    super(props, context);

    this.state = {
      polyfillPlaceholder: false
    };
  }

  render() {
    const rootProps = {};
    const props = filterProps(this.props, PASS_PROPS);
    props.className = classNames({
      [styles.textarea]: true,
      [styles.error]: this.props.error
    });
    rootProps.style = {};

    if (this.props.width) {
      rootProps.style.width = this.props.width;
    }

    let placeholder = null;

    if (this.state.polyfillPlaceholder && !this.props.value) {
      placeholder = (
        <span className={styles.placeholder}>
          {this.props.placeholder}
        </span>
      );
    }

    return (
      <label {...rootProps} className={styles.root}>
        {placeholder}
        <textarea {...props} ref={this._ref} onChange={this._handleChange} />
      </label>
    );
  }

  componentDidMount() {
    if (polyfillPlaceholder) {
      this.setState({
        polyfillPlaceholder: true
      });
    }
  }

  _handleChange = event => {
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

  focus() {
    if (this._node) {
      this._node.focus();
    }
  }

  _ref = el => {
    this._node = el;
  };
}

export default Textarea;
