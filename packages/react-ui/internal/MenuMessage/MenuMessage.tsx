import React, { useContext } from 'react';

import { forwardRefAndName } from '../../lib/forwardRefAndName';
import { useResponsiveLayout } from '../../components/ResponsiveLayout';
import { cx } from '../../lib/theming/Emotion';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { CommonProps } from '../CommonWrapper';

import { styles } from './MenuMessage.styles';

export interface MenuMessageProps extends CommonProps {
  children: React.ReactNode;
  as?: React.ElementType;
}

export const MenuMessageDataTids = {
  root: 'MenuMessage__root',
} as const;

export const MenuMessage = forwardRefAndName<HTMLOrSVGElement, MenuMessageProps>(
  'MenuMessage',
  ({ children, className, as: Tag = 'p', ...rest }, ref) => {
    const { isMobile } = useResponsiveLayout();

    const theme = useContext(ThemeContext);

    return (
      <Tag
        ref={ref}
        data-tid={MenuMessageDataTids.root}
        className={cx(
          {
            [styles.root(theme)]: true,
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
