import events from 'add-event-listener';
import classNames from 'classnames';
import * as React from 'react';

import * as PropTypes from 'prop-types';

import Icon, { IconName } from '../Icon';

import styles = require('./Link.less');

import { createPropsGetter } from '../internal/createPropsGetter';

const useClasses = {
  default: styles.useDefault,
  success: styles.useSuccess,
  danger: styles.useDanger,
  grayed: styles.useGrayed
};

const KEYCODE_TAB = 9;

let isListening: boolean;
let tabPressed: boolean;

function listenTabPresses() {
  if (!isListening) {
    events.addEventListener(window, 'keydown', (event: KeyboardEvent) => {
      tabPressed = event.keyCode === KEYCODE_TAB;
    });
    isListening = true;
  }
}

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  disabled?: boolean;
  href?: string;
  icon?: IconName | React.ReactElement<any>;
  onClick?: (event?: React.MouseEvent<HTMLAnchorElement>) => void;
  use?: 'default' | 'success' | 'danger' | 'grayed';
  children?: React.ReactNode;
  /** @ignore */
  _button?: boolean;
  /** @ignore */
  _buttonOpened?: boolean;
  tabIndex?: number;
}

export interface LinkState {
  focusedByTab: boolean;
}

/**
 * Стандартная ссылка.
 * Все свойства передаются в элемент *<a>*.
 */
class Link extends React.Component<LinkProps, LinkState> {
  public static __ADAPTER__: any;
  public static propTypes = {
    disabled: PropTypes.bool,

    href: PropTypes.string,

    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

    use: PropTypes.oneOf(['default', 'success', 'danger', 'grayed'])
  };

  public static defaultProps = {
    href: 'javascript:',
    use: 'default'
  };

  public state = {
    focusedByTab: false
  };

  private getProps = createPropsGetter(Link.defaultProps);

  public componentDidMount() {
    listenTabPresses();
  }

  public render(): JSX.Element {
    const {
      disabled,
      href,
      icon,
      use,
      _button,
      _buttonOpened,
      ...rest
    } = this.getProps<LinkProps, Link>();

    let iconElement = null;
    if (icon) {
      iconElement = (
        <span className={styles.icon}>
          {typeof icon === 'string' ? <Icon name={icon} /> : icon}
        </span>
      );
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
        [useClasses[use as keyof typeof useClasses]]: !!use
      }),
      href,
      onClick: this._handleClick,
      onFocus: this._handleFocus,
      onBlur: this._handleBlur,
      tabIndex: this.props.tabIndex
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
        if (tabPressed) {
          this.setState({ focusedByTab: true });
          tabPressed = false;
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
