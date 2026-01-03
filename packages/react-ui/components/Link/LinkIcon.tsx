import React, { useContext } from 'react';

import { useEmotion, useStyles } from '../../lib/renderEnvironment/index.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import { Spinner } from '../Spinner/index.js';

import type { LinkProps } from './Link.js';
import { getStyles } from './Link.styles.js';

export interface LinkIconProps extends Pick<LinkProps, 'icon' | 'loading'> {
  position?: 'left' | 'right';
  hasBothIcons?: boolean;
}

export const LinkIcon = ({ icon, loading, hasBothIcons, position }: LinkIconProps): React.JSX.Element => {
  const theme = useContext(ThemeContext);
  const { cx } = useEmotion();
  const styles = useStyles(getStyles);

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
