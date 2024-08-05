import React from 'react';

import { IconSizeAliases } from '../../internal/icons2022/iconConstants';
import { LoadingIcon } from '../../internal/icons2022/LoadingIcon';

import { ButtonDataTids } from './Button';
import { styles } from './Button.styles';

interface LoadingButtonIconProps {
  size: IconSizeAliases;
  isCentered?: boolean;
}

export const LoadingButtonIcon = ({ size, isCentered = true }: LoadingButtonIconProps) => {
  return (
    <div data-tid={ButtonDataTids.spinner} className={isCentered ? styles.loading() : undefined}>
      {<LoadingIcon size={size} />}
    </div>
  );
};
