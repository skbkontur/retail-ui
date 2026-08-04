import type { MaskEngine } from './types.js';

/**
 * Извлекает raw (unmasked) значение из masked или unmasked строки.
 * Принимает любой формат — IMask сам разберёт.
 *
 * @param value — значение из props или буфера обмена (masked/unmasked).
 * @param engine — движок маски с IMask-инстансом.
 * @returns строка только из пользовательских символов без литералов маски.
 */
export function extractRaw(value: string | number | null | undefined, engine: Pick<MaskEngine, 'imask'>): string {
  if (value === null || value === undefined || value === '') {
    return '';
  }
  engine.imask.value = String(value);
  return engine.imask.rawInputValue;
}
