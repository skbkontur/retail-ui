import type { SlotMap } from './types.js';

/** Параметры удаления через Backspace/Delete. */
export interface MaskedDeletionParams {
  /** `true` для Backspace, `false` для Delete. */
  isBackspace: boolean;
  /** Начало выделения в displayValue. */
  selStart: number;
  /** Конец выделения в displayValue. */
  selEnd: number;
  /** Текущее raw-значение. */
  currentRaw: string;
  /** Карта слотов маски. */
  slotMap: SlotMap;
}

/** Успешный результат удаления символов маски. */
export interface MaskedDeletionResult {
  /** Raw после удаления. */
  newRaw: string;
  /** Позиция курсора в displayValue после удаления. */
  cursorPos: number;
}

/**
 * Вычисляет raw и позицию курсора после Backspace/Delete с учётом фиксированных символов маски.
 *
 * @param params — текущее выделение и состояние маски.
 * @returns новое raw и cursorPos или `null`, если удалять нечего.
 */
export function computeMaskedDeletion(params: MaskedDeletionParams): MaskedDeletionResult | null {
  const { isBackspace, selStart, selEnd, currentRaw, slotMap } = params;

  let rawStart: number;
  let rawEnd: number;
  let cursorPos: number;

  if (selStart === selEnd) {
    if (isBackspace) {
      let rawPos = -1;
      for (let i = selStart - 1; i >= 0; i--) {
        const r = slotMap.maskedToRaw[i];
        if (r !== null && r !== undefined) {
          rawPos = r;
          break;
        }
      }
      if (rawPos === -1 || rawPos >= currentRaw.length) {
        return null;
      }
      rawStart = rawPos;
      rawEnd = rawPos + 1;
      cursorPos = slotMap.rawToMasked[rawPos] ?? 0;
    } else {
      let rawPos = -1;
      for (let i = selStart; i < slotMap.maskedToRaw.length; i++) {
        const r = slotMap.maskedToRaw[i];
        if (r !== null && r !== undefined) {
          rawPos = r;
          break;
        }
      }
      if (rawPos === -1 || rawPos >= currentRaw.length) {
        return null;
      }
      rawStart = rawPos;
      rawEnd = rawPos + 1;
      cursorPos = slotMap.rawToMasked[rawPos] ?? 0;
    }
  } else {
    let rStart = Infinity;
    let rEnd = -1;
    for (let i = selStart; i < selEnd; i++) {
      const r = slotMap.maskedToRaw[i];
      if (r !== null && r !== undefined) {
        rStart = Math.min(rStart, r);
        rEnd = Math.max(rEnd, r + 1);
      }
    }
    if (rEnd === -1) {
      return null;
    }
    rawStart = rStart;
    rawEnd = rEnd;
    cursorPos = slotMap.rawToMasked[rawStart] ?? selStart;
  }

  const newRaw = currentRaw.slice(0, rawStart) + currentRaw.slice(rawEnd);
  if (newRaw === currentRaw) {
    return null;
  }

  return { newRaw, cursorPos };
}
