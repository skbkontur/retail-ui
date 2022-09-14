import { useMemo } from 'react';
import { FileUploaderSize } from '../../../components/FileUploader';

export function useFileUploaderSize<T>(size: FileUploaderSize, { small, medium, large }: Record<FileUploaderSize, T>) {
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
