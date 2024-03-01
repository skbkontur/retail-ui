import React, { useContext } from 'react';

import { cx } from '../../lib/theming/Emotion';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Spinner } from '../Spinner';

import { ClickableProps } from './Clickable';
import { linkStyles } from './ClickableLink.styles';

export interface ClickableLinkIconProps extends Pick<ClickableProps, 'isLoading'> {
  icon: ClickableProps['leftIcon'];
  position?: 'left' | 'right';
  hasBothIcons?: boolean;
}

export const ClickableLinkIcon = ({ icon, isLoading, hasBothIcons, position }: ClickableLinkIconProps) => {
  const theme = useContext(ThemeContext);

  return (
    <span
      className={cx(
        linkStyles.linkIcon(theme),
        position === 'left' && linkStyles.linkIconLeft(theme),
        position === 'right' && linkStyles.linkIconRight(theme),
      )}
    >
      {isLoading && !hasBothIcons ? <Spinner caption={null} dimmed inline /> : icon}
    </span>
  );
};
