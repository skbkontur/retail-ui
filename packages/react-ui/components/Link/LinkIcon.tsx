import React, { useContext } from 'react';

import { EmotionContext } from '../../lib/theming/Emotion';
import { Spinner } from '../Spinner';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { LinkProps } from './Link';
import { getStyles } from './Link.styles';

export interface LinkIconProps extends Pick<LinkProps, 'icon' | 'loading'> {
  position?: 'left' | 'right';
  hasBothIcons?: boolean;
}

export const LinkIcon = ({ icon, loading, hasBothIcons, position }: LinkIconProps) => {
  const theme = useContext(ThemeContext);
  const emotion = useContext(EmotionContext);
  const styles = getStyles(emotion);

  return (
    <span
      className={emotion.cx(
        styles.icon(),
        position === 'left' && styles.iconLeft(theme),
        position === 'right' && styles.iconRight(theme),
      )}
    >
      {loading && !hasBothIcons ? <Spinner caption={null} dimmed inline /> : icon}
    </span>
  );
};
