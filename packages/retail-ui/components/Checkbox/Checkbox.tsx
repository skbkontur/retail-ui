import events from 'add-event-listener';
import classNames from 'classnames';
import * as React from 'react';

import PropTypes from 'prop-types';

import Icon from '../Icon';

import '../ensureOldIEClassName';
import Upgrades from '../../lib/Upgrades';

const isFlatDesign = Upgrades.isFlatDesignEnabled();

const styles = isFlatDesign
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

export interface CheckboxProps {
  checked?: boolean;
  children?: React.ReactNode;
  disabled?: boolean;
  error?: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: boolean
  ) => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseOver?: (e: React.MouseEvent<HTMLElement>) => void;
  warning?: boolean;
  tabIndex?: number;
}

export interface CheckboxState {
  focusedByTab: boolean;
}

class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
  public static propTypes = {
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    warning: PropTypes.bool,
    onChange: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseOver: PropTypes.func
  };
  public state = {
    focusedByTab: false
  };

  private input: Nullable<HTMLInputElement>;

  /** @api */
  public focus() {
    tabPressed = true;
    if (this.input) {
      this.input.focus();
    }
  }

  /** @api */
  public blur() {
    if (this.input) {
      this.input.blur();
    }
  }

  public render() {
    const hasCaption = !!this.props.children;

    const rootClass = classNames({
      [styles.root]: true,
      [styles.withoutCaption]: !hasCaption,
      [styles.checked || '']: this.props.checked,
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
      tabIndex: this.props.tabIndex ? this.props.tabIndex : undefined
    };

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
              <Icon name="Ok" />
            </div>
          )}
        </span>
        {caption}
      </label>
    );
  }

  public componentDidMount() {
    listenTabPresses();
  }

  private _handleFocus = (e: React.FocusEvent<any>) => {
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

  private _handleBlur = () => {
    this.setState({ focusedByTab: false });
  };

  private _inputRef = (ref: HTMLInputElement | null) => {
    this.input = ref;
  };

  private _handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.currentTarget.checked;
    if (this.props.onChange) {
      this.props.onChange(event, checked);
    }
  };
}

export default Checkbox;
