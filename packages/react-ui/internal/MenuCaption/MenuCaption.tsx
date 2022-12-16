import React, { useContext } from 'react';

import { useResponsiveLayout } from '../../components/ResponsiveLayout';
import { cx } from '../../lib/theming/Emotion';
import { styles } from '../../components/MenuItem/MenuItem.styles';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { CommonProps } from '../CommonWrapper';

export interface MenuCaptionProps extends CommonProps {
  children: React.ReactNode;
}

export const MenuCaption = ({ children, className, ...rest }: MenuCaptionProps) => {
  const { isMobile } = useResponsiveLayout();

  const theme = useContext(ThemeContext);

  return (
    <p
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
};
