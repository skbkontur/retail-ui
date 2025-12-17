import textStyles from '@skbkontur/typography/Text.module.css';

import type { SizeProp } from '../reactUiCompat/useSizeContext.js';

export const getTypographyClass = (size: SizeProp): string => {
  if (size === 'small') {
    return textStyles.t14;
  }
  if (size === 'medium') {
    return textStyles.t16;
  }
  return textStyles.t18;
};
