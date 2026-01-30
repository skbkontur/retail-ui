import React, { type JSX } from 'react';
import type { Emotion } from '@emotion/css/create-instance';

import type { GlobalObject } from '../../lib/globalObject.js';
import type { ButtonLinkAllowedValues } from '../../lib/types/button-link.js';
import type { PolymorphicPropsWithoutRef } from '../../lib/types/polymorphic-component.js';
import { KeyListener } from '../../lib/events/keyListener.js';
import type { Theme, ThemeIn } from '../../lib/theming/Theme.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import { isExternalLink } from '../../lib/utils.js';
import type { CommonProps, CommonWrapperRestProps } from '../../internal/CommonWrapper/index.js';
import { CommonWrapper } from '../../internal/CommonWrapper/index.js';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode/index.js';
import { rootNode } from '../../lib/rootNode/index.js';
import type { DefaultizedProps } from '../../lib/createPropsGetter.js';
import { createPropsGetter } from '../../lib/createPropsGetter.js';
import { ThemeFactory } from '../../lib/theming/ThemeFactory.js';
import { getVisualStateDataAttributes } from '../../internal/CommonWrapper/utils/getVisualStateDataAttributes.js';
import { withRenderEnvironment } from '../../lib/renderEnvironment/index.js';

import { getStyles } from './Link.styles.js';
import { LinkIcon } from './LinkIcon.js';

export interface LinkInnerProps extends CommonProps {
  /** Ссылка меняет цвет на серый и становится недоступна для нажатия. */
  disabled?: boolean;

  /** Добавляет иконку слева от ссылки. */
  icon?: React.ReactElement;

  /** Добавляет иконку справа от ссылки. */
  rightIcon?: React.ReactElement;

  /** Стиль ссылки. */
  use?: 'default' | 'success' | 'danger' | 'grayed';

  /** @ignore */
  _button?: boolean;

  /** @ignore */
  _buttonOpened?: boolean;

  /** HTML-атрибут `tabindex`. */
  tabIndex?: number;

  /** Переводит ссылку в состояние загрузки. */
  loading?: boolean;

  /** Объект с переменными темы. */
  theme?: ThemeIn;

  /** Задает состояние фокуса.
   * @ignore */
  focused?: boolean;

  /** Переводит ссылку в состояние валидации "Ошибка". */
  error?: boolean;

  /** Переводит ссылку в состояние валидации "Предупреждение". */
  warning?: boolean;
}

const LINK_DEFAULT_COMPONENT = 'a';

export type LinkProps<C extends ButtonLinkAllowedValues = typeof LINK_DEFAULT_COMPONENT> = PolymorphicPropsWithoutRef<
  LinkInnerProps,
  C
>;
export interface LinkState {
  focusedByTab: boolean;
}

export const LinkDataTids = {
  root: 'Link__root',
} as const;

type DefaultProps = Required<Pick<LinkProps<ButtonLinkAllowedValues>, 'use' | 'component'>>;
type DefaultizedLinkProps = DefaultizedProps<LinkProps<ButtonLinkAllowedValues>, DefaultProps>;

/**
 * С помощью ссылки пользователь может перейти на другую страницу, раздел приложения или внешний URL.
 */
@withRenderEnvironment
@rootNode
export class Link<C extends ButtonLinkAllowedValues = typeof LINK_DEFAULT_COMPONENT> extends React.Component<
  LinkProps<C>,
  LinkState
> {
  public static __KONTUR_REACT_UI__ = 'Link';
  public static displayName = 'Link';

  public static defaultProps: DefaultProps = {
    use: 'default',
    component: LINK_DEFAULT_COMPONENT,
  };

  private getProps = createPropsGetter(Link.defaultProps);

  public state: LinkState = {
    focusedByTab: false,
  };

  private globalObject!: GlobalObject;
  private emotion!: Emotion;
  private cx!: Emotion['cx'];
  private styles!: ReturnType<typeof getStyles>;
  private theme!: Theme;
  public getRootNode!: TGetRootNode;
  private setRootNode!: TSetRootNode;
  private keyListener!: KeyListener;

  public componentDidMount() {
    this.keyListener = new KeyListener(this.globalObject);
  }

  public render(): JSX.Element {
    this.styles = getStyles(this.emotion);

    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = this.props.theme ? ThemeFactory.create(this.props.theme as Theme, theme) : theme;
          return (
            <CommonWrapper rootNodeRef={this.setRootNode} {...this.getProps()}>
              {this.renderMain}
            </CommonWrapper>
          );
        }}
      </ThemeContext.Consumer>
    );
  }

  private getTabIndex = ({
    nonInteractive,
    tabIndex = 0,
  }: {
    nonInteractive: boolean | undefined;
    tabIndex: number | undefined;
  }) => {
    return nonInteractive ? -1 : tabIndex;
  };

  private getRel = () => {
    if (isAnchorProps(this.props)) {
      const { rel, href } = this.props;
      if (!rel && href) {
        return `noopener${isExternalLink(href, this.globalObject) ? ' noreferrer' : ''}`;
      }
      return rel;
    }

    return undefined;
  };

  private renderMain = (props: CommonWrapperRestProps<DefaultizedLinkProps>) => {
    const {
      disabled,
      icon,
      rightIcon,
      use,
      loading,
      _button,
      _buttonOpened,
      component: Root,
      focused = false,
      error,
      warning,
      tabIndex,
      theme,
      ...rest
    } = props;

    let arrow = null;
    if (_button) {
      arrow = <span className={this.styles.arrow()} />;
    }

    const isFocused = !disabled && (this.state.focusedByTab || focused);

    const leftIconElement = icon && <LinkIcon icon={icon} loading={loading} position="left" />;
    const rightIconElement = rightIcon && (
      <LinkIcon hasBothIcons={!!icon && !!rightIcon} icon={rightIcon} loading={loading} position="right" />
    );
    const nonInteractive = disabled || loading;
    const getUseStyles = () => {
      switch (use) {
        case 'default':
          return this.styles.default(this.theme);
        case 'danger':
          return this.styles.danger(this.theme);
        case 'success':
          return this.styles.success(this.theme);
        case 'grayed':
          return this.styles.grayed(this.theme);
      }
    };
    const getUseLineFocusStyles = () => {
      switch (use) {
        case 'default':
          return this.styles.lineFocus(this.theme);
        case 'danger':
          return this.styles.lineFocusDanger(this.theme);
        case 'success':
          return this.styles.lineFocusSuccess(this.theme);
        case 'grayed':
          return this.styles.lineFocusGrayed(this.theme);
      }
    };

    const rootProps = {
      ...rest,
      className: this.cx({
        [this.styles.root(this.theme)]: true,
        [this.styles.reserButton()]: Root === 'button',
        [this.styles.focus(this.theme)]: isFocused,
        [this.styles.disabled(this.theme)]: disabled || loading,
        [getUseStyles()]: true,
        [this.styles.useGrayedFocus(this.theme)]: use === 'grayed' && focused,
        [this.styles.button(this.theme)]: !!_button,
        [this.styles.buttonOpened(this.theme)]: !!_buttonOpened,
        [this.styles.warning(this.theme)]: warning,
        [this.styles.error(this.theme)]: error,
        [getUseLineFocusStyles()]: isFocused,
      }),
      onClick: this.handleClick,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      tabIndex: this.getTabIndex({ nonInteractive, tabIndex }),
      rel: this.getRel(),
    };

    const buttonOnlyProps = Root === 'button' ? { disabled: nonInteractive } : {};

    return (
      <Root
        data-tid={LinkDataTids.root}
        {...rootProps}
        {...buttonOnlyProps}
        {...getVisualStateDataAttributes({ disabled })}
      >
        {leftIconElement}
        {this.props.children}
        {rightIconElement}
        {arrow}
      </Root>
    );
  };

  private handleFocus = () => {
    if (!this.props.disabled) {
      // focus event fires before keyDown eventlistener
      // so we should check tabPressed in async way
      this.globalObject.requestAnimationFrame?.(() => {
        if (this.keyListener.isTabPressed) {
          this.setState({ focusedByTab: true });
        }
      });
    }
  };

  private handleBlur = () => {
    this.setState({ focusedByTab: false });
  };

  private handleClick = (event: React.MouseEvent) => {
    const { onClick, disabled, loading } = this.props;

    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (onClick && !disabled && !loading) {
      onClick(event);
    }
  };
}

const isAnchorProps = (props: LinkProps<any>): props is LinkProps<'a'> => {
  return props.component === 'a';
};
