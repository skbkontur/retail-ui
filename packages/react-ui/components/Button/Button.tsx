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
import { Spinner } from '../Spinner';
import { LoadingIcon } from '../../internal/icons2022/LoadingIcon';
import { SizeProp } from '../../lib/types/props';

import { styles, activeStyles, globalClasses } from './Button.styles';
import { ButtonIcon, getButtonIconSizes } from './ButtonIcon';
import { useButtonArrow } from './ButtonArrow';
import { getInnerLinkTheme } from './getInnerLinkTheme';

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
  _noPadding?: boolean; // !DONE

  /** @ignore */
  _noRightPadding?: boolean; // !DONE

  /**
   * Применяет к кнопке стили псевдокласса `:active`.
   */
  active?: boolean; // !DONE

  /**
   * CSS-свойство `text-align`.
   */
  align?: React.CSSProperties['textAlign']; // !DONE

  /**
   * Превращает обычную кнопку в кнопку со стрелкой.
   */
  arrow?: boolean | 'left'; // !DONE

  /**
   * Даёт кнопке фокус после окончания загрузки страницы.
   */
  autoFocus?: boolean; // !DONE

  /**
   * Убирает обводку у кнопки.
   */
  borderless?: boolean; // !DONE

  /**
   * @ignore
   */
  checked?: boolean; // !DONE

  children?: React.ReactNode; // !DONE

  /** @ignore */
  corners?: React.CSSProperties; // !DONE

  /**
   * Отключенное состояние кнопки.
   */
  disabled?: boolean; // !DONE

  /** @ignore */
  disableFocus?: boolean; // !DONE

  /**
   * Состояние валидации при ошибке.
   */
  error?: boolean; // !DONE

  /**
   * Иконка слева от текста кнопки.
   */
  icon?: React.ReactElement<any>; // !DONE

  /**
   * Переводит кнопку в состояние загрузки.
   */
  loading?: boolean; // !DONE

  /**
   * Сужает кнопку.
   */
  narrow?: boolean; // !DONE

  /**
   * HTML-событие `onblur`.
   */
  onBlur?: React.FocusEventHandler<HTMLButtonElement>; // !DONE

  /**
   * HTML-событие `onclick`.
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>; // !DONE

  /**
   * HTML-событие `onfocus`.
   */
  onFocus?: React.FocusEventHandler<HTMLButtonElement>; // !DONE

  /**
   * HTML-событие `keydown`.
   */
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>; // !DONE

  /**
   * HTML-событие `onmouseenter`.
   */
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>; // !DONE

  /**
   * HTML-событие `mouseleave`.
   */
  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>; // !DONE

  /**
   * HTML-событие `onmouseover`.
   */
  onMouseOver?: React.MouseEventHandler<HTMLButtonElement>; // !DONE

  /**
   * Задаёт размер кнопки.
   *
   * **Допустимые значения**: `"small"`, `"medium"`, `"large"`.
   */
  size?: SizeProp; // !DONE

  /**
   * HTML-атрибут `type`.
   */
  type?: ButtonType; // !DONE

  /**
   * HTML-атрибут `title`.
   */
  title?: string; // !DONE

  /**
   * Стиль кнопки.
   *
   * **Допустимые значения**: `"default"`, `"primary"`, `"success"`, `"danger"`, `"pay"`, `"link"`, `"text"`, `"backless"`.
   */
  use?: ButtonUse; // !DONE

  /** @ignore */
  visuallyFocused?: boolean; // !DONE

  /**
   * Состояние валидации при предупреждении.
   */
  warning?: boolean; // !DONE

  /**
   * CSS-свойство `width`.
   */
  width?: number | string; // !DONE

  /**
   * Обычный объект с переменными темы.
   * Он будет объединён с темой из контекста.
   */
  theme?: ThemeIn; // !DONE
}

export interface ButtonState {
  focusedByTab: boolean;
}

export const ButtonDataTids = {
  root: 'Button__root', // !DONE
  spinner: 'Button__spinner', // !DONE
} as const;

type DefaultProps = Required<Pick<ButtonProps, 'use' | 'size' | 'type'>>; // !DONE

@rootNode
export class Button extends React.Component<ButtonProps, ButtonState> {
  public static __KONTUR_REACT_UI__ = 'Button'; // !DONE
  public static __BUTTON__ = true; // !DONE

  public static defaultProps: DefaultProps = {
    // !DONE
    use: 'default',
    size: 'small',
    type: 'button',
  };

  private getProps = createPropsGetter(Button.defaultProps); // !DONE

  public state = {
    // !DONE
    focusedByTab: false,
  };

  private theme!: Theme; // !DONE
  private node: HTMLButtonElement | null = null; // !DONE
  private setRootNode!: TSetRootNode; // !DONE

  public componentDidMount() {
    // !DONE
    if (this.props.autoFocus) {
      keyListener.isTabPressed = true;
      this.focus();
    }
  }

  public static getDerivedStateFromProps(props: ButtonProps) {
    // !DONE
    if (props.loading || props.disabled) {
      return { focusedByTab: false };
    }
    return null;
  }

  /**
   * @public
   */
  public focus() {
    // !DONE
    this.node?.focus();
  }

  /**
   * @public
   */
  public blur() {
    // !DONE
    this.node?.blur();
  }

  public render(): JSX.Element {
    // !DONE
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
    // !DONE
    const { onClick, onFocus, onBlur, children, ...rest } = props;
    return <span {...rest}>{children}</span>;
  }

  private renderMain() {
    const {
      corners, // !DONE
      active, // !DONE
      disabled, // !DONE
      borderless, // !DONE
      checked, // !DONE
      error, // !DONE
      warning, // !DONE
      loading, // !DONE
      narrow, // !DONE
      icon, // !DONE
      _noPadding, // !DONE
      _noRightPadding, // !DONE
      visuallyFocused, // !DONE
      align, // !DONE
      disableFocus, // !DONE
      onMouseEnter, // !DONE
      onMouseLeave, // !DONE
      onMouseOver, // !DONE
      onMouseDown, // !DONE
      onMouseUp, // !DONE
      onKeyDown, // !DONE
      onClick, // !DONE
      onClickCapture, // !DONE
      width, // !DONE
      children, // !DONE
      'aria-describedby': ariaDescribedby, // !DONE
      'aria-haspopup': ariaHasPopup, // !DONE
      'aria-controls': ariaControls, // !DONE
      'aria-label': ariaLabel, // !DONE
      'aria-checked': ariaChecked, // !DONE
      'aria-expanded': ariaExpanded, // !DONE
      role, // !DONE
    } = this.props;
    const { use, type, size } = this.getProps(); // !DONE
    const sizeClass = this.getSizeClassName(); // !DONE

    const isFocused = this.state.focusedByTab || visuallyFocused; // !DONE
    const isLink = use === 'link'; // !DONE
    const _isTheme2022 = isTheme2022(this.theme); // !DONE

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [wrapClassNameWithArrow, rootClassNameWithArrow, arrowNode] = useButtonArrow(
      // !DONE
      { ...this.props, isFocused: Boolean(isFocused) },
      this.theme,
    );
    const isUseStateWithoutOutlineInDisabledState = !['default', 'backless'].includes(use); // !DONE
    let rootClassName = ''; // !DONE
    if (_isTheme2022) {
      // !DONE
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
      // !DONE
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
      type, // !DONE
      role, // !DONE
      'aria-describedby': ariaDescribedby, // !DONE
      'aria-haspopup': ariaHasPopup, // !DONE
      'aria-controls': ariaControls, // !DONE
      'aria-label': ariaLabel, // !DONE
      'aria-checked': ariaChecked, // !DONE
      'aria-expanded': ariaExpanded, // !DONE
      className: rootClassName, // !DONE
      style: {
        textAlign: align, // !DONE
        ...corners, // !DONE
      },
      disabled: disabled || loading, // !DONE
      onClick, // !DONE
      onFocus: this.handleFocus, // !DONE
      onBlur: this.handleBlur, // !DONE
      onKeyDown, // !DONE
      onMouseEnter, // !DONE
      onMouseLeave, // !DONE
      onMouseOver, // !DONE
      onMouseDown, // !DONE
      onMouseUp, // !DONE
      onClickCapture, // !DONE
      tabIndex: disableFocus ? -1 : 0, // !DONE
      title: this.props.title, // !DONE
    };

    const wrapProps = {
      className: cx(globalClasses.root, {
        [styles.wrap(this.theme)]: true, // !DONE
        [wrapClassNameWithArrow]: true, // !DONE
        [this.getSizeWrapClassName()]: true, // !DONE
      }),
      style: {
        width, // !DONE
      },
    };

    const innerShadowNode = _isTheme2022 ? null : <div className={globalClasses.innerShadow} />; // !DONE

    let outlineNode = null; // !DONE
    const isDisabled2022 = _isTheme2022 && (disabled || loading); // !DONE
    if ((!isFocused || isLink) && !isDisabled2022) {
      // !DONE
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

    const iconNode = icon && (
      // !DONE
      <ButtonIcon
        icon={icon}
        size={size}
        hasChildren={Boolean(children)}
        disabled={disabled || false}
        loading={loading || false}
        use={use}
      />
    );
    let loadingNode = null; // !DONE
    if (loading && !icon) {
      // !DONE
      const loadingIcon = _isTheme2022 ? <LoadingIcon size={size} /> : <Spinner caption={null} dimmed type="mini" />;
      loadingNode = (
        <div data-tid={ButtonDataTids.spinner} className={styles.loading()}>
          {loadingIcon}
        </div>
      );
    }

    // Force disable all props and features, that cannot be use with Link
    if (isLink) {
      // !DONE
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

    let captionNode = (
      // !DONE
      <div
        className={cx(styles.caption(), globalClasses.caption, {
          [styles.captionTranslated()]: (active || checked) && !loading && !_isTheme2022,
          [styles.captionLink()]: isLink,
          [styles.captionDisabled()]: !checked && disabled,
        })}
      >
        {loadingNode}
        {iconNode}
        <span
          className={cx(globalClasses.text, {
            [styles.visibilityHidden()]: !!loadingNode,
          })}
        >
          {children}
        </span>
      </div>
    );
    if (_isTheme2022 && isLink && !loading) {
      // !DONE
      captionNode = (
        <ThemeContext.Provider value={getInnerLinkTheme(this.theme)}>
          <Link
            focused={isFocused}
            disabled={disabled}
            icon={this.renderIcon2022(icon)}
            as={this.renderLinkRootWithoutHandlers}
            tabIndex={-1}
          >
            {children}
          </Link>
        </ThemeContext.Provider>
      );
    }

    return (
      // !DONE
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        <span {...wrapProps}>
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
    // !DONE
    if (icon && isKonturIcon(icon)) {
      const sizes = getButtonIconSizes(this.theme);
      return React.cloneElement(icon, { size: icon.props.size ?? sizes[this.getProps().size] });
    }

    return icon;
  }

  private getSizeClassName() {
    // !DONE
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
    // !DONE
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
    // !DONE
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
    // !DONE
    this.setState({ focusedByTab: false });
    if (!this.props.disabled && !this.props.disableFocus) {
      this.props.onBlur?.(e);
    }
  };

  private _ref = (node: HTMLButtonElement | null) => {
    // !DONE
    this.node = node;
  };
}

export const isButton = isReactUIComponent<ButtonProps>('Button'); // !DONE
