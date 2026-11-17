import { isFocusable, tabbable } from 'tabbable';
import type { FocusableElement } from 'tabbable';

import { getOwnerGlobalObject } from '../../lib/globalObject.js';
import { isInstanceOf } from '../../lib/isInstanceOf.js';
import { isElement } from '../../lib/utils.js';
import type { Nullable } from '../../typings/utility-types.js';

// `tabbable` >= 6.4.0 throws in old browsers (Chrome < 88, Firefox < 84) on the `:not([inert] *)` selector.
// Fallback list is `candidateSelectors` from tabbable 6.0.1 (no `:not([inert])` parts yet):
// https://github.com/focus-trap/tabbable/blob/v6.0.1/src/index.js
const FALLBACK_CANDIDATE_SELECTOR = [
  'input',
  'select',
  'textarea',
  'a[href]',
  'button',
  '[tabindex]:not(slot)',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])',
  'details>summary:first-of-type',
  'details',
].join(',');

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

  try {
    return tabbable(parent);
  } catch {
    // `tabIndex >= 0` matches the value `disableChildrenFocus` saves and restores.
    return Array.from(parent.querySelectorAll(FALLBACK_CANDIDATE_SELECTOR)).filter(
      (element): element is FocusableElement => (element as HTMLElement).tabIndex >= 0,
    );
  }
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
