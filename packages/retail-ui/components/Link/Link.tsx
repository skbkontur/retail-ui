import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

import { createPropsGetter } from '../internal/createPropsGetter';
import { Override } from '../../typings/utility-types';
import tabListener from '../../lib/events/tabListener';

import styles from './Link.less';

const useClasses = {
  default: styles.useDefault,
  success: styles.useSuccess,
  danger: styles.useDanger,
  grayed: styles.useGrayed,
};

export type LinkProps = Override<
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
>;

export interface LinkState {
  focusedByTab: boolean;
}

/**
 * Стандартная ссылка.
 * Интерфес пропсов наследуется от `React.AnchorHTMLAttributes<HTMLAnchorElement>`.
 * Все свойства передаются в элемент `<a>`.
 * `className` и `style` не поддерживаются
 */
class Link extends React.Component<LinkProps, LinkState> {
  public static __ADAPTER__: any;
  public static propTypes = {
    disabled: PropTypes.bool,

    href: PropTypes.string,

    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

    use: PropTypes.oneOf(['default', 'success', 'danger', 'grayed']),
  };

  public static defaultProps = {
    href: 'javascript:',
    use: 'default',
  };

  public state = {
    focusedByTab: false,
  };

  private getProps = createPropsGetter(Link.defaultProps);

  public render(): JSX.Element {
    const {
      disabled,
      href,
      icon,
      use,
      _button,
      _buttonOpened,
      className,
      style,

      ...rest
    } = this.getProps<LinkProps, Link>();

    let iconElement = null;
    if (icon) {
      iconElement = <span className={styles.icon}>{icon}</span>;
    }

    let arrow = null;
    if (_button) {
      arrow = <span className={styles.arrow} />;
    }

    const props = {
      className: classNames({
        [styles.disabled]: disabled,
        [styles.button]: _button,
        [styles.buttonOpened]: _buttonOpened,
        [styles.focus]: !disabled && this.state.focusedByTab,
        [useClasses[use as keyof typeof useClasses]]: !!use,
      }),
      href,
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
          tabListener.isTabPressed = false;
        }
      });
    }
  };

  private _handleBlur = () => {
    this.setState({ focusedByTab: false });
  };

  private _handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (this.props.onClick && !this.props.disabled) {
      this.props.onClick(event);
    }
  };
}

export default Link;
