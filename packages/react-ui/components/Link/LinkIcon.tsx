import React, { useContext } from 'react';

import { cx } from '../../lib/theming/Emotion';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Spinner } from '../Spinner';

import type { LinkProps } from './Link';
import { styles } from './Link.styles';

export interface LinkIconProps extends Pick<LinkProps, 'icon' | 'loading'> {
  position?: 'left' | 'right';
  hasBothIcons?: boolean;
}

export const LinkIcon = ({ icon, loading, hasBothIcons, position }: LinkIconProps) => {
  const theme = useContext(ThemeContext);

  return (
    <span
      className={cx(
        styles.icon(),
        position === 'left' && styles.iconLeft(theme),
        position === 'right' && styles.iconRight(theme),
      )}
    >
      {loading && !hasBothIcons ? <Spinner caption={null} dimmed inline /> : icon}
    </span>
  );
};
