import React, { useContext } from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { cx } from '../../lib/theming/Emotion';

import { MenuItemProps } from './MenuItem';
import { styles } from './MenuItem.styles';

export type MenuItemCommentProps = {
  children: MenuItemProps['comment'];
  isHovered: boolean;
};

export const MenuItemComment = ({ children, isHovered }: MenuItemCommentProps) => {
  const theme = useContext(ThemeContext);

  return (
    <div
      data-tid="MenuItem__comment"
      className={cx({
        [styles.comment(theme)]: true,
        [styles.commentHover(theme)]: isHovered,
      })}
    >
      {children}
    </div>
  );
};
