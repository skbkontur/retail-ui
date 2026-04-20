import { isFocusable, tabbable } from 'tabbable';
import type { FocusableElement } from 'tabbable';

import { getOwnerGlobalObject } from '../../lib/globalObject.js';
import { isInstanceOf } from '../../lib/isInstanceOf.js';
import { isElement } from '../../lib/utils.js';
import type { Nullable } from '../../typings/utility-types.js';

/**
 * Поиск всех элементов, у которых tabindex > -1, в переданном родителе
 * или на всей странице
 * @param {Element|Document|null} [parent=document] - Родительский элемент,
 * внутри которого осуществляется поиск.
 * @return {FocusableElement[]} - Массив найденных элементов
 */

export const getTabbableElements = (parent: Nullable<Element | Document>): FocusableElement[] => {
  if (!isElement(parent)) {
    return [];
  }

  if (!parent || !parent.children.length || !isInstanceOf(parent, getOwnerGlobalObject(parent).Element)) {
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
