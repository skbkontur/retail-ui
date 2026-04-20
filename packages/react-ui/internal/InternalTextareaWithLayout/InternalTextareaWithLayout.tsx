import type { Emotion } from '@emotion/css/create-instance';
import React from 'react';

import { InputDataTids, calculateClearCrossShowedState } from '../../components/Input/index.js';
import type { InputProps } from '../../components/Input/index.js';
import { getStyles as getInputStyles } from '../../components/Input/Input.styles.js';
import { InputLayout } from '../../components/Input/InputLayout/InputLayout.js';
import { DEFAULT_WIDTH, Textarea } from '../../components/Textarea/index.js';
import type { TextareaProps } from '../../components/Textarea/index.js';
import { getStyles as getTextareaStyles } from '../../components/Textarea/Textarea.styles.js';
import { createPropsGetter } from '../../lib/createPropsGetter.js';
import { isTestEnv } from '../../lib/currentEnvironment.js';
import { withRenderEnvironment } from '../../lib/renderEnvironment/index.js';
import { getRootNode, rootNode } from '../../lib/rootNode/index.js';
import type { Theme } from '../../lib/theming/Theme.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import { ThemeFactory } from '../../lib/theming/ThemeFactory.js';
import { ClearCrossIcon } from '../ClearCrossIcon/ClearCrossIcon.js';
import { getStyles } from './InternalTextareaWithLayout.styles.js';

interface InternalTextareaWithLayoutProps
  extends TextareaProps, Pick<InputProps, 'leftIcon' | 'rightIcon' | 'align' | 'borderless' | 'showClearIcon'> {}

interface InternalTextareaWithLayoutState {
  focused: boolean;
  hovered: boolean;
  clearCrossShowed: boolean;
}

@withRenderEnvironment
@rootNode
export class InternalTextareaWithLayout extends React.Component<
  InternalTextareaWithLayoutProps,
  InternalTextareaWithLayoutState
> {
  public static __KONTUR_REACT_UI__ = 'InternalTextareaWithLayout';
  private wrappedComponentRef = React.createRef<Textarea>();
  private theme!: Theme;
  private styles!: ReturnType<typeof getStyles>;
  private inputStyles!: ReturnType<typeof getInputStyles>;
  private textareaStyles!: ReturnType<typeof getTextareaStyles>;
  private emotion!: Emotion;
  private cx!: Emotion['cx'];
  private getProps = createPropsGetter(Textarea.defaultProps);

  public componentDidUpdate(prevProps: Readonly<InternalTextareaWithLayoutProps>) {
    const { focused, hovered } = this.state;
    if (Boolean(prevProps.value) !== Boolean(this.props.value)) {
      this.setState({ clearCrossShowed: this.getClearCrossShowed({ focused, hovered }) });
    }
  }

  private getClearCrossShowed = ({ focused, hovered }: { focused?: boolean; hovered?: boolean }): boolean => {
    if (this.props.disabled) {
      return false;
    }
    return calculateClearCrossShowedState({
      showClearIcon: this.getProps().showClearIcon || 'never',
      notEmptyValue: Boolean(this.props.value),
      focused,
      hovered,
    });
  };

  public state: InternalTextareaWithLayoutState = {
    focused: false,
    hovered: false,
    clearCrossShowed: this.getClearCrossShowed({ focused: false }),
  };

  public focus(): void {
    this.wrappedComponentRef.current?.focus();
  }
  public blur(): void {
    this.wrappedComponentRef.current?.blur();
  }
  public setSelectionRange(start: number, end: number) {
    this.wrappedComponentRef.current?.setSelectionRange(start, end);
  }
  public selectAll() {
    this.wrappedComponentRef.current?.selectAll();
  }
  public getNode() {
    return this.wrappedComponentRef.current?.getNode();
  }

  public render() {
    this.styles = getStyles(this.emotion);
    this.inputStyles = getInputStyles(this.emotion);
    this.textareaStyles = getTextareaStyles(this.emotion);

    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return <span data-tid={'InternalTextareaWithLayout'}>{this.renderLayout()}</span>;
        }}
      </ThemeContext.Consumer>
    );
  }

  private getTextareaSizeClassName() {
    switch (this.getProps().size) {
      case 'large':
        return this.textareaStyles.textareaLarge(this.theme);
      case 'medium':
        return this.textareaStyles.textareaMedium(this.theme);
      case 'small':
      default:
        return this.textareaStyles.textareaSmall(this.theme);
    }
  }

  private getRootSizeClassName() {
    switch (this.getProps().size) {
      case 'large':
        return this.textareaStyles.rootLarge(this.theme);
      case 'medium':
        return this.textareaStyles.rootMedium(this.theme);
      case 'small':
      default:
        return this.textareaStyles.rootSmall(this.theme);
    }
  }

  private handleClearInput = () => {
    if (this.wrappedComponentRef.current) {
      this.wrappedComponentRef.current.clear();

      if (!this.state.focused) {
        this.wrappedComponentRef.current.focus();
      }
    }

    if (this.props.onValueChange) {
      this.props.onValueChange('');
    }
  };

  private getRightIcon = () => {
    const { size, rightIcon } = this.props;

    return this.state.clearCrossShowed ? (
      <ClearCrossIcon data-tid={InputDataTids.clearCross} size={size} onClick={this.handleClearInput} />
    ) : (
      rightIcon
    );
  };

  private handleMouseEnter = () => {
    this.setState({ clearCrossShowed: this.getClearCrossShowed({ focused: this.state.focused, hovered: true }) });
  };

  private handleMouseOut = () => {
    this.setState({ clearCrossShowed: this.getClearCrossShowed({ focused: this.state.focused, hovered: false }) });
  };

  private renderLayout = () => {
    const labelProps = {
      className: this.cx(
        this.styles.contentWrapper(),
        this.textareaStyles.textarea(this.theme),
        this.getTextareaSizeClassName(),
        this.getRootSizeClassName(),
        {
          [this.inputStyles.focus(this.theme)]: this.state.focused && !this.props.warning && !this.props.error,
          [this.inputStyles.borderless()]: this.props.borderless && !this.state.focused,
          [this.textareaStyles.disabled(this.theme)]: this.props.disabled,
          [this.textareaStyles.warning(this.theme)]: this.props.warning,
          [this.textareaStyles.error(this.theme)]: this.props.error,
        },
      ),
      style: { width: this.props.width || DEFAULT_WIDTH, minWidth: '0', position: 'relative' as const },
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseOut,
      onClick: this.handleLayoutClick,
    };
    return (
      <InputLayout
        leftIcon={this.props.leftIcon}
        rightIcon={this.getRightIcon()}
        labelProps={labelProps}
        context={{ disabled: this.props.disabled, focused: this.state.focused, size: this.getProps().size }}
        tag="span"
      >
        {this.renderTextarea()}
      </InputLayout>
    );
  };

  private get preparedTheme(): Theme {
    return ThemeFactory.create(
      {
        textareaBorderWidth: '0px',
        textareaPaddingXSmall: '0px',
        textareaPaddingXMedium: '0px',
        textareaPaddingXLarge: '0px',
        textareaPaddingYSmall: '0px',
        textareaPaddingYMedium: '0px',
        textareaPaddingYLarge: '0px',
        textareaOutlineWidth: '0px',
        textareaShadow: 'none',
        textareaDisabledBg: 'transparent',
        textareaBg: 'transparent',
      },
      this.theme,
    );
  }

  private renderTextarea = () => {
    const { leftIcon, rightIcon, borderless, ...textareaProps } = this.props;
    return (
      <ThemeContext.Provider value={this.preparedTheme}>
        <Textarea
          {...(isTestEnv ? { spellCheck: false } : {})}
          {...textareaProps}
          width={'100%'}
          ref={this.wrappedComponentRef}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      </ThemeContext.Provider>
    );
  };

  private handleLayoutClick = () => {
    this.wrappedComponentRef.current?.focus();
  };
  private handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    if (getRootNode(this)?.contains(event.relatedTarget)) {
      this.setState({ focused: false });
    } else {
      this.setState({
        focused: false,
        clearCrossShowed: this.getClearCrossShowed({ focused: false, hovered: this.state.hovered }),
      });
      this.props.onBlur?.(event);
    }
  };
  private handleFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    this.setState({
      focused: true,
      clearCrossShowed: this.getClearCrossShowed({ focused: true, hovered: this.state.hovered }),
    });
    this.props.onFocus?.(event);
  };
}
