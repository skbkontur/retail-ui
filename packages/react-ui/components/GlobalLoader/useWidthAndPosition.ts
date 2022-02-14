import { useEffect, useState } from 'react';

import { GlobalLoaderViewProps, GlobalLoaderViewRef } from './GlobalLoaderView';

/**
 * Вычисляет ширину и положение `GlobalLoader`
 *
 * @param status - статус `GlobalLoader`
 * @param ref - ref `GlobalLoader`
 * @returns - возвращает ширину и положение полоски `GlobalLoader`
 */

export const useWidthAndPosition = (status: GlobalLoaderViewProps['status'], ref: GlobalLoaderViewRef['refObject']) => {
  const { width = 0, left = 0 } = ref.current?.getBoundingClientRect() || {};
  const [startWidth, setStartWidth] = useState(0);
  useEffect(() => {
    if (status === 'error') {
      setStartWidth(width);
    } else if (status === 'accept') {
      setStartWidth(startWidth);
    } else {
      setStartWidth(0);
    }
  }, [status]);

  return { width, left, startWidth };
};
