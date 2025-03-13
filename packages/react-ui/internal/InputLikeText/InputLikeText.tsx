import React from 'react';
import ReactDOM from 'react-dom';
import debounce from 'lodash.debounce';
import { globalObject, SafeTimer } from '@skbkontur/global-object';

import { isNonNullable, UnreachableError } from '../../lib/utils';
import { isKeyTab, isShortcutPaste } from '../../lib/events/keyboard/identifiers';
import { MouseDrag, MouseDragEventHandler } from '../../lib/events/MouseDrag';
import { isEdge, isIE11, isMobile } from '../../lib/client';
import { removeAllSelections, selectNodeContents } from '../../lib/dom/selectionHelpers';
import { InputDataTids, InputProps, InputState } from '../../components/Input';
import { styles as jsInputStyles } from '../../components/Input/Input.styles';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { CommonProps, CommonWrapper, CommonWrapperRestProps } from '../CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { findRenderContainer } from '../../lib/listenFocusOutside';
import { rootNode, TSetRootNode } from '../../lib/rootNode';
import { createPropsGetter } from '../../lib/createPropsGetter';
import { InputLayoutAside } from '../../components/Input/InputLayout/InputLayoutAside';
import { InputLayoutContext, InputLayoutContextDefault } from '../../components/Input/InputLayout/InputLayoutContext';
import { isInstanceOf } from '../../lib/isInstanceOf';
import { FocusControlWrapper } from '../FocusControlWrapper';
import { ClearCrossIcon } from '../ClearCrossIcon/ClearCrossIcon';

import { HiddenInput } from './HiddenInput';
import { styles } from './InputLikeText.styles';

export interface InputLikeTextProps extends CommonProps, InputProps {
  children?: React.ReactNode;
  innerRef?: (el: HTMLElement | null) => void;
  onFocus?: React.FocusEventHandler<HTMLElement>;
  onBlur?: React.FocusEventHandler<HTMLElement>;
  onMouseDragStart?: MouseDragEventHandler;
  onMouseDragEnd?: MouseDragEventHandler;
  takeContentWidth?: boolean;
  onClearCrossClick?: () => void;
}

export type InputLikeTextState = Omit<InputState, 'needsPolyfillPlaceholder' | 'hovered'>;

export const InputLikeTextDataTids = {
  root: 'InputLikeText__root',
  input: 'InputLikeText__input',
  nativeInput: 'InputLikeText__nativeInput',
} as const;

type DefaultProps = Required<Pick<InputLikeTextProps, 'size' | 'showClearIcon'>>;

@rootNode
export class InputLikeText extends React.Component<InputLikeTextProps, InputLikeTextState> {
  public static __KONTUR_REACT_UI__ = 'InputLikeText';
  public static displayName = 'InputLikeText';

  public static defaultProps: DefaultProps = {
    size: 'small',
    showClearIcon: 'never',
  };

  private getProps = createPropsGetter(InputLikeText.defaultProps);

  private getClearCrossShowed = ({ focused, hovered }: { focused?: boolean; hovered?: boolean }): boolean => {
    const showClearIcon = this.getProps().showClearIcon;
    const notEmptyValue = Boolean(this.props.children);
    switch (showClearIcon) {
      case 'always':
        return notEmptyValue;
      case 'auto':
        return Boolean((focused || hovered) && notEmptyValue);
      case 'never':
        return false;
      default:
        throw new UnreachableError(showClearIcon);
    }
  };

  public state = {
    blinking: false,
    focused: false,
    clearCrossShowed: this.getClearCrossShowed({
      focused: false,
    }),
  };

  private theme!: Theme;
  private node: HTMLElement | null = null;
  private hiddenInput: HTMLInputElement | null = null;
  private lastSelectedInnerNode: [HTMLElement, number, number] | null = null;
  private frozen = false;
  private frozenBlur = false;
  private dragging = false;
  private focusTimeout: SafeTimer;
  private blinkTimeout: SafeTimer;
  private setRootNode!: TSetRootNode;

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
      this.blinkTimeout = globalObject.setTimeout(() => this.setState({ blinking: false }), 150);
    });
  }

  public getNode(): HTMLElement | null {
    return this.node;
  }

  // Async call required for Firefox
  private selectNodeContentsDebounced = debounce(selectNodeContents, 0);

  public selectInnerNode = (node: HTMLElement | null, start = 0, end = 1) => {
    if (this.dragging || !node) {
      return;
    }
    if (isIE11 && globalObject.document && findRenderContainer(node, globalObject.document.body)) {
      // Code below causes Popup to close after triggering the focus event on the body in IE11
      return;
    }
    this.frozen = true;
    this.frozenBlur = true;

    this.lastSelectedInnerNode = [node, start, end];
    this.selectNodeContentsDebounced(node, start, end);

    if (this.focusTimeout) {
      globalObject.clearInterval(this.focusTimeout);
    }
    this.focusTimeout = globalObject.setTimeout(() => (isIE11 || isEdge) && this.node && this.node.focus(), 0);
  };

  public componentDidMount() {
    if (this.node) {
      MouseDrag.listen(this.node).onMouseDragStart(this.handleMouseDragStart).onMouseDragEnd(this.handleMouseDragEnd);
    }
    globalObject.document?.addEventListener('mousedown', this.handleDocumentMouseDown);
    globalObject.document?.addEventListener('keydown', this.handleDocumentKeyDown);
  }

  public componentWillUnmount() {
    if (this.blinkTimeout) {
      globalObject.clearTimeout(this.blinkTimeout);
    }
    MouseDrag.stop(this.node);
    globalObject.document?.removeEventListener('mousedown', this.handleDocumentMouseDown);
    globalObject.document?.removeEventListener('keydown', this.handleDocumentKeyDown);
  }

  public render() {
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
      takeContentWidth,
      'aria-describedby': ariaDescribedby,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      showClearIcon,
      ...rest
    } = props;

    const { focused, blinking } = this.state;
    const getRightIcon = () => {
      return this.state.clearCrossShowed ? (
        <ClearCrossIcon
          data-tid={InputDataTids.clearCross}
          size={size}
          onFocus={(event) => event.stopPropagation()}
          onClick={this.props.onClearCrossClick}
        />
      ) : (
        rightIcon
      );
    };
    const leftSide = <InputLayoutAside icon={leftIcon} text={prefix} side="left" />;
    const rightSide = <InputLayoutAside icon={getRightIcon()} text={suffix} side="right" />;

    const className = cx(styles.root(), jsInputStyles.root(this.theme), this.getSizeClassName(), {
      [jsInputStyles.disabled(this.theme)]: !!disabled,
      [jsInputStyles.borderless()]: !!borderless,
      [jsInputStyles.focus(this.theme)]: focused,
      [jsInputStyles.hovering(this.theme)]: !focused && !disabled && !warning && !error && !borderless,
      [jsInputStyles.blink(this.theme)]: blinking,
      [jsInputStyles.warning(this.theme)]: !!warning,
      [jsInputStyles.error(this.theme)]: !!error,
      [jsInputStyles.focusFallback(this.theme)]: focused && (isIE11 || isEdge),
      [jsInputStyles.warningFallback(this.theme)]: !!warning && (isIE11 || isEdge),
      [jsInputStyles.errorFallback(this.theme)]: !!error && (isIE11 || isEdge),
      [jsInputStyles.hideBlinkingCursor()]: isMobile,
    });

    const wrapperClass = cx(jsInputStyles.wrapper(), {
      [styles.userSelectContain()]: focused,
    });

    const context = InputLayoutContextDefault;
    Object.assign(context, { disabled, focused, size });

    return (
      <FocusControlWrapper disabled={disabled} onBlurWhenDisabled={this.resetFocus}>
        <span
          data-tid={InputLikeTextDataTids.root}
          {...rest}
          className={className}
          style={{ width, textAlign: align }}
          tabIndex={disabled ? -1 : 0}
          onFocus={this.handleFocus}
          onMouseEnter={this.handleHover}
          onMouseLeave={this.handleUnhover}
          onBlur={this.handleBlur}
          ref={this.innerRef}
          onKeyDown={this.handleKeyDown}
          onMouseDown={this.handleMouseDown}
          role="textbox"
          aria-disabled={disabled}
          aria-describedby={ariaDescribedby}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
        >
          <InputLayoutContext.Provider value={context}>
            <input type="hidden" data-tid={InputLikeTextDataTids.nativeInput} value={value} disabled={disabled} />
            {leftSide}
            <span className={wrapperClass}>
              <span
                data-tid={InputLikeTextDataTids.input}
                className={cx(jsInputStyles.input(this.theme), {
                  [styles.absolute()]: !takeContentWidth,
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
          </InputLayoutContext.Provider>
        </span>
      </FocusControlWrapper>
    );
  };

  private renderPlaceholder = (): JSX.Element | null => {
    const { children, placeholder, disabled } = this.props;
    const { focused } = this.state;
    const hasValue = isNonNullable(children) && children !== '';

    if (!hasValue && placeholder) {
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
    if (this.state.focused && this.node && isInstanceOf(e.target, globalObject.Node) && !this.node.contains(e.target)) {
      this.defrost();
    }
  };

  private handleDocumentKeyDown = (e: KeyboardEvent) => {
    if (this.state.focused && isKeyTab(e)) {
      this.defrost();
    }
  };

  private handleMouseDown = () => {
    this.frozen = true;
  };

  private handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (this.props.disabled) {
      return;
    }

    if (isIE11 && isShortcutPaste(e) && this.hiddenInput) {
      this.frozen = true;
      globalObject.setTimeout(() => {
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
    globalObject.document?.documentElement.classList.add(styles.userSelectNone());

    if (this.props.onMouseDragStart) {
      this.props.onMouseDragStart(e);
    }
  };

  private handleMouseDragEnd: MouseDragEventHandler = (e) => {
    // Дожидаемся onMouseUp
    globalObject.setTimeout(() => {
      this.dragging = false;

      if (this.props.onMouseDragEnd) {
        this.props.onMouseDragEnd(e);
      }
    }, 0);

    globalObject.document?.documentElement.classList.remove(styles.userSelectNone());
  };

  private handleFocus = (e: React.FocusEvent<HTMLElement>) => {
    if (isMobile) {
      this.node?.setAttribute('contenteditable', 'true');
    }

    if (this.props.disabled) {
      if (isIE11 && globalObject.document) {
        selectNodeContents(globalObject.document.body, 0, 0);
      }
      return;
    }

    if ((isIE11 || isEdge) && this.frozen) {
      this.frozen = false;
      if (this.state.focused) {
        return;
      }
    }

    // Auto-batching React@18 creates problems that are fixed with flushSync
    // https://github.com/skbkontur/retail-ui/pull/3144#issuecomment-1535235366
    if (React.version.search('18') === 0) {
      ReactDOM.flushSync(() => this.setState({ focused: true }));
    } else {
      this.setState({ focused: true });
    }

    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  };

  private resetFocus = () => {
    this.selectNodeContentsDebounced.cancel();
    if (isMobile) {
      this.node?.removeAttribute('contenteditable');
    }
    if ((isIE11 || isEdge) && this.frozenBlur) {
      this.frozenBlur = false;
    }
    removeAllSelections();
    this.setState({ focused: false });
  };

  private handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    this.selectNodeContentsDebounced.cancel();
    if (isMobile) {
      this.node?.removeAttribute('contenteditable');
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

    this.props.onBlur?.(e);
  };

  private handleHover = () => {
    this.setState({ clearCrossShowed: this.getClearCrossShowed({ focused: this.state.focused, hovered: true }) });
  };

  private handleUnhover = () => {
    this.setState({ clearCrossShowed: this.getClearCrossShowed({ focused: this.state.focused, hovered: false }) });
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
    switch (this.getProps().size) {
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
