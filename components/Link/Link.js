// @flow
import events from 'add-event-listener';
import classNames from 'classnames';
import React, { PropTypes } from 'react';

import Icon from '../Icon';

import styles from './Link.less';

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


/**
 * Стандартная ссылка.
 *
 * Все свойства передаются в элемент *<a>*.
 */
class Link extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool,

    href: PropTypes.string,

    icon: PropTypes.string,

    use: PropTypes.oneOf(['default', 'success', 'danger', 'grayed'])
  };

  static defaultProps = {
    href: 'javascript:',
    use: 'default'
  };

  state: {
    focusedByTab: boolean
  } = {
    focusedByTab: false
  }

  componentDidMount() {
    listenTabPresses();
  }

  render() {
    const {
      disabled,
      href,
      icon: iconName,
      use,
      _button,
      _buttonOpened,
      ...rest
    } = this.props;

    let icon = null;
    if (iconName) {
      icon = <span className={styles.icon}><Icon name={iconName} /></span>;
    }

    let arrow = null;
    if (_button) {
      arrow = <span className={styles.arrow} />;
    }

    const props: Object = {
      className: classNames({
        [styles.root]: true,
        [useClasses[use]]: true,
        [styles.disabled]: disabled,
        [styles.button]: _button,
        [styles.buttonOpened]: _buttonOpened,
        [styles.focus]: !disabled && this.state.focusedByTab
      }),
      href,
      onClick: this._handleClick,
      onFocus: this._handleFocus,
      onBlur: this._handleBlur
    };
    if (disabled) {
      props.tabIndex = '-1';
    }

    return (
      <a {...rest} {...props}>
        {icon}
        {this.props.children}
        {arrow}
      </a>
    );
  }

  _handleFocus = (e: SyntheticFocusEvent) => {
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

  _handleBlur = () => {
    this.setState({ focusedByTab: false });
  }

  _handleClick = event => {
    if (this.props.onClick && !this.props.disabled) {
      this.props.onClick.call(null, event);
    }
  };
}

export default Link;
