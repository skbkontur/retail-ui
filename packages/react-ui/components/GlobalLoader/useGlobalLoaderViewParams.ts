import { useEffect, useState } from 'react';

import { usePrevious } from './usePrevious';
import { GlobalLoaderViewProps } from './GlobalLoaderView';

/**
 * Вычисляет необходимые параметры Глобального Лоадера
 *
 * @param status - статус Глобального Лоадера: 'success' | 'error' | 'standard' | 'accept'
 * @param ref - ref Global Loader View
 * @returns - возвращает ширину, левое положение и ширину полоски ГЛ при переходе в состояние ошибки
 */

export const useGlobalLoaderViewParams = (
  status: GlobalLoaderViewProps['status'],
  ref: React.RefObject<HTMLDivElement>,
) => {
  const { width = 0, left = 0 } = ref.current?.getBoundingClientRect() || {};
  const [startWidth, setStartWidth] = useState(0);
  const prevStatus = usePrevious(status);
  useEffect(() => {
    const statusChangedToError = (prevStatus === 'standard' || prevStatus === 'accept') && status === 'error';
    const statusChangedToAccept = prevStatus === 'error' && status === 'accept';
    if (statusChangedToError) {
      setStartWidth(width);
    } else if (statusChangedToAccept) {
      setStartWidth(startWidth);
    } else {
      setStartWidth(0);
    }
  }, [status]);

  return { width, left, startWidth };
};
