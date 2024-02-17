import React, { useContext } from 'react';

import { Spinner } from '../Spinner';
import { IconSizeAliases } from '../../internal/icons2022/iconConstants';
import { LoadingIcon } from '../../internal/icons2022/LoadingIcon';
import { isTheme2022 } from '../../lib/theming/ThemeHelpers';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { ButtonDataTids } from './Button';
import { styles } from './Button.styles';

interface LoadingButtonIconProps {
  size: IconSizeAliases;
  isCentered?: boolean;
}

export const LoadingButtonIcon = ({ size, isCentered }: LoadingButtonIconProps) => {
  const theme = useContext(ThemeContext);

  return (
    <div data-tid={ButtonDataTids.spinner} className={isCentered ? styles.loading() : undefined}>
      {isTheme2022(theme) ? <LoadingIcon size={size} /> : <Spinner caption={null} dimmed type="mini" />}
    </div>
  );
};
