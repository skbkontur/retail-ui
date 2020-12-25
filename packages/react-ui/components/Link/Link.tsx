import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { createPropsGetter } from '../../lib/createPropsGetter';
import { Override } from '../../typings/utility-types';
import { tabListener } from '../../lib/events/tabListener';
import { Theme } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { isExternalLink } from '../../lib/utils';
import { CommonProps } from '../../typings/common';

import { jsStyles } from './Link.styles';

export interface LinkProps
  extends CommonProps,
    Override<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      {
        /** Неактивное состояние */
        disabled?: boolean;
        /** href */
        href?: string;
        /** Иконка */
        icon?: React.ReactElement<any>;
        /** Тип */
        use?: 'default' | 'success' | 'danger' | 'grayed';
        _button?: boolean;
        _buttonOpened?: boolean;
        tabIndex?: number;
        /** onClick */
        onClick?: (event?: React.MouseEvent<HTMLAnchorElement>) => void;
      }
    > {}

export interface LinkState {
  focusedByTab: boolean;
}

/**
 * Стандартная ссылка.
 * Интерфес пропсов наследуется от `React.AnchorHTMLAttributes<HTMLAnchorElement>`.
 * Все свойства передаются в элемент `<a>`.
 * `className` и `style` не поддерживаются
 */
export class Link extends React.Component<LinkProps, LinkState> {
  public static __KONTUR_REACT_UI__ = 'Link';

  public static propTypes = {
    disabled: PropTypes.bool,

    href: PropTypes.string,

    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

    use: PropTypes.oneOf(['default', 'success', 'danger', 'grayed']),
  };

  public static defaultProps = {
    href: '',
    use: 'default',
  };

  public state = {
    focusedByTab: false,
  };

  private theme!: Theme;
  private getProps = createPropsGetter(Link.defaultProps);

  public render(): JSX.Element {
    return (
      <ThemeContext.Consumer>
        {theme => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeContext.Consumer>
    );
  }

  private renderMain() {
    const { disabled, href, icon, use, _button, _buttonOpened, className, rel: relOrigin, ...rest } = this.getProps<
      LinkProps,
      Link
    >();

    let iconElement = null;
    if (icon) {
      iconElement = <span className={jsStyles.icon(this.theme)}>{icon}</span>;
    }

    let arrow = null;
    if (_button) {
      arrow = <span className={jsStyles.arrow()} />;
    }

    let rel = relOrigin;
    if (typeof rel === 'undefined' && href) {
      rel = `noopener${isExternalLink(href) ? ' noreferrer' : ''}`;
    }

    const props = {
      className: cn(className, {
        [jsStyles.root(this.theme)]: true,
        [jsStyles.disabled(this.theme)]: !!disabled,
        [jsStyles.button(this.theme)]: !!_button,
        [jsStyles.buttonOpened()]: !!_buttonOpened,
        [jsStyles.focus(this.theme)]: !disabled && this.state.focusedByTab,
        [jsStyles.useDefault(this.theme)]: use === 'default',
        [jsStyles.useSuccess(this.theme)]: use === 'success',
        [jsStyles.useDanger(this.theme)]: use === 'danger',
        [jsStyles.useGrayed(this.theme)]: use === 'grayed',
      }),
      href,
      rel,
      onClick: this._handleClick,
      onFocus: this._handleFocus,
      onBlur: this._handleBlur,
      tabIndex: this.props.tabIndex,
    };
    if (disabled) {
      props.tabIndex = -1;
    }

    return (
      <a {...rest} {...props}>
        {iconElement}
        {this.props.children}
        {arrow}
      </a>
    );
  }

  private _handleFocus = (event: React.FocusEvent<HTMLAnchorElement>) => {
    if (!this.props.disabled) {
      // focus event fires before keyDown eventlistener
      // so we should check tabPressed in async way
      process.nextTick(() => {
        if (tabListener.isTabPressed) {
          this.setState({ focusedByTab: true });
        }
      });
    }
  };

  private _handleBlur = () => {
    this.setState({ focusedByTab: false });
  };

  private _handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const { href, onClick, disabled } = this.props;
    if (!href) {
      event.preventDefault();
    }
    if (onClick && !disabled) {
      onClick(event);
    }
  };
}
