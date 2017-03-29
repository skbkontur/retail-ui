// @flow

import events from 'add-event-listener';
import classNames from 'classnames';
import React, { PropTypes } from 'react';

import Icon from '../Icon';

const KEYCODE_TAB = 9;

let isListening: boolean;
let tabPressed: boolean;

function listenTabPresses() {
  if (!isListening) {
    events.addEventListener(window, 'keydown', (event: KeyboardEvent) => {
      tabPressed = event.keyCode === KEYCODE_TAB;
    });
    isListening = true;
  }
}

import '../ensureOldIEClassName';
import styles from './Checkbox.less';

type Props = {
  children?: any,
  checked?: boolean,
  disabled?: boolean,
  error?: boolean,
  warning?: boolean,
  onChange?: (event: { target: { value: boolean } }, value: boolean) => void,
  onMouseEnter?: (e: SyntheticMouseEvent) => void,
  onMouseLeave?: (e: SyntheticMouseEvent) => void,
  onMouseOver?: (e: SyntheticMouseEvent) => void
};

class Checkbox extends React.Component {
  static propTypes = {
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    warning: PropTypes.bool,
    onChange: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseOver: PropTypes.func
  };

  props: Props;
  input: ?HTMLInputElement;
  state: {
    focusedByTab: boolean
  } = {
    focusedByTab: false
  }

  _wasFocused = false;

  render() {
    const rootClass = classNames({
      [styles.root]: true,
      [styles.isChecked]: this.props.checked,
      [styles.disabled]: this.props.disabled,
      [styles.error]: this.props.error,
      [styles.warning]: this.props.warning,
      [styles.focus]: this.state.focusedByTab
    });

    const inputProps: Object = {
      type: 'checkbox',
      className: styles.input,
      checked: this.props.checked,
      disabled: this.props.disabled,
      onChange: this.handleChange,
      ref: this._inputRef,
      onFocus: this._handleFocus,
      onBlur: this._handleBlur
    };
    if (this.props.tabIndex) {
      inputProps.tabIndex = this.props.tabIndex;
    }

    return (
      <label
        className={rootClass}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
        onMouseOver={this.props.onMouseOver}
      >
        <input {...inputProps} />
        <span className={styles.box}>
          {this.props.checked &&
            <div className={styles.ok}>
              <Icon name="ok" />
            </div>}
        </span>
        <span className={styles.caption}>{this.props.children}</span>
      </label>
    );
  }

  componentDidMount() {
    listenTabPresses();
  }

  _handleFocus = (e: SyntheticFocusEvent) => {
    if (!this.props.disabled) {
      // focus event fires before keyDown eventlistener
      // so we should check tabPressed in async way
      process.nextTick(() => {
        if (tabPressed) {
          this.setState({ focusedByTab: true });
          tabPressed = false;
        }
      });
    }
  };

  _handleBlur = () => {
    this.setState({ focusedByTab: false });
  }

  _inputRef = (ref: HTMLInputElement) => {
    this.input = ref;
  };

  handleChange = (event: { target: { checked: boolean } }) => {
    const checked = event.target.checked;
    this.props.onChange && this.props.onChange((event: any), checked);
  };
}

export default Checkbox;
