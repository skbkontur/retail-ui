import React, { ReactNode, useContext } from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { SizeProp } from '../../lib/types/props';

import { styles } from './MenuHeader.styles';

/**
 * @deprecated use SizeProp
 */
export type MenuHeaderSize = SizeProp;

export interface MenuHeaderProps extends CommonProps {
  _enableIconPadding?: boolean;
  children: ReactNode;
  /** Размер */
  size?: SizeProp;
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
  function getWithLeftPaddingSizeClassName() {
    switch (size) {
      case 'large':
        return styles.withLeftPaddingSmall(theme);
      case 'medium':
        return styles.withLeftPaddingMedium(theme);
      case 'small':
      default:
        return styles.withLeftPaddingSmall(theme);
    }
  }

  return (
    <CommonWrapper {...rest}>
      <div
        data-tid={MenuHeaderDataTids.root}
        className={cx(getRootSizeClassName(), {
          [styles.root(theme)]: true,
          [getWithLeftPaddingSizeClassName()]: _enableIconPadding,
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
