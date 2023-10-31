import { tabbable, FocusableElement, isFocusable } from 'tabbable';
import { globalObject, isInstanceOf } from '@skbkontur/global-object';

import { Nullable } from '../../typings/utility-types';

/**
 * Поиск всех элементов, у которых tabindex > -1, в переданном родителе
 * или на всей странице
 * @param {Element|Document|null} [parent=document] - Родительский элемент,
 * внутри которого осуществляется поиск.
 * @return {FocusableElement[]} - Массив найденных элементов
 */

export const getTabbableElements = (
  parent: Nullable<Element | Document> = globalObject.document,
): FocusableElement[] => {
  if (!parent || !parent.children.length || !isInstanceOf(parent, globalObject.Element)) {
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
