import { useEffect, useState } from 'react';

import { getDOMRect } from '../../lib/dom/getDOMRect';

import { GlobalLoaderViewProps, GlobalLoaderViewRef } from './GlobalLoaderView';

/**
 * Вычисляет положение `GlobalLoader`
 *
 * @param ref - ref `GlobalLoader`
 * @returns - возвращает положение полоски `GlobalLoader`
 */

export const usePosition = (ref: GlobalLoaderViewRef['refObject']) => {
  const { left } = getDOMRect(ref);
  return { left };
};

/**
 * Вычисляет ширину `GlobalLoader`
 *
 * @param status - статус `GlobalLoader`
 * @param ref - ref `GlobalLoader`
 * @returns - возвращает ширину полоски `GlobalLoader`
 */

export const useWidth = (status: GlobalLoaderViewProps['status'], ref: GlobalLoaderViewRef['refObject']) => {
  const { width } = getDOMRect(ref);
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

  return { width, startWidth };
};
