import React from 'react';

import { isReactUIComponent } from '../../lib/utils';
import { isIE11, isEdge } from '../../lib/client';
import { keyListener } from '../../lib/events/keyListener';
import { Theme, ThemeIn } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Spinner } from '../Spinner';
import { CommonWrapper, CommonProps } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { rootNode, TSetRootNode } from '../../lib/rootNode';
import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { createPropsGetter } from '../../lib/createPropsGetter';
import { isTheme2022 } from '../../lib/theming/ThemeHelpers';
import { ArrowALeftIcon, ArrowARightIcon } from '../../internal/icons/16px/Icons2022';

import { styles, activeStyles, globalClasses } from './Button.styles';

export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonUse = 'default' | 'primary' | 'success' | 'danger' | 'pay' | 'link' | 'text' | 'backless';

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
   * **Допустимые значения**: `"default"`, `"primary"`, `"success"`, `"danger"`, `"pay"`, `"link"`, `"text"`, `"backless"`.
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
  theme?: ThemeIn;
}

export interface ButtonState {
  focusedByTab: boolean;
}

export const ButtonDataTids = {
  root: 'Button__root',
} as const;

type DefaultProps = Required<Pick<ButtonProps, 'use' | 'size' | 'type'>>;

@rootNode
export class Button extends React.Component<ButtonProps, ButtonState> {
  public static __KONTUR_REACT_UI__ = 'Button';
  public static __BUTTON__ = true;

  public static defaultProps: DefaultProps = {
    use: 'default',
    size: 'small',
    type: 'button',
  };

  private getProps = createPropsGetter(Button.defaultProps);

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
          this.theme = this.props.theme ? ThemeFactory.create(this.props.theme as Theme, theme) : theme;
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
    const { use, type } = this.getProps();
    const sizeClass = this.getSizeClassName();

    const isFocused = this.state.focusedByTab || visuallyFocused;
    const isLink = use === 'link';
    const _isTheme2022 = isTheme2022(this.theme);

    let rootClassName = '';
    if (_isTheme2022) {
      const trueDisabled = disabled || loading;
      rootClassName = cx(
        styles.root(this.theme),
        styles[use](this.theme),
        sizeClass,
        narrow && styles.narrow(),
        _noPadding && styles.noPadding(),
        _noRightPadding && styles.noRightPadding(),
        ...(trueDisabled
          ? [
              styles.disabled(this.theme),
              checked && styles.checkedDisabled(this.theme),
              checked && styles.checkedDisabled2022(this.theme),
            ]
          : [
              active && !checked && activeStyles[use](this.theme),
              isFocused && styles.focus(this.theme),
              checked && styles.checked(this.theme),
              checked && isFocused && styles.checkedFocused(this.theme),
              borderless && !checked && !isFocused && !active && styles.borderless(),
            ]),
      );
    } else {
      rootClassName = cx({
        [styles.root(this.theme)]: true,
        [styles.simulatedPress()]: !_isTheme2022,
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
      });
    }

    const rootProps = {
      // By default the type attribute is 'submit'. IE8 will fire a click event
      // on this button if somewhere on the page user presses Enter while some
      // input is focused. So we set type to 'button' by default.
      type,
      className: rootClassName,
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
    const isDisabled2022 = _isTheme2022 && (disabled || loading);
    if ((!isFocused || isLink) && !isDisabled2022) {
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
      loadingNode =
        _isTheme2022 && !isLink ? (
          this.getLoadingSpinner()
        ) : (
          <div className={styles.loading()}>{this.getLoadingSpinner()}</div>
        );
    }

    let iconNode = null;
    if (icon) {
      iconNode = (
        <span
          className={cx(styles.icon(), this.getSizeIconClassName(), {
            [styles.iconNoRightMargin()]: !children,
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
            [styles.arrowWarning(this.theme)]: !checked && warning && !disabled,
            [styles.arrowError(this.theme)]: !checked && error && !disabled,
            [styles.arrowFocus(this.theme)]: !checked && isFocused && !disabled,
            [styles.arrowLeft()]: arrow === 'left',
          })}
        >
          <div className={cx(globalClasses.arrowHelper, globalClasses.arrowHelperTop)} />
          <div className={cx(globalClasses.arrowHelper, globalClasses.arrowHelperBottom)} />
        </div>
      );

      if (_isTheme2022) {
        let sizeIcon = this.theme.btnIconSizeSmall;
        if (this.props.size === 'medium') {
          sizeIcon = this.theme.btnIconSizeMedium;
        } else if (this.props.size === 'large') {
          sizeIcon = this.theme.btnIconSizeLarge;
        }
        rootProps.className = cx(rootProps.className, this.getRootWithArrowIconClassName());
        const arrowIcon =
          arrow === 'left' ? (
            <ArrowALeftIcon size={parseInt(sizeIcon)} />
          ) : (
            <ArrowARightIcon size={parseInt(sizeIcon)} />
          );
        arrowNode = <div className={this.getArrowIconRootClassName()}>{arrowIcon}</div>;
      }
    }

    // Force disable all props and features, that cannot be use with Link
    if (isLink) {
      rootProps.className = cx({
        [styles.root(this.theme)]: true,
        [sizeClass]: true,
        [this.getLinkClassName(!!isFocused, Boolean(disabled || loading))]: true,
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
                [styles.captionTranslated()]: (active || checked) && !_isTheme2022,
                [styles.captionLink()]: isLink,
                [styles.captionDisabled()]: !checked && disabled,
              })}
            >
              {iconNode}
              <span
                className={cx(globalClasses.text, {
                  [styles.visibilityHidden()]: !!loadingNode,
                })}
              >
                {children}
              </span>
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
    switch (this.getProps().size) {
      case 'large':
        return cx(styles.sizeLarge(this.theme), {
          [styles.sizeLargeIE11(this.theme)]: isIE11 || isEdge,
          [styles.sizeLargeWithIcon(this.theme)]: !!this.props.icon,
        });
      case 'medium':
        return cx(styles.sizeMedium(this.theme), {
          [styles.sizeMediumIE11(this.theme)]: isIE11 || isEdge,
          [styles.sizeMediumWithIcon(this.theme)]: !!this.props.icon,
        });
      case 'small':
      default:
        return cx(styles.sizeSmall(this.theme), {
          [styles.sizeSmallIE11(this.theme)]: isIE11 || isEdge,
          [styles.sizeSmallWithIcon(this.theme)]: !!this.props.icon,
        });
    }
  }

  private getSizeIconClassName() {
    switch (this.getProps().size) {
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
    switch (this.getProps().size) {
      case 'large':
        return styles.wrapLarge(this.theme);
      case 'medium':
        return styles.wrapMedium(this.theme);
      case 'small':
      default:
        return styles.wrapSmall(this.theme);
    }
  }

  private getLinkClassName(focused: boolean, disabled: boolean): string {
    const isBorderBottom = parseInt(this.theme.btnLinkLineBorderBottomWidth) > 0;

    return !isBorderBottom
      ? cx(styles.link(this.theme), {
          [styles.linkFocus(this.theme)]: focused,
          [styles.linkDisabled(this.theme)]: disabled,
        })
      : cx(styles.link(this.theme), styles.linkLine(this.theme), {
          [styles.linkLineFocus(this.theme)]: focused,
          [styles.linkLineDisabled(this.theme)]: disabled,
        });
  }

  private getRootWithArrowIconClassName() {
    const { arrow, size } = this.props;
    return cx({
      [styles.withArrowIconRightSmall(this.theme)]: arrow !== 'left' && size === 'small',
      [styles.withArrowIconRightMedium(this.theme)]: arrow !== 'left' && size === 'medium',
      [styles.withArrowIconRightLarge(this.theme)]: arrow !== 'left' && size === 'large',
      [styles.withArrowIconLeftSmall(this.theme)]: arrow === 'left' && size === 'small',
      [styles.withArrowIconLeftMedium(this.theme)]: arrow === 'left' && size === 'medium',
      [styles.withArrowIconLeftLarge(this.theme)]: arrow === 'left' && size === 'large',
    });
  }

  private getArrowIconRootClassName() {
    const { arrow, size } = this.props;
    return cx(styles.arrowIconRoot(), {
      [styles.arrowIconRootSmall(this.theme)]: size === 'small',
      [styles.arrowIconRootMedium(this.theme)]: size === 'medium',
      [styles.arrowIconRootLarge(this.theme)]: size === 'large',
      [styles.arrowIconLeft()]: arrow === 'left',
    });
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
