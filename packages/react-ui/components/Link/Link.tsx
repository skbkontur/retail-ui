import React, { AriaAttributes } from 'react';
import { globalObject } from '@skbkontur/global-object';

import { resetButton } from '../../lib/styles/Mixins';
import { PolymorphicPropsWithoutRef } from '../../typings/react-ref';
import { keyListener } from '../../lib/events/keyListener';
import { Theme, ThemeIn } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { isExternalLink } from '../../lib/utils';
import { CommonProps, CommonWrapper, CommonWrapperRestProps } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { rootNode, TSetRootNode } from '../../lib/rootNode';
import { createPropsGetter, DefaultizedProps } from '../../lib/createPropsGetter';
import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { isDarkTheme, isTheme2022 } from '../../lib/theming/ThemeHelpers';
import { isIE11 } from '../../lib/client';
import { ReactUIFeatureFlagsContext, getFullReactUIFlagsContext } from '../../lib/featureFlagsContext';

import { globalClasses, styles } from './Link.styles';
import { LinkIcon } from './LinkIcon';

export interface LinkProps
  extends Pick<AriaAttributes, 'aria-label'>,
    CommonProps,
    Pick<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'onBlur' | 'onFocus'> {
  /**
   * Отключенное состояние.
   */
  disabled?: boolean;
  /**
   * Добавляет ссылке иконку слева.
   */
  icon?: React.ReactElement;
  /**
   * Добавляет ссылке иконку справа.
   */
  rightIcon?: React.ReactElement;
  /**
   * Тема ссылки.
   */
  use?: 'default' | 'success' | 'danger' | 'grayed';
  /**
   * @ignore
   */
  _button?: boolean;
  /**
   * @ignore
   */
  _buttonOpened?: boolean;
  /**
   * HTML-атрибут `tabindex`.
   */
  tabIndex?: number;
  /**
   * Переводит ссылку в состояние загрузки.
   */
  loading?: boolean;
  /**
   * HTML-событие `onclick`.
   */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;

  /**
   * Обычный объект с переменными темы.
   * Он будет объединён с темой из контекста.
   */
  theme?: ThemeIn;
  /**
   * Компонент, используемый в качестве корневого узла.
   * @ignore
   */
  as?: React.ElementType | keyof React.ReactHTML;
  /**
   * @ignore
   */
  focused?: boolean;
}

const LINK_DEFAULT_ELEMENT = 'a';

type LinkPropsWithComponent<C extends React.ElementType = typeof LINK_DEFAULT_ELEMENT> = PolymorphicPropsWithoutRef<
  LinkProps,
  C
>;
export interface LinkState {
  focusedByTab: boolean;
}

export const LinkDataTids = {
  root: 'Link__root',
} as const;

type DefaultProps = Required<Pick<LinkPropsWithComponent, 'use' | 'as'>>;
type DefaultizedLinkProps<T extends React.ElementType = typeof LINK_DEFAULT_ELEMENT> = DefaultizedProps<
  LinkPropsWithComponent<T>,
  DefaultProps
>;

/**
 * Элемент ссылки из HTML.
 */
@rootNode
export class Link<C extends React.ElementType = typeof LINK_DEFAULT_ELEMENT> extends React.Component<
  LinkPropsWithComponent<C>,
  LinkState
> {
  public static __KONTUR_REACT_UI__ = 'Link';

  public static defaultProps = {
    use: 'default',
    as: LINK_DEFAULT_ELEMENT,
  };

  private getProps = createPropsGetter(Link.defaultProps);

  public state: LinkState = {
    focusedByTab: false,
  };

  private theme!: Theme;
  private setRootNode!: TSetRootNode;
  private linkFocusOutline?: boolean;

  public render(): JSX.Element {
    return (
      <ReactUIFeatureFlagsContext.Consumer>
        {(flags) => {
          this.linkFocusOutline = getFullReactUIFlagsContext(flags).linkFocusOutline;
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
        }}
      </ReactUIFeatureFlagsContext.Consumer>
    );
  }

  private getTabIndex = ({
    disabled,
    loading,
    tabIndex = 0,
  }: Pick<LinkPropsWithComponent, 'disabled' | 'loading' | 'tabIndex'>) => {
    return disabled || loading ? -1 : tabIndex;
  };

  private getSecureRel = ({ href, rel }: Pick<LinkPropsWithComponent, 'href' | 'rel'>) => {
    if (typeof rel === 'undefined' && href) {
      return `noopener${isExternalLink(href) ? ' noreferrer' : ''}`;
    }

    return rel;
  };

  private renderMain = (props: CommonWrapperRestProps<DefaultizedLinkProps>) => {
    const {
      disabled,
      href,
      icon,
      rightIcon,
      use,
      loading,
      _button,
      _buttonOpened,
      rel,
      as,
      component,
      focused = false,
      ...rest
    } = props;
    const _isTheme2022 = isTheme2022(this.theme);
    const Root = (component || as) as React.ElementType;

    let arrow = null;
    if (_button) {
      arrow = <span className={styles.arrow()} />;
    }

    const isFocused = !disabled && (this.state.focusedByTab || focused);

    const leftIconElement = icon && <LinkIcon icon={icon} loading={loading} position="left" />;
    const rightIconElement = rightIcon && (
      <LinkIcon hasBothIcons={!!icon && !!rightIcon} icon={rightIcon} loading={loading} position="right" />
    );

    const linkOnlyProps = {
      href,
      rel: this.getSecureRel({ href, rel }),
    };

    const linkProps = {
      className: cx(
        styles.useRoot(),
        Root === 'button' && resetButton(),
        use === 'default' && styles.useDefault(this.theme),
        use === 'success' && styles.useSuccess(this.theme),
        use === 'danger' && styles.useDanger(this.theme),
        use === 'grayed' && styles.useGrayed(this.theme),
        !!_button && styles.button(this.theme),
        !!_buttonOpened && styles.buttonOpened(this.theme),
        this.getLinkClassName(isFocused, Boolean(disabled || loading), _isTheme2022),
      ),
      onClick: this.handleClick,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      tabIndex: this.getTabIndex({ disabled, loading, tabIndex: this.props.tabIndex }),
      ...(Root === LINK_DEFAULT_ELEMENT ? linkOnlyProps : {}),
    };

    let child = this.props.children;
    if (_isTheme2022) {
      // lineTextWrapper нужен для реализации transition у подчеркивания
      child = (
        <span
          className={cx(globalClasses.textWrapper, styles.lineTextWrapper(this.theme), {
            [styles.lineTextWrapperFocused(this.theme)]: isFocused,
          })}
        >
          <span
            className={cx(globalClasses.text, {
              [styles.lineText(this.theme)]: !isIE11,
              [styles.lineTextIE11(this.theme)]: isIE11,
            })}
          >
            {this.props.children}
          </span>
        </span>
      );
    }

    return (
      <Root data-tid={LinkDataTids.root} {...rest} {...linkProps}>
        {leftIconElement}
        {child}
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

  private handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const { onClick, disabled, loading, href } = this.props as LinkPropsWithComponent<'a'>;

    if (!href) {
      event.preventDefault();
    }
    if (onClick && !disabled && !loading) {
      onClick(event);
    }
  };

  private getLinkClassName(focused: boolean, disabled: boolean, _isTheme2022: boolean): string {
    const { use } = this.getProps();
    const isBorderBottom = parseInt(this.theme.linkLineBorderBottomWidth) > 0;
    const isFocused = focused && !disabled;

    return !isBorderBottom
      ? cx(
          styles.root(this.theme),
          isFocused && styles.focus(this.theme),
          disabled && styles.disabled(this.theme),
          use === 'grayed' && focused && styles.useGrayedFocus(this.theme),
        )
      : cx(
          styles.lineRoot(),
          disabled && styles.disabled(this.theme),
          disabled && _isTheme2022 && isDarkTheme(this.theme) && styles.disabledDark22Theme(this.theme),
          isFocused && use === 'default' && styles.lineFocus(this.theme),
          isFocused && use === 'success' && styles.lineFocusSuccess(this.theme),
          isFocused && use === 'danger' && styles.lineFocusDanger(this.theme),
          isFocused && use === 'grayed' && styles.lineFocusGrayed(this.theme),
          isFocused && _isTheme2022 && this.linkFocusOutline && styles.focus2022(this.theme),
        );
  }
}
