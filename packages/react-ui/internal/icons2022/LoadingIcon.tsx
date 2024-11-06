import React, { useContext } from 'react';

import { getStyles } from '../../components/Spinner/Spinner.styles';
import { EmotionContext } from '../../lib/theming/Emotion';
import { SpinnerIcon, SpinnerIconProps } from '../SpinnerIcon/SpinnerIcon';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { iconSizer } from './iconSizer';

const Icon = (props: SpinnerIconProps) => {
  const theme = useContext(ThemeContext);
  const emotion = useContext(EmotionContext);
  const styles = getStyles(emotion);

  return (
    <SpinnerIcon
      dimmed
      className={emotion.cx(
        styles.circle(theme),
        styles.circleDimmedColor(theme),
        styles.circleWithoutColorAnimation(),
      )}
      {...props}
    />
  );
};

export const LoadingIcon = iconSizer<Omit<SpinnerIconProps, 'size'>>(
  {
    small: () => <Icon size="mini" />,
    medium: () => (
      <Icon
        size={{
          size: 20,
          width: 1,
          radius: 6,
        }}
      />
    ),
    large: () => (
      <Icon
        size={{
          size: 24,
          width: 1.5,
          radius: 8,
        }}
      />
    ),
  },
  'LoadingIcon',
);
