import React, { type JSX } from 'react';

import { useStyles } from '../../lib/renderEnvironment';
import type { IconSizeAliases } from '../../internal/icons2022/iconConstants';
import { LoadingIcon } from '../../internal/icons2022/LoadingIcon';

import { ButtonDataTids } from './Button';
import { getStyles } from './Button.styles';

interface LoadingButtonIconProps {
  size: IconSizeAliases;
  isCentered?: boolean;
}

export const LoadingButtonIcon = ({ size, isCentered = true }: LoadingButtonIconProps): JSX.Element => {
  const styles = useStyles(getStyles);
  return (
    <div data-tid={ButtonDataTids.spinner} className={isCentered ? styles.loading() : undefined}>
      {<LoadingIcon size={size} />}
    </div>
  );
};
