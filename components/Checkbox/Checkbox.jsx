import classNames from 'classnames';
import events from 'add-event-listener';
import React, {PropTypes} from 'react';

import Icon from '../Icon';

import '../ensureOldIEClassName';
import styles from './Checkbox.less';

var Checkbox = React.createClass({
  propTypes: {
    checked: PropTypes.bool,

    disabled: PropTypes.bool,
  },

  render() {
    var rootClass = classNames({
      [styles.root]: true,
      [styles.isChecked]: this.state.checked,
      [styles.isActive]: this.state.active,
      [styles.isFocused]: this.state.focused,
      [styles.isDisabled]: this.props.disabled,
    });

    return (
      <label className={rootClass} onMouseDown={this.handleActivate}>
        <input type="checkbox" className={styles.input}
          checked={this.state.checked}
          disabled={this.props.disabled}
          onChange={this.handleChange} onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        <span className={styles.box}>
          <div className={styles.ok}><Icon name="ok" /></div>
        </span>
        <span className={styles.caption}>{this.props.children}</span>
      </label>
    );
  },

  getInitialState() {
    return {
      checked: this.props.checked !== undefined ? this.props.checked : false,
      active: false,
      focused: false,
    };
  },

  componentWillReceiveProps(props) {
    if (props.checked !== undefined) {
      this.setState({checked: props.checked});
    }
  },

  handleActivate(event) {
    if (event.button !== 0) {
      return;
    }

    this.setState({active: true});

    events.addEventListener(document, 'mouseup', this.deactivate);
  },

  deactivate() {
    this.setState({active: false});

    events.removeEventListener(document, 'mouseup', this.deactivate);
  },

  handleChange(event) {
    if (this.props.checked === undefined) {
      this.setState({checked: event.target.checked});
    }

    this.props.onChange && this.props.onChange(event);
  },

  handleFocus() {
    this.setState({focused: true});
  },

  handleBlur() {
    this.setState({focused: false});
  },
});

module.exports = Checkbox;
