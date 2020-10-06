import React from 'react';
import PropTypes from 'prop-types';

import { isKeyCapsLock } from '../../lib/events/keyboard/identifiers';
import { KeyboardEventCodes as Codes } from '../../lib/events/keyboard/KeyboardEventCodes';
import { Input, InputProps } from '../Input';
import { Nullable } from '../../typings/utility-types';
import { EyeClosedIcon, EyeOpenedIcon } from '../../internal/icons/16px';
import { isIE11 } from '../../lib/client';

import { jsStyles } from './PasswordInput.styles';

export type PasswordInputProps = {
  detectCapsLock?: boolean;
} & InputProps;

export interface PasswordInputState {
  visible: boolean;
  capsLockEnabled?: boolean | null;
}

/**
 * Компонент для ввода пароля
 */
export class PasswordInput extends React.Component<PasswordInputProps, PasswordInputState> {
  public static __KONTUR_REACT_UI__ = 'PasswordInput';

  public static propTypes = {
    /**
     * Включает CapsLock детектор
     */
    detectCapsLock: PropTypes.bool,
  };

  public static defaultProps = {
    size: 'small',
  };

  public state: PasswordInputState = {
    visible: false,
    capsLockEnabled: false,
  };

  private input: Nullable<Input>;

  public UNSAFE_componentWillMount() {
    if (this.props.detectCapsLock) {
      this.setState({ capsLockEnabled: null });
    }

    // @ts-ignore
    if (isIE11 && !window.document.msCapsLockWarningOff) {
      // turns off default ie capslock warning
      // @ts-ignore
      window.document.msCapsLockWarningOff = true;
    }
  }

  public render() {
    return <div className={jsStyles.root()}>{this.renderInput()}</div>;
  }

  /**
   * @public
   */
  public focus = () => {
    if (this.input) {
      this.input.focus();
    }
  };

  /**
   * @public
   */
  public blur = () => {
    this.handleBlur();
  };

  private handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { onKeyPress, detectCapsLock } = this.props;

    if (onKeyPress) {
      onKeyPress(e);
    }

    if (!detectCapsLock) {
      return;
    }

    const capsLockEnabled = e.getModifierState(Codes.CapsLock);

    this.setState({ capsLockEnabled });
  };

  private handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const {
      props: { detectCapsLock, onKeyDown },
      state: { capsLockEnabled },
    } = this;

    if (onKeyDown) {
      onKeyDown(e);
    }

    if (!detectCapsLock) {
      return;
    }

    if (isKeyCapsLock(e) && capsLockEnabled != null) {
      this.setState({ capsLockEnabled: !capsLockEnabled });
    }
  };

  private handleToggleVisibility = () => {
    this.setState(prevState => ({ visible: !prevState.visible }), this.handleFocus);
  };

  private handleFocus = () => {
    if (this.input) {
      this.input.focus();
    }
  };

  private handleBlur = () => {
    if (this.input) {
      this.input.blur();
    }
  };

  private renderEye = () => {
    const { capsLockEnabled } = this.state;

    return (
      <span className={jsStyles.iconWrapper()}>
        {capsLockEnabled && <span className={jsStyles.capsLockDetector()} />}
        <span
          data-tid="PasswordInputEyeIcon"
          className={jsStyles.toggleVisibility()}
          onClick={this.handleToggleVisibility}
        >
          {this.state.visible ? <EyeClosedIcon size={14} /> : <EyeOpenedIcon size={14} />}
        </span>
      </span>
    );
  };

  private refInput = (element: Input) => {
    this.input = element;
  };

  private renderInput() {
    const { detectCapsLock, ...props } = this.props;
    const inputProps = {
      ...props,
      onKeyDown: this.handleKeydown,
      onKeyPress: this.handleKeyPress,
      rightIcon: this.renderEye(),
    };
    return <Input ref={this.refInput} type={this.state.visible ? 'text' : 'password'} {...inputProps} />;
  }
}
