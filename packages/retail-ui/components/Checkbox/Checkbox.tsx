import events from 'add-event-listener';
import classNames from 'classnames';
import * as React from 'react';

import * as PropTypes from 'prop-types';

import Icon from '../Icon';

import '../ensureOldIEClassName';
import Upgrades from '../../lib/Upgrades';
import { Nullable, Override } from '../../typings/utility-types';

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

export type CheckboxProps = Override<
  React.InputHTMLAttributes<HTMLInputElement>,
  {
    children?: React.ReactNode;
    error?: boolean;
    warning?: boolean;
    onMouseEnter?: React.MouseEventHandler<HTMLLabelElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLLabelElement>;
    onMouseOver?: React.MouseEventHandler<HTMLLabelElement>;
    onChange?: (
      event: React.ChangeEvent<HTMLInputElement>,
      value: boolean
    ) => void;
  }
>;

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
    const {
      children,
      error,
      warning,
      onMouseEnter,
      onMouseLeave,
      onMouseOver,
      onChange,

      style,
      className,
      type,
      ...rest
    } = this.props;
    const hasCaption = !!children;

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
      ...rest,
      type: 'checkbox',
      className: styles.input,
      onChange: this._handleChange,
      onFocus: this._handleFocus,
      onBlur: this._handleBlur,
      ref: this._inputRef
    };

    let caption = null;
    if (hasCaption) {
      caption = <div className={styles.caption}>{children}</div>;
    }

    return (
      <label
        className={rootClass}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseOver={onMouseOver}
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
