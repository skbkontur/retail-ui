import React from 'react';
import { globalObject } from '@skbkontur/global-object';

import { ButtonLinkAllowedValues } from '../../lib/types/button-link';
import { resetButton } from '../../lib/styles/Mixins';
import { PolymorphicPropsWithoutRef } from '../../lib/types/polymorphic-component';
import { keyListener } from '../../lib/events/keyListener';
import { Theme, ThemeIn } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { isExternalLink } from '../../lib/utils';
import { CommonProps, CommonWrapper, CommonWrapperRestProps } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { rootNode, TSetRootNode } from '../../lib/rootNode';
import { createPropsGetter, DefaultizedProps } from '../../lib/createPropsGetter';
import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { getVisualStateDataAttributes } from '../../internal/CommonWrapper/utils/getVisualStateDataAttributes';

import { styles } from './Link.styles';
import { LinkIcon } from './LinkIcon';

export interface LinkInnerProps extends CommonProps {
  /** Делает компонент недоступным. */
  disabled?: boolean;

  /** Добавляет иконку слева. */
  icon?: React.ReactElement;

  /** Добавляет иконку справа. */
  rightIcon?: React.ReactElement;

  /** Задает тему ссылки. */
  use?: 'default' | 'success' | 'danger' | 'grayed';

  /** @ignore */
  _button?: boolean;

  /** @ignore */
  _buttonOpened?: boolean;

  /** Задает HTML-атрибут `tabindex`. */
  tabIndex?: number;

  /** Переводит кнопку в состояние загрузки. */
  loading?: boolean;

  /** Задает объект с переменными темы. Он будет объединён с темой из контекста. */
  theme?: ThemeIn;

  /** Задает состояние фокуса.
   * @ignore */
  focused?: boolean;

  /** Переводит контрол в состояние валидации "ошибка". */
  error?: boolean;

  /** Переводит контрол в состояние валидации "предупреждение". */
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
 * Элемент ссылки из HTML.
 */
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

  private theme!: Theme;
  private setRootNode!: TSetRootNode;

  public render(): JSX.Element {
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
        return `noopener${isExternalLink(href) ? ' noreferrer' : ''}`;
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
      arrow = <span className={styles.arrow()} />;
    }

    const isFocused = !disabled && (this.state.focusedByTab || focused);

    const leftIconElement = icon && <LinkIcon icon={icon} loading={loading} position="left" />;
    const rightIconElement = rightIcon && (
      <LinkIcon hasBothIcons={!!icon && !!rightIcon} icon={rightIcon} loading={loading} position="right" />
    );
    const nonInteractive = disabled || loading;

    const rootProps = {
      ...rest,
      className: cx(styles.root(this.theme), styles[use](this.theme), {
        [resetButton()]: Root === 'button',
        [styles.focus(this.theme)]: isFocused,
        [styles.disabled(this.theme)]: disabled || loading,
        [styles.useGrayedFocus(this.theme)]: use === 'grayed' && focused,
        [styles.button(this.theme)]: !!_button,
        [styles.buttonOpened(this.theme)]: !!_buttonOpened,
        [styles.warning(this.theme)]: warning,
        [styles.error(this.theme)]: error,
        [styles.lineFocus(this.theme)]: isFocused && use === 'default',
        [styles.lineFocusSuccess(this.theme)]: isFocused && use === 'success',
        [styles.lineFocusDanger(this.theme)]: isFocused && use === 'danger',
        [styles.lineFocusGrayed(this.theme)]: isFocused && use === 'grayed',
      }),
      onClick: this.handleClick,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      tabIndex: this.getTabIndex({ nonInteractive, tabIndex }),
      rel: this.getRel(),
    };

    return (
      <Root data-tid={LinkDataTids.root} {...rootProps} {...getVisualStateDataAttributes({ disabled })}>
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
      globalObject.requestAnimationFrame?.(() => {
        if (keyListener.isTabPressed) {
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

    if (onClick && !disabled && !loading) {
      onClick(event);
    }
  };
}

const isAnchorProps = (props: LinkProps<any>): props is LinkProps<'a'> => {
  return props.component === 'a';
};
