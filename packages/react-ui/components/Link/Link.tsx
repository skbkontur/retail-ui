import React, { forwardRef, useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { Override } from '../../typings/utility-types';
import { keyListener } from '../../lib/events/keyListener';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { isExternalLink } from '../../lib/utils';
import { Spinner } from '../Spinner';
import { CommonWrapper, CommonProps } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';

import { styles } from './Link.styles';

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
      }
    > {}

/**
 * Элемент ссылки из HTML.
 */
const Link = forwardRef<HTMLAnchorElement, React.PropsWithChildren<LinkProps>>((props, ref) => {
  const {
    disabled = false,
    href = '',
    use = 'default',
    icon,
    loading,
    _button,
    _buttonOpened,
    rel: relOrigin,
    tabIndex,
    children,
    onClick,
    ...rest
  } = props;

  const theme = useContext(ThemeContext);

  const [focusedByTab, setFocusedByTab] = useState(false);
  const focused = !disabled && focusedByTab;

  let iconElement: React.ReactNode = null;
  if (icon) {
    iconElement = (
      <span className={styles.icon(theme)}>{loading ? <Spinner caption={null} dimmed type="mini" /> : icon}</span>
    );
  }

  let arrow: React.ReactNode = null;
  if (_button) {
    arrow = <span className={styles.arrow()} />;
  }

  let rel = relOrigin;
  if (typeof rel === 'undefined' && href) {
    rel = `noopener${isExternalLink(href) ? ' noreferrer' : ''}`;
  }

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!href) {
      event.preventDefault();
    }
    onClick?.(event);
  };

  const handleFocus = () => {
    if (!disabled) {
      // focus event fires before keyDown eventlistener
      // so we should check tabPressed in async way
      requestAnimationFrame(() => {
        if (keyListener.isTabPressed) {
          setFocusedByTab(true);
        }
      });
    }
  };

  const handleBlur = () => {
    setFocusedByTab(false);
  };

  const linkProps = {
    className: cx({
      [styles.root(theme)]: true,
      [styles.button(theme)]: !!_button,
      [styles.buttonOpened()]: !!_buttonOpened,
      [styles.useDefault(theme)]: use === 'default',
      [styles.useSuccess(theme)]: use === 'success',
      [styles.useDanger(theme)]: use === 'danger',
      [styles.useGrayed(theme)]: use === 'grayed',
      [styles.useGrayedFocus(theme)]: use === 'grayed' && focused,
      [styles.focus(theme)]: focused,
      [styles.disabled(theme)]: !!disabled || !!loading,
    }),
    href,
    rel,
    onClick: handleClick,
    onFocus: handleFocus,
    onBlur: handleBlur,
    tabIndex: disabled || loading ? -1 : tabIndex,
  };

  return (
    <CommonWrapper {...props}>
      <a ref={ref} {...rest} {...linkProps}>
        {iconElement}
        {children}
        {arrow}
      </a>
    </CommonWrapper>
  );
});

Link.propTypes = {
  disabled: PropTypes.bool,
  href: PropTypes.string,
  icon: PropTypes.element,
  use: PropTypes.oneOf(['default', 'success', 'danger', 'grayed']),
  _button: PropTypes.bool,
  _buttonOpened: PropTypes.bool,
  tabIndex: PropTypes.number,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
};

const componentName = 'Link';
Link.displayName = componentName;

const LinkWithName = Object.assign(Link, { __KONTUR_REACT_UI__: componentName });
export { LinkWithName as Link };
