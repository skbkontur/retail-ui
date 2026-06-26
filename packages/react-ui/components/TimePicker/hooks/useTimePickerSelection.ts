import { useCallback, useLayoutEffect, useState } from 'react';

import type { TimeInputRef } from '../../../internal/TimeInput/index.js';
import type { TimeFormat, TimeSegment } from '../helpers/TimePicker.shared.js';

type TimePickerSelection = TimeSegment | 'all';

interface UseTimePickerSelectionOptions {
  isInputFocused: boolean;
  format: TimeFormat;
  getInput: () => TimeInputRef | null;
  displayValue: string;
}
interface UseTimePickerSelectionResult {
  selection: TimePickerSelection;
  selectedSegment: TimeSegment;
  selectSegment: (segment: TimeSegment) => void;
  selectAll: () => void;
  syncSelectionWithDOM: () => boolean;
}
export const useTimePickerSelection = (options: UseTimePickerSelectionOptions): UseTimePickerSelectionResult => {
  const { isInputFocused, format, displayValue, getInput } = options;

  const [selection, setSelectionState] = useState<TimePickerSelection>('hours');

  const selectedSegment = selection === 'all' ? 'hours' : selection;

  const applySelectionToInput = useCallback(
    (nextSelection: TimePickerSelection) => {
      const currentInput = getInput();

      if (!currentInput) {
        return;
      }

      const node = currentInput.getNode();
      const isInputActive = node?.ownerDocument.activeElement === node;

      const applySelection = (input: TimeInputRef) => {
        if (nextSelection === 'all') {
          input.selectAll();
          return;
        }

        input.selectSegment(nextSelection);
      };

      if (isInputActive) {
        applySelection(currentInput);
        return;
      }

      setTimeout(() => {
        const nextInput = getInput();

        if (!nextInput) {
          return;
        }

        nextInput.focus();
        applySelection(nextInput);
      }, 0);
    },
    [getInput],
  );

  const selectSegment = useCallback(
    (segment: TimeSegment) => {
      if (segment === 'seconds' && format === 'HH:mm') {
        return;
      }

      setSelectionState(segment);
      applySelectionToInput(segment);
    },
    [applySelectionToInput, format],
  );

  const selectAll = useCallback(() => {
    setSelectionState('all');
    applySelectionToInput('all');
  }, [applySelectionToInput]);

  const syncSelectionWithDOM = useCallback(() => {
    if (!getInput()?.isAllSelected()) {
      return false;
    }

    setSelectionState('all');
    return true;
  }, [getInput]);

  useLayoutEffect(() => {
    if (!isInputFocused || !getInput()) {
      return;
    }

    applySelectionToInput(selection);
  }, [applySelectionToInput, displayValue, getInput, isInputFocused, selection]);

  return {
    selection,
    selectedSegment,
    selectSegment,
    selectAll,
    syncSelectionWithDOM,
  };
};
