import React, { useContext, useState } from 'react';
import propTypes from 'prop-types';

import { Override } from '../../typings/utility-types';
import { keyListener } from '../../lib/events/keyListener';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { cx } from '../../lib/theming/Emotion';
import { forwardRefAndName } from '../../lib/forwardRefAndName';
import { CommonProps } from '../../internal/CommonWrapper';
import { withClassWrapper } from '../../lib/withClassWrapper';

import { styles } from './Link.styles';
import { generateRel } from './utils';
import { LinkArrow } from './LinkArrow';
import { LinkIcon } from './LinkIcon';

type LinkInterface = {
  /**
   * Отключенное состояние.
   */
  disabled?: boolean;
  /**
   * Добавляет ссылке иконку.
   */
  icon?: React.ReactNode;
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
   * @ignore
   */
  children?: React.ReactNode;
  /**
   * Переводит ссылку в состояние загрузки.
   */
  loading?: boolean;
};

export type LinkProps = Override<React.AnchorHTMLAttributes<HTMLAnchorElement>, LinkInterface> &
  CommonProps & { instanceRef?: unknown };

const LinkFC = forwardRefAndName<HTMLAnchorElement, LinkProps>(
  'LinkFC',
  (
    {
      disabled = false,
      href = '',
      use = 'default',
      onClick,
      rel,
      loading,
      icon,
      children,
      tabIndex,
      className,
      _button,
      _buttonOpened,
      instanceRef,
      ...rest
    },
    ref,
  ) => {
    const theme = useContext(ThemeContext);

    const [focusedByTab, setFocusedByTab] = useState(false);

    const isFocused = !disabled && focusedByTab;
    const isDisabled = disabled || loading;

    const linkRel = rel ?? generateRel(href, rel);
    const linkTabIndex = isDisabled ? -1 : tabIndex;

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

    const handleBlur = () => setFocusedByTab(false);

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (onClick) {
        event.preventDefault();
        onClick(event);
      }
    };

    return (
      <a
        {...rest}
        ref={ref}
        href={href}
        rel={linkRel}
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={linkTabIndex}
        className={cx(
          {
            [styles.root(theme)]: true,
            [styles.button(theme)]: _button,
            [styles.buttonOpened()]: _buttonOpened,
            [styles.useDefault(theme)]: use === 'default',
            [styles.useSuccess(theme)]: use === 'success',
            [styles.useDanger(theme)]: use === 'danger',
            [styles.useGrayed(theme)]: use === 'grayed',
            [styles.useGrayedFocus(theme)]: use === 'grayed' && isFocused,
            [styles.focus(theme)]: isFocused,
            [styles.disabled(theme)]: isDisabled,
          },
          className,
        )}
      >
        {icon && <LinkIcon loading={loading} icon={icon} />}
        {children}
        {_button && <LinkArrow />}
      </a>
    );
  },
);

LinkFC.propTypes = {
  disabled: propTypes.bool,
  href: propTypes.string,
  icon: propTypes.element,
  use: propTypes.oneOf(['default', 'success', 'danger', 'grayed']),
  _button: propTypes.bool,
  _buttonOpened: propTypes.bool,
  tabIndex: propTypes.number,
  loading: propTypes.bool,
  onClick: propTypes.func,
};

/**
 * Элемент ссылки из HTML.
 */
export const Link = withClassWrapper(LinkFC);
export type Link = InstanceType<typeof Link>;
