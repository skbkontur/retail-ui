import { ActionDetails } from '../react-imask/imask/core/action-details.js';
import { DIRECTION } from '../react-imask/imask/core/utils.js';
import type { MaskEngine } from './types.js';

/** Параметры обработки нативного `change` от `<input>`. */
export interface MaskedInputChangeParams {
  /** Черновик value, который браузер записал в input. */
  browserDraft: string;
  /** Позиция курсора после изменения. */
  cursorPos: number;
  /** Текущее typedValue из MaskState. */
  typedValue: string;
  /** Текущее raw-значение (источник истины). */
  currentRaw: string;
  /** Предыдущее выделение до изменения. */
  oldSelection: { start: number; end: number };
  /** IMask-движок. */
  engine: Pick<MaskEngine, 'imask'>;
}

/** Результат применения пользовательского ввода через IMask. */
export interface MaskedInputChangeResult {
  /** Новое raw после splice. */
  newRaw: string;
  /** Позиция курсора, которую нужно установить. */
  cursorPos: number;
  /** `true`, если символ не был принят (raw не изменился). */
  rejected: boolean;
}

const SPLICE_FLAGS = { input: true, raw: true } as const;

/**
 * Применяет пользовательский ввод к IMask через `splice` и вычисляет новый raw с позицией курсора.
 *
 * Если вставка совпала с литералом маски (`7` в `7 999`) и raw не изменился,
 * повторяет splice в ближайшем input-слоте справа.
 *
 * @param params — состояние input до/после изменения.
 * @returns новое raw, позицию курсора и флаг отклонённого ввода.
 */
export function applyMaskedInputChange(params: MaskedInputChangeParams): MaskedInputChangeResult {
  const { browserDraft, cursorPos, typedValue, currentRaw, oldSelection, engine } = params;
  const { imask } = engine;

  const details = new ActionDetails({
    value: browserDraft,
    cursorPos,
    oldValue: typedValue,
    oldSelection,
  });

  const savedState = imask.state;
  const oldRawValue = imask.unmaskedValue;
  let spliceStart = details.startChangePos;

  let spliceResult = imask.splice(
    spliceStart,
    details.removed.length,
    details.inserted,
    details.removeDirection,
    SPLICE_FLAGS,
  );

  let newRaw = imask.rawInputValue;

  // Литерал вроде ведущей `7` в `7 999` может поглотить кейстрек без изменения raw.
  // Тогда пробуем вставить тот же символ в ближайший input-слот справа.
  if (newRaw === currentRaw && details.inserted.length === 1 && details.removed.length === 0) {
    imask.state = savedState;
    const inputPos = imask.nearestInputPos(details.startChangePos, DIRECTION.RIGHT);
    if (inputPos !== details.startChangePos) {
      spliceStart = inputPos;
      spliceResult = imask.splice(inputPos, 0, details.inserted, details.removeDirection, SPLICE_FLAGS);
      newRaw = imask.rawInputValue;
    }
  }

  const removeDirection = oldRawValue === imask.unmaskedValue ? details.removeDirection : DIRECTION.NONE;

  let newCursorPos = imask.nearestInputPos(spliceStart + spliceResult.offset, removeDirection);
  if (removeDirection !== DIRECTION.NONE) {
    newCursorPos = imask.nearestInputPos(newCursorPos, DIRECTION.NONE);
  }

  return {
    newRaw,
    cursorPos: newCursorPos,
    rejected: newRaw === currentRaw,
  };
}
