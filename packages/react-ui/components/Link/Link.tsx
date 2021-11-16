import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { Override } from '../../typings/utility-types';
import { keyListener } from '../../lib/events/keyListener';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { cx } from '../../lib/theming/Emotion';
import { forwardRefAndName } from '../../lib/forwardRefAndName';
import { CommonWrapper, CommonProps } from '../../internal/CommonWrapper';
import { DefaultTheme } from '../../internal/themes/DefaultTheme';
import { Spinner } from '../Spinner';

import { styles } from './Link.styles';
import { generateRel } from './utils';

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

const renderSpinner = (condition: boolean, fallback: React.ReactNode): React.ReactNode => {
  if (condition) {
    return <Spinner caption={null} dimmed type="mini" />;
  }
  return fallback;
};

const renderIconElement = (
  condition: boolean,
  props: LinkProps,
  theme: Readonly<typeof DefaultTheme>,
): React.ReactNode => {
  return condition && <span className={styles.icon(theme)}>{renderSpinner(!!props.loading, props.icon)}</span>;
};

const renderArrow = (condition: boolean): React.ReactNode => {
  return condition && <span className={styles.arrow()} />;
};

const LinkFuture = forwardRefAndName<HTMLAnchorElement, React.PropsWithChildren<LinkProps>>(
  'LinkFuture',
  (props, ref) => {
    const { disabled = false, href = '', use = 'default', ...rest } = props;

    const theme = useContext(ThemeContext);

    const [focusedByTab, setFocusedByTab] = useState(false);
    const focused = !disabled && focusedByTab;

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (!href) {
        event.preventDefault();
      }
      props.onClick?.(event);
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

    return (
      <CommonWrapper {...props}>
        <a
          {...rest}
          ref={ref}
          href={href}
          rel={generateRel(href, !!(typeof props.rel === 'undefined'))}
          onClick={handleClick}
          onFocus={handleFocus}
          onBlur={handleBlur}
          tabIndex={disabled || props.loading ? -1 : props.tabIndex}
          className={cx({
            [styles.root(theme)]: true,
            [styles.button(theme)]: !!props._button,
            [styles.buttonOpened()]: !!props._buttonOpened,
            [styles.useDefault(theme)]: use === 'default',
            [styles.useSuccess(theme)]: use === 'success',
            [styles.useDanger(theme)]: use === 'danger',
            [styles.useGrayed(theme)]: use === 'grayed',
            [styles.useGrayedFocus(theme)]: use === 'grayed' && focused,
            [styles.focus(theme)]: focused,
            [styles.disabled(theme)]: !!disabled || !!props.loading,
          })}
        >
          {renderIconElement(!!props.icon, props, theme)}
          {props.children}
          {renderArrow(!!props._button)}
        </a>
      </CommonWrapper>
    );
  },
);

LinkFuture.propTypes = {
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
export class Link extends React.Component<LinkProps> {
  constructor(props: LinkProps) {
    super(props);
  }

  render() {
    return <LinkFuture {...this.props} />;
  }
}
