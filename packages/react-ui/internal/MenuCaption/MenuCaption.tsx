import React, { useContext } from 'react';
import { forwardRefAndName } from 'react-ui/lib/forwardRefAndName';

import { useResponsiveLayout } from '../../components/ResponsiveLayout';
import { cx } from '../../lib/theming/Emotion';
import { styles } from '../../components/MenuItem/MenuItem.styles';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { CommonProps } from '../CommonWrapper';

export interface MenuCaptionProps extends CommonProps {
  children: React.ReactNode;
}

export const MenuCaptionDataTids = {
  root: 'MenuCaption__root',
} as const;

export const MenuCaption = forwardRefAndName<HTMLParagraphElement, MenuCaptionProps>(
  'MenuHeader',
  ({ children, className, ...rest }) => {
    const { isMobile } = useResponsiveLayout();

    const theme = useContext(ThemeContext);

    return (
      <p
        data-tid={MenuCaptionDataTids}
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
      </p>
    );
  },
);
