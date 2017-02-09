import classNames from 'classnames';
import React, {PropTypes} from 'react';

import filterProps from '../filterProps';
import Upgrades from '../../lib/Upgrades';

import '../ensureOldIEClassName';
import styles from './Textarea.less';

const PASS_PROPS = {
  autoFocus: true,
  defaultValue: true,
  disabled: true,
  maxLength: true,
  placeholder: true,
  rows: true,
  title: true,
  value: true,

  onFocus: true,
  onBlur: true,

  onMouseEnter: true,
  onMouseLeave: true,
  onMouseOver: true,
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

    onMouseOver: PropTypes.func,
  };

  static defaultProps = {
    rows: '3',
  };

  _node: HTMLTextAreaElement;

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const props = filterProps(this.props, PASS_PROPS);
    props.className = classNames({
      [styles.root]: true,
      [styles.error]: this.props.error,

      [styles.deprecated_oldSize]: !Upgrades.isHeight34Enabled(),
    });
    props.style = {};

    if (this.props.width) {
      props.style.width = this.props.width;
    }

    return (
      <textarea {...props} ref={this._ref} onChange={this.handleChange} />
    );
  }

  handleChange = event => {
    if (this.props.onChange) {
      this.props.onChange(event, event.target.value);
    }
  };

  focus() {
    if (this._node) {
      this._node.focus();
    }
  }

  _ref = (el) => {
    this._node = el;
  }
}

export default Textarea;
