import { useMemo } from 'react';

import { SizeType } from '../../ThemePlayground/constants';

export function useFileUploaderSize<T>(size: SizeType, { small, medium, large }: Record<SizeType, T>) {
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
