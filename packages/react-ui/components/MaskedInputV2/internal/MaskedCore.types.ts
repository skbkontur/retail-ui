import type React from 'react';

import type { InputElement } from '../../Input/Input.typings.js';
import type { MaskEngine, MaskState, SlotMap } from './types.js';

export type MaskedSelectionIntent = 'caret-end' | 'select-all' | null;

/**
 * Пропсы headless-слоя {@link MaskedCore}: прозрачный `<input>` + overlay маски.
 */
export interface MaskedCoreProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'defaultValue'
> {
  /** Вычисленное состояние маски для отображения. */
  maskState: MaskState;
  /** Карта слотов для clipboard/delete/navigation. */
  slotMap: SlotMap;
  /** Headless IMask-движок. */
  engine: MaskEngine;
  /** Поле в фокусе — влияет на lazy-режим displayValue. */
  focused: boolean;
  /** Текущее raw-значение (источник истины). */
  currentRaw: string;
  /** Колбэк изменения raw от пользовательского ввода или paste. */
  onRawChange: (newRaw: string, source: 'input' | 'paste', cursorPos?: number) => void;
  /** Колбэк отклонённого ввода (невалидный символ или граничное удаление). */
  onUnexpectedInput: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  /** Ref на нативный `<input>` внутри MaskedCore. */
  coreInputRef: React.RefObject<HTMLInputElement | null>;
  /** Раскрашивать ли символы маски в overlay. @default true */
  colored?: boolean;
  /** Не сбрасывать каретку на mouseup — нужно для selectAllOnFocus. */
  selectAllOnFocus?: boolean;
  /** Намерение выставить каретку или выделение после актуализации maskState. */
  selectionIntent?: MaskedSelectionIntent;
  /** Запрашивает новое намерение выставить каретку или выделение. */
  onSelectionIntentChange?: (intent: MaskedSelectionIntent) => void;
}

/** Ref, который MaskedCore пробрасывает наружу для совместимости с Input.refInput. */
export type MaskedCoreRef = InputElement | null;
