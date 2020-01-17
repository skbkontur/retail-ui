import * as React from 'react';
import * as PropTypes from 'prop-types';
import { isKeyCapsLock } from '../../lib/events/keyboard/identifiers';
import Codes from '../../lib/events/keyboard/KeyboardEventCodes';

import Input from '../Input';
import { InputProps } from '../Input/Input';
import { isIE } from '../ensureOldIEClassName';
import { Nullable } from '../../typings/utility-types';

import styles from './PasswordInput.module.less';
import { EyeOpenedIcon, EyeClosedIcon } from '../internal/icons/16px';

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
export default class PasswordInput extends React.Component<PasswordInputProps, PasswordInputState> {
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
    return <div className={styles.root}>{this.renderInput()}</div>;
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
      <span className={styles.iconWrapper}>
        {capsLockEnabled && <span className={styles.capsLockDetector} />}
        <span data-tid="PasswordInputEyeIcon" className={styles.toggleVisibility} onClick={this.handleToggleVisibility}>
          {this.state.visible ? <EyeOpenedIcon size={14} /> : <EyeClosedIcon size={14} />}
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
