/* eslint-disable react/display-name */
import React from 'react';

import { getStyles } from '../../components/Spinner/Spinner.styles';
import { useEmotion } from '../../lib/theming/Emotion';
import { SpinnerIcon, SpinnerIconProps } from '../icons/SpinnerIcon';
import { useTheme } from '../../lib/theming/useTheme';

import { iconSizer } from './iconSizer';

const Icon = (props: SpinnerIconProps) => {
  const theme = useTheme();
  const emotion = useEmotion();
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
