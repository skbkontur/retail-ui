import React, { useContext } from 'react';

import { IconSizeAliases } from '../../internal/icons2022/iconConstants';
import { LoadingIcon } from '../../internal/icons2022/LoadingIcon';
import { EmotionContext } from '../../lib/theming/Emotion';

import { ButtonDataTids } from './Button';
import { getStyles } from './Button.styles';

interface LoadingButtonIconProps {
  size: IconSizeAliases;
  isCentered?: boolean;
}

export const LoadingButtonIcon = ({ size, isCentered = true }: LoadingButtonIconProps) => {
  const emotion = useContext(EmotionContext);
  const styles = getStyles(emotion);
  return (
    <div data-tid={ButtonDataTids.spinner} className={isCentered ? styles.loading() : undefined}>
      {<LoadingIcon size={size} />}
    </div>
  );
};
