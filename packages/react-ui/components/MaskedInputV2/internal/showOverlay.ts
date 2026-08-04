import type { MaskState } from './types.js';

export function hasMaskPart(maskState: MaskState): boolean {
  return maskState.displayValue.length > maskState.typedValue.length;
}

export function getShowOverlay(maskState: MaskState, focused: boolean, overflows = false): boolean {
  if (overflows) {
    // При переполнении скрываем overlay только для полностью введённого значения:
    // иначе overlay не совпадает с прокруткой input. Декоративная часть маски
    // (плейсхолдеры) всегда рисуется через overlay, а не через value input.
    return hasMaskPart(maskState);
  }

  // Полностью введённое значение (без декоративной части маски) рисуем нативным
  // текстом input — иначе overlay с overflow:hidden обрезает конец при горизонтальном скролле.
  return hasMaskPart(maskState);
}
