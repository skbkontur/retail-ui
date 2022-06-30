import React from 'react';

import { isReactUIComponent } from '../../lib/utils';
import { isIE11, isEdge } from '../../lib/client';
import { keyListener } from '../../lib/events/keyListener';
import { Theme } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Spinner } from '../Spinner';
import { CommonWrapper, CommonProps } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { rootNode, TSetRootNode } from '../../lib/rootNode';

import { styles, activeStyles, globalClasses } from './Button.styles';

export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonUse = 'default' | 'primary' | 'success' | 'danger' | 'pay' | 'link';

export interface ButtonProps extends CommonProps {
  /** @ignore */
  _noPadding?: boolean;

  /** @ignore */
  _noRightPadding?: boolean;

  /**
   * Применяет к кнопке стили псевдокласса `:active`.
   */
  active?: boolean;

  /**
   * CSS-свойство `text-align`.
   */
  align?: React.CSSProperties['textAlign'];

  /**
   * Превращает обычную кнопку в кнопку со стрелкой.
   */
  arrow?: boolean | 'left';

  /**
   * Даёт кнопке фокус после окончания загрузки страницы.
   */
  autoFocus?: boolean;

  /**
   * Убирает обводку у кнопки.
   */
  borderless?: boolean;

  /**
   * @ignore
   */
  checked?: boolean;

  children?: React.ReactNode;

  /** @ignore */
  corners?: React.CSSProperties;

  /**
   * Отключенное состояние кнопки.
   */
  disabled?: boolean;

  /** @ignore */
  disableFocus?: boolean;

  /**
   * Состояние валидации при ошибке.
   */
  error?: boolean;

  /**
   * Иконка слева от текста кнопки.
   */
  icon?: React.ReactElement<any>;

  /**
   * Переводит кнопку в состояние загрузки.
   */
  loading?: boolean;

  /**
   * Сужает кнопку.
   */
  narrow?: boolean;

  /**
   * HTML-событие `onblur`.
   */
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;

  /**
   * HTML-событие `onclick`.
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;

  /**
   * HTML-событие `onfocus`.
   */
  onFocus?: React.FocusEventHandler<HTMLButtonElement>;

  /**
   * HTML-событие `keydown`.
   */
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;

  /**
   * HTML-событие `onmouseenter`.
   */
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;

  /**
   * HTML-событие `mouseleave`.
   */
  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;

  /**
   * HTML-событие `onmouseover`.
   */
  onMouseOver?: React.MouseEventHandler<HTMLButtonElement>;

  /**
   * Задаёт размер кнопки.
   *
   * **Допустимые значения**: `"small"`, `"medium"`, `"large"`.
   */
  size?: ButtonSize;

  /**
   * HTML-атрибут `type`.
   */
  type?: ButtonType;

  /**
   * HTML-атрибут `title`.
   */
  title?: string;

  /**
   * Стиль кнопки.
   *
   * **Допустимые значения**: `"default"`, `"primary"`, `"success"`, `"danger"`, `"pay"`, `"link"`.
   */
  use?: ButtonUse;

  /** @ignore */
  visuallyFocused?: boolean;

  /**
   * Состояние валидации при предупреждении.
   */
  warning?: boolean;

  /**
   * CSS-свойство `width`.
   */
  width?: number | string;
}

export interface ButtonState {
  focusedByTab: boolean;
}

export const ButtonDataTids = {
  root: 'Button__root',
} as const;

@rootNode
export class Button extends React.Component<ButtonProps, ButtonState> {
  public static __KONTUR_REACT_UI__ = 'Button';
  public static __BUTTON__ = true;

  public static defaultProps = {
    use: 'default' as ButtonUse,
    size: 'small' as ButtonSize,
    type: 'button' as ButtonType,
  };

  public state = {
    focusedByTab: false,
  };

  private theme!: Theme;
  private node: HTMLButtonElement | null = null;
  private setRootNode!: TSetRootNode;

  public componentDidMount() {
    if (this.props.autoFocus) {
      keyListener.isTabPressed = true;
      this.focus();
    }
  }

  public static getDerivedStateFromProps(props: ButtonProps) {
    if (props.loading || props.disabled) {
      return { focusedByTab: false };
    }
    return null;
  }

  /**
   * @public
   */
  public focus() {
    this.node?.focus();
  }

  /**
   * @public
   */
  public blur() {
    this.node?.blur();
  }

  public render(): JSX.Element {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeContext.Consumer>
    );
  }

  private renderMain() {
    const {
      corners,
      active,
      disabled,
      borderless,
      checked,
      error,
      warning,
      loading,
      arrow,
      narrow,
      icon,
      _noPadding,
      _noRightPadding,
      visuallyFocused,
      align,
      disableFocus,
      onMouseEnter,
      onMouseLeave,
      onMouseOver,
      onKeyDown,
      onClick,
      width,
      children,
    } = this.props;
    const use = this.props.use || Button.defaultProps.use;
    const sizeClass = this.getSizeClassName();

    const isFocused = this.state.focusedByTab || visuallyFocused;
    const isLink = use === 'link';
    const rootProps = {
      // By default the type attribute is 'submit'. IE8 will fire a click event
      // on this button if somewhere on the page user presses Enter while some
      // input is focused. So we set type to 'button' by default.
      type: this.props.type,
      className: cx({
        [styles.root(this.theme)]: true,
        [styles[use](this.theme)]: true,
        [activeStyles[use](this.theme)]: active,
        [sizeClass]: true,
        [styles.focus(this.theme)]: isFocused,
        [styles.checked(this.theme)]: checked,
        [styles.checkedFocused(this.theme)]: checked && isFocused,
        [styles.disabled(this.theme)]: disabled || loading,
        [styles.checkedDisabled(this.theme)]: checked && disabled,
        [styles.borderless()]: borderless && !disabled && !loading && !checked && !isFocused && !active,
        [styles.narrow()]: narrow,
        [styles.noPadding()]: _noPadding,
        [styles.noRightPadding()]: _noRightPadding,
      }),
      style: {
        textAlign: align,
        ...corners,
      },
      disabled: disabled || loading,
      onClick,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onKeyDown,
      onMouseEnter,
      onMouseLeave,
      onMouseOver,
      tabIndex: disableFocus ? -1 : 0,
      title: this.props.title,
    };

    const wrapProps = {
      className: cx({
        [styles.wrap(this.theme)]: true,
        [styles.wrapArrow()]: arrow === true,
        [styles.wrapArrowLeft()]: arrow === 'left',
        [this.getSizeWrapClassName()]: true,
      }),
      style: {
        width,
      },
    };

    const innerShadowNode = <div className={globalClasses.innerShadow} />;

    let outlineNode = null;
    if (!isFocused || isLink) {
      outlineNode = (
        <div
          className={cx(styles.outline(), {
            [styles.outlineWarning(this.theme)]: warning,
            [styles.outlineError(this.theme)]: error,
            [styles.outlineLink()]: isLink,
            [styles.outlineLinkWarning(this.theme)]: isLink && warning,
            [styles.outlineLinkError(this.theme)]: isLink && error,
          })}
        />
      );
    }

    let loadingNode = null;
    if (loading && !icon) {
      loadingNode = <div className={styles.loading()}>{this.getLoadingSpinner()}</div>;
    }

    let iconNode = null;
    if (icon) {
      iconNode = (
        <span
          className={cx(styles.icon(), this.getSizeIconClassName(), {
            [styles.iconNoRightPadding()]: !children,
            [styles.iconLink(this.theme)]: isLink,
          })}
        >
          {loading ? this.getLoadingSpinner() : icon}
        </span>
      );
    }

    let arrowNode = null;
    if (arrow) {
      arrowNode = (
        <div
          className={cx({
            [styles.arrow()]: true,
            [styles.arrowWarning(this.theme)]: !checked && warning,
            [styles.arrowError(this.theme)]: !checked && error,
            [styles.arrowFocus(this.theme)]: !checked && isFocused,
            [styles.arrowLeft()]: arrow === 'left',
          })}
        >
          <div className={cx(globalClasses.arrowHelper, globalClasses.arrowHelperTop)} />
          <div className={cx(globalClasses.arrowHelper, globalClasses.arrowHelperBottom)} />
        </div>
      );
    }

    // Force disable all props and features, that cannot be use with Link
    if (isLink) {
      rootProps.className = cx({
        [styles.root(this.theme)]: true,
        [sizeClass]: true,
        [styles.link(this.theme)]: true,
        [styles.linkFocus(this.theme)]: isFocused,
        [styles.linkDisabled(this.theme)]: disabled || loading,
      });
      Object.assign(wrapProps, {
        className: cx(styles.wrap(this.theme), styles.wrapLink()),
        style: { width: wrapProps.style.width },
      });
      rootProps.style.textAlign = undefined;
      arrowNode = null;
    }

    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        <span {...wrapProps}>
          <button data-tid={ButtonDataTids.root} ref={this._ref} {...rootProps}>
            {innerShadowNode}
            {outlineNode}
            {loadingNode}
            {arrowNode}
            <div
              className={cx(styles.caption(), globalClasses.caption, {
                [styles.captionTranslated()]: active || checked,
                [styles.captionLink()]: isLink,
                [styles.captionDisabled()]: !checked && disabled,
              })}
            >
              {iconNode}
              <span className={cx({ [styles.visibilityHidden()]: !!loadingNode })}>{children}</span>
            </div>
          </button>
        </span>
      </CommonWrapper>
    );
  }

  private getLoadingSpinner() {
    return <Spinner caption={null} dimmed type="mini" />;
  }

  private getSizeClassName() {
    switch (this.props.size) {
      case 'large':
        return cx(styles.sizeLarge(this.theme), { [styles.sizeLargeIE11(this.theme)]: isIE11 || isEdge });
      case 'medium':
        return cx(styles.sizeMedium(this.theme), { [styles.sizeMediumIE11(this.theme)]: isIE11 || isEdge });
      case 'small':
      default:
        return cx(styles.sizeSmall(this.theme), { [styles.sizeSmallIE11(this.theme)]: isIE11 || isEdge });
    }
  }

  private getSizeIconClassName() {
    switch (this.props.size) {
      case 'large':
        return styles.iconLarge(this.theme);
      case 'medium':
        return styles.iconMedium(this.theme);
      case 'small':
      default:
        return styles.iconSmall(this.theme);
    }
  }

  private getSizeWrapClassName() {
    switch (this.props.size) {
      case 'large':
        return styles.wrapLarge(this.theme);
      case 'medium':
        return styles.wrapMedium(this.theme);
      case 'small':
      default:
        return styles.wrapSmall(this.theme);
    }
  }

  private handleFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
    if (!this.props.disabled && !this.props.disableFocus) {
      // focus event fires before keyDown eventlistener
      // so we should check tabPressed in async way
      requestAnimationFrame(() => {
        if (keyListener.isTabPressed) {
          this.setState({ focusedByTab: true });
        }
      });
      this.props.onFocus?.(e);
    }
  };

  private handleBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
    this.setState({ focusedByTab: false });
    if (!this.props.disabled && !this.props.disableFocus) {
      this.props.onBlur?.(e);
    }
  };

  private _ref = (node: HTMLButtonElement | null) => {
    this.node = node;
  };
}

export const isButton = isReactUIComponent<ButtonProps>('Button');
