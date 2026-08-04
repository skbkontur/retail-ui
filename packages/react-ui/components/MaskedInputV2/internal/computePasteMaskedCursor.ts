import type { SlotMap } from './types.js';

/** Masked-позиция каретки после вставки в rawCursorPos. */
export function computePasteMaskedCursor(
  rawBefore: string,
  rawAfter: string,
  resultRaw: string,
  rawCursorPos: number,
  slotMap: SlotMap,
  typedLength: number,
): number {
  const insertedRawLength = resultRaw.length - rawBefore.length - rawAfter.length;
  const newRawCursorPos = rawCursorPos + Math.max(0, insertedRawLength);

  if (newRawCursorPos >= slotMap.rawToMasked.length) {
    return typedLength;
  }

  return slotMap.rawToMasked[newRawCursorPos] ?? typedLength;
}
