import React from 'react';

import { isKeyTab, isShortcutPaste } from '../../lib/events/keyboard/identifiers';
import { MouseDrag, MouseDragEventHandler } from '../../lib/events/MouseDrag';
import { isEdge, isIE11, isMobile } from '../../lib/client';
import { Nullable } from '../../typings/utility-types';
import { removeAllSelections, selectNodeContents } from '../../components/DateInput/helpers/SelectionHelpers';
import { InputProps, InputIconType, InputState } from '../../components/Input';
import { styles as jsInputStyles } from '../../components/Input/Input.styles';
import { Theme } from '../../lib/theming/Theme';
import { CommonProps, CommonWrapper, CommonWrapperRestProps } from '../CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { theme } from '../../lib/theming/decorators';
import { findRenderContainer } from '../../lib/listenFocusOutside';

import { styles } from './InputLikeText.styles';
import { HiddenInput } from './HiddenInput';

export interface InputLikeTextProps extends CommonProps, InputProps {
  children?: React.ReactNode;
  innerRef?: (el: HTMLElement | null) => void;
  onFocus?: React.FocusEventHandler<HTMLElement>;
  onBlur?: React.FocusEventHandler<HTMLElement>;
  onMouseDragStart?: MouseDragEventHandler;
  onMouseDragEnd?: MouseDragEventHandler;
}

export type InputLikeTextState = Omit<InputState, 'polyfillPlaceholder'>;

@theme
export class InputLikeText extends React.Component<InputLikeTextProps, InputLikeTextState> {
  public static __KONTUR_REACT_UI__ = 'InputLikeText';

  public static defaultProps = { size: 'small' };

  public state = { blinking: false, focused: false };

  private readonly theme!: Theme;
  private node: HTMLElement | null = null;
  private hiddenInput: HTMLInputElement | null = null;
  private lastSelectedInnerNode: [HTMLElement, number, number] | null = null;
  private frozen = false;
  private frozenBlur = false;
  private dragging = false;
  private focusTimeout: Nullable<number>;
  private blinkTimeout: Nullable<number>;

  /**
   * @public
   */
  public focus() {
    if (this.node) {
      this.node.focus();
    }
  }

  /**
   * @public
   */
  public blur() {
    if (this.node) {
      this.node.blur();
    }
  }

  /**
   * @public
   */
  public blink() {
    if (this.props.disabled) {
      return;
    }
    this.setState({ blinking: true }, () => {
      this.blinkTimeout = window.setTimeout(() => this.setState({ blinking: false }), 150);
    });
  }

  public getNode(): HTMLElement | null {
    return this.node;
  }

  public selectInnerNode = (node: HTMLElement | null, start = 0, end = 1) => {
    if (this.dragging || !node) {
      return;
    }
    if (isIE11 && findRenderContainer(node, document.body)) {
      // Code below causes Popup to close after triggering the focus event on the body in IE11
      return;
    }
    this.frozen = true;
    this.frozenBlur = true;

    this.lastSelectedInnerNode = [node, start, end];
    setTimeout(() => selectNodeContents(node, start, end), 0);
    if (this.focusTimeout) {
      clearInterval(this.focusTimeout);
    }
    this.focusTimeout = window.setTimeout(() => (isIE11 || isEdge) && this.node && this.node.focus(), 0);
  };

  public componentDidMount() {
    if (this.node) {
      MouseDrag.listen(this.node).onMouseDragStart(this.handleMouseDragStart).onMouseDragEnd(this.handleMouseDragEnd);
    }
    document.addEventListener('mousedown', this.handleDocumentMouseDown);
    document.addEventListener('keydown', this.handleDocumentKeyDown);
  }

  public componentWillUnmount() {
    if (this.blinkTimeout) {
      clearTimeout(this.blinkTimeout);
    }
    MouseDrag.stop(this.node);
    document.removeEventListener('mousedown', this.handleDocumentMouseDown);
    document.removeEventListener('keydown', this.handleDocumentKeyDown);
  }

  public render() {
    return <CommonWrapper {...this.props}>{this.renderMain}</CommonWrapper>;
  }

  private renderMain = (props: CommonWrapperRestProps<InputLikeTextProps>) => {
    const {
      innerRef,
      tabIndex,
      placeholder,
      align,
      borderless,
      width,
      size,
      error,
      warning,
      onValueChange,
      disabled,
      prefix,
      suffix,
      leftIcon,
      rightIcon,
      value,
      onMouseDragStart,
      onMouseDragEnd,
      ...rest
    } = props;

    const { focused, blinking } = this.state;

    const leftSide = this.renderLeftSide();
    const rightSide = this.renderRightSide();

    const className = cx(styles.root(), jsInputStyles.root(this.theme), this.getSizeClassName(), {
      [jsInputStyles.focus(this.theme)]: focused,
      [jsInputStyles.blink(this.theme)]: blinking,
      [jsInputStyles.warning(this.theme)]: !!warning,
      [jsInputStyles.error(this.theme)]: !!error,
      [jsInputStyles.focusFallback(this.theme)]: focused && (isIE11 || isEdge),
      [jsInputStyles.warningFallback(this.theme)]: !!warning && (isIE11 || isEdge),
      [jsInputStyles.errorFallback(this.theme)]: !!error && (isIE11 || isEdge),
      [jsInputStyles.disabled(this.theme)]: !!disabled,
      [jsInputStyles.borderless()]: !!borderless,
      [jsInputStyles.hideBlinkingCursor()]: isMobile,
    });

    const wrapperClass = cx(jsInputStyles.wrapper(), {
      [styles.userSelectContain()]: focused,
    });

    return (
      <span
        {...rest}
        className={className}
        style={{ width, textAlign: align }}
        tabIndex={disabled ? undefined : 0}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        ref={this.innerRef}
        onKeyDown={this.handleKeyDown}
        onMouseDown={this.handleMouseDown}
      >
        <input type="hidden" value={value} />
        {leftSide}
        <span className={wrapperClass}>
          <span
            data-tid="InputLikeText__input"
            className={cx(styles.input(), jsInputStyles.input(this.theme), {
              [jsInputStyles.inputFocus(this.theme)]: focused,
              [jsInputStyles.inputDisabled(this.theme)]: disabled,
            })}
          >
            {this.props.children}
          </span>
          {this.renderPlaceholder()}
        </span>
        {rightSide}
        {isIE11 && focused && <HiddenInput nodeRef={this.hiddenInputRef} />}
      </span>
    );
  };

  private getIconClassname(right = false) {
    switch (this.props.size) {
      case 'large':
        return right ? jsInputStyles.rightIconLarge(this.theme) : jsInputStyles.leftIconLarge(this.theme);
      case 'medium':
        return right ? jsInputStyles.rightIconMedium(this.theme) : jsInputStyles.leftIconMedium(this.theme);
      case 'small':
      default:
        return right ? jsInputStyles.rightIconSmall(this.theme) : jsInputStyles.leftIconSmall(this.theme);
    }
  }

  private renderLeftIcon = () => {
    return this.renderIcon(this.props.leftIcon, this.getIconClassname());
  };

  private renderRightIcon = () => {
    return this.renderIcon(this.props.rightIcon, this.getIconClassname(true));
  };

  private renderIcon = (icon: InputIconType, className: string): JSX.Element | null => {
    if (!icon) {
      return null;
    }

    const { disabled } = this.props;
    const iconNode = icon instanceof Function ? icon() : icon;

    return (
      <span
        className={cx(jsInputStyles.icon(), className, jsInputStyles.useDefaultColor(this.theme), {
          [jsInputStyles.iconDisabled()]: disabled,
        })}
      >
        {iconNode}
      </span>
    );
  };

  private renderPrefix = (): JSX.Element | null => {
    const { prefix, disabled } = this.props;

    if (!prefix) {
      return null;
    }

    return (
      <span className={cx(jsInputStyles.prefix(this.theme), { [jsInputStyles.prefixDisabled(this.theme)]: disabled })}>
        {prefix}
      </span>
    );
  };

  private renderSuffix = (): JSX.Element | null => {
    const { suffix, disabled } = this.props;

    if (!suffix) {
      return null;
    }

    return (
      <span className={cx(jsInputStyles.suffix(this.theme), { [jsInputStyles.suffixDisabled(this.theme)]: disabled })}>
        {suffix}
      </span>
    );
  };

  private renderLeftSide = (): JSX.Element | null => {
    const leftIcon = this.renderLeftIcon();
    const prefix = this.renderPrefix();

    if (!leftIcon && !prefix) {
      return null;
    }

    return (
      <span className={jsInputStyles.sideContainer()}>
        {leftIcon}
        {prefix}
      </span>
    );
  };

  private renderRightSide = (): JSX.Element | null => {
    const rightIcon = this.renderRightIcon();
    const suffix = this.renderSuffix();

    if (!rightIcon && !suffix) {
      return null;
    }

    return (
      <span className={cx(jsInputStyles.sideContainer(), jsInputStyles.rightContainer())}>
        {rightIcon}
        {suffix}
      </span>
    );
  };

  private renderPlaceholder = (): JSX.Element | null => {
    const { children, placeholder, disabled } = this.props;
    const { focused } = this.state;

    if (!children && placeholder) {
      return (
        <span
          className={cx(jsInputStyles.placeholder(this.theme), {
            [jsInputStyles.placeholderDisabled(this.theme)]: disabled,
            [jsInputStyles.placeholderFocus(this.theme)]: focused,
          })}
        >
          {placeholder}
        </span>
      );
    }
    return null;
  };

  private handleDocumentMouseDown = (e: MouseEvent) => {
    if (this.state.focused && this.node && e.target instanceof Node && !this.node.contains(e.target)) {
      this.defrost();
    }
  };

  private handleDocumentKeyDown = (e: KeyboardEvent) => {
    if (this.state.focused && isKeyTab(e)) {
      this.defrost();
    }
  };

  private handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    this.frozen = true;
  };

  private handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (this.props.disabled) {
      return;
    }

    if (isIE11 && isShortcutPaste(e) && this.hiddenInput) {
      this.frozen = true;
      setTimeout(() => {
        if (this.lastSelectedInnerNode) {
          this.selectInnerNode(...this.lastSelectedInnerNode);
        }
        if (this.node) {
          this.node.focus();
        }
      }, 0);

      this.hiddenInput.focus();
    }

    if (this.props.onKeyDown) {
      this.props.onKeyDown(e as React.KeyboardEvent<HTMLInputElement>);
    }
  };

  private handleMouseDragStart: MouseDragEventHandler = (e) => {
    this.dragging = true;
    document.documentElement.classList.add(styles.userSelectNone());

    if (this.props.onMouseDragStart) {
      this.props.onMouseDragStart(e);
    }
  };

  private handleMouseDragEnd: MouseDragEventHandler = (e) => {
    // Дожидаемся onMouseUp
    setTimeout(() => {
      this.dragging = false;

      if (this.props.onMouseDragEnd) {
        this.props.onMouseDragEnd(e);
      }
    }, 0);

    document.documentElement.classList.remove(styles.userSelectNone());
  };

  private handleFocus = (e: React.FocusEvent<HTMLElement>) => {
    if (isMobile) {
      e.target.setAttribute('contenteditable', 'true');
    }

    if (this.props.disabled) {
      if (isIE11) {
        selectNodeContents(document.body, 0, 0);
      }
      return;
    }

    if ((isIE11 || isEdge) && this.frozen) {
      this.frozen = false;
      if (this.state.focused) {
        return;
      }
    }

    this.setState({ focused: true });

    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  };

  private handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    if (isMobile) {
      e.target.removeAttribute('contenteditable');
    }

    if (this.props.disabled) {
      e.stopPropagation();
      return;
    }

    if ((isIE11 || isEdge) && this.frozenBlur) {
      this.frozenBlur = false;
      return;
    }
    if ((isIE11 || isEdge) && this.frozen) {
      return;
    }

    removeAllSelections();

    this.setState({ focused: false });

    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  };

  private hiddenInputRef = (el: HTMLInputElement | null) => {
    this.hiddenInput = el;
  };

  private innerRef = (el: HTMLElement | null) => {
    if (this.props.innerRef) {
      this.props.innerRef(el);
    }
    this.node = el;
  };

  private defrost = (): void => {
    this.frozen = false;
    this.frozenBlur = false;
  };

  private getSizeClassName = () => {
    switch (this.props.size) {
      case 'large':
        return cx({
          [jsInputStyles.sizeLarge(this.theme)]: true,
          [jsInputStyles.sizeLargeFallback(this.theme)]: isIE11 || isEdge,
        });
      case 'medium':
        return cx({
          [jsInputStyles.sizeMedium(this.theme)]: true,
          [jsInputStyles.sizeMediumFallback(this.theme)]: isIE11 || isEdge,
        });
      case 'small':
      default:
        return cx({
          [jsInputStyles.sizeSmall(this.theme)]: true,
          [jsInputStyles.sizeSmallFallback(this.theme)]: isIE11 || isEdge,
        });
    }
  };
}
