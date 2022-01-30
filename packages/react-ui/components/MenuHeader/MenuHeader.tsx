import React, { ReactNode, useContext } from 'react';
import { forwardRefAndName } from 'react-ui/lib/forwardRefAndName';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { CommonProps } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';

import { styles } from './MenuHeader.styles';

type MenuHeaderInterface = {
  /**
   * @ignore
   */
  _enableIconPadding?: boolean;
  /**
   * @ignore
   */
  children: ReactNode;
};

export type MenuHeaderProps = MenuHeaderInterface & CommonProps;

/**
 * `Заголовок меню` используется для того, чтобы разделить `элементы меню` на категории в рамках одного меню.
 *
 * _Примечание_: `заголовок меню`, в отличие от `элемента меню` нельзя затаргетить с клавиатуры.
 *
 * Сущности в которых может быть использован `MenuHeader`: [`DropdownMenu`](#/Components/DropdownMenu), [`Kebab`](#/Components/Kebab), [`TooltipMenu`](#/Components/TooltipMenu) и [`Select`](#/Components/Select).
 */
export const MenuHeader = forwardRefAndName<HTMLDivElement, MenuHeaderProps>(
  'MenuHeader',
  ({ _enableIconPadding = false, children, className, ...rest }, ref) => {
    const theme = useContext(ThemeContext);

    return (
      <div
        ref={ref}
        className={cx(
          {
            [styles.root(theme)]: true,
            [styles.withLeftPadding(theme)]: _enableIconPadding,
          },
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

Object.assign(MenuHeader, { __MENU_HEADER__: true });

export const isMenuHeader = (child: React.ReactNode): child is React.ReactElement<MenuHeaderProps> => {
  return React.isValidElement<MenuHeaderProps>(child)
    ? Object.prototype.hasOwnProperty.call(child.type, '__MENU_HEADER__')
    : false;
};
