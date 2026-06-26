import type { RefObject } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { EMPTY_VALUE } from '../helpers/TimePicker.constants.js';
import type { TimeFormat } from '../helpers/TimePicker.shared.js';
import {
  getTimeDisplayValue,
  isTimeDisplayEmpty,
  normalizeTimeValue,
  serializeTimeValue,
} from '../helpers/TimePicker.value.js';

interface UseTimePickerValueOptions {
  isInputFocused: boolean;
  value?: string;
  format: TimeFormat;
  onValueChange?(value: string): void;
}

interface UseTimePickerValueResult {
  editingValue: string;
  editingValueRef: RefObject<string>;
  setEditingValue(value: string): void;
  updateEditingValue(value: string): void;
  commitEditingValue(): string;
  clearEditingValue(): void;
}

export const useTimePickerValue = (options: UseTimePickerValueOptions): UseTimePickerValueResult => {
  const { value, format, isInputFocused, onValueChange } = options;

  const externalValue = value ?? EMPTY_VALUE;
  const externalEditingValue = getTimeDisplayValue(externalValue, format);

  const [editingValue, setEditingValueState] = useState<string>(externalEditingValue);

  const editingValueRef = useRef(editingValue);
  const emittedValueRef = useRef(externalValue);

  const setEditingValue = useCallback((nextEditingValue: string) => {
    editingValueRef.current = nextEditingValue;
    setEditingValueState(nextEditingValue);
  }, []);

  const emitValue = useCallback(
    (nextValue: string) => {
      if (emittedValueRef.current !== nextValue) {
        emittedValueRef.current = nextValue;
        onValueChange?.(nextValue);
      }
    },
    [onValueChange],
  );

  const updateEditingValue = useCallback(
    (nextEditingValue: string) => {
      setEditingValue(nextEditingValue);
      emitValue(serializeTimeValue(nextEditingValue, format));
    },
    [emitValue, format, setEditingValue],
  );

  const clearEditingValue = useCallback(() => {
    setEditingValue(EMPTY_VALUE);
  }, [setEditingValue]);

  const commitEditingValue = useCallback((): string => {
    const currentEditingValue = editingValueRef.current;

    if (isTimeDisplayEmpty(currentEditingValue)) {
      clearEditingValue();
      return EMPTY_VALUE;
    }

    const nextValue = normalizeTimeValue(currentEditingValue, format);

    setEditingValue(nextValue);
    emitValue(nextValue);

    return nextValue;
  }, [clearEditingValue, editingValueRef, emitValue, format, setEditingValue]);

  useEffect(() => {
    if (!isInputFocused) {
      setEditingValue(externalEditingValue);
    } else if (externalValue !== emittedValueRef.current) {
      setEditingValue(externalEditingValue);
    }
  }, [externalEditingValue, externalValue, isInputFocused, setEditingValue]);

  useEffect(() => {
    emittedValueRef.current = externalValue;
  }, [externalValue]);

  return {
    editingValue,
    editingValueRef,
    setEditingValue,
    updateEditingValue,
    commitEditingValue,
    clearEditingValue,
  };
};
