import { tabbable, FocusableElement, isFocusable } from 'tabbable';

/**
 * Поиск всех элементов, у которых tabindex > -1, в переданном родителе
 * или на всей странице
 * @param {Element|Document|null} [parent=document] - Родительский элемент,
 * внутри которого осуществляется поиск.
 * @return {FocusableElement[]} - Массив найденных элементов
 */

export const getTabbableElements = (parent: Element | Document | null = document): FocusableElement[] => {
  if (!parent || !parent.children.length || !(parent instanceof Element)) {
    return [];
  }
  return tabbable(parent);
};

/**
 * Поиск ближайшего фокусируемого элемента среди переданного и его родителей
 * @param {HTMLElement} current - Текущий элемент
 * @return {HTMLElement|null} - Найденный элемент или null
 *
 */

export const getClosestFocusableElement = (current: HTMLElement | null): HTMLElement | null => {
  if (!current) {
    return null;
  }

  return isFocusable(current) ? current : getClosestFocusableElement(current.parentElement);
};
