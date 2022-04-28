import { Nullable } from '../../typings/utility-types';
type DOMRectDefaultValues = Omit<DOMRect, 'toJSON'>;
/**
 * Возвращает размер элемента и его позицию относительно viewport
 *
 * @param element - ref элемента или сам элемент
 * @returns - возвращает размер элемента и его позицию относительно viewport
 */
export const getDOMRect = <T extends Element>(element: Nullable<T> | React.RefObject<T>): DOMRectDefaultValues => {
  const defaultValues: DOMRectDefaultValues = {
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  };
  if (element && 'current' in element) {
    return getRefRect(defaultValues, element);
  }
  return getElementRect(defaultValues, element);
};
const getElementRect = (defaultValues: DOMRectDefaultValues, element: Nullable<Element>) => {
  if (element) {
    return element.getBoundingClientRect();
  }
  return defaultValues;
};
const getRefRect = <T extends Element>(defaultValues: DOMRectDefaultValues, ref: React.RefObject<T>) => {
  if (ref?.current) {
    return ref.current.getBoundingClientRect();
  }
  return defaultValues;
};
