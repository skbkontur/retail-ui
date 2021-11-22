import React from 'react';

import { keyListener } from '../../lib/events/keyListener';
import { Theme } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { isExternalLink } from '../../lib/utils';
import { Spinner } from '../Spinner';
import { CommonWrapper, CommonProps, CommonWrapperRestProps } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';

import { styles } from './Link.styles';

interface LinkInterface {
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
}

export type LinkProps = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkInterface> &
  LinkInterface;

export interface LinkState {
  focusedByTab: boolean;
}

/**
 * Элемент ссылки из HTML.
 */
export class Link extends React.Component<LinkProps, LinkState> {
  public static __KONTUR_REACT_UI__ = 'Link';

  public static defaultProps = {
    href: '',
    use: 'default',
  };

  public state = {
    focusedByTab: false,
  };

  private theme!: Theme;
  public render(): JSX.Element {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return <CommonWrapper {...this.props}>{this.renderMain}</CommonWrapper>;
        }}
      </ThemeContext.Consumer>
    );
  }

  private renderMain = (props: CommonWrapperRestProps<LinkProps>) => {
    const { disabled, href, icon, use, loading, _button, _buttonOpened, rel: relOrigin, ...rest } = props;

    let iconElement = null;
    if (icon) {
      iconElement = (
        <span className={styles.icon(this.theme)}>
          {loading ? <Spinner caption={null} dimmed type="mini" /> : icon}
        </span>
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
      className: cx({
        [styles.root(this.theme)]: true,
        [styles.button(this.theme)]: !!_button,
        [styles.buttonOpened()]: !!_buttonOpened,
        [styles.useDefault(this.theme)]: use === 'default',
        [styles.useSuccess(this.theme)]: use === 'success',
        [styles.useDanger(this.theme)]: use === 'danger',
        [styles.useGrayed(this.theme)]: use === 'grayed',
        [styles.useGrayedFocus(this.theme)]: use === 'grayed' && focused,
        [styles.focus(this.theme)]: focused,
        [styles.disabled(this.theme)]: !!disabled || !!loading,
      }),
      href,
      rel,
      onClick: this._handleClick,
      onFocus: this._handleFocus,
      onBlur: this._handleBlur,
      tabIndex: disabled || loading ? -1 : this.props.tabIndex,
    };

    return (
      <a {...rest} {...linkProps}>
        {iconElement}
        {this.props.children}
        {arrow}
      </a>
    );
  };

  private _handleFocus = (event: React.FocusEvent<HTMLAnchorElement>) => {
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

  private _handleBlur = () => {
    this.setState({ focusedByTab: false });
  };

  private _handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const { href, onClick, disabled, loading } = this.props;
    if (!href) {
      event.preventDefault();
    }
    if (onClick && !disabled && !loading) {
      onClick(event);
    }
  };
}
