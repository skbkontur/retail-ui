import React, { ReactNode, useContext } from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';

import { styles } from './MenuHeader.styles';

export type MenuHeaderSize = 'small' | 'medium' | 'large';

export interface MenuHeaderProps extends CommonProps {
  _enableIconPadding?: boolean;
  children: ReactNode;
  /** Размер */
  size?: MenuHeaderSize;
}

export const MenuHeaderDataTids = {
  root: 'MenuHeader__root',
} as const;

/**
 * `Заголовок меню` используется для того, чтобы разделить `элементы меню` на категории в рамках одного меню.
 *
 * _Примечание_: `заголовок меню`, в отличие от `элемента меню` нельзя затаргетить с клавиатуры.
 *
 * Сущности в которых может быть использован `MenuHeader`: [DropdownMenu](#/Components/DropdownMenu), [Kebab](#/Components/Kebab), [TooltipMenu](#/Components/TooltipMenu) и [Select](#/Components/Select).
 */
function MenuHeader({ _enableIconPadding = false, children, size = 'small', ...rest }: MenuHeaderProps) {
  const theme = useContext(ThemeContext);

  function getRootSizeClassName() {
    switch (size) {
      case 'large':
        return styles.rootLarge(theme);
      case 'medium':
        return styles.rootMedium(theme);
      case 'small':
      default:
        return styles.rootSmall(theme);
    }
  }

  return (
    <CommonWrapper {...rest}>
      <div
        data-tid={MenuHeaderDataTids.root}
        className={cx(getRootSizeClassName(), {
          [styles.root(theme)]: true,
          [styles.withLeftPadding(theme)]: _enableIconPadding,
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
