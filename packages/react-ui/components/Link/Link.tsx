import React, { AriaAttributes } from 'react';
import PropTypes from 'prop-types';
import { globalObject } from '@skbkontur/global-object';

import { Override } from '../../typings/utility-types';
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

export interface LinkProps
  extends Pick<AriaAttributes, 'aria-label'>,
    CommonProps,
    Override<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      {
        /** Делает компонент недоступным. */
        disabled?: boolean;

        /** Задает HTML-атрибут `href` - адрес, на который следует перейти. */
        href?: string;

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

        /** Задает функцию, которая вызывается при клике. */
        onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;

        /** Задает объект с переменными темы. Он будет объединён с темой из контекста. */
        theme?: ThemeIn;

        /** Устанавливает компонент, используемый в качестве корневого узла.
         * @ignore */
        as?: React.ElementType | keyof React.ReactHTML;

        /** Задает состояние фокуса.
         * @ignore */
        focused?: boolean;
      }
    > {}

export interface LinkState {
  focusedByTab: boolean;
}

export const LinkDataTids = {
  root: 'Link__root',
} as const;

type DefaultProps = Required<Pick<LinkProps, 'href' | 'use' | 'as'>>;
type DefaultizedLinkProps = DefaultizedProps<LinkProps, DefaultProps>;

/**
 * Ссылка `Link` связывает веб-страницы или выступает как более легкий аналог кнопки.
 * Клик по ссылке открывает другую страницу или запускает действие.
 *
 * Ссылку нельзя использовать для основного действия в окне — используйте для этого [Button](?path=/docs/button-button--docs).
 */
@rootNode
export class Link extends React.Component<LinkProps, LinkState> {
  public static __KONTUR_REACT_UI__ = 'Link';
  public static displayName = 'Link';

  public static propTypes = {
    disabled: PropTypes.bool,

    href: PropTypes.string,

    icon: PropTypes.node,

    use: PropTypes.oneOf(['default', 'success', 'danger', 'grayed']),
  };

  public static defaultProps: DefaultProps = {
    href: '',
    use: 'default',
    as: 'a',
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
      rel: relOrigin,
      as: Component,
      focused = false,
      ...rest
    } = props;

    let arrow = null;
    if (_button) {
      arrow = <span className={styles.arrow()} />;
    }

    let rel = relOrigin;
    if (typeof rel === 'undefined' && href) {
      rel = `noopener${isExternalLink(href) ? ' noreferrer' : ''}`;
    }

    const isFocused = !disabled && (this.state.focusedByTab || focused);

    const leftIconElement = icon && <LinkIcon icon={icon} loading={loading} position="left" />;
    const rightIconElement = rightIcon && (
      <LinkIcon hasBothIcons={!!icon && !!rightIcon} icon={rightIcon} loading={loading} position="right" />
    );
    const linkProps = {
      className: cx({
        [styles.root(this.theme)]: true,
        [styles.focus(this.theme)]: isFocused,
        [styles.disabled(this.theme)]: disabled || loading,
        [styles.useDefault(this.theme)]: use === 'default',
        [styles.useSuccess(this.theme)]: use === 'success',
        [styles.useDanger(this.theme)]: use === 'danger',
        [styles.useGrayed(this.theme)]: use === 'grayed',
        [styles.useGrayedFocus(this.theme)]: use === 'grayed' && focused,
        [styles.button(this.theme)]: !!_button,
        [styles.buttonOpened(this.theme)]: !!_buttonOpened,
        [styles.lineFocus(this.theme)]: isFocused && use === 'default',
        [styles.lineFocusSuccess(this.theme)]: isFocused && use === 'success',
        [styles.lineFocusDanger(this.theme)]: isFocused && use === 'danger',
        [styles.lineFocusGrayed(this.theme)]: isFocused && use === 'grayed',
      }),
      href,
      rel,
      onClick: this.handleClick,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      tabIndex: disabled || loading ? -1 : this.props.tabIndex,
    };

    return (
      <Component data-tid={LinkDataTids.root} {...rest} {...linkProps} {...getVisualStateDataAttributes({ disabled })}>
        {leftIconElement}
        {this.props.children}
        {rightIconElement}
        {arrow}
      </Component>
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
    const { onClick, disabled, loading } = this.props;
    const href = this.getProps().href;
    if (!href) {
      event.preventDefault();
    }
    if (onClick && !disabled && !loading) {
      onClick(event);
    }
  };
}
