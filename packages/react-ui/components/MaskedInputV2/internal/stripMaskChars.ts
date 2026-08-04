import type { SlotMap } from './types.js';

/**
 * Из выделенного диапазона displayValue убирает фиксированные символы маски,
 * оставляя только пользовательские символы.
 *
 * @param selected — подстрока displayValue.
 * @param slotMap — карта соответствия позиций маски и raw-слотов.
 * @param startOffset — позиция начала выделения в displayValue.
 * @returns строка без литералов маски.
 */
export function stripMaskChars(selected: string, slotMap: SlotMap, startOffset: number): string {
  let result = '';
  for (let i = 0; i < selected.length; i++) {
    const maskedPos = startOffset + i;
    if (slotMap.maskedToRaw[maskedPos] !== null && slotMap.maskedToRaw[maskedPos] !== undefined) {
      result += selected[i];
    }
  }
  return result;
}
