import { useEffect, useState } from 'react';

import { usePrevious } from './usePrevious';
import { GlobalLoaderViewProps, GlobalLoaderViewRef } from './GlobalLoaderView';

/**
 * Вычисляет ширину и положение `GlobalLoader`
 *
 * @param status - статус `GlobalLoader`
 * @param ref - ref `GlobalLoader`
 * @returns - возвращает ширину, левое положение и ширину полоски `GlobalLoader`
 */

export const useWidthAndPosition = (status: GlobalLoaderViewProps['status'], ref: GlobalLoaderViewRef['refObject']) => {
  const { width = 0, left = 0 } = ref.current?.getBoundingClientRect() || {};
  const [startWidth, setStartWidth] = useState(0);
  const prevStatus = usePrevious(status);
  useEffect(() => {
    const hasStatusChangedToError = (prevStatus === 'standard' || prevStatus === 'accept') && status === 'error';
    const hasStatusChangedToAccept = prevStatus === 'error' && status === 'accept';
    if (hasStatusChangedToError) {
      setStartWidth(width);
    } else if (hasStatusChangedToAccept) {
      setStartWidth(startWidth);
    } else {
      setStartWidth(0);
    }
  }, [status]);

  return { width, left, startWidth };
};
