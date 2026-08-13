import type { SizeProp } from '../reactUiCompat/useSizeContext.js';

import textStyles from '@skbkontur/typography/t.module.css';

export const getTypographyClass = (size: SizeProp): string => {
  if (size === 'small') {
    return textStyles.bodyS;
  }
  if (size === 'medium') {
    return textStyles.bodyM;
  }
  return textStyles.bodyL;
};
