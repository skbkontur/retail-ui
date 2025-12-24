import React from 'react';

import type { InputProps } from '../../components/Input';
import { InputLayout } from '../../components/Input/InputLayout/InputLayout';
import { DEFAULT_WIDTH, Textarea } from '../../components/Textarea';
import type { TextareaProps } from '../../components/Textarea';
import { styles as textareaStyles } from '../../components/Textarea/Textarea.styles';
import { cx } from '../../lib/theming/Emotion';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { getRootNode, rootNode } from '../../lib/rootNode';
import type { Theme } from '../../lib/theming/Theme';
import { styles as inputStyles } from '../../components/Input/Input.styles';
import { createPropsGetter } from '../../lib/createPropsGetter';
import { isTestEnv } from '../../lib/currentEnvironment';
import { calculateClearCrossShowedState, InputDataTids } from '../../components/Input';
import { ClearCrossIcon } from '../ClearCrossIcon/ClearCrossIcon';

import { styles } from './InternalTextareaWithLayout.styles';

interface InternalTextareaWithLayoutProps
  extends TextareaProps,
    Pick<InputProps, 'leftIcon' | 'rightIcon' | 'align' | 'borderless' | 'showClearIcon'> {}

interface InternalTextareaWithLayoutState {
  focused: boolean;
  hovered: boolean;
  clearCrossShowed: boolean;
}

@rootNode
export class InternalTextareaWithLayout extends React.Component<
  InternalTextareaWithLayoutProps,
  InternalTextareaWithLayoutState
> {
  public static __KONTUR_REACT_UI__ = 'InternalTextareaWithLayout';
  private wrappedComponentRef = React.createRef<Textarea>();
  private theme!: Theme;
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

  public focus() {
    this.wrappedComponentRef.current?.focus();
  }
  public blur() {
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
        return textareaStyles.textareaLarge(this.theme);
      case 'medium':
        return textareaStyles.textareaMedium(this.theme);
      case 'small':
      default:
        return textareaStyles.textareaSmall(this.theme);
    }
  }

  private getRootSizeClassName() {
    switch (this.getProps().size) {
      case 'large':
        return textareaStyles.rootLarge(this.theme);
      case 'medium':
        return textareaStyles.rootMedium(this.theme);
      case 'small':
      default:
        return textareaStyles.rootSmall(this.theme);
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
      className: cx(
        styles.contentWrapper(),
        textareaStyles.textarea(this.theme),
        this.getTextareaSizeClassName(),
        this.getRootSizeClassName(),
        {
          [inputStyles.focus(this.theme)]: this.state.focused && !this.props.warning && !this.props.error,
          [inputStyles.borderless()]: this.props.borderless && !this.state.focused,
          [textareaStyles.disabled(this.theme)]: this.props.disabled,
          [textareaStyles.warning(this.theme)]: this.props.warning,
          [textareaStyles.error(this.theme)]: this.props.error,
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
        textareaWidth: 'auto',
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
