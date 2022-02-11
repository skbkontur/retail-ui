import { useEffect, useRef } from 'react';

/**
 * Возвраащет предыдущее значение переданной переменной
 *
 * @param value - значение пропа
 * @returns - возвращает предыдущее значение переданной переменной
 */

export function usePrevious(value: any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
