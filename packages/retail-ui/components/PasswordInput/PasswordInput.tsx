import * as React from 'react';
import * as PropTypes from 'prop-types';
import cn from 'classnames';
import getCharHelper from './getCharHelper';
import Input from '../Input';
import { InputProps } from '../Input/Input';
import Icon from '../Icon';
import PasswordInputFallback from './PasswordInputFallback';
import { ieVerison, isIE } from '../ensureOldIEClassName';

import styles from './PasswordInput.less';
import { Nullable } from '../../typings/utility-types';

export type PasswordInputProps = {
  detectCapsLock?: boolean;
} & InputProps;

export interface PasswordInputState {
  visible: boolean;
  capsLockEnabled?: boolean | null;
}

export type InputProps = {
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  rightIcon: () => React.ReactNode;
} & PasswordInputProps;

/**
 * **DRAFT**
 */
export default class PasswordInput extends React.Component<
  PasswordInputProps,
  PasswordInputState
> {
  public static propTypes = {
    /**
     * Включает CapsLock детектор
     */
    detectCapsLock: PropTypes.bool
  };

  public static defaultProps = {
    size: 'small'
  };

  public state: PasswordInputState = {
    visible: false,
    capsLockEnabled: false
  };

  private _input: Nullable<Input>;

  public componentWillMount() {
    if (this.props.detectCapsLock) {
      this.setState({ capsLockEnabled: null });
    }

    if (isIE && !window.document.msCapsLockWarningOff) {
      // turns off default ie capslock warning
      window.document.msCapsLockWarningOff = true;
    }
  }

  public render() {
    const { capsLockEnabled } = this.state;

    const rootClassNames = cn({
      [styles.root]: true,
      [styles.capsLockEnabled]: capsLockEnabled
    });

    return (
      <div className={rootClassNames}>
        {this._renderInput()}
        {capsLockEnabled && <span className={styles.capsLockDetector} />}
      </div>
    );
  }

  public focus = () => {
    if (this._input) {
      this._input.focus();
    }
  };

  private _handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { onKeyPress, detectCapsLock } = this.props;

    if (onKeyPress) {
      onKeyPress(event);
    }

    if (!detectCapsLock) {
      return;
    }

    const chr = getCharHelper(event);

    if (!chr) {
      return;
    }

    if (chr.toLowerCase() === chr.toUpperCase()) {
      return;
    }

    const capsLockEnabled =
      (chr.toLowerCase() === chr && event.shiftKey) ||
      (chr.toUpperCase() === chr && !event.shiftKey);

    this.setState({ capsLockEnabled });
  };

  private _handleKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const {
      props: { detectCapsLock, onKeyDown },
      state: { capsLockEnabled }
    } = this;

    if (onKeyDown) {
      onKeyDown(event);
    }

    if (!detectCapsLock) {
      return;
    }

    if (event.keyCode === 20 && capsLockEnabled != null) {
      this.setState({ capsLockEnabled: !capsLockEnabled });
    }
  };

  private _handleToggleVisibility = () => {
    this.setState({ visible: !this.state.visible }, this._handleFocus);
  };

  private _handleFocus = () => {
    if (this._input) {
      this._input.focus();
    }
  };

  private _renderEye = () => {
    return (
      <span
        className={styles.toggleVisibility}
        onClick={this._handleToggleVisibility}
      >
        <Icon size={14} name={this.state.visible ? 'EyeOpened' : 'EyeClosed'} />
      </span>
    );
  };

  private _refInput = (element: Input) => {
    this._input = element;
  };

  private _renderInput() {
    const inputProps = {
      ...this.props,
      onKeyDown: this._handleKeydown,
      onKeyPress: this._handleKeyPress,
      rightIcon: this._renderEye()
    };

    if (isIE && ieVerison === 8) {
      return (
        <PasswordInputFallback
          refInput={this._refInput}
          visible={this.state.visible}
          {...inputProps}
        />
      );
    }

    return (
      <Input
        ref={this._refInput}
        type={this.state.visible ? 'text' : 'password'}
        {...inputProps}
      />
    );
  }
}
