import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { Override } from '../../typings/utility-types';
import { keyListener } from '../../lib/events/keyListener';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { cx } from '../../lib/theming/Emotion';
import { forwardRefAndName } from '../../lib/forwardRefAndName';
import { CommonWrapper, CommonProps } from '../../internal/CommonWrapper';
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
  children: React.ReactNode;
  /**
   * Переводит ссылку в состояние загрузки.
   */
  loading?: boolean;
};

export type LinkProps = Override<React.AnchorHTMLAttributes<HTMLAnchorElement>, LinkInterface> & CommonProps;

const LinkFC = forwardRefAndName<HTMLAnchorElement, LinkProps>(
  'LinkFC',
  (
    {
      disabled = false,
      href = '',
      use = 'default',
      instanceRef,
      onClick,
      rel,
      loading,
      icon,
      children,
      tabIndex,
      _button,
      _buttonOpened,
      ...rest
    },
    ref,
  ) => {
    const theme = useContext(ThemeContext);

    const [focusedByTab, setFocusedByTab] = useState(false);
    const isFocused = !disabled && focusedByTab;
    const isDisabled = disabled || loading;

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

    const linkRel = rel ?? generateRel(href, rel);

    return (
      <CommonWrapper {...rest}>
        <a
          {...rest}
          ref={ref}
          href={href}
          rel={linkRel}
          onClick={(event) => {
            if (onClick) {
              event.preventDefault();
              onClick(event);
            }
          }}
          onFocus={handleFocus}
          onBlur={() => setFocusedByTab(false)}
          tabIndex={isDisabled ? -1 : tabIndex}
          className={cx({
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
          })}
        >
          {icon && <LinkIcon loading={loading} icon={icon} />}
          {children}
          {_button && <LinkArrow />}
        </a>
      </CommonWrapper>
    );
  },
);

LinkFC.propTypes = {
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

/**
 * Элемент ссылки из HTML.
 */
export const Link = withClassWrapper(LinkFC);
export type Link = InstanceType<typeof Link>;
