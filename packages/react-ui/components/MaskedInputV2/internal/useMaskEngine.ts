import { useMemo } from 'react';

import { getDefinitions, getMaskChar } from '../MaskedInputV2.helpers.js';
import type { MaskedPattern, MaskedPatternOptions } from '../react-imask/imask/index.js';
import { createMask } from '../react-imask/imask/masked/create.js';
import type { IMaskInputProps } from '../react-imask/index.js';
import { buildSlotMap, extractRaw } from './helpers.js';
import type { MaskState, SlotMap } from './types.js';

export interface MaskEngine {
  /**
   * Применить raw-ввод, получить MaskState.
   * Чистая функция (без побочных эффектов на внешний стейт).
   */
  compute(raw: string, focused: boolean): MaskState;

  /**
   * Применить вставку с учётом текущего курсора.
   * Возвращает новый raw и флаг переполнения.
   */
  applyPaste(currentRaw: string, rawCursorPos: number, pasted: string): PasteResult;

  /** Карта слотов. Пересчитывается только при смене маски. */
  slotMap: SlotMap;

  /** Доступ к IMask-инстансу для edge cases (imaskProps escape hatch). */
  imask: MaskedPattern;
}

interface PasteResult {
  raw: string;
  overflow: boolean;
}

export type MaskEager = NonNullable<MaskedPatternOptions['eager']>;

const IMASK_DEFAULT_PATTERN_TOKENS = new Set(['a', '*']);

/**
 * В IMask `a`, `*` и `0` имеют встроенные определения. В API MaskedInput
 * `formatChars` — полный словарь токенов, поэтому незаданные в нём встроенные
 * токены должны оставаться литералами маски.
 *
 * Кастомные definitions из imaskProps — escape hatch, поэтому они также
 * сохраняют символ токеном.
 *
 * `0` всегда был литералом в MaskedInput и обрабатывается отдельно ниже.
 */
function normalizeMask(
  mask: string,
  formatChars: Record<string, string> | undefined,
  imaskDefinitions: Record<string, unknown> | undefined,
): string {
  if (!formatChars) {
    return mask.replace(/0/g, '{\\0}');
  }

  const definitionTokens = new Set([...Object.keys(formatChars), ...Object.keys(imaskDefinitions ?? {})]);
  let normalizedMask = '';
  for (let index = 0; index < mask.length; index++) {
    const char = mask[index];

    // Не экранируем символ, уже экранированный пользователем.
    if (char === '\\') {
      normalizedMask += char + (mask[index + 1] ?? '');
      index++;
      continue;
    }

    if (IMASK_DEFAULT_PATTERN_TOKENS.has(char) && !definitionTokens.has(char)) {
      normalizedMask += `\\${char}`;
      continue;
    }

    normalizedMask += char;
  }

  return normalizedMask.replace(/0/g, '{\\0}');
}

/** Пропсы хука {@link useMaskEngine}. */
interface UseMaskEngineProps {
  mask: string;
  maskChar?: string;
  formatChars?: Record<string, string>;
  unmask: boolean;
  alwaysShowMask: boolean;
  imaskProps?: IMaskInputProps<HTMLInputElement>;
}

/**
 * Создаёт headless IMask-движок для MaskedInputV2.
 * IMask используется как калькулятор состояния, без привязки к DOM.
 *
 * @param props — настройки маски и поведения отображения.
 * @returns объект {@link MaskEngine} с методами `compute`, `applyPaste`, `slotMap` и `imask`.
 */
export function useMaskEngine(props: UseMaskEngineProps): MaskEngine {
  const mask = props.mask ?? '';
  const { definitions: imaskDefinitions, eager } = props.imaskProps ?? {};
  const normalizedMask = normalizeMask(mask, props.formatChars, imaskDefinitions);
  const imask = useMemo(
    () =>
      createMask({
        mask: normalizedMask as any,
        placeholderChar: getMaskChar(props.maskChar),
        definitions: getDefinitions(props.formatChars),
        eager: eager ?? 'append',
        overwrite: 'shift',
        lazy: true,
        ...(props.imaskProps as object),
      }) as unknown as MaskedPattern,
    [normalizedMask, props.imaskProps, props.maskChar, eager, JSON.stringify(props.formatChars)],
  );

  // SlotMap пересчитывается при смене маски
  const slotMap = useMemo(() => buildSlotMap(imask), [imask]);

  function compute(raw: string, focused: boolean): MaskState {
    const lazy = !props.alwaysShowMask && !focused;
    const eagerAppend = imask.eager === 'append' || imask.eager === true;

    // raw — только пользовательские слоты. resolve({ input: true }) съел бы цифру,
    // совпадающую с литералом маски (`7` в `7 999` / первая `7` после `+7`).
    imask.updateOptions({ lazy: true });
    imask.rawInputValue = raw;
    // raw-флаг не триггерит eager trailing (это делал flags.input) — добираем вручную.
    if (eagerAppend && raw) {
      imask._appendEager();
    }
    if (focused && !raw && eagerAppend) {
      imask._appendEager();
    }
    const lazyValue = imask.value;

    let displayValue = lazyValue;
    let typedValue = lazyValue;

    if (!lazy) {
      imask.updateOptions({ lazy: false });
      imask.rawInputValue = raw;
      if (eagerAppend && raw) {
        imask._appendEager();
      }
      displayValue = imask.displayValue;
    }

    const unmaskedValue = raw === '' ? '' : imask.unmaskedValue;
    const maskedValue = raw === '' ? '' : lazyValue;
    return {
      displayValue,
      typedValue,
      typedLength: typedValue.length,
      outputValue: props.unmask ? unmaskedValue : maskedValue,
      isComplete: imask.isComplete,
      acceptedLength: imask.unmaskedValue.length,
    };
  }

  function applyPaste(currentRaw: string, rawCursorPos: number, pasted: string): PasteResult {
    const before = currentRaw.slice(0, rawCursorPos);
    const after = currentRaw.slice(rawCursorPos);

    // Уже «сырые» цифры (в т.ч. после normalizeRussianPhonePaste) нельзя прогонять через
    // extractRaw/.value (input:true): ведущая 7 съестся литералом `+7` / `7 …`.
    const pastedRaw = /^\d+$/.test(pasted) ? pasted : extractRaw(pasted, { imask });
    const candidate = before + pastedRaw + after;

    imask.rawInputValue = candidate;
    const accepted = imask.rawInputValue;

    return {
      raw: accepted,
      overflow: accepted.length < candidate.length,
    };
  }

  return { compute, applyPaste, slotMap, imask };
}
