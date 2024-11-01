import { useMemo } from 'react';

import type { SizeProp } from '../../../lib/types/props';

export function useFileUploaderSize<T>(size: SizeProp, { small, medium, large }: Record<SizeProp, T>) {
  return useMemo(() => {
    switch (size) {
      case 'large':
        return large;
      case 'medium':
        return medium;
      case 'small':
        return small;
      default:
        return small;
    }
  }, [size]);
}
