import React from 'react';

import { useEmotion, useStyles } from '../../lib/renderEnvironment';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { getStyles } from '../../components/Spinner/Spinner.styles';
import type { SpinnerIconProps } from '../SpinnerIcon/SpinnerIcon';
import { SpinnerIcon } from '../SpinnerIcon/SpinnerIcon';

import { iconSizer } from './iconSizer';

const Icon = (props: SpinnerIconProps) => {
  const { cx } = useEmotion();
  const styles = useStyles(getStyles);
  const theme = React.useContext(ThemeContext);
  return (
    <SpinnerIcon
      className={cx(styles.circle(theme), styles.circleDimmedColor(theme), styles.circleWithoutColorAnimation())}
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
