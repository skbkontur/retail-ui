import React, { type JSX } from 'react';

import type { IconSizeAliases } from '../../internal/icons2022/iconConstants.js';
import { LoadingIcon } from '../../internal/icons2022/LoadingIcon.js';
import { useStyles } from '../../lib/renderEnvironment/index.js';
import { ButtonDataTids } from './Button.js';
import { getStyles } from './Button.styles.js';

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
