import type { RefObject } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import warning from 'warning';

import type { TimeFormat } from '../../components/TimePicker/helpers/TimePicker.shared.js';
import {
  getExternalTimeDisplayValue,
  normalizeTimeValue,
  serializeTimeValue,
} from '../../components/TimePicker/helpers/TimePicker.value.js';

interface UseTimePickerValueOptions {
  isInputFocused: boolean;
  /** Внешнее значение, приведенное к строке времени. */
  externalValue: string;
  /**
   * Значением управляет родитель: проп `value` задан.
   * Если проп не задан, компонент неконтролируемый и хранит значение сам,
   * поэтому внешнее пустое значение не должно затирать введенное пользователем.
   */
  isValueControlled: boolean;
  format: TimeFormat;
  /** Вызывается при коммите значения: получает нормализованное время. */
  onCommitValue?(value: string): void;
  onInputValueChange?(value: string): void;
}

interface UseTimePickerValueResult {
  editingValue: string;
  editingValueRef: RefObject<string>;
  /**
   * Последнее закоммиченное время в нормализованной форме.
   * Правка значения его не меняет, поэтому в меню отмечено выбранным именно значение поля,
   * а не время, которое пользователь набирает.
   */
  committedValue: string;
  updateEditingValue(value: string): void;
  commitEditingValue(): void;
  /** Коммитит значение, введенное пользователем. Не эмитит повторно то же самое время. */
  commitValue(value: string): void;
  /** Коммитит время, выбранное в выпадающем меню. Эмитит всегда, так как это явное действие пользователя. */
  commitSelectedValue(value: string): void;
}

export const useTimePickerValue = (options: UseTimePickerValueOptions): UseTimePickerValueResult => {
  const { externalValue, isValueControlled, format, isInputFocused, onCommitValue, onInputValueChange } = options;

  const externalEditingValue = getExternalTimeDisplayValue(externalValue, format);

  const [editingValue, setEditingValueState] = useState<string>(externalEditingValue);
  const [committedValue, setCommittedValue] = useState<string>(() => normalizeTimeValue(externalValue, format));

  const editingValueRef = useRef(editingValue);
  /** Последнее значение, отданное в `onInputValueChange`, — как есть, без нормализации. */
  const emittedInputValueRef = useRef(externalValue);
  /**
   * Последнее закоммиченное время в нормализованной форме.
   * Форма именно нормализованная, иначе внешнее `9:00` или `09:00:00` в формате `HH:mm`
   * выглядело бы как изменение и поле коммитило бы его заново, собирая элемент вместо исходного.
   */
  const emittedValueRef = useRef(externalValue);

  const syncEmittedValues = useCallback(
    (nextValue: string) => {
      emittedInputValueRef.current = nextValue;
      emittedValueRef.current = normalizeTimeValue(nextValue, format);
    },
    [format],
  );

  const setEditingValue = useCallback((nextEditingValue: string) => {
    editingValueRef.current = nextEditingValue;
    setEditingValueState(nextEditingValue);
  }, []);

  const emitInputValue = useCallback(
    (nextValue: string) => {
      if (emittedInputValueRef.current !== nextValue) {
        emittedInputValueRef.current = nextValue;
        onInputValueChange?.(nextValue);
      }
    },
    [onInputValueChange],
  );

  const emitValue = useCallback(
    (nextValue: string) => {
      emittedInputValueRef.current = nextValue;
      emittedValueRef.current = nextValue;
      onCommitValue?.(nextValue);
    },
    [onCommitValue],
  );

  const updateEditingValue = useCallback(
    (nextEditingValue: string) => {
      setEditingValue(nextEditingValue);
      emitInputValue(serializeTimeValue(nextEditingValue, format));
    },
    [emitInputValue, format, setEditingValue],
  );

  const commitValue = useCallback(
    (nextValue: string) => {
      const normalizedValue = normalizeTimeValue(nextValue, format);

      setEditingValue(normalizedValue);
      setCommittedValue(normalizedValue);

      if (emittedValueRef.current !== normalizedValue) {
        emitValue(normalizedValue);
      }
    },
    [emitValue, format, setEditingValue],
  );

  const commitSelectedValue = useCallback(
    (nextValue: string) => {
      const normalizedValue = normalizeTimeValue(nextValue, format);

      setEditingValue(normalizedValue);
      setCommittedValue(normalizedValue);
      emitValue(normalizedValue);
    },
    [emitValue, format, setEditingValue],
  );

  const commitEditingValue = useCallback(() => {
    commitValue(editingValueRef.current);
  }, [commitValue, editingValueRef]);

  const initialIsValueControlledRef = useRef(isValueControlled);

  useEffect(() => {
    warning(
      initialIsValueControlledRef.current === isValueControlled,
      isValueControlled
        ? '[TimePicker]: a component is changing an uncontrolled value to be controlled. ' +
            'Decide between using a controlled or uncontrolled value for the lifetime of the component.'
        : '[TimePicker]: a component is changing a controlled value to be uncontrolled. ' +
            'Pass an empty string or null instead of undefined to keep the value controlled.',
    );
  }, [isValueControlled]);

  useEffect(() => {
    if (!isValueControlled) {
      return;
    }

    if (!isInputFocused || externalValue !== emittedInputValueRef.current) {
      setEditingValue(externalEditingValue);
    }

    setCommittedValue(normalizeTimeValue(externalValue, format));
    syncEmittedValues(externalValue);
  }, [
    externalEditingValue,
    externalValue,
    format,
    isInputFocused,
    isValueControlled,
    setEditingValue,
    syncEmittedValues,
  ]);

  return {
    editingValue,
    editingValueRef,
    committedValue,
    updateEditingValue,
    commitEditingValue,
    commitValue,
    commitSelectedValue,
  };
};
