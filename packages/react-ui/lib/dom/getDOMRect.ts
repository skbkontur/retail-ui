/**
 * Возвращает размер элемента и его позицию относительно viewport
 *
 * @param element - ref элемента или сам элемент
 * @returns - возвращает размер элемента и его позицию относительно viewport
 */

import { Nullable } from '../../typings/utility-types';

export const getDOMRect = <T extends Element>(element: Nullable<T> | React.RefObject<T>): Omit<DOMRect, 'toJSON'> => {
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
  if (element) {
    if ('current' in element) {
      if (element.current) {
        return element.current.getBoundingClientRect();
      } else {
        return defaultValues;
      }
    } else {
      return element.getBoundingClientRect();
    }
  } else {
    return defaultValues;
  }
};
