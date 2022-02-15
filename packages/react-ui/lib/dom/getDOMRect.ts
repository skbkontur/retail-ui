/**
 * Возвращает размер элемента и его позицию относительно viewport
 *
 * @param ref - ref элемента
 * @returns - возвращает размер элемента и его позицию относительно viewport
 */
export const getDOMRect = <T extends HTMLElement>(ref: React.RefObject<T>): Omit<DOMRect, 'toJSON'> => {
  if (!ref.current) {
    const defaultValues = {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
    };

    return defaultValues;
  }

  return ref.current.getBoundingClientRect();
};
