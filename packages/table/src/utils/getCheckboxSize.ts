import type { SizeProp } from '../reactUiCompat/useSizeContext.js';

export const getCheckboxSize = (size: SizeProp): string => {
  if (size === 'small') {
    return '16px';
  }
  if (size === 'medium') {
    return '22px';
  }
  return '24px';
};
