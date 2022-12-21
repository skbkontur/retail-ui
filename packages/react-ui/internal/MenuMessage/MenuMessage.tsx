import React, { useContext } from 'react';

import { forwardRefAndName } from '../../lib/forwardRefAndName';
import { useResponsiveLayout } from '../../components/ResponsiveLayout';
import { cx } from '../../lib/theming/Emotion';
import { styles } from '../../components/MenuItem/MenuItem.styles';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { CommonProps } from '../CommonWrapper';

export interface MenuMessageProps extends CommonProps {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

export const MenuMessageDataTids = {
  root: 'MenuMessage__root',
} as const;

export const MenuMessage = forwardRefAndName<HTMLParagraphElement, MenuMessageProps>(
  'MenuMessage',
  ({ children, className, as: Tag = 'p', ...rest }) => {
    const { isMobile } = useResponsiveLayout();

    const theme = useContext(ThemeContext);

    return (
      <Tag
        data-tid={MenuMessageDataTids.root}
        className={cx(
          {
            [styles.root(theme)]: true,
            [styles.disabled(theme)]: true,
            [styles.rootMobile(theme)]: isMobile,
          },
          className,
        )}
        {...rest}
      >
        {children}
      </Tag>
    );
  },
);
