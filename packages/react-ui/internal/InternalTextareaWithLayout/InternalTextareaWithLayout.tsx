// TODO: Enable this rule in functional components.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import { InputIconType, InputProps } from '../../components/Input';
import { InputLayout } from '../../components/Input/InputLayout/InputLayout';
import { Textarea, TextareaDataTids, TextareaProps } from '../../components/Textarea';
import { styles } from '../../components/Textarea/Textarea.styles';
import { cx } from '../../lib/theming/Emotion';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { rootNode } from '../../lib/rootNode';
import { Theme } from '../../lib/theming/Theme';
import { isTheme2022 } from '../../lib/theming/ThemeHelpers';
import { styles as inputLayerStyles } from '../../components/Input/Input.styles';
import { isFunction } from '../../lib/utils';
import { createPropsGetter } from '../../lib/createPropsGetter';

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
          const labelProps = {
            className: cx(
              styles.contentWrapper(),
              styles.textarea(this.theme),
              this.getTextareaSizeClassName(),
              this.getRootSizeClassName(),
              {
                [inputLayerStyles.focus(this.theme)]: this.state.focused && !this.props.warning && !this.props.error,
                [inputLayerStyles.borderless()]: this.props.borderless && !this.state.focused,
                [styles.disabled(this.theme)]: this.props.disabled,
                [styles.warning(this.theme)]: this.props.warning,
                [styles.error(this.theme)]: this.props.error,
              },
            ),
          };
          if (isTheme2022(this.theme)) {
            return (
              <InputLayout
                leftIcon={this.props.leftIcon}
                rightIcon={this.props.rightIcon}
                labelProps={labelProps}
                context={{ disabled: this.props.disabled, focused: this.state.focused, size: this.getProps().size }}
              >
                {this.renderTextarea()}
              </InputLayout>
            );
          }
          return (
            <span data-tid={TextareaDataTids.root} {...labelProps}>
              <span className={inputLayerStyles.sideContainer()}>{this.renderLeftIcon()}</span>
              {this.renderTextarea()}
              <span className={cx(inputLayerStyles.sideContainer(), inputLayerStyles.rightContainer())}>
                {this.renderRightIcon()}
              </span>
            </span>
          );
        }}
      </ThemeContext.Consumer>
    );
  }

  private getTextareaSizeClassName() {
    switch (this.getProps().size) {
      case 'large':
        return styles.textareaLarge(this.theme);
      case 'medium':
        return styles.textareaMedium(this.theme);
      case 'small':
      default:
        return styles.textareaSmall(this.theme);
    }
  }

  private getRootSizeClassName() {
    switch (this.getProps().size) {
      case 'large':
        return styles.rootLarge(this.theme);
      case 'medium':
        return styles.rootMedium(this.theme);
      case 'small':
      default:
        return styles.rootSmall(this.theme);
    }
  }

  private renderTextarea = () => {
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
          },
          this.theme,
        )}
      >
        <Textarea
          {...this.props}
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
        return right ? inputLayerStyles.rightIconLarge(this.theme) : inputLayerStyles.leftIconLarge(this.theme);
      case 'medium':
        return right ? inputLayerStyles.rightIconMedium(this.theme) : inputLayerStyles.leftIconMedium(this.theme);
      case 'small':
      default:
        return right ? inputLayerStyles.rightIconSmall(this.theme) : inputLayerStyles.leftIconSmall(this.theme);
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
        className={cx(inputLayerStyles.icon(), sizeClassName, inputLayerStyles.useDefaultColor(this.theme), {
          [inputLayerStyles.iconFocus(this.theme)]: this.state.focused,
          [inputLayerStyles.iconDisabled()]: disabled,
        })}
      >
        {iconNode}
      </span>
    );
  }

  private handleBlur = () => {
    this.setState({ focused: false });
  };
  private handleFocus = () => {
    this.setState({ focused: true });
  };
}
