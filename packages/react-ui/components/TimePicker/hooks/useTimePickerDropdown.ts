import { useCallback, useState } from 'react';

import type { TimeItem } from '../helpers/TimePicker.shared.js';

interface UseTimePickerDropdownOptions {
  hasDropdown: boolean;
  disabled?: boolean;
  items: TimeItem[];
  selectedItemIndex: number | null;
}

interface UseTimePickerDropdownResult {
  isDropdownOpened: boolean;
  highlightedItemIndex: number | null;
  openDropdown(): void;
  closeDropdown(): void;
  resetHighlightedItem(): void;
  tryNavigateItems(step: 1 | -1): boolean;
}

export const useTimePickerDropdown = (options: UseTimePickerDropdownOptions): UseTimePickerDropdownResult => {
  const { hasDropdown, disabled, items, selectedItemIndex } = options;

  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const [highlightedItemIndex, setHighlightedItemIndex] = useState<number | null>(null);

  const openDropdown = useCallback(() => {
    if (!hasDropdown || disabled) {
      return;
    }

    setIsDropdownOpened(true);
  }, [disabled, hasDropdown]);

  const closeDropdown = useCallback(() => {
    setIsDropdownOpened(false);
    setHighlightedItemIndex(null);
  }, []);

  const resetHighlightedItem = useCallback(() => {
    setHighlightedItemIndex(null);
  }, []);

  const tryNavigateItems = useCallback(
    (step: 1 | -1) => {
      if (!hasDropdown || !isDropdownOpened) {
        return false;
      }

      const enabledIndexes = items
        .map((item, index) => ({ item, index }))
        .filter(({ item }) => !item.disabled)
        .map(({ index }) => index);

      if (enabledIndexes.length === 0) {
        return false;
      }

      if (highlightedItemIndex === null) {
        if (selectedItemIndex !== null) {
          const selectedEnabledIndex = enabledIndexes.indexOf(selectedItemIndex);

          if (selectedEnabledIndex >= 0) {
            const nextEnabledIndex = enabledIndexes[selectedEnabledIndex + step];

            setHighlightedItemIndex(
              nextEnabledIndex ?? (step > 0 ? enabledIndexes[0] : enabledIndexes[enabledIndexes.length - 1]),
            );
            return true;
          }
        }

        setHighlightedItemIndex(step > 0 ? enabledIndexes[0] : enabledIndexes[enabledIndexes.length - 1]);
        return true;
      }

      const currentIndex = enabledIndexes.indexOf(highlightedItemIndex);
      const nextEnabledIndex = enabledIndexes[currentIndex + step];

      setHighlightedItemIndex(
        nextEnabledIndex ?? (step > 0 ? enabledIndexes[0] : enabledIndexes[enabledIndexes.length - 1]),
      );

      return true;
    },
    [hasDropdown, highlightedItemIndex, isDropdownOpened, selectedItemIndex, items],
  );

  return {
    isDropdownOpened,
    highlightedItemIndex,
    openDropdown,
    closeDropdown,
    resetHighlightedItem,
    tryNavigateItems,
  };
};
