import type { AriaAttributes, JSX } from 'react';
import React from 'react';
import type { Emotion } from '@emotion/css/create-instance';

import { locale } from '../../lib/locale/decorators.js';
import { RenderLayer } from '../../internal/RenderLayer/index.js';
import { isNonNullable } from '../../lib/utils.js';
import { isKeyCapsLock } from '../../lib/events/keyboard/identifiers.js';
import { KeyboardEventCodes as Codes } from '../../lib/events/keyboard/KeyboardEventCodes.js';
import type { InputProps } from '../Input/index.js';
import { Input } from '../Input/index.js';
import type { Nullable } from '../../typings/utility-types.js';
import type { CommonProps, CommonWrapperRestProps } from '../../internal/CommonWrapper/index.js';
import { CommonWrapper } from '../../internal/CommonWrapper/index.js';
import type { Theme } from '../../lib/theming/Theme.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode/index.js';
import { rootNode } from '../../lib/rootNode/index.js';
import { withSize } from '../../lib/size/SizeDecorator.js';
import type { SizeProp } from '../../lib/types/props.js';
import { createPropsGetter } from '../../lib/createPropsGetter.js';
import { withRenderEnvironment } from '../../lib/renderEnvironment/index.js';

import { getStyles } from './PasswordInput.styles.js';
import { PasswordInputIcon } from './PasswordInputIcon.js';
import type { PasswordInputLocale } from './locale/index.js';
import { PasswordInputLocaleHelper } from './locale/index.js';

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
@withRenderEnvironment
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

  private emotion!: Emotion;
  private cx!: Emotion['cx'];
  private styles!: ReturnType<typeof getStyles>;
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
  }

  public static getDerivedStateFromProps(props: PasswordInputProps, state: PasswordInputState) {
    if (props.disabled) {
      return { visible: false };
    }

    return state;
  }

  public render(): JSX.Element {
    this.styles = getStyles(this.emotion);

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
  public focus = (): void => {
    if (this.input) {
      this.input.focus();
    }
  };

  /** Программно снимает фокус с кнопки.
   * @public
   */
  public blur = (): void => {
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
        return this.styles.eyeWrapperLarge(this.theme);
      case 'medium':
        return this.styles.eyeWrapperMedium(this.theme);
      case 'small':
      default:
        return this.styles.eyeWrapperSmall(this.theme);
    }
  }

  private renderEye = () => {
    const { capsLockEnabled } = this.state;

    return (
      <span className={this.styles.iconWrapper()}>
        {capsLockEnabled && (
          <span className={this.styles.capsLockDetector()} data-tid={PasswordInputDataTids.capsLockDetector} />
        )}
        <span className={this.cx(this.styles.toggleVisibility(this.theme), this.getEyeWrapperClassname())}>
          {!this.props.disabled && (
            <button
              type="button"
              aria-label={this.state.visible ? this.locale.eyeClosedAriaLabel : this.locale.eyeOpenedAriaLabel}
              onClick={this.handleToggleVisibility}
              className={this.styles.icon()}
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
        <div data-tid={PasswordInputDataTids.root} className={this.styles.root()}>
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
