import type { AriaAttributes } from 'react';
import React from 'react';
import { globalObject, isBrowser } from '@skbkontur/global-object';

import { locale } from '../../lib/locale/decorators';
import { RenderLayer } from '../../internal/RenderLayer';
import { isNonNullable } from '../../lib/utils';
import { isKeyCapsLock } from '../../lib/events/keyboard/identifiers';
import { KeyboardEventCodes as Codes } from '../../lib/events/keyboard/KeyboardEventCodes';
import type { InputProps } from '../Input';
import { Input } from '../Input';
import type { Nullable } from '../../typings/utility-types';
import { isIE11 } from '../../lib/client';
import type { CommonProps, CommonWrapperRestProps } from '../../internal/CommonWrapper';
import { CommonWrapper } from '../../internal/CommonWrapper';
import type { Theme } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { cx } from '../../lib/theming/Emotion';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode';
import { rootNode } from '../../lib/rootNode';
import { withSize } from '../../lib/size/SizeDecorator';
import type { SizeProp } from '../../lib/types/props';
import { createPropsGetter } from '../../lib/createPropsGetter';

import { styles } from './PasswordInput.styles';
import { PasswordInputIcon } from './PasswordInputIcon';
import type { PasswordInputLocale } from './locale';
import { PasswordInputLocaleHelper } from './locale';

export interface PasswordInputProps
  extends Pick<AriaAttributes, 'aria-label'>,
    CommonProps,
    Omit<InputProps, 'showClearIcon'> {
  /** Визуально показывает, что активен CapsLock. */
  detectCapsLock?: boolean;
}

export interface PasswordInputState {
  visible: boolean;
  focused: boolean;
  capsLockEnabled?: boolean | null;
}

export const PasswordInputDataTids = {
  root: 'PasswordInput',
  capsLockDetector: 'PasswordInputCapsLockDetector',
  eyeIcon: 'PasswordInputEyeIcon',
} as const;

/**
 * Однострочное поле для ввода пароля, в котором символы заменяются на точки.
 */

@rootNode
@locale('PasswordInput', PasswordInputLocaleHelper)
@withSize
export class PasswordInput extends React.PureComponent<PasswordInputProps, PasswordInputState> {
  public static __KONTUR_REACT_UI__ = 'PasswordInput';
  public static displayName = 'PasswordInput';

  public state: PasswordInputState = {
    visible: false,
    focused: false,
    capsLockEnabled: false,
  };
  private size!: SizeProp;

  private theme!: Theme;

  private input: Nullable<Input>;
  public getRootNode!: TGetRootNode;
  private setRootNode!: TSetRootNode;
  private readonly locale!: PasswordInputLocale;

  private getProps = createPropsGetter({});

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

  public render(): JSX.Element {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return (
            <CommonWrapper rootNodeRef={this.setRootNode} {...this.getProps()}>
              {this.renderMain}
            </CommonWrapper>
          );
        }}
      </ThemeContext.Consumer>
    );
  }

  /** Программно устанавливает фокус на поле.
   * Появляется фокусная рамка, элемент получает клавиатурные события и воспринимается как текущий элемент для чтения скринридерами.
   * @public
   */
  public focus = () => {
    if (this.input) {
      this.input.focus();
    }
  };

  /** Программно снимает фокус с кнопки.
   * @public
   */
  public blur = () => {
    if (this.input) {
      this.input.blur();
    }
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
    this.setState((prevState) => ({ visible: !prevState.visible }), this.focusOnInput);
  };

  private focusOnInput = () => {
    if (this.input) {
      this.input.focus();
    }
  };

  private handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    if (this.state.focused) {
      return;
    }

    this.setState({ focused: true });

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  private handleFocusOutside = () => {
    this.hideSymbols();

    if (this.state.focused) {
      this.setState({ focused: false });
    }
  };

  private getEyeWrapperClassname() {
    switch (this.size) {
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
              <PasswordInputIcon size={this.size} visible={this.state.visible} />
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
    return (
      <RenderLayer
        active={this.state.focused}
        onFocusOutside={this.handleFocusOutside}
        onClickOutside={this.handleFocusOutside}
      >
        <div data-tid={PasswordInputDataTids.root} className={styles.root()}>
          <Input
            ref={this.refInput}
            type={this.state.visible ? 'text' : 'password'}
            onKeyDown={this.handleKeydown}
            onKeyPress={this.handleKeyPress}
            rightIcon={this.renderEye()}
            onFocus={this.handleFocus}
            {...props}
          />
        </div>
      </RenderLayer>
    );
  };
}
