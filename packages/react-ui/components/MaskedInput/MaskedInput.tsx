import type { IMaskInputProps } from '@skbkontur/react-imask';
import React, { useContext } from 'react';
import type { Ref } from 'react';

import { ReactUIFeatureFlagsContext } from '../../lib/featureFlagsContext/index.js';
import { forwardRefAndName } from '../../lib/forwardRefAndName.js';
import type { Input, InputProps, InputType } from '../Input/index.js';
import { MaskedInputV2, type MaskedInputV2Props } from '../MaskedInputV2/index.js';
import { MaskedInputLegacy } from './MaskedInputLegacy.js';

export type MaskedInputOnBeforePasteValue = (value: string) => string;

export interface MaskedProps {
  /** Шаблон ввода, определяющий допустимые символы. */
  mask: string;

  /** Плейсхолдер, который отображается на месте ещё не введённых пользователем символов.
   * @default _ */
  maskChar?: string;

  /** Словарь правил для настройки маски, где:
   * ключ — символ для использования в маске;
   * значение — регулярка-правило.
   * @default { '9': '[0-9]', 'a': '[A-Za-z]', '*': '[A-Za-z0-9]' } */
  formatChars?: Record<string, string>;

  /** Всегда показывать символы маски, независимо от фокуса в поле.
   * @default false */
  alwaysShowMask?: boolean;

  /** Событие некорректного ввода.
   * Вторым аргументом передаётся метод вспыхивания рамки поля.
   *
   * Если обработчик не задан, то при событии рамка всегда вспыхивает.
   *
   * @param value значение поля
   * @param blink метод вспыхивания рамки поля
   */
  onUnexpectedInput?: (value: string, blink: () => void) => void;

  /**
   * Событие перед вставкой текста в поле.
   * Вызывается с аргументом value — текст из буфера.
   *
   * Обработчик должен вернуть текст — он попадёт в поле.
   *
   * При `type="tel"` и отсутствии обработчика применяется
   * `normalizeRussianPhonePaste` (только в MaskedInputV2).
   *
   * @param value значение вставки.
   */
  onBeforePasteValue?: MaskedInputOnBeforePasteValue;

  /** Убирает из value символы маски, которые пользователь не вводил.
   * @default false */
  unmask?: boolean;

  /** Раскрашивает символы маски.
   * @default true
   * @ignore */
  colored?: boolean;

  /** Задает пропсы для компонента `IMaskInput`. Необходимы для юнит-тестов
   * @ignore */
  imaskProps?: IMaskInputProps<HTMLInputElement>;
}

export type MaskInputType = Exclude<InputType, 'number' | 'date' | 'time' | 'password'>;

export const getSafeMaskInputType = (type?: InputType): MaskInputType | undefined => {
  if (!type) {
    return type;
  }

  switch (type) {
    case 'number':
    case 'date':
    case 'time':
    case 'password':
      return 'text';
    default:
      return type;
  }
};

export interface MaskedInputProps
  extends
    MaskedProps,
    Omit<
      InputProps,
      'showClearIcon' | 'mask' | 'maxLength' | 'type' | 'alwaysShowMask' | 'onUnexpectedInput' | 'maskChar'
    > {
  type?: MaskInputType;
}

/** Поле ввода, которое ограничивает формат вводимого значения по заданной маске. Такое поле облегчает пользователю ввод и снижает количество ошибок.
 *
 * По умолчанию используется исправленная реализация MaskedInputV2. Для legacy-поведения включите фичафлаг `maskedInputUseLegacyBehavior` в {@link ReactUIFeatureFlagsContext}.
 */
export const MaskedInput = forwardRefAndName(
  'MaskedInput',
  function MaskedInput(props: MaskedInputProps, ref: Ref<Input | null>) {
    const { maskedInputUseLegacyBehavior } = useContext(ReactUIFeatureFlagsContext);

    if (maskedInputUseLegacyBehavior) {
      return <MaskedInputLegacy ref={ref} {...props} />;
    }

    return <MaskedInputV2 ref={ref} __fromMaskedInputFacade {...(props as MaskedInputV2Props)} />;
  },
);
