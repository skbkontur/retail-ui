import type { SlotMap } from './types.js';

/**
 * Для позиции курсора на фиксированном символе маски ищет позицию вставки
 * после ближайшего пользовательского слота слева.
 *
 * @param maskedPos — позиция курсора в displayValue.
 * @param slotMap — карта соответствия позиций маски и raw-слотов.
 * @returns индекс в raw для вставки; `0`, если слева нет пользовательских слотов.
 */
export function findNearestRawLeft(maskedPos: number, slotMap: SlotMap): number {
  for (let i = maskedPos - 1; i >= 0; i--) {
    const raw = slotMap.maskedToRaw[i];
    if (raw !== null && raw !== undefined) {
      return raw + 1;
    }
  }
  return 0;
}
