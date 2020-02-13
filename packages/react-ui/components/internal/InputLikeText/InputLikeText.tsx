import React from 'react';

import { isKeyTab, isShortcutPaste } from '../../../lib/events/keyboard/identifiers';
import { MouseDrag, MouseDragEventHandler } from '../../../lib/events/MouseDrag';
import { isEdge, isIE11 } from '../../../lib/utils';
import { Nullable } from '../../../typings/utility-types';
import { removeAllSelections, selectNodeContents } from '../../DateInput/helpers/SelectionHelpers';
import { InputProps, IconType, InputState } from '../../Input';
import { cx } from '../../../lib/theming/Emotion';
import inputStyles from '../../Input/Input.module.less';
import { jsStyles as jsInputStyles } from '../../Input/Input.styles';
import { ThemeConsumer } from '../../ThemeConsumer';
import { Theme } from '../../../lib/theming/Theme';

import { jsStyles } from './InputLikeText.styles';
import { HiddenInput } from './HiddenInput';

export interface InputLikeTextProps extends InputProps {
  children?: React.ReactNode;
  innerRef?: (el: HTMLElement | null) => void;
  onFocus?: React.FocusEventHandler<HTMLElement>;
  onBlur?: React.FocusEventHandler<HTMLElement>;
  onMouseDragStart?: MouseDragEventHandler;
  onMouseDragEnd?: MouseDragEventHandler;
}

export type InputLikeTextState = Omit<InputState, 'polyfillPlaceholder'>;

export class InputLikeText extends React.Component<InputLikeTextProps, InputLikeTextState> {
  public static __KONTUR_REACT_UI__ = 'InputLikeText';

  public static defaultProps = { size: 'small' };

  public state = { blinking: false, focused: false };

  private theme!: Theme;
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
      MouseDrag.listen(this.node)
        .onMouseDragStart(this.handleMouseDragStart)
        .onMouseDragEnd(this.handleMouseDragEnd);
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
    return (
      <ThemeConsumer>
        {theme => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeConsumer>
    );
  }

  private renderMain() {
    const {
      innerRef,
      tabIndex,
      placeholder,
      align,
      borderless,
      width,
      children,
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
    } = this.props;

    const { focused, blinking } = this.state;

    const leftSide = this.renderLeftSide();
    const rightSide = this.renderRightSide();

    const className = cx(
      inputStyles.root,
      jsStyles.root(this.theme),
      jsInputStyles.root(this.theme),
      this.getSizeClassName(),
      {
        [inputStyles.focus]: focused,
        [inputStyles.warning]: !!warning,
        [inputStyles.error]: !!error,
        [inputStyles.borderless]: !!borderless,
        [inputStyles.disabled]: !!disabled,
        [jsStyles.withoutLeftSide(this.theme)]: !leftSide,
        [jsInputStyles.focus(this.theme)]: focused,
        [jsInputStyles.blink(this.theme)]: blinking,
        [jsInputStyles.warning(this.theme)]: !!warning,
        [jsInputStyles.error(this.theme)]: !!error,
        [jsInputStyles.disabled(this.theme)]: !!disabled,
        [jsInputStyles.focusFallback(this.theme)]: focused && (isIE11 || isEdge),
        [jsInputStyles.warningFallback(this.theme)]: !!warning && (isIE11 || isEdge),
        [jsInputStyles.errorFallback(this.theme)]: !!error && (isIE11 || isEdge),
      },
    );

    const wrapperClass = cx(inputStyles.wrapper, {
      [jsStyles.userSelectContain(this.theme)]: focused,
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
          <span className={cx(inputStyles.input, jsStyles.input(this.theme), jsInputStyles.input(this.theme))}>
            {children}
          </span>
          {this.renderPlaceholder()}
        </span>
        {rightSide}
        {isIE11 && focused && <HiddenInput nodeRef={this.hiddenInputRef} />}
      </span>
    );
  }

  private renderLeftIcon = () => {
    return this.renderIcon(this.props.leftIcon, inputStyles.leftIcon);
  };

  private renderRightIcon = () => {
    return this.renderIcon(this.props.rightIcon, inputStyles.rightIcon);
  };

  private renderIcon = (icon: IconType, className: string): JSX.Element | null => {
    if (!icon) {
      return null;
    }

    if (icon instanceof Function) {
      return <span className={className}>{icon()}</span>;
    }

    return (
      <span className={cx(className, inputStyles.useDefaultColor, jsInputStyles.useDefaultColor(this.theme))}>
        {icon}
      </span>
    );
  };

  private renderPrefix = (): JSX.Element | null => {
    const { prefix } = this.props;

    if (!prefix) {
      return null;
    }

    return <span className={jsInputStyles.prefix(this.theme)}>{prefix}</span>;
  };

  private renderSuffix = (): JSX.Element | null => {
    const { suffix } = this.props;

    if (!suffix) {
      return null;
    }

    return <span className={jsInputStyles.suffix(this.theme)}>{suffix}</span>;
  };

  private renderLeftSide = (): JSX.Element | null => {
    const leftIcon = this.renderLeftIcon();
    const prefix = this.renderPrefix();

    if (!leftIcon && !prefix) {
      return null;
    }

    return (
      <span className={inputStyles.sideContainer}>
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
      <span className={inputStyles.sideContainer}>
        {rightIcon}
        {suffix}
      </span>
    );
  };

  private renderPlaceholder = (): JSX.Element | null => {
    const { children, placeholder } = this.props;

    if (!children && placeholder) {
      return <span className={cx(inputStyles.placeholder, jsInputStyles.placeholder(this.theme))}>{placeholder}</span>;
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

  private handleMouseDragStart: MouseDragEventHandler = e => {
    this.dragging = true;
    document.documentElement.classList.add(jsStyles.userSelectNone(this.theme));

    if (this.props.onMouseDragStart) {
      this.props.onMouseDragStart(e);
    }
  };

  private handleMouseDragEnd: MouseDragEventHandler = e => {
    // Дожидаемся onMouseUp
    setTimeout(() => {
      this.dragging = false;

      if (this.props.onMouseDragEnd) {
        this.props.onMouseDragEnd(e);
      }
    }, 0);

    document.documentElement.classList.remove(jsStyles.userSelectNone(this.theme));
  };

  private handleFocus = (e: React.FocusEvent<HTMLElement>) => {
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
        return {
          [jsInputStyles.sizeLarge(this.theme)]: true,
          [jsInputStyles.sizeLargeFallback(this.theme)]: isIE11 || isEdge,
        };
      case 'medium':
        return {
          [jsInputStyles.sizeMedium(this.theme)]: true,
          [jsInputStyles.sizeMediumFallback(this.theme)]: isIE11 || isEdge,
        };
      case 'small':
      default:
        return {
          [jsInputStyles.sizeSmall(this.theme)]: true,
          [jsInputStyles.sizeSmallFallback(this.theme)]: isIE11 || isEdge,
        };
    }
  };
}
