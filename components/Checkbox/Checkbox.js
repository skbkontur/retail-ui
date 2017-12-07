// @flow

import events from 'add-event-listener';
import classNames from 'classnames';
import * as React from 'react';

import PropTypes from 'prop-types';

import Icon from '../Icon';

import '../ensureOldIEClassName';
import Upgrades from '../../lib/Upgrades';

const isFlatDisign = Upgrades.ifFlatDisignEnabled();

const styles = isFlatDisign
  ? require('./Checkbox.flat.less')
  : require('./Checkbox.less');

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

type Props = {
  checked?: boolean,
  children?: React.Node,
  disabled?: boolean,
  error?: boolean,
  onChange?: (
    event: SyntheticMouseEvent<HTMLInputElement>,
    value: boolean
  ) => void,
  onMouseEnter?: (e: SyntheticMouseEvent<HTMLInputElement>) => void,
  onMouseLeave?: (e: SyntheticMouseEvent<HTMLInputElement>) => void,
  onMouseOver?: (e: SyntheticMouseEvent<HTMLInputElement>) => void,
  warning?: boolean
};

class Checkbox extends React.Component<
  Props,
  {
    focusedByTab: boolean
  }
> {
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

  input: ?HTMLInputElement;
  state: {
    focusedByTab: boolean
  } = {
    focusedByTab: false
  };

  _wasFocused = false;

  render() {
    const hasCaption = !!this.props.children;

    const rootClass = classNames({
      [styles.root]: true,
      [styles.withoutCaption]: !hasCaption,
      [styles.checked]: this.props.checked,
      [styles.disabled]: this.props.disabled,
      [styles.error]: this.props.error,
      [styles.warning]: this.props.warning,
      [styles.focus]: this.state.focusedByTab
    });

    const inputProps = {
      type: 'checkbox',
      className: styles.input,
      checked: this.props.checked,
      disabled: this.props.disabled,
      onChange: this._handleChange,
      onFocus: this._handleFocus,
      onBlur: this._handleBlur,
      ref: this._inputRef,
      tabIndex: undefined
    };

    if (this.props.tabIndex) {
      inputProps.tabIndex = this.props.tabIndex;
    }

    let caption = null;
    if (hasCaption) {
      caption = <div className={styles.caption}>{this.props.children}</div>;
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
          {this.props.checked && (
            <div className={styles.ok}>
              <Icon name="ok" />
            </div>
          )}
        </span>
        {caption}
      </label>
    );
  }

  componentDidMount() {
    listenTabPresses();
  }

  _handleFocus = (e: SyntheticFocusEvent<>) => {
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
  };

  _inputRef = ref => {
    this.input = ref;
  };

  _handleChange = (event: SyntheticMouseEvent<HTMLInputElement>) => {
    const checked = event.currentTarget.checked;
    this.props.onChange && this.props.onChange(event, checked);
  };
}

export default Checkbox;
