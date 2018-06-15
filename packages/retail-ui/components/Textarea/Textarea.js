import classNames from 'classnames';
import React from 'react';

import PropTypes from 'prop-types';

import filterProps from '../filterProps';
import polyfillPlaceholder from '../polyfillPlaceholder';
import '../ensureOldIEClassName';
import throttle from 'lodash.throttle';
import LayoutEvents from '../../lib/LayoutEvents';
import { getTextAreaHeight } from './TextareaHelpers';

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

  _fakeNode;

  _layoutEvents;

  constructor(props, context) {
    super(props, context);

    this.state = {
      polyfillPlaceholder: false
    };
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

  componentDidUpdate(prevProps) {
    if (
      (this.props.autoResize && this.props.rows > this.state.rows) ||
      this.props.value !== prevProps.value
    ) {
      this._autoresize();
    }
  }

  render() {
    const rootProps = {};
    const props = filterProps(this.props, PASS_PROPS);
    props.className = classNames({
      [styles.textarea]: true,
      [styles.error]: this.props.error
    });
    props.style = {};

    if (this.props.width) {
      rootProps.style = { width: this.props.width };
    }

    if (this.props.resize) {
      Object.assign(props.style, { resize: this.props.resize });
    }

    let placeholder = null;

    if (this.state.polyfillPlaceholder && !this.props.value) {
      placeholder = (
        <span className={styles.placeholder}>{this.props.placeholder}</span>
      );
    }

    let fakeTextarea = null;
    if (this.props.autoResize) {
      props.onCut = this._autoresize;
      props.onPaste = this._autoresize;
      Object.assign(props.style, { resize: 'none' });
      const fakeProps = {
        value: props.value,
        defaultValue: props.defaultValue,
        className: classNames(props.className, styles.fake),
        readOnly: true
      };
      fakeTextarea = <textarea {...fakeProps} ref={this._refFake} />;
    }

    return (
      <label {...rootProps} className={styles.root}>
        {placeholder}
        <textarea {...props} ref={this._ref} onChange={this._handleChange} />
        {fakeTextarea}
      </label>
    );
  }

  _autoresize = throttle(() => {
    const fakeNode = this._fakeNode;
    if (!fakeNode) {
      return;
    }
    const node = this._node;
    if (!node) {
      return;
    }
    if (this.props.value === undefined) {
      fakeNode.value = node.value;
    }
    const { rows, maxRows } = this.props;
    const { height, exceededMaxHeight } = getTextAreaHeight(
      fakeNode,
      rows,
      maxRows
    );
    node.style.height = height + 'px';
    node.style.overflowY = exceededMaxHeight ? 'scroll' : 'hidden';
    fakeNode.style.overflowY = exceededMaxHeight ? 'scroll' : 'hidden';
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
   * @public
   **/
  focus() {
    if (this._node) {
      this._node.focus();
    }
  }

  /**
   * @public
   **/
  blur() {
    if (this._node) {
      this._node.blur();
    }
  }

  _ref = el => {
    this._node = el;
  };

  _refFake = el => {
    this._fakeNode = el;
  };
}

export default Textarea;
