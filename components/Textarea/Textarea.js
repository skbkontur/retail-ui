import classNames from 'classnames';
import React from 'react';

import PropTypes from 'prop-types';

import filterProps from '../filterProps';
import polyfillPlaceholder from '../polyfillPlaceholder';
import '../ensureOldIEClassName';
import throttle from 'lodash.throttle';
import LayoutEvents from '../../lib/LayoutEvents';
import getComputedStyle from '../../lib/dom/getComputedStyle';

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
  id: true,

  onFocus: true,
  onBlur: true,

  onMouseEnter: true,
  onMouseLeave: true,
  onMouseOver: true
};

class Textarea extends React.Component {
  static propTypes = {
    autoFocus: PropTypes.bool,

    autoResize: PropTypes.bool,

    defaultValue: PropTypes.string,

    disabled: PropTypes.bool,

    /**
     * Визуально показать наличие ошибки.
     */
    error: PropTypes.bool,

    id: PropTypes.string,

    maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    maxRows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    placeholder: PropTypes.string,

    resize: PropTypes.string,

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
    rows: '3',
    maxRows: '15'
  };

  _node;

  _layoutEvents;

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

    if (this.props.width) {
      rootProps.style = { width: this.props.width };
    }

    if (this.props.resize) {
      props.style = { resize: this.props.resize };
    }

    let placeholder = null;

    if (this.state.polyfillPlaceholder && !this.props.value) {
      placeholder = (
        <span className={styles.placeholder}>{this.props.placeholder}</span>
      );
    }

    if (this.props.autoResize) {
      props.onCut = this._autoresize;
      props.onPaste = this._autoresize;
      Object.assign(props.style, { resize: 'none' });
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
      this.setState({ polyfillPlaceholder: true });
    }
    if (this.props.autoResize) {
      this._autoresize();
      this._layoutEvents = LayoutEvents.addListener(this._autoresize);
    }
  }

  componentWillUnmount() {
    if (this._layoutEvents) {
      this._layoutEvents.remove();
    }
  }

  _autoresize = throttle(() => {
    const node = this._node;
    const { rows, maxRows } = this.props;
    const style = getComputedStyle(node);
    const lineHeight = parseInt(style.lineHeight, 10);
    const paddingTop = parseInt(style.paddingTop, 10);
    const paddingBottom = parseInt(style.paddingBottom, 10);
    const minInnerHeight = rows * lineHeight + paddingTop + paddingBottom;
    const maxInnerHeight = maxRows * lineHeight + paddingTop + paddingBottom;
    const bordersHeight = node.offsetHeight - node.clientHeight;

    node.style.height = 0;

    const expectedHeight = Math.min(
      Math.max(node.scrollHeight + lineHeight, minInnerHeight),
      maxInnerHeight
    );

    node.style.height = expectedHeight + bordersHeight + 'px';
  }, 100);

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

    if (this.props.autoResize) {
      this._autoresize();
    }
  };

  /**
   * @api
   **/
  focus() {
    if (this._node) {
      this._node.focus();
    }
  }

  /**
   * @api
   **/
  blur() {
    if (this._node) {
      this._node.blur();
    }
  }

  _ref = el => {
    this._node = el;
  };
}

export default Textarea;
