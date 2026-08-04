/**
 * Пресеты часто используемых масок для {@link MaskedInputV2} / {@link MaskedInput}.
 *
 * Российский телефон по [гайду](https://guides.kontur.ru/components/input-fields/phone/):
 * префикс `+7` всегда виден и не стирается, остальные символы маски — только в фокусе.
 *
 * @example
 * ```tsx
 * <MaskedInput
 *   type="tel"
 *   autoComplete="tel"
 *   mask={MaskedInputMasks.PhoneRU}
 *   placeholder="+7"
 * />
 * ```
 */
export const MaskedInputMasks = {
  PhoneRU: '+7 999 999-99-99',
} as const;

/**
 * Нормализует вставку российского номера телефона:
 * убирает нецифровые символы и снимает ведущие `7`/`8`, пока цифр больше 10
 * (национальный номер). Нужно снимать несколько раз: при вставке в поле с `+7`
 * часто приходит `+7 8 912…` → `7891…`.
 *
 * Используется по умолчанию при `type="tel"`, если не задан `onBeforePasteValue`.
 */
export function normalizeRussianPhonePaste(value: string): string {
  let digits = value.replace(/\D/g, '');

  if (!digits) {
    return value;
  }

  while (digits.length > 10 && (digits[0] === '7' || digits[0] === '8')) {
    digits = digits.slice(1);
  }

  return digits;
}
