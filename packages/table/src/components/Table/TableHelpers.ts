import textStyles from '@skbkontur/typography/Text.module.css';

import type { SizeProp } from '../../reactUiCompat/useSizeContext.js';

export const transformWidth = (width: string | number | undefined): string | number | undefined => {
  if (!width) {
    return undefined;
  }

  if (typeof width === 'number') {
    return width;
  }

  const frRegex = /(\d+(?:\.\d+)?)fr/g;
  return width.replace(frRegex, (match, x) => {
    return `${parseFloat(x) * 100}%`;
  });
};

export const getTypographyClass = (size: SizeProp): string => {
  if (size === 'small') {
    return textStyles.t14;
  }
  if (size === 'medium') {
    return textStyles.t16;
  }
  return textStyles.t18;
};
