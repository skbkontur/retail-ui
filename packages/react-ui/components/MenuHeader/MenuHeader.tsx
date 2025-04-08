import React, { HTMLAttributes, ReactNode, useContext } from 'react';

import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { SizeProp } from '../../lib/types/props';
import { MenuContext } from '../../internal/Menu/MenuContext';
import { EmotionContext } from '../../lib/theming/Emotion';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { getStyles } from './MenuHeader.styles';

export interface MenuHeaderProps extends CommonProps, Pick<HTMLAttributes<HTMLElement>, 'id'> {
  /** Добавляет отступ иконке. */
  _enableIconPadding?: boolean;

  /** @ignore */
  children: ReactNode;

  /** Задает размер. */
  size?: SizeProp;
}

export const MenuHeaderDataTids = {
  root: 'MenuHeader__root',
} as const;

/**
 * Заголовок меню `MenuHeader` используется для того, чтобы разделить элементы меню на категории в рамках одного меню.
 *
 * `MenuHeader`, в отличие от `MenuItem` нельзя затаргетить с клавиатуры.
 *
 * Сущности в которых может быть использован `MenuHeader`: DropdownMenu, Kebab, TooltipMenu и Select.
 */
function MenuHeader({ id, _enableIconPadding = false, children, size = 'small', ...rest }: MenuHeaderProps) {
  const theme = useContext(ThemeContext);
  const emotion = useContext(EmotionContext);
  const styles = getStyles(emotion);
  const menuContext = useContext(MenuContext);

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
        id={id}
        data-tid={MenuHeaderDataTids.root}
        className={emotion.cx(getRootSizeClassName(), {
          [styles.root(theme)]: true,
          [getWithLeftPaddingSizeClassName()]: menuContext.enableIconPadding || _enableIconPadding,
        })}
      >
        {children}
      </div>
    </CommonWrapper>
  );
}

MenuHeader.__KONTUR_REACT_UI__ = 'MenuHeader';
MenuHeader.displayName = 'MenuHeader';
MenuHeader.__MENU_HEADER__ = true;

export { MenuHeader };

export const isMenuHeader = (child: React.ReactNode): child is React.ReactElement<MenuHeaderProps> => {
  return React.isValidElement<MenuHeaderProps>(child)
    ? Object.prototype.hasOwnProperty.call(child.type, '__MENU_HEADER__')
    : false;
};
