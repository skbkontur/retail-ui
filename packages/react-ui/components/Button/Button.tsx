import type { HTMLAttributes, JSX } from 'react';
import React from 'react';
import warning from 'warning';
import type { Emotion } from '@emotion/css/create-instance';

import type { GlobalObject } from '../../lib/globalObject';
import type { ButtonLinkAllowedValues } from '../../lib/types/button-link';
import { isKonturIcon } from '../../lib/utils';
import { isSafari } from '../../lib/client';
import { KeyListener } from '../../lib/events/keyListener';
import type { Theme, ThemeIn } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import type { CommonProps, CommonWrapperRestProps } from '../../internal/CommonWrapper';
import { CommonWrapper } from '../../internal/CommonWrapper';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode';
import { rootNode } from '../../lib/rootNode';
import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { createPropsGetter } from '../../lib/createPropsGetter';
import { Link } from '../Link';
import type { SizeProp } from '../../lib/types/props';
import type { PolymorphicPropsWithoutRef } from '../../lib/types/polymorphic-component';
import { withSize } from '../../lib/size/SizeDecorator';
import { withRenderEnvironment } from '../../lib/renderEnvironment';

import { getStyles, getActiveStyles, globalClasses } from './Button.styles';
import type { ButtonIconProps } from './ButtonIcon';
import { ButtonIcon, getButtonIconSizes } from './ButtonIcon';
import { useButtonArrow } from './ButtonArrow';
import { getInnerLinkTheme } from './getInnerLinkTheme';
import { LoadingButtonIcon } from './LoadingButtonIcon';

export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonUse = 'default' | 'primary' | 'success' | 'danger' | 'pay' | 'link' | 'text' | 'backless';

export interface ButtonInnerProps extends CommonProps {
  /** @ignore */
  _noPadding?: boolean;

  /** @ignore */
  _noRightPadding?: boolean;

  /** Применяет к кнопке стили псевдокласса `:active`. */
  active?: boolean;

  /** Задаёт выравнивание текста в кнопке. */
  align?: React.CSSProperties['textAlign'];

  /** Преобразует обычную кнопку в кнопку со стрелкой. */
  arrow?: boolean | 'left';

  /** Устанавливает фокус на кнопке после окончания загрузки страницы.*/
  autoFocus?: boolean;

  /** Убирает обводку у кнопки.
   *
   * **Не рекомендуем использовать, противоречит дизайн-требованиям.
   * @deprecated Состояние не соответствует Контур.Гайдам, проп будет удален в следующей мажорной версии.
   *
   * Альтернативный вариант использования — через переменную темы `btnBorderWidth` */
  borderless?: boolean;

  /** @ignore */
  checked?: boolean;

  /** @ignore */
  children?: React.ReactNode;

  /** @ignore */
  corners?: React.CSSProperties;

  /** Блокирует кнопку и перекрашивает в серый. */
  disabled?: boolean;

  /** @ignore */
  disableFocus?: boolean;

  /** Переводит кнопку в состояние валидации "Ошибка".
   *
   * @deprecated Состояние не соответствует Контур.Гайдам, проп будет удален в следующей мажорной версии. */
  error?: boolean;

  /** Добавляет иконку слева от текста кнопки. */
  icon?: React.ReactElement<any>;

  /** Добавляет иконку справа от текста кнопки. */
  rightIcon?: React.ReactElement<any>;

  /** Переводит кнопку в состояние загрузки. */
  loading?: boolean;

  /** Сужает кнопку.
   *
   * @deprecated Состояние не соответствует Контур.Гайдам, проп будет удален в следующей мажорной версии.
   *
   * Альтернативный вариант использования — через переменные темы `btnPaddingXSmall`, `btnPaddingXMedium`, `btnPaddingXLarge` */
  narrow?: boolean;

  /** Задаёт размер кнопки. */
  size?: SizeProp;

  /** Задаёт HTML-атрибут `type`. */
  type?: ButtonType;

  /** Задаёт HTML-атрибут `title`. */
  title?: string;

  /** Задаёт стиль кнопки.
   * **Вариант `link` устарел.** Если нужна кнопка, выглядящая как ссылка, используйте `Link component=button`.
   */
  use?: ButtonUse;

  /** @ignore */
  visuallyFocused?: boolean;

  /** Переводит кнопку в состояние валидации "Предупреждение".
   * @deprecated Состояние не соответствует Контур.Гайдам, проп будет удален в следующей мажорной версии. */
  warning?: boolean;

  /** Задаёт ширину кнопки. */
  width?: number | string;

  /** Задаёт объект с переменными темы. */
  theme?: ThemeIn;
}

export const BUTTON_DEFAULT_COMPONENT = 'button';

export type ButtonProps<C extends ButtonLinkAllowedValues = typeof BUTTON_DEFAULT_COMPONENT> =
  PolymorphicPropsWithoutRef<ButtonInnerProps, C>;

export interface ButtonState {
  focusedByTab: boolean;
}

export const ButtonDataTids = {
  rootElement: 'Button__rootElement',
  root: 'Button__root',
  spinner: 'Button__spinner',
} as const;

type DefaultProps = Required<Pick<ButtonProps<ButtonLinkAllowedValues>, 'use' | 'type' | 'component'>>;

const SpanComponent: React.FunctionComponent<HTMLAttributes<HTMLSpanElement>> = ({ children, ...rest }) => {
  return <span {...rest}>{children}</span>;
};

/** Кнопка запускает действие, сценарий или позволяет перейти на другую страницу. */
@withRenderEnvironment
@withSize
@rootNode
export class Button<C extends ButtonLinkAllowedValues = typeof BUTTON_DEFAULT_COMPONENT> extends React.Component<
  ButtonProps<C>,
  ButtonState
> {
  public static __KONTUR_REACT_UI__ = 'Button';
  public static displayName = 'Button';
  public static __BUTTON__ = true;

  public static defaultProps: DefaultProps = {
    use: 'default',
    // By default, the type attribute is 'submit'. IE8 will fire a click event
    // on this button if somewhere on the page user presses Enter while some
    // input is focused. So we set type to 'button' by default.
    type: 'button',
    component: BUTTON_DEFAULT_COMPONENT,
  };

  private getProps = createPropsGetter(Button.defaultProps);

  public state = {
    focusedByTab: false,
  };

  private globalObject!: GlobalObject;
  private emotion!: Emotion;
  private cx!: Emotion['cx'];
  private styles!: ReturnType<typeof getStyles>;
  private activeStyles!: ReturnType<typeof getActiveStyles>;
  private theme!: Theme;
  private node: HTMLElement | null = null;
  private size!: SizeProp;
  public getRootNode!: TGetRootNode;
  private setRootNode!: TSetRootNode;
  private keyListener!: KeyListener;

  public componentDidMount() {
    this.keyListener = new KeyListener(this.globalObject);
    if (this.props.autoFocus) {
      this.keyListener.isTabPressed = true;
      this.focus();
    }
    warning(
      this.props.use !== 'link',
      '[Button]: `use="link"` has been deprecated. Please, use `<Link component="button" />` instead.',
    );
  }

  public static getDerivedStateFromProps(props: ButtonProps) {
    if (props.loading || props.disabled) {
      return { focusedByTab: false };
    }
    return null;
  }

  /** Программно устанавливает фокус на кнопке. Появляется фокусная рамка, элемент получает клавиатурные события и воспринимается как текущий элемент для чтения скринридерами.
   * @public
   */
  public focus() {
    this.node?.focus();
  }

  /** Программно снимает фокус с кнопки.
   * @public
   */
  public blur() {
    this.node?.blur();
  }

  public render(): JSX.Element {
    this.styles = getStyles(this.emotion);
    this.activeStyles = getActiveStyles(this.emotion);

    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = this.props.theme ? ThemeFactory.create(this.props.theme as Theme, theme) : theme;
          return (
            <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
              {this.renderMain}
            </CommonWrapper>
          );
        }}
      </ThemeContext.Consumer>
    );
  }

  private getTabIndex({
    disableFocus,
    disabled,
    tabIndex = 0,
  }: Pick<ButtonProps, 'disableFocus' | 'disabled' | 'tabIndex'>) {
    if (disableFocus || disabled) {
      return -1;
    }

    return tabIndex;
  }

  private renderMain = (props: CommonWrapperRestProps<ButtonProps>) => {
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
      arrow,
      icon,
      rightIcon,
      _noPadding,
      _noRightPadding,
      visuallyFocused,
      align,
      disableFocus,
      width,
      tabIndex,
      component: _component,
      use: useProp,
      theme,
      ...rest
    } = props;
    const { use, component, children } = this.getProps();

    const sizeClass = this.getSizeClassName();

    const isFocused = this.state.focusedByTab || visuallyFocused;
    const isLink = use === 'link';

    const [rootClassNameWithArrow, arrowNode] = useButtonArrow(
      { ...this.props, isFocused: Boolean(isFocused), size: this.size },
      this.theme,
      this.styles,
      this.cx,
    );
    const isUseStateWithoutOutlineInDisabledState = !['default', 'backless'].includes(use);

    const nonInteractive = disabled || loading;
    const rootClassName = this.cx(
      this.styles.root(this.theme),
      this.styles[use](this.theme),
      sizeClass,
      narrow && this.styles.narrow(),
      _noPadding && this.styles.noPadding(),
      _noRightPadding && this.styles.noRightPadding(),
      rootClassNameWithArrow,
      ...(nonInteractive
        ? [
            this.styles.disabled(this.theme),
            isUseStateWithoutOutlineInDisabledState && this.styles.disabledWithoutOutline(this.theme),
            checked && this.styles.checkedDisabled(this.theme),
            borderless && this.styles.borderless(),
            use === 'backless' && this.styles.backlessDisabled(this.theme),
            use === 'text' && this.styles.textDisabled(),
            globalClasses.disabled,
          ]
        : [
            active && !checked && this.activeStyles[use](this.theme),
            isFocused && this.styles.focus(this.theme),
            checked && this.styles.checked(this.theme),
            checked && isFocused && this.styles.checkedFocused(this.theme),
            borderless && !checked && !isFocused && this.styles.borderless(),
          ]),
    );

    const rootProps = {
      ...rest,
      className: rootClassName,
      style: {
        textAlign: align,
        ...corners,
      },
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      tabIndex: this.getTabIndex({ disableFocus, disabled: nonInteractive, tabIndex }),
    };

    const wrapProps = {
      className: this.cx(globalClasses.root, {
        [this.styles.wrap(this.theme)]: true,
        [this.getSizeWrapClassName()]: true,
      }),
      style: {
        width,
      },
    };

    const buttonOnlyProps = component === 'button' ? { disabled: nonInteractive } : {};

    const innerShadowNode = null;

    let outlineNode = null;
    if ((!isFocused || isLink) && !nonInteractive) {
      outlineNode = (
        <div
          className={this.cx(this.styles.outline(), {
            [this.styles.outlineWarning(this.theme)]: warning,
            [this.styles.outlineError(this.theme)]: error,
            [this.styles.outlineLink()]: isLink,
            [this.styles.outlineLinkWarning(this.theme)]: isLink && warning,
            [this.styles.outlineLinkError(this.theme)]: isLink && error,
          })}
        />
      );
    }

    const iconProps: Omit<ButtonIconProps, 'position'> = {
      use,
      size: this.size,
      hasChildren: !!children,
      loading: loading || false,
    };
    const leftIconNode = icon && <ButtonIcon {...iconProps} position="left" icon={icon} />;
    const rightIconNode = rightIcon && (
      <ButtonIcon {...iconProps} hasBothIcons={!!icon && !!rightIcon} position="right" icon={rightIcon} />
    );

    // Force disable all props and features, that cannot be use with Link
    if (isLink) {
      rootProps.className = this.cx({
        [this.styles.root(this.theme)]: true,
        [sizeClass]: true,
        [this.styles.link(this.theme)]: true,
        [this.styles.linkLineHeight()]: !isSafari,
        [this.styles.linkLineHeightSafariFallback()]: isSafari,
        [this.styles.linkFocus(this.theme)]: isFocused,
        [this.styles.linkDisabled(this.theme)]: nonInteractive,
      });
      Object.assign(wrapProps, {
        className: this.cx(this.styles.wrap(this.theme), this.styles.wrapLink()),
        style: { width: wrapProps.style.width },
      });

      rootProps.style.textAlign = undefined;
    }

    const hasLoadingNode = loading && !icon && !rightIcon;
    const loadingNode = hasLoadingNode && <LoadingButtonIcon size={this.size} />;

    let captionNode = (
      <div
        className={this.cx(this.styles.caption(), globalClasses.caption, {
          [this.styles.captionLink()]: isLink,
          [this.styles.captionDisabled()]: !checked && disabled,
        })}
      >
        {loadingNode}
        {leftIconNode}
        <span
          className={this.cx(globalClasses.text, {
            [this.styles.visibilityHidden()]: hasLoadingNode,
          })}
        >
          {children}
        </span>
        {rightIconNode}
      </div>
    );
    if (isLink && !loading) {
      captionNode = (
        <ThemeContext.Provider value={getInnerLinkTheme(this.theme)}>
          {
            <Link<typeof SpanComponent>
              focused={isFocused}
              disabled={disabled}
              icon={this.renderIcon2022(icon)}
              rightIcon={this.renderIcon2022(rightIcon)}
              tabIndex={-1}
              component={SpanComponent}
            >
              {children}
            </Link>
          }
        </ThemeContext.Provider>
      );
    }

    const Root: React.ElementType = component;

    return (
      <span {...wrapProps} data-tid={ButtonDataTids.root}>
        <Root data-tid={ButtonDataTids.rootElement} ref={this._ref} {...rootProps} {...buttonOnlyProps}>
          {innerShadowNode}
          {outlineNode}
          {arrowNode}
          {captionNode}
        </Root>
      </span>
    );
  };

  private renderIcon2022(icon: React.ReactElement<any> | undefined) {
    if (icon && isKonturIcon(icon)) {
      const sizes = getButtonIconSizes(this.theme);
      return React.cloneElement(icon, { size: icon.props.size ?? sizes[this.size] });
    }

    return icon;
  }

  private getSizeClassName() {
    const { icon, rightIcon, children } = this.getProps();

    switch (this.size) {
      case 'large': {
        const commonClasses = {
          [this.styles.sizeLargeWithIcon(this.theme)]: !!icon,
          [this.styles.sizeLargeWithRightIcon(this.theme)]: !!rightIcon,
          [this.styles.sizeLargeWithIconWithoutText(this.theme)]: (!!icon || !!rightIcon) && !children,
        };

        return this.cx(this.styles.sizeLarge(this.theme), commonClasses);
      }
      case 'medium': {
        const commonClasses = {
          [this.styles.sizeMediumWithIcon(this.theme)]: !!icon,
          [this.styles.sizeMediumWithRightIcon(this.theme)]: !!rightIcon,
          [this.styles.sizeMediumWithIconWithoutText(this.theme)]: (!!icon || !!rightIcon) && !children,
        };

        return this.cx(this.styles.sizeMedium(this.theme), commonClasses);
      }
      case 'small':
      default: {
        const commonClasses = {
          [this.styles.sizeSmallWithIcon(this.theme)]: !!icon,
          [this.styles.sizeSmallWithRightIcon(this.theme)]: !!rightIcon,
          [this.styles.sizeSmallWithIconWithoutText(this.theme)]: (!!icon || !!rightIcon) && !children,
        };

        return this.cx(this.styles.sizeSmall(this.theme), commonClasses);
      }
    }
  }

  private getSizeWrapClassName() {
    switch (this.size) {
      case 'large':
        return this.styles.wrapLarge(this.theme);
      case 'medium':
        return this.styles.wrapMedium(this.theme);
      case 'small':
      default:
        return this.styles.wrapSmall(this.theme);
    }
  }

  private handleFocus = (e: React.FocusEvent) => {
    if (!this.props.disabled && !this.props.disableFocus) {
      // focus event fires before keyDown eventlistener
      // so we should check tabPressed in async way
      this.globalObject.requestAnimationFrame?.(() => {
        if (this.keyListener.isTabPressed) {
          this.setState({ focusedByTab: true });
        }
      });
      this.props.onFocus?.(e);
    }
  };

  private handleBlur = (e: React.FocusEvent) => {
    this.setState({ focusedByTab: false });
    if (!this.props.disabled && !this.props.disableFocus) {
      this.props.onBlur?.(e);
    }
  };

  private _ref = (node: HTMLElement | null) => {
    this.node = node;
  };
}
