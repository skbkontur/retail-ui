import type { HTMLAttributes, ReactNode } from 'react';
import React, { useContext } from 'react';

import { useEmotion, useStyles } from '../../lib/renderEnvironment/index.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import type { CommonProps } from '../../internal/CommonWrapper/index.js';
import { CommonWrapper } from '../../internal/CommonWrapper/index.js';
import type { SizeProp } from '../../lib/types/props.js';
import { MenuContext } from '../../internal/Menu/MenuContext.js';
import { forwardRefAndName } from '../../lib/forwardRefAndName.js';

import { getStyles } from './MenuHeader.styles.js';

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

const MenuHeader = forwardRefAndName(
  'MenuHeader',
  function MenuHeader(
    { id, _enableIconPadding = false, children, size = 'small', ...rest }: MenuHeaderProps,
    ref: React.Ref<HTMLDivElement>,
  ) {
    const theme = useContext(ThemeContext);
    const { cx } = useEmotion();
    const styles = useStyles(getStyles);
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
          ref={ref}
          id={id}
          data-tid={MenuHeaderDataTids.root}
          className={cx(getRootSizeClassName(), {
            [styles.root(theme)]: true,
            [getWithLeftPaddingSizeClassName()]: menuContext.enableIconPadding || _enableIconPadding,
          })}
        >
          {children}
        </div>
      </CommonWrapper>
    );
  },
);

(MenuHeader as any).__MENU_HEADER__ = true;

export { MenuHeader };

export const isMenuHeader = (child: React.ReactNode): child is React.ReactElement<MenuHeaderProps> => {
  return React.isValidElement<MenuHeaderProps>(child)
    ? Object.prototype.hasOwnProperty.call(child.type, '__MENU_HEADER__')
    : false;
};
