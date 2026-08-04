import type { SlotMap } from './types.js';

/**
 * Возвращает текст для буфера обмена при copy/cut.
 * В отличие от raw, включает литералы маски из displayValue.
 *
 * @param displayValue — полное отображаемое значение маски.
 * @param start — начало выделения в displayValue.
 * @param end — конец выделения в displayValue.
 */
export function getMaskedCopyText(displayValue: string, start: number, end: number): string {
  return displayValue.slice(start, end);
}

/** Диапазон пользовательских слотов, попавших в выделение displayValue. */
export interface SelectionRawRange {
  rawStart: number;
  rawEnd: number;
}

/**
 * Находит raw-диапазон `[rawStart, rawEnd)` для выделения в displayValue.
 * Сканирует весь `[start, end)` — край на литерале маски не должен обнулять диапазон.
 *
 * @returns `null`, если в выделении нет пользовательских слотов.
 */
export function getSelectionRawRange(start: number, end: number, slotMap: SlotMap): SelectionRawRange | null {
  let rawStart = Infinity;
  let rawEnd = -1;

  for (let i = start; i < end; i++) {
    const rawPos = slotMap.maskedToRaw[i];
    if (rawPos !== null && rawPos !== undefined) {
      rawStart = Math.min(rawStart, rawPos);
      rawEnd = Math.max(rawEnd, rawPos + 1);
    }
  }

  if (rawEnd === -1) {
    return null;
  }

  return { rawStart, rawEnd };
}

/** Результат cut: новое raw и позиция курсора. */
export interface MaskedCutResult {
  newRaw: string;
  cursorPos: number;
}

/**
 * Удаляет из raw пользовательские символы, попавшие в выделение displayValue.
 *
 * @param start — начало выделения в displayValue.
 * @param end — конец выделения в displayValue.
 * @param currentRaw — текущее raw-значение.
 * @param slotMap — карта слотов маски.
 * @returns новое raw и позицию курсора после cut.
 */
export function computeMaskedCut(start: number, end: number, currentRaw: string, slotMap: SlotMap): MaskedCutResult {
  const range = getSelectionRawRange(start, end, slotMap);
  if (!range) {
    return { newRaw: currentRaw, cursorPos: start };
  }

  const newRaw = currentRaw.slice(0, range.rawStart) + currentRaw.slice(range.rawEnd);
  const cursorPos = slotMap.rawToMasked[range.rawStart] ?? start;

  return { newRaw, cursorPos };
}
