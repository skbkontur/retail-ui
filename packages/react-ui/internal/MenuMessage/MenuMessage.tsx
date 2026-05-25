import React, { useContext } from 'react';

import { useResponsiveLayout } from '../../components/ResponsiveLayout/index.js';
import { forwardRefAndName } from '../../lib/forwardRefAndName.js';
import { useEmotion, useStyles } from '../../lib/renderEnvironment/index.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import { isThemeGTE } from '../../lib/theming/ThemeHelpers.js';
import type { SizeProp } from '../../lib/types/props.js';
import type { CommonProps } from '../CommonWrapper/index.js';
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
    const themeGTE6_1 = isThemeGTE(theme, '6.1');
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

    const getMenuMessageSizeMobileClassName = (): string => {
      if (!themeGTE6_1) {
        return cx(styles.rootMobile(theme));
      }
      switch (size) {
        case 'large':
          return cx(styles.rootMobileLarge(theme));
        case 'medium':
          return cx(styles.rootMobileMedium(theme));
        case 'small':
        default:
          return cx(styles.rootMobileSmall(theme));
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
            [getMenuMessageSizeMobileClassName()]: isMobile,
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
