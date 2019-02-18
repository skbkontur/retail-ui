import * as React from 'react';
import * as PropTypes from 'prop-types';
import EyeOpenedIcon from '@skbkontur/react-icons/EyeOpened';
import EyeClosedIcon from '@skbkontur/react-icons/EyeClosed';

import getCharHelper from './getCharHelper';
import Input from '../Input';
import { InputProps } from '../Input/Input';
import PasswordInputFallback from './PasswordInputFallback';
import { ieVerison, isIE } from '../ensureOldIEClassName';
import { Nullable } from '../../typings/utility-types';

import styles from './PasswordInput.less';

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

    // @ts-ignore
    if (isIE && !window.document.msCapsLockWarningOff) {
      // turns off default ie capslock warning
      // @ts-ignore
      window.document.msCapsLockWarningOff = true;
    }
  }

  public render() {
    return <div className={styles.root}>{this._renderInput()}</div>;
  }

  /**
   * @public
   */
  public focus = () => {
    if (this._input) {
      this._input.focus();
    }
  };

  /**
   * @public
   */
  public blur = () => {
    if (this._input) {
      this._input.blur();
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
    this.setState(
      prevState => ({ visible: !prevState.visible }),
      this.state.visible ? this._handleFocus : this._handleBlur);
  };

  private _handleFocus = () => {
    if (this._input) {
      this._input.focus();
    }
  };

  private _handleBlur = () => {
    if (this._input) {
      this._input.blur();
    }
  };

  private _renderEye = () => {
    const { capsLockEnabled } = this.state;

    return (
      <span className={styles.iconWrapper}>
        {capsLockEnabled && <span className={styles.capsLockDetector} />}
        <span
          className={styles.toggleVisibility}
          onClick={this._handleToggleVisibility}
        >
          {this.state.visible ? (
            <EyeOpenedIcon size={14} />
          ) : (
            <EyeClosedIcon size={14} />
          )}
        </span>
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
