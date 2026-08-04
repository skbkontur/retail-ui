import type { MaskedPattern } from '../react-imask/imask/index.js';
import type { SlotMap } from './types.js';

/**
 * Строит карту соответствия позиций displayValue и raw-слотов для текущей маски.
 * Временно сбрасывает IMask в пустое состояние с `lazy: false`, чтобы получить
 * полный шаблон с плейсхолдерами (например, `"__.__"` для `mask="99.99"`).
 *
 * @param imask — IMask-инстанс с настроенной маской.
 * @returns карта пользовательских слотов и отображения masked ↔ raw.
 */
export function buildSlotMap(imask: MaskedPattern): SlotMap {
  // Сохраняем состояние
  const savedRaw = imask.unmaskedValue;
  const savedLazy = (imask as any)._masked?.options?.lazy ?? true;

  // Получаем пустой шаблон: "_._._" для mask="99.99"
  imask.unmaskedValue = '';
  imask.updateOptions({ lazy: false });
  const emptyDisplay = imask.displayValue;

  // Восстанавливаем состояние
  imask.unmaskedValue = savedRaw;
  imask.updateOptions({ lazy: savedLazy });

  const placeholderChar = imask.placeholderChar;
  const userSlots: number[] = [];
  const maskedToRaw: Array<number | null> = [];
  const rawToMasked: number[] = [];

  for (let i = 0; i < emptyDisplay.length; i++) {
    if (emptyDisplay[i] === placeholderChar) {
      rawToMasked.push(i);
      maskedToRaw.push(userSlots.length);
      userSlots.push(i);
    } else {
      maskedToRaw.push(null);
    }
  }

  return { userSlots, maskedToRaw, rawToMasked };
}
