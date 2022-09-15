import React from 'react';
import PropTypes from 'prop-types';

import { Override } from '../../typings/utility-types';
import { keyListener } from '../../lib/events/keyListener';
import { Theme, ThemeIn } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { isExternalLink } from '../../lib/utils';
import { Spinner } from '../Spinner';
import { CommonProps, CommonWrapper, CommonWrapperRestProps } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { rootNode, TSetRootNode } from '../../lib/rootNode/rootNodeDecorator';
import { createPropsGetter, DefaultizedProps } from '../../lib/createPropsGetter';
import { ThemeFactory } from '../../lib/theming/ThemeFactory';

import { globalClasses, styles } from './Link.styles';

export interface LinkProps
  extends CommonProps,
    Override<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      {
        /**
         * Отключенное состояние.
         */
        disabled?: boolean;
        /**
         * HTML-атрибут `href`.
         */
        href?: string;
        /**
         * Добавляет ссылке иконку.
         */
        icon?: React.ReactElement<any>;
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
        theme?: ThemeIn;
      }
    > {}

export interface LinkState {
  focusedByTab: boolean;
}

export const LinkDataTids = {
  root: 'Link__root',
} as const;

type DefaultProps = Required<Pick<LinkProps, 'href' | 'use'>>;
type DefaultizedLinkProps = DefaultizedProps<LinkProps, DefaultProps>;

/**
 * Элемент ссылки из HTML.
 */
@rootNode
export class Link extends React.Component<LinkProps, LinkState> {
  public static __KONTUR_REACT_UI__ = 'Link';

  public static propTypes = {
    disabled: PropTypes.bool,

    href: PropTypes.string,

    icon: PropTypes.node,

    use: PropTypes.oneOf(['default', 'success', 'danger', 'grayed']),
  };

  public static defaultProps: DefaultProps = {
    href: '',
    use: 'default',
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
    const { disabled, href, icon, use, loading, _button, _buttonOpened, theme, rel: relOrigin, ...rest } = props;

    let iconElement = null;
    if (icon) {
      iconElement = (
        <span className={styles.icon(this.theme)}>{loading ? <Spinner caption={null} dimmed inline /> : icon}</span>
      );
    }

    let arrow = null;
    if (_button) {
      arrow = <span className={styles.arrow()} />;
    }

    let rel = relOrigin;
    if (typeof rel === 'undefined' && href) {
      rel = `noopener${isExternalLink(href) ? ' noreferrer' : ''}`;
    }

    const focused = !disabled && this.state.focusedByTab;

    const linkProps = {
      className: cx(
        this.getLinkClassName(focused, Boolean(disabled || loading)),
        use === 'default' && styles.useDefault(this.theme),
        use === 'success' && styles.useSuccess(this.theme),
        use === 'danger' && styles.useDanger(this.theme),
        use === 'grayed' && styles.useGrayed(this.theme),
        !!_button && styles.button(this.theme),
        !!_buttonOpened && styles.buttonOpened(this.theme),
      ),
      href,
      rel,
      onClick: this.handleClick,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      tabIndex: disabled || loading ? -1 : this.props.tabIndex,
    };

    let child = this.props.children;
    if (parseInt(this.theme.linkLineBorderBottomWidth) > 0) {
      child = <span className={cx(globalClasses.text, styles.lineText(this.theme))}>{this.props.children}</span>;
    }

    return (
      <a data-tid={LinkDataTids.root} {...rest} {...linkProps}>
        {iconElement}
        {child}
        {arrow}
      </a>
    );
  };

  private handleFocus = () => {
    if (!this.props.disabled) {
      // focus event fires before keyDown eventlistener
      // so we should check tabPressed in async way
      requestAnimationFrame(() => {
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

  private getLinkClassName(focused: boolean, disabled: boolean): string {
    const { use } = this.getProps();
    const isBorderBottom = parseInt(this.theme.linkLineBorderBottomWidth) > 0;

    return !isBorderBottom
      ? cx(styles.root(this.theme), {
          [styles.focus(this.theme)]: focused,
          [styles.disabled(this.theme)]: disabled,
          [styles.useGrayedFocus(this.theme)]: use === 'grayed' && focused,
        })
      : cx(styles.lineRoot(), {
          [styles.disabled(this.theme)]: disabled,
          [styles.lineFocus(this.theme)]: focused,
        });
  }
}
