import React, { useContext } from 'react';

import { cx } from '../../lib/theming/Emotion';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Spinner } from '../Spinner';

import { ClickableProps } from './Clickable';
import { linkIconStyles } from './ClickableLinkIcon.styles';

export interface ClickableLinkIconProps extends Pick<ClickableProps, 'loading'> {
  icon: ClickableProps['leftIcon'];
  position?: 'left' | 'right';
  hasBothIcons?: boolean;
}

export const ClickableLinkIcon = ({ icon, loading, hasBothIcons, position }: ClickableLinkIconProps) => {
  const theme = useContext(ThemeContext);

  return (
    <span
      className={cx({
        [linkIconStyles.linkIcon(theme)]: true,
        [linkIconStyles.linkIconLeft(theme)]: position === 'left',
        [linkIconStyles.linkIconRight(theme)]: position === 'right',
      })}
    >
      {loading && !hasBothIcons ? <Spinner caption={null} dimmed inline /> : icon}
    </span>
  );
};
