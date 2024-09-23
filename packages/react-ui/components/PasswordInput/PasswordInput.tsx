import React, { AriaAttributes } from 'react';
import PropTypes from 'prop-types';
import { globalObject, isBrowser } from '@skbkontur/global-object';

import { locale } from '../../lib/locale/decorators';
import { RenderLayer } from '../../internal/RenderLayer';
import { isNonNullable } from '../../lib/utils';
import { isKeyCapsLock } from '../../lib/events/keyboard/identifiers';
import { KeyboardEventCodes as Codes } from '../../lib/events/keyboard/KeyboardEventCodes';
import { Input, InputProps } from '../Input';
import { Nullable } from '../../typings/utility-types';
import { isIE11 } from '../../lib/client';
import { CommonWrapper, CommonProps, CommonWrapperRestProps } from '../../internal/CommonWrapper';
import { Theme } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { cx } from '../../lib/theming/Emotion';
import { rootNode, TSetRootNode } from '../../lib/rootNode';
import { createPropsGetter } from '../../lib/createPropsGetter';

import { styles } from './PasswordInput.styles';
import { PasswordInputIcon } from './PasswordInputIcon';
import { PasswordInputLocale, PasswordInputLocaleHelper } from './locale';

export interface PasswordInputProps extends Pick<AriaAttributes, 'aria-label'>, CommonProps, InputProps {
  /** Включает CapsLock детектор. */
  detectCapsLock?: boolean;
}

export interface PasswordInputState {
  visible: boolean;
  capsLockEnabled?: boolean | null;
}

export const PasswordInputDataTids = {
  root: 'PasswordInput',
  capsLockDetector: 'PasswordInputCapsLockDetector',
  eyeIcon: 'PasswordInputEyeIcon',
} as const;

type DefaultProps = Required<Pick<PasswordInputProps, 'size'>>;

/**
 * `PasswordInput` — однострочное поле для ввода пароля, в котором символы заменяются на точки.
 *
 * Не используйте такое поле для ввода одноразовых кодов из смс. У них короткий срок действия и используются они только один раз.
 */
@rootNode
@locale('PasswordInput', PasswordInputLocaleHelper)
export class PasswordInput extends React.PureComponent<PasswordInputProps, PasswordInputState> {
  public static __KONTUR_REACT_UI__ = 'PasswordInput';
  public static displayName = 'PasswordInput';

  public static propTypes = {
    /**
     * Включает CapsLock детектор
     */
    detectCapsLock: PropTypes.bool,
  };

  public static defaultProps: DefaultProps = {
    size: 'small',
  };

  private getProps = createPropsGetter(PasswordInput.defaultProps);

  public state: PasswordInputState = {
    visible: false,
    capsLockEnabled: false,
  };

  private theme!: Theme;

  private input: Nullable<Input>;
  private setRootNode!: TSetRootNode;
  private readonly locale!: PasswordInputLocale;

  public componentDidMount() {
    if (this.props.detectCapsLock) {
      this.setState({ capsLockEnabled: null });
    }

    // @ts-expect-error: IE-specific API.
    if (isIE11 && isBrowser(globalObject) && !globalObject.document.msCapsLockWarningOff) {
      // @ts-expect-error: Read the comment above.
      // turns off default ie capslock warning
      globalObject.document.msCapsLockWarningOff = true;
    }
  }

  public static getDerivedStateFromProps(props: PasswordInputProps, state: PasswordInputState) {
    if (props.disabled) {
      return { visible: false };
    }

    return state;
  }

  public render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return (
            <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
              {this.renderMain(this.props)}
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

    if (isKeyCapsLock(e) && isNonNullable(capsLockEnabled)) {
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
    switch (this.getProps().size) {
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
        {capsLockEnabled && (
          <span className={styles.capsLockDetector()} data-tid={PasswordInputDataTids.capsLockDetector} />
        )}
        <span className={cx(styles.toggleVisibility(this.theme), this.getEyeWrapperClassname())}>
          {!this.props.disabled && (
            <button
              type="button"
              aria-label={this.state.visible ? this.locale.eyeClosedAriaLabel : this.locale.eyeOpenedAriaLabel}
              onClick={this.handleToggleVisibility}
              className={styles.icon()}
              data-tid={PasswordInputDataTids.eyeIcon}
            >
              <PasswordInputIcon size={this.props.size} visible={this.state.visible} />
            </button>
          )}
        </span>
      </span>
    );
  };

  private refInput = (element: Input) => {
    this.input = element;
  };

  private hideSymbols = () => {
    this.setState({ visible: false });
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
      <RenderLayer onFocusOutside={this.hideSymbols} onClickOutside={this.hideSymbols}>
        <div data-tid={PasswordInputDataTids.root} className={styles.root()}>
          <Input ref={this.refInput} type={this.state.visible ? 'text' : 'password'} {...inputProps} />
        </div>
      </RenderLayer>
    );
  };
}
