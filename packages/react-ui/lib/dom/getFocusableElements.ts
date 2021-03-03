import { tabbable, isFocusable, FocusableElement } from 'tabbable';

/**
 * Поиск всех фокусируемых элементов в переданном родителе
 * или на всей странице
 * @param {Element|Document|null} [parent=document] - Родительский элемент,
 * внутри которого осуществляется поиск.
 * @return {FocusableElement[]} - Массив найденных элементов
 */

export const getFocusableElements = (parent: Element | Document | null = document): FocusableElement[] => {
  if (!parent || !parent.children.length || !(parent instanceof Element)) {
    return [];
  }
  return tabbable(parent);
};

/**
 * Поиск первого фокусируемого элемента в переданном родителе
 * или на всей странице
 * @param {Element|Document|null} [parent=document] - Родительский элемент,
 * внутри которого осуществляется поиск.
 * @return {HTMLElement|null} - Найденный элемент или null
 */

export const getFirstFocusableElement = (parent: Element | Document | null = document): FocusableElement | null => {
  if (!parent || !parent.children.length) {
    return null;
  }
  return getFocusableElements(parent)[0] || null;
};

/**
 * Поиск следующего фокусируемого элемента в переданном родителе
 * или на всей странице
 * @param {HTMLElement} current - Текущий фокусируемый элемент
 * @param {Element|Document|null} [parent=document] - Родительский элемент,
 * внутри которого осуществляется поиск.
 * @param {boolean} [recursive=true] - Разрешает рекурсивный подъем вверх
 * по родителям
 * @return {HTMLElement|null} - Найденный элемент или null
 *
 * В случае поиска по всей странице, можно оставить parent === document,
 * тогда результат будет максимально точным, но возможны задержки
 * при большом кол-ве фокусируемых элементов на странице.
 * Если же передать parent === current.parentElement и recursive === true,
 * то поиск осуществится максимально быстро. Но может оказаться не учтенным
 * порядок элементов с [tabindex] > 0.
 */

export const getNextFocusableElement = (
  current: HTMLElement,
  parent: Element | Document | null = document,
  recursive = true,
): FocusableElement | null => {
  if (!parent || !parent.contains(current)) {
    return null;
  }
  if (parent.lastElementChild !== current) {
    const tabbables = getFocusableElements(parent);
    if (tabbables.length > 1) {
      const currentIndex = tabbables.indexOf(current);
      const lastIndex = tabbables.length - 1;
      if (currentIndex === -1) {
        return null;
      }
      if (currentIndex < lastIndex) {
        return tabbables[currentIndex + 1];
      }
    }
  }
  return recursive ? getNextFocusableElement(current, parent.parentElement) : null;
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
