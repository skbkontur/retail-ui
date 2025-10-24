import React from 'react';
import ReactDOM from 'react-dom';
import debounce from 'lodash.debounce';
import { globalObject } from '@skbkontur/global-object';

import { isNonNullable } from '../../lib/utils';
import type { MouseDragEventHandler } from '../../lib/events/MouseDrag';
import { MouseDrag } from '../../lib/events/MouseDrag';
import { isMobile } from '../../lib/client';
import { removeAllSelections, selectNodeContents } from '../../lib/dom/selectionHelpers';
import type { InputProps, InputState } from '../../components/Input';
import { calculateClearCrossShowedState, InputDataTids } from '../../components/Input';
import { styles as jsInputStyles } from '../../components/Input/Input.styles';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import type { Theme } from '../../lib/theming/Theme';
import type { CommonProps, CommonWrapperRestProps } from '../CommonWrapper';
import { CommonWrapper } from '../CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode';
import { rootNode } from '../../lib/rootNode';
import { createPropsGetter } from '../../lib/createPropsGetter';
import { InputLayoutAside } from '../../components/Input/InputLayout/InputLayoutAside';
import { InputLayoutContext, InputLayoutContextDefault } from '../../components/Input/InputLayout/InputLayoutContext';
import { FocusControlWrapper } from '../FocusControlWrapper';
import { ClearCrossIcon } from '../ClearCrossIcon/ClearCrossIcon';
import { blink } from '../../lib/blink';
import { withSize } from '../../lib/size/SizeDecorator';
import type { SizeProp } from '../../lib/types/props';

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

type DefaultProps = Required<Pick<InputLikeTextProps, 'showClearIcon'>>;

@withSize
@rootNode
export class InputLikeText extends React.Component<InputLikeTextProps, InputLikeTextState> {
  public static __KONTUR_REACT_UI__ = 'InputLikeText';
  public static displayName = 'InputLikeText';

  public static defaultProps: DefaultProps = {
    showClearIcon: 'never',
  };

  private getProps = createPropsGetter(InputLikeText.defaultProps);

  private getClearCrossShowed = ({ focused, hovered }: { focused?: boolean; hovered?: boolean }): boolean => {
    if (this.props.disabled) {
      return false;
    }
    return calculateClearCrossShowedState({
      showClearIcon: this.getProps().showClearIcon,
      notEmptyValue: Boolean(this.props.children),
      focused,
      hovered,
    });
  };

  public state = {
    focused: false,
    clearCrossShowed: this.getClearCrossShowed({
      focused: false,
    }),
  };

  private theme!: Theme;
  private size!: SizeProp;
  private node: HTMLElement | null = null;
  private dragging = false;

  public getRootNode!: TGetRootNode;
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
    blink({
      el: this.node,
      blinkColor: this.theme.inputBlinkColor,
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

    this.selectNodeContentsDebounced(node, start, end);
  };

  public componentDidMount() {
    if (this.node) {
      MouseDrag.listen(this.node).onMouseDragStart(this.handleMouseDragStart).onMouseDragEnd(this.handleMouseDragEnd);
    }
  }

  public componentWillUnmount() {
    MouseDrag.stop(this.node);
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
      onClearCrossClick,
      ...rest
    } = props;

    const { focused } = this.state;
    const getRightIcon = () => {
      return this.state.clearCrossShowed ? (
        <ClearCrossIcon
          data-tid={InputDataTids.clearCross}
          size={this.size}
          onFocus={(event) => event.stopPropagation()}
          onClick={onClearCrossClick}
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
      [jsInputStyles.warning(this.theme)]: !!warning,
      [jsInputStyles.error(this.theme)]: !!error,
      [jsInputStyles.hideBlinkingCursor()]: isMobile,
    });

    const wrapperClass = cx(jsInputStyles.wrapper(), {
      [styles.userSelectContain()]: focused,
    });
    const size = this.size;
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

  private handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (this.props.disabled) {
      return;
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
      return;
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

  private innerRef = (el: HTMLElement | null) => {
    if (this.props.innerRef) {
      this.props.innerRef(el);
    }
    this.node = el;
  };

  private getSizeClassName = () => {
    switch (this.size) {
      case 'large':
        return cx({
          [jsInputStyles.sizeLarge(this.theme)]: true,
        });
      case 'medium':
        return cx({
          [jsInputStyles.sizeMedium(this.theme)]: true,
        });
      case 'small':
      default:
        return cx({
          [jsInputStyles.sizeSmall(this.theme)]: true,
        });
    }
  };
}
