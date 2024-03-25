import React from 'react';
import IMask, { FactoryArg, Definitions, PatternFixedDefinition } from 'imask';

import { isNonNullable } from '../../lib/utils';
import { MaskedShadows } from '../../internal/MaskedInputElement/MaskedInputElement';

import { IMaskRefType, MaskedInputProps } from './index';

export type AnyIMaskType = ReturnType<typeof IMask.createMask>;

export const DEFAULT_MASK_CHAR = '_';
export const DEFINITIONS = Object.freeze({ '9': /[0-9]/, a: /[A-Za-z]/, '*': /[A-Za-z0-9]/ });

export function getDefinitions(formatChars: Record<string, string> | undefined): Definitions {
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

export function getCompatibleIMaskProps(props: MaskedInputProps): ThisType<FactoryArg> {
  return {
    mask: props.mask,
    placeholderChar: getMaskChar(props.maskChar),
    definitions: getDefinitions(props.formatChars),
    eager: 'append',
    overwrite: 'shift',
  };
}

export function getMasked(imaskRef: React.RefObject<IMaskRefType>, props: MaskedInputProps = {}) {
  // На основе текущих настроек IMask создаём другой экземпляр IMask, но с полем `lazy: false`
  const masked = IMask.createMask({
    ...getCompatibleIMaskProps(props),
    ...props.imaskProps,
    // Это поле генерирует все фиксированные символы маски
    lazy: false,
  });

  const uncontrolledValue = imaskRef.current?.element.value;

  // createMask принимает только поля настроек
  // value надо явно зарезолвить
  masked.resolve(props.value || uncontrolledValue || '');

  return masked;
}

/**
 * Получить введенное значение и оставшуюся часть маски
 */
export function getMaskedShadows(masked: AnyIMaskType): MaskedShadows {
  // В рамках этого хелпера обозначим следующие понятия:
  // pattern - это правила, заданные разработчиком. Исторически называется mask
  // placeholder - это заполнитель паттерна, демонстрирующий пользователю ограничения ввода
  // value - это значение, вводимое пользователем. Оно может содержать фиксированные символы из паттерна

  // Допустим, что pattern был "+7 (999) 999 99 99", а value "123"

  // "+7 (123) ___ __ __"
  const filledPlaceholder = masked.value;

  // "+7 (123"
  const filledValue = masked._value;

  // ") ___ __ __"
  const restPlaceholder = filledPlaceholder.slice(filledValue.length);

  return [filledValue, restPlaceholder];
}

export function getFixedPartValue(masked: AnyIMaskType): string {
  if (!(masked instanceof IMask.MaskedPattern)) {
    return '';
  }

  // IMask разбивает маску на массив объектов, где можно найти фиксированные части
  const index = masked._blocks.findIndex((symbol) => !(symbol instanceof PatternFixedDefinition));

  // Найдя первый не фиксированный символ, мы отрезаем начало строки
  return masked.value.slice(0, index);
}
