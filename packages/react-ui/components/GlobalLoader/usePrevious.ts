import { useEffect, useRef } from 'react';

/**
 * Возвращет предыдущее значение переданной переменной
 *
 * @param value - значение пропа
 * @returns - возвращает предыдущее значение переданной переменной
 */

export function usePrevious(value: any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
