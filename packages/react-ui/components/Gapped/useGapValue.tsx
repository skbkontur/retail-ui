import { useContext } from 'react';

import { isNonNullable } from '../../lib/utils';
import { is8pxTheme } from '../../lib/theming/ThemeHelpers';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { GappedProps } from './Gapped';

export type GapValue = {
  gap: NonNullable<GappedProps['gap']>;
};

/**
 * @deprecated remove in release 4.0
 */
export const useGapValue = (gap: GappedProps['gap']) => {
  const theme = useContext(ThemeContext);

  if (isNonNullable(gap)) {
    return gap;
  }

  return is8pxTheme(theme) ? 8 : 10;
};
