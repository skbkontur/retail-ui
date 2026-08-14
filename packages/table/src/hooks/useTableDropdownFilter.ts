import type { Input } from '@skbkontur/react-ui/components/Input';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export interface UseTableDropdownFilterOptions {
  options: string[];
  selectedOptions: string[];
  onSelect: (options: string[]) => void;
  withoutSearch: boolean;
}

export function useTableDropdownFilter({
  options,
  selectedOptions,
  onSelect,
  withoutSearch,
}: UseTableDropdownFilterOptions) {
  const normalizedSelected = useMemo(() => (Array.isArray(selectedOptions) ? selectedOptions : []), [selectedOptions]);

  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef<Input>(null);

  // Источник правды для рендера — проп selectedOptions. Реф нужен лишь для
  // накопления нескольких переключений в рамках одного батча обновлений,
  // пока родитель ещё не перерисовался.
  const selectedRef = useRef(normalizedSelected);
  useEffect(() => {
    selectedRef.current = normalizedSelected;
  }, [normalizedSelected]);

  const handleOpen = useCallback(() => {
    setTimeout(() => searchInputRef.current?.focus(), 0);
  }, []);

  useEffect(() => {
    if (withoutSearch && searchTerm) {
      setSearchTerm('');
    }
  }, [withoutSearch, searchTerm]);

  const filteredOptions = useMemo(() => {
    if (withoutSearch) {
      return options;
    }

    return options.filter((option) => option.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [options, searchTerm, withoutSearch]);

  const toggle = useCallback(
    (item: string) => {
      const newSelected = new Set(selectedRef.current);

      if (newSelected.has(item)) {
        newSelected.delete(item);
      } else {
        newSelected.add(item);
      }

      const result = Array.from(newSelected);
      selectedRef.current = result;
      onSelect(result);
    },
    [onSelect],
  );

  return {
    selectedOptions: normalizedSelected,
    searchTerm,
    setSearchTerm,
    searchInputRef,
    handleOpen,
    filteredOptions,
    toggle,
  };
}
