// TODO: Enable this rule in functional components.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import { InputIconType, InputProps } from '../../components/Input';
import { InputLayout } from '../../components/Input/InputLayout/InputLayout';
import { DEFAULT_WIDTH, Textarea, TextareaProps } from '../../components/Textarea';
import { styles as textareaStyles } from '../../components/Textarea/Textarea.styles';
import { cx } from '../../lib/theming/Emotion';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { rootNode } from '../../lib/rootNode';
import { Theme } from '../../lib/theming/Theme';
import { isTheme2022 } from '../../lib/theming/ThemeHelpers';
import { styles as inputStyles } from '../../components/Input/Input.styles';
import { isFunction } from '../../lib/utils';
import { createPropsGetter } from '../../lib/createPropsGetter';

import { styles } from './InternalTextareaWithLayout.styles';

interface InternalTextareaWithLayoutProps
  extends TextareaProps,
    Pick<InputProps, 'leftIcon' | 'rightIcon' | 'align' | 'borderless'> {}

interface InternalTextareaWithLayoutState {
  focused: boolean;
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

  public state: InternalTextareaWithLayoutState = {
    focused: false,
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
      style: { width: this.props.width || DEFAULT_WIDTH, minWidth: '0' },
    };
    if (isTheme2022(this.theme)) {
      return (
        <InputLayout
          leftIcon={this.props.leftIcon}
          rightIcon={this.props.rightIcon}
          labelProps={labelProps}
          context={{ disabled: this.props.disabled, focused: this.state.focused, size: this.getProps().size }}
          tag="span"
        >
          {this.renderTextarea()}
        </InputLayout>
      );
    }
    return (
      <span {...labelProps}>
        <span className={inputStyles.sideContainer()}>{this.renderLeftIcon()}</span>
        {this.renderTextarea()}
        <span className={cx(inputStyles.sideContainer(), inputStyles.rightContainer())}>{this.renderRightIcon()}</span>
      </span>
    );
  };

  private renderTextarea = () => {
    const { leftIcon, rightIcon, borderless, ...textareaProps } = this.props;
    return (
      <ThemeContext.Provider
        value={ThemeFactory.create(
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
        )}
      >
        <Textarea
          {...textareaProps}
          width={'100%'}
          ref={this.wrappedComponentRef}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      </ThemeContext.Provider>
    );
  };

  private getIconSizeClassname(right = false) {
    switch (this.getProps().size) {
      case 'large':
        return right ? inputStyles.rightIconLarge(this.theme) : inputStyles.leftIconLarge(this.theme);
      case 'medium':
        return right ? inputStyles.rightIconMedium(this.theme) : inputStyles.leftIconMedium(this.theme);
      case 'small':
      default:
        return right ? inputStyles.rightIconSmall(this.theme) : inputStyles.leftIconSmall(this.theme);
    }
  }

  private renderLeftIcon() {
    return this.renderIcon(this.props.leftIcon, this.getIconSizeClassname());
  }

  private renderRightIcon() {
    return this.renderIcon(this.props.rightIcon, this.getIconSizeClassname(true));
  }

  private renderIcon(icon: InputIconType, sizeClassName: string) {
    if (!icon) {
      return null;
    }
    const { disabled } = this.props;
    const iconNode = isFunction(icon) ? icon() : icon;

    return (
      <span
        className={cx(inputStyles.icon(), sizeClassName, inputStyles.useDefaultColor(this.theme), {
          [inputStyles.iconFocus(this.theme)]: this.state.focused,
          [inputStyles.iconDisabled()]: disabled,
        })}
      >
        {iconNode}
      </span>
    );
  }

  private handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    this.setState({ focused: false });
    this.props.onBlur?.(event);
  };
  private handleFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    this.setState({ focused: true });
    this.props.onFocus?.(event);
  };
}
