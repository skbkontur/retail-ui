import React from 'react';
import IMask, { InputMask, MaskedPatternOptions } from 'imask';

import { isNonNullable } from '../../lib/utils';
import { MaskedInputProps } from '../../components/MaskedInput';

import { MaskedShadows } from './MaskedInputElement';

export const DEFAULT_MASK_CHAR = '_';
export const DEFINITIONS = { '9': /[0-9]/, a: /[A-Za-z]/, '*': /[A-Za-z0-9]/ };

export function getDefinitions(formatChars: Record<string, string> | undefined): Record<string, RegExp> {
  if (isNonNullable(formatChars)) {
    const chars: Record<string, RegExp> = {};

    for (const key in formatChars) {
      chars[key] = new RegExp(formatChars[key]);
    }

    return chars;
  }

  return DEFINITIONS;
}

export function getMaskChar(maskChar: string | null | undefined): string {
  if (maskChar === null) {
    return '';
  }

  return maskChar === undefined ? DEFAULT_MASK_CHAR : maskChar;
}

export function convertMaskedPropsToIMaskProps(props: MaskedInputProps): MaskedPatternOptions {
  return {
    placeholderChar: getMaskChar(props.maskChar),
    definitions: getDefinitions(props.formatChars),
    eager: true,
    overwrite: 'shift',
  };
}

export function getMaskedPattern(
  maskRef: React.RefObject<{ maskRef: InputMask }>,
): ReturnType<typeof IMask.createMask> | null {
  if (!maskRef.current?.maskRef) {
    return null;
  }

  // На основе текущих настроек IMask создаём другой экземпляр IMask, но с полем `lazy: false`
  // Это поле показывает все доступные символы маски в зависимости от настроек
  const maskedPattern = IMask.createMask({
    ...maskRef.current.maskRef.masked,
    lazy: false,
  });

  // createMask принимает только поля настроек
  // value надо явно зарезолвить
  maskedPattern.resolve(maskRef.current.maskRef.masked._value);

  return maskedPattern;
}

/**
 * Получить введенное значение и оставшуюся часть маски
 */
export function getMaskedShadows(maskedPattern: ReturnType<typeof IMask.createMask> | null): MaskedShadows {
  if (!maskedPattern) {
    return ['', ''];
  }

  // В рамках этого хелпера обозначим следующие понятия:
  // pattern - это правила, заданные разработчиком. Исторически называется mask
  // placeholder - это заполнитель паттерна, демонстрирующий пользователю ограничения ввода
  // value - это значение, вводимое пользователем. Оно может содержать фиксированные символы из паттерна, или быть "чистым"

  // Допустим, что pattern был "+7 (999) 999 99 99", а value "123"

  // "+7 (123"
  const filledValue = maskedPattern._value;

  // "+7 (123) ___ __ __"
  const filledPlaceholder = maskedPattern.value;

  // ") ___ __ __"
  const restPlaceholder = filledPlaceholder.slice(filledValue.length);

  return [filledValue, restPlaceholder];
}
