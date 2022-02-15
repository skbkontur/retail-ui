// TODO: Enable this rule in functional components.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

import { isKeyCapsLock } from '../../lib/events/keyboard/identifiers';
import { KeyboardEventCodes as Codes } from '../../lib/events/keyboard/KeyboardEventCodes';
import { Input, InputProps } from '../Input';
import { Nullable } from '../../typings/utility-types';
import { EyeClosedIcon, EyeOpenedIcon } from '../../internal/icons/16px';
import { isIE11 } from '../../lib/client';
import { CommonWrapper, CommonProps, CommonWrapperRestProps } from '../../internal/CommonWrapper';
import { Theme } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { cx } from '../../lib/theming/Emotion';
import { rootNode, TSetRootNode } from '../../lib/rootNode';

import { styles } from './PasswordInput.styles';

export interface PasswordInputProps extends CommonProps, InputProps {
  detectCapsLock?: boolean;
}

export interface PasswordInputState {
  visible: boolean;
  capsLockEnabled?: boolean | null;
}

/**
 * Компонент для ввода пароля
 */
@rootNode
export class PasswordInput extends React.PureComponent<PasswordInputProps, PasswordInputState> {
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

  private theme!: Theme;

  private input: Nullable<Input>;
  private setRootNode!: TSetRootNode;

  public componentDidMount() {
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
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return (
            <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
              {this.renderMain}
            </CommonWrapper>
          );
        }}
      </ThemeContext.Consumer>
    );
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
    this.setState((prevState) => ({ visible: !prevState.visible }), this.handleFocus);
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

  private getEyeWrapperClassname() {
    switch (this.props.size) {
      case 'large':
        return styles.eyeWrapperLarge(this.theme);
      case 'medium':
        return styles.eyeWrapperMedium(this.theme);
      case 'small':
      default:
        return styles.eyeWrapperSmall(this.theme);
    }
  }

  private renderEye = () => {
    const { capsLockEnabled } = this.state;

    return (
      <span className={styles.iconWrapper()}>
        {capsLockEnabled && <span className={styles.capsLockDetector()} data-tid="PasswordInputCapsLockDetector" />}
        <span
          data-tid="PasswordInputEyeIcon"
          className={cx(styles.toggleVisibility(this.theme), this.getEyeWrapperClassname())}
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

  private renderMain = (props: CommonWrapperRestProps<PasswordInputProps>) => {
    const { detectCapsLock, ...rest } = props;
    const inputProps = {
      ...rest,
      onKeyDown: this.handleKeydown,
      onKeyPress: this.handleKeyPress,
      rightIcon: this.renderEye(),
    };
    return (
      <div className={styles.root()}>
        <Input ref={this.refInput} type={this.state.visible ? 'text' : 'password'} {...inputProps} />
      </div>
    );
  };
}
