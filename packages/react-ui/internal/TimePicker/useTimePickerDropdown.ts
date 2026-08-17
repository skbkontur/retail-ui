import { useCallback, useEffect, useRef, useState } from 'react';

import {
  isHighlightableMenuItem,
  isTimeMenuItem,
  type TimeItemValue,
  type TimePickerMenuItem,
} from '../../components/TimePicker/helpers/TimePicker.shared.js';

interface UseTimePickerDropdownOptions<T extends TimeItemValue> {
  hasDropdown: boolean;
  disabled?: boolean;
  items: Array<TimePickerMenuItem<T>>;
  selectedItemIndex: number | null;
  autoHighlightKey: string | null;
  /**
   * Состоянием открытости владеет компонент: от него зависит запрос элементов,
   * а элементы, в свою очередь, нужны этому хуку для навигации.
   */
  isDropdownOpened: boolean;
  setIsDropdownOpened(isOpened: boolean): void;
}

interface UseTimePickerDropdownResult {
  highlightedItemIndex: number | null;
  openDropdown(): void;
  closeDropdown(): void;
  resetHighlightedItem(): void;
  tryNavigateItems(step: 1 | -1): boolean;
}

export const useTimePickerDropdown = <T extends TimeItemValue>(
  options: UseTimePickerDropdownOptions<T>,
): UseTimePickerDropdownResult => {
  const { hasDropdown, disabled, items, selectedItemIndex, autoHighlightKey, isDropdownOpened, setIsDropdownOpened } =
    options;

  const [highlightedItemIndex, setHighlightedItemIndex] = useState<number | null>(null);
  const lastAutoHighlightKeyRef = useRef<string | null>(null);

  const openDropdown = useCallback(() => {
    if (!hasDropdown || disabled) {
      return;
    }

    setIsDropdownOpened(true);
  }, [disabled, hasDropdown, setIsDropdownOpened]);

  const closeDropdown = useCallback(() => {
    setIsDropdownOpened(false);
    setHighlightedItemIndex(null);
  }, [setIsDropdownOpened]);

  const resetHighlightedItem = useCallback(() => {
    setHighlightedItemIndex(null);
  }, []);

  useEffect(() => {
    if (lastAutoHighlightKeyRef.current === autoHighlightKey) {
      return;
    }

    lastAutoHighlightKeyRef.current = autoHighlightKey;

    if (autoHighlightKey === null) {
      setHighlightedItemIndex(null);
      return;
    }

    const firstEnabledItemIndex = items.findIndex((item) => isTimeMenuItem(item) && !item.disabled);
    setHighlightedItemIndex(firstEnabledItemIndex >= 0 ? firstEnabledItemIndex : null);
  }, [autoHighlightKey, items]);

  useEffect(() => {
    setHighlightedItemIndex((current) => {
      if (current === null) {
        return current;
      }

      const item = items[current];

      return !item || !isHighlightableMenuItem(item) ? null : current;
    });
  }, [items]);

  const tryNavigateItems = useCallback(
    (step: 1 | -1) => {
      if (!hasDropdown || !isDropdownOpened) {
        return false;
      }

      const enabledIndexes = items.flatMap((item, index) => (isHighlightableMenuItem(item) ? index : []));

      if (enabledIndexes.length === 0) {
        return false;
      }

      /**
       * Навигация идет от выделенного элемента, а если его нет — от выбранного значения.
       * Отсутствующий и заблокированный элементы дают `-1`, и тогда шаг вниз попадает на первый элемент,
       * а шаг вверх выходит за начало и по фолбэку ниже уходит на последний.
       */
      const currentIndex = enabledIndexes.indexOf(highlightedItemIndex ?? selectedItemIndex ?? -1);

      setHighlightedItemIndex(
        enabledIndexes[currentIndex + step] ??
          (step > 0 ? enabledIndexes[0] : enabledIndexes[enabledIndexes.length - 1]),
      );

      return true;
    },
    [hasDropdown, highlightedItemIndex, isDropdownOpened, selectedItemIndex, items],
  );

  return {
    highlightedItemIndex,
    openDropdown,
    closeDropdown,
    resetHighlightedItem,
    tryNavigateItems,
  };
};
