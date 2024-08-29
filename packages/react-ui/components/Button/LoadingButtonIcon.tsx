import React from 'react';

import { Spinner } from '../Spinner';
import { IconSizeAliases } from '../../internal/icons2022/iconConstants';
import { LoadingIcon } from '../../internal/icons2022/LoadingIcon';
import { isTheme2022 } from '../../lib/theming/ThemeHelpers';
import { useEmotion } from '../../lib/theming/Emotion';
import { useTheme } from '../../lib/theming/useTheme';

import { ButtonDataTids } from './Button';
import { getStyles } from './Button.styles';

interface LoadingButtonIconProps {
  size: IconSizeAliases;
  isCentered?: boolean;
}

export const LoadingButtonIcon = ({ size, isCentered = true }: LoadingButtonIconProps) => {
  const theme = useTheme();
  const emotion = useEmotion();
  const styles = getStyles(emotion);

  return (
    <div data-tid={ButtonDataTids.spinner} className={isCentered ? styles.loading() : undefined}>
      {isTheme2022(theme) ? <LoadingIcon size={size} /> : <Spinner caption={null} dimmed type="mini" />}
    </div>
  );
};
