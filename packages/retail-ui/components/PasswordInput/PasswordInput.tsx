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

  private handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
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
      (chr.toLowerCase() === chr && event.shiftKey) || (chr.toUpperCase() === chr && !event.shiftKey);

    this.setState({ capsLockEnabled });
  };

  private handleKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const {
      props: { detectCapsLock, onKeyDown },
      state: { capsLockEnabled },
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

    if (isIE && ieVerison === 8) {
      return <PasswordInputFallback refInput={this.refInput} visible={this.state.visible} {...inputProps} />;
    }

    return <Input ref={this.refInput} type={this.state.visible ? 'text' : 'password'} {...inputProps} />;
  }
}
