import React, { ReactNode, useContext } from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';

import { jsStyles } from './MenuHeader.styles';

export interface MenuHeaderProps extends CommonProps {
  _enableIconPadding?: boolean;
  children: ReactNode;
}

/**
 * Заголовок в меню.
 */
function MenuHeader({ _enableIconPadding = false, children, ...rest }: MenuHeaderProps) {
  const theme = useContext(ThemeContext);

  return (
    <CommonWrapper {...rest}>
      <div
        className={cx({
          [jsStyles.root(theme)]: true,
          [jsStyles.withLeftPadding(theme)]: _enableIconPadding,
        })}
      >
        {children}
      </div>
    </CommonWrapper>
  );
}

MenuHeader.__KONTUR_REACT_UI__ = 'MenuHeader';
MenuHeader.__MENU_HEADER__ = true;

export { MenuHeader };

export const isMenuHeader = (child: React.ReactNode): child is React.ReactElement<MenuHeaderProps> => {
  return React.isValidElement<MenuHeaderProps>(child)
    ? Object.prototype.hasOwnProperty.call(child.type, '__MENU_HEADER__')
    : false;
};
