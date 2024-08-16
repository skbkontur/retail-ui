import React, { AriaAttributes, HTMLAttributes } from 'react';
import { globalObject } from '@skbkontur/global-object';

import { HTMLProps } from '../../typings/html';
import { isKonturIcon, isReactUIComponent } from '../../lib/utils';
import { isIE11, isEdge, isSafari } from '../../lib/client';
import { keyListener } from '../../lib/events/keyListener';
import { Theme, ThemeIn } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { CommonWrapper, CommonProps } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { rootNode, TSetRootNode } from '../../lib/rootNode';
import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { createPropsGetter } from '../../lib/createPropsGetter';
import { isTheme2022 } from '../../lib/theming/ThemeHelpers';
import { Link, LinkProps } from '../Link';
import { SizeProp } from '../../lib/types/props';

import { styles, activeStyles, globalClasses } from './Button.styles';
import { ButtonIcon, ButtonIconProps, getButtonIconSizes } from './ButtonIcon';
import { useButtonArrow } from './ButtonArrow';
import { getInnerLinkTheme } from './getInnerLinkTheme';
import { LoadingButtonIcon } from './LoadingButtonIcon';

/**
 * @deprecated use SizeProp
 */
export type ButtonSize = SizeProp;
export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonUse = 'default' | 'primary' | 'success' | 'danger' | 'pay' | 'link' | 'text' | 'backless';

export interface ButtonProps
  extends CommonProps,
    Pick<
      AriaAttributes,
      'aria-haspopup' | 'aria-describedby' | 'aria-controls' | 'aria-label' | 'aria-checked' | 'aria-expanded'
    >,
    Pick<HTMLAttributes<unknown>, 'role'>,
    Pick<HTMLProps['button'], 'onClickCapture' | 'onMouseUp' | 'onMouseDown'> {
  /** @ignore */
  _noPadding?: boolean;

  /** @ignore */
  _noRightPadding?: boolean;

  /** Применяет к кнопке стили псевдокласса `:active`. */
  active?: boolean;

  /** Задаёт выравнивание тексту в кнопке. */
  align?: React.CSSProperties['textAlign'];

  /** Превращает обычную кнопку в кнопку со стрелкой. */
  arrow?: boolean | 'left';

  /** Устанавливает фокус на контроле после окончания загрузки страницы.*/
  autoFocus?: boolean;

  /** Убирает обводку у кнопки. */
  borderless?: boolean;

  /** @ignore */
  checked?: boolean;

  /** @ignore */
  children?: React.ReactNode;

  /** @ignore */
  corners?: React.CSSProperties;

  /** Делает компонент недоступным. */
  disabled?: boolean;

  /** @ignore */
  disableFocus?: boolean;

  /** Переводит контрол в состояние валидации "ошибка". */
  error?: boolean;

  /** Добавляет иконку слева от текста кнопки. */
  icon?: React.ReactElement;

  /** Добавляет иконку справа от текста кнопки. */
  rightIcon?: React.ReactElement;

  /** Переводит кнопку в состояние загрузки. */
  loading?: boolean;

  /** Сужает кнопку. */
  narrow?: boolean;

  /** Задаёт HTML-событие `onblur`. */
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;

  /** Задаёт HTML-событие `onclick`. */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;

  /** Задаёт HTML-событие `onfocus`. */
  onFocus?: React.FocusEventHandler<HTMLButtonElement>;

  /** Задаёт HTML-событие `keydown`. */
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;

  /** Задаёт HTML-событие `onmouseenter`. */
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;

  /** Задаёт HTML-событие `mouseleave`. */
  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;

  /** Задаёт HTML-событие `onmouseover`. */
  onMouseOver?: React.MouseEventHandler<HTMLButtonElement>;

  /** Задаёт размер кнопки. */
  size?: SizeProp;

  /** Задаёт HTML-атрибут `type`. */
  type?: ButtonType;

  /** Задаёт HTML-атрибут `title`. */
  title?: string;

  /** Задаёт стиль кнопки. */
  use?: ButtonUse;

  /** @ignore */
  visuallyFocused?: boolean;

  /** Переводит контрол в состояние валидации "предупреждение". */
  warning?: boolean;

  /** Задаёт ширину кнопки. */
  width?: number | string;

  /** Задаёт объект с переменными темы. Он будет объединён с темой из контекста. */
  theme?: ThemeIn;
}

export interface ButtonState {
  focusedByTab: boolean;
}

export const ButtonDataTids = {
  rootElement: 'Button__rootElement',
  root: 'Button__root',
  spinner: 'Button__spinner',
} as const;

type DefaultProps = Required<Pick<ButtonProps, 'use' | 'size' | 'type'>>;

@rootNode
export class Button extends React.Component<ButtonProps, ButtonState> {
  public static __KONTUR_REACT_UI__ = 'Button';
  public static displayName = 'Button';
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

  private renderLinkRootWithoutHandlers(props: LinkProps) {
    const { onClick, onFocus, onBlur, children, ...rest } = props;
    return <span {...rest}>{children}</span>;
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
      narrow,
      icon,
      rightIcon,
      _noPadding,
      _noRightPadding,
      visuallyFocused,
      align,
      disableFocus,
      onMouseEnter,
      onMouseLeave,
      onMouseOver,
      onMouseDown,
      onMouseUp,
      onKeyDown,
      onClick,
      onClickCapture,
      width,
      children,
      'aria-describedby': ariaDescribedby,
      'aria-haspopup': ariaHasPopup,
      'aria-controls': ariaControls,
      'aria-label': ariaLabel,
      'aria-checked': ariaChecked,
      'aria-expanded': ariaExpanded,
      role,
    } = this.props;
    const { use, type, size } = this.getProps();
    const sizeClass = this.getSizeClassName();

    const isFocused = this.state.focusedByTab || visuallyFocused;
    const isLink = use === 'link';
    const _isTheme2022 = isTheme2022(this.theme);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [wrapClassNameWithArrow, rootClassNameWithArrow, arrowNode] = useButtonArrow(
      { ...this.props, isFocused: Boolean(isFocused) },
      this.theme,
    );
    const isUseStateWithoutOutlineInDisabledState = !['default', 'backless'].includes(use);
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
        rootClassNameWithArrow,
        ...(trueDisabled
          ? [
              styles.disabled(this.theme),
              isUseStateWithoutOutlineInDisabledState && styles.disabledWithoutOutline(this.theme),
              checked && styles.checkedDisabled(this.theme),
              checked && styles.checkedDisabled2022(this.theme),
              borderless && styles.borderless2022(),
              use === 'backless' && !checked && styles.backlessDisabled2022(this.theme),
              use === 'text' && styles.textDisabled2022(),
            ]
          : [
              active && !checked && activeStyles[use](this.theme),
              isFocused && styles.focus(this.theme),
              checked && styles.checked2022(this.theme),
              checked && isFocused && styles.checkedFocused(this.theme),
              borderless && !checked && !isFocused && styles.borderless2022(),
            ]),
      );
    } else {
      rootClassName = cx({
        [styles.root(this.theme)]: true,
        [styles.simulatedPress()]: true,
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
      role,
      'aria-describedby': ariaDescribedby,
      'aria-haspopup': ariaHasPopup,
      'aria-controls': ariaControls,
      'aria-label': ariaLabel,
      'aria-checked': ariaChecked,
      'aria-expanded': ariaExpanded,
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
      onMouseDown,
      onMouseUp,
      onClickCapture,
      tabIndex: disableFocus ? -1 : 0,
      title: this.props.title,
    };

    const wrapProps = {
      className: cx(globalClasses.root, {
        [styles.wrap(this.theme)]: true,
        [wrapClassNameWithArrow]: true,
        [this.getSizeWrapClassName()]: true,
      }),
      style: {
        width,
      },
    };

    const innerShadowNode = _isTheme2022 ? null : <div className={globalClasses.innerShadow} />;

    let outlineNode = null;
    const isDisabled2022 = _isTheme2022 && (disabled || loading);
    if ((!isFocused || isLink) && !isDisabled2022) {
      outlineNode = (
        <div
          style={{ zIndex: _isTheme2022 && isLink ? -1 : undefined }}
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

    const iconProps: Omit<ButtonIconProps, 'position'> = {
      use,
      size: this.getProps().size,
      hasChildren: !!children,
      loading: loading || false,
    };
    const leftIconNode = icon && <ButtonIcon {...iconProps} position="left" icon={icon} />;
    const rightIconNode = rightIcon && (
      <ButtonIcon {...iconProps} hasBothIcons={!!icon && !!rightIcon} position="right" icon={rightIcon} />
    );

    // Force disable all props and features, that cannot be use with Link
    if (isLink) {
      rootProps.className = cx({
        [styles.root(this.theme)]: true,
        [sizeClass]: true,
        [styles.link(this.theme)]: true,
        [styles.linkLineHeight()]: !isSafari || (isSafari && !_isTheme2022),
        [styles.linkLineHeightSafariFallback()]: isSafari && _isTheme2022,
        [styles.linkFocus(this.theme)]: isFocused,
        [styles.linkDisabled(this.theme)]: disabled || loading,
      });
      Object.assign(wrapProps, {
        className: cx(styles.wrap(this.theme), styles.wrapLink()),
        style: { width: wrapProps.style.width },
      });
      rootProps.style.textAlign = undefined;
    }

    const hasLoadingNode = loading && !icon && !rightIcon;
    const loadingNode = hasLoadingNode && <LoadingButtonIcon size={size} />;

    let captionNode = (
      <div
        className={cx(styles.caption(), globalClasses.caption, {
          [styles.captionTranslated()]: (active || checked) && !loading && !_isTheme2022,
          [styles.captionLink()]: isLink,
          [styles.captionDisabled()]: !checked && disabled,
        })}
      >
        {loadingNode}
        {leftIconNode}
        <span
          className={cx(globalClasses.text, {
            [styles.visibilityHidden()]: hasLoadingNode,
          })}
        >
          {children}
        </span>
        {rightIconNode}
      </div>
    );
    if (_isTheme2022 && isLink && !loading) {
      captionNode = (
        <ThemeContext.Provider value={getInnerLinkTheme(this.theme)}>
          <Link
            focused={isFocused}
            disabled={disabled}
            icon={this.renderIcon2022(icon)}
            rightIcon={this.renderIcon2022(rightIcon)}
            as={this.renderLinkRootWithoutHandlers}
            tabIndex={-1}
          >
            {children}
          </Link>
        </ThemeContext.Provider>
      );
    }

    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        <span {...wrapProps} data-tid={ButtonDataTids.rootElement}>
          <button data-tid={ButtonDataTids.root} ref={this._ref} {...rootProps}>
            {innerShadowNode}
            {outlineNode}
            {arrowNode}
            {captionNode}
          </button>
        </span>
      </CommonWrapper>
    );
  }

  private renderIcon2022(icon: React.ReactElement | undefined) {
    if (icon && isKonturIcon(icon)) {
      const sizes = getButtonIconSizes(this.theme);
      return React.cloneElement(icon, { size: icon.props.size ?? sizes[this.getProps().size] });
    }

    return icon;
  }

  private getSizeClassName() {
    const _isTheme2022 = isTheme2022(this.theme);
    switch (this.getProps().size) {
      case 'large':
        return cx(styles.sizeLarge(this.theme), {
          [styles.sizeLargeIE11(this.theme)]: isIE11 || isEdge,
          [styles.sizeLargeWithIcon(this.theme)]: !!this.props.icon,
          [styles.sizeLargeWithIconWithoutText(this.theme)]: _isTheme2022 && !!this.props.icon && !this.props.children,
        });
      case 'medium':
        return cx(styles.sizeMedium(this.theme), {
          [styles.sizeMediumIE11(this.theme)]: isIE11 || isEdge,
          [styles.sizeMediumWithIcon(this.theme)]: !!this.props.icon,
          [styles.sizeMediumWithIconWithoutText(this.theme)]: _isTheme2022 && !!this.props.icon && !this.props.children,
        });
      case 'small':
      default:
        return cx(styles.sizeSmall(this.theme), {
          [styles.sizeSmallIE11(this.theme)]: isIE11 || isEdge,
          [styles.sizeSmallWithIcon(this.theme)]: !!this.props.icon,
          [styles.sizeSmallWithIconWithoutText(this.theme)]: _isTheme2022 && !!this.props.icon && !this.props.children,
        });
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

  private handleFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
    if (!this.props.disabled && !this.props.disableFocus) {
      // focus event fires before keyDown eventlistener
      // so we should check tabPressed in async way
      globalObject.requestAnimationFrame?.(() => {
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
