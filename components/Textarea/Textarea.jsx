import classNames from 'classnames';
import React, {PropTypes} from 'react';

import filterProps from '../filterProps';

import '../ensureOldIEClassName';
import styles from './Textarea.less';

const PASS_PROPS = {
  autoFocus: true,
  defaultValue: true,
  disabled: true,
  maxLength: true,
  placeholder: true,
  rows: true,
  value: true,
};

const Textarea = React.createClass({
  propTypes: {
    defaultValue: PropTypes.string,

    disabled: PropTypes.bool,

    /**
     * Визуально показать наличие ошибки.
     */
    error: PropTypes.bool,

    maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /**
     * Количество строк
     */
    rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    placeholder: PropTypes.string,

    value: PropTypes.string,

    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    onChange: PropTypes.func,
  },

  getDefaultProps() {
    return {
      rows: '3',
    };
  },

  render() {
    const props = filterProps(this.props, PASS_PROPS);
    props.className = classNames({
      [styles.root]: true,
      [styles.error]: this.props.error,
    });
    props.style = {};

    if (this.props.width) {
      props.style.width = this.props.width;
    }

    return (
      <textarea {...props} onChange={this.handleChange} />
    );
  },

  handleChange(event) {
    if (this.props.onChange) {
      this.props.onChange(event, event.target.value);
    }
  },
});

module.exports = Textarea;
