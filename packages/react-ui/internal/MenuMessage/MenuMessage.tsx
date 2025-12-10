import React, { useContext } from 'react';

import { useEmotion, useStyles } from '../../lib/renderEnvironment/index.js';
import { forwardRefAndName } from '../../lib/forwardRefAndName.js';
import { useResponsiveLayout } from '../../components/ResponsiveLayout/index.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import type { CommonProps } from '../CommonWrapper/index.js';
import type { SizeProp } from '../../lib/types/props.js';

import { getStyles } from './MenuMessage.styles.js';

export interface MenuMessageProps extends CommonProps {
  children: React.ReactNode;
  as?: React.ElementType;
  size?: SizeProp;
}

export const MenuMessageDataTids = {
  root: 'MenuMessage__root',
} as const;

export const MenuMessage = forwardRefAndName<HTMLOrSVGElement, MenuMessageProps>(
  'MenuMessage',
  ({ children, className, size = 'small', as: Tag = 'p', ...rest }, ref) => {
    const { isMobile } = useResponsiveLayout();

    const { cx } = useEmotion();
    const styles = useStyles(getStyles);
    const theme = useContext(ThemeContext);

    const getMenuMessageSizeClassName = () => {
      switch (size) {
        case 'large':
          return cx(styles.rootLarge(theme));
        case 'medium':
          return cx(styles.rootMedium(theme));
        case 'small':
        default:
          return cx(styles.rootSmall(theme));
      }
    };

    return (
      <Tag
        ref={ref}
        data-tid={MenuMessageDataTids.root}
        className={cx(
          getMenuMessageSizeClassName(),
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
