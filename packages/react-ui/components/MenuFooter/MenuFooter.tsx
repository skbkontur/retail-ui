import React, { HTMLAttributes, ReactNode, useContext } from 'react';

import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { EmotionContext } from '../../lib/theming/Emotion';
import { SizeProp } from '../../lib/types/props';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { getStyles } from './MenuFooter.styles';

export interface MenuFooterProps extends CommonProps, Pick<HTMLAttributes<HTMLElement>, 'id'> {
  _enableIconPadding?: boolean;
  children: ReactNode;
  /** Размер */
  size?: SizeProp;
}

export const MenuFooterDataTids = {
  root: 'MenuFooter__root',
} as const;

/**
 * Футер меню.
 *
 * _Примечание_: `футер меню`, в отличие от `элемента меню` нельзя затаргетить с клавиатуры.
 *
 * Сущности в которых может быть использован `MenuFooter`: [DropdownMenu](#/Components/DropdownMenu), [Kebab](#/Components/Kebab), [TooltipMenu](#/Components/TooltipMenu) и [Select](#/Components/Select).
 */
function MenuFooter({ id, _enableIconPadding = false, children, size = 'small', ...rest }: MenuFooterProps) {
  const theme = useContext(ThemeContext);
  const emotion = useContext(EmotionContext);
  const styles = getStyles(emotion);

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
        data-tid={MenuFooterDataTids.root}
        className={emotion.cx(getRootSizeClassName(), {
          [styles.root(theme)]: true,
          [getWithLeftPaddingSizeClassName()]: _enableIconPadding,
        })}
      >
        {children}
      </div>
    </CommonWrapper>
  );
}

MenuFooter.__KONTUR_REACT_UI__ = 'MenuFooter';
MenuFooter.displayName = 'MenuFooter';
MenuFooter.__MENU_FOOTER__ = true;

export { MenuFooter };

export const isMenuFooter = (child: React.ReactNode): child is React.ReactElement<MenuFooterProps> => {
  return React.isValidElement<MenuFooterProps>(child)
    ? Object.prototype.hasOwnProperty.call(child.type, '__MENU_FOOTER__')
    : false;
};
