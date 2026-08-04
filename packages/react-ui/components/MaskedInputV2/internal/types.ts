import type { MaskedPattern } from '../react-imask/imask/index.js';

export interface MaskEngine {
  compute(raw: string, focused: boolean): MaskState;
  applyPaste(currentRaw: string, rawCursorPos: number, pasted: string): PasteResult;
  slotMap: SlotMap;
  imask: MaskedPattern;
}

export interface PasteResult {
  raw: string;
  overflow: boolean;
}

export interface MaskState {
  /**
   * Значение для <input value=...>.
   * focused=true, alwaysShowMask=false: "12__" (с плейсхолдерами)
   * focused=false, alwaysShowMask=false: "12"  (lazy, без плейсхолдеров)
   * alwaysShowMask=true: "12__" всегда
   */
  displayValue: string;

  /**
   * Подстрока displayValue от начала до конца последнего введённого символа
   * (включая разделители маски внутри введённой части).
   *
   * mask="99.99", typed="12": displayValue="12.34" (нет — мы в данном примере typed="1234")
   * mask="99.99", typed="12": displayValue="12.__", typedValue="12."                                                        ^^^
   */
  typedValue: string;

  /**
   * Длина typedValue в символах.
   * typedValue="12." → typedLength=3
   */
  typedLength: number;

  /**
   * Значение для onValueChange.
   * unmask=false: imask.value ("12.")
   * unmask=true:  imask.unmaskedValue ("12")
   */
  outputValue: string;

  /**
   * Маска заполнена полностью.
   */
  isComplete: boolean;

  /**
   * Количество принятых IMask пользовательских символов.
   * raw="12345" для mask="999" → acceptedLength=3 ("123").
   */
  acceptedLength: number;
}

export interface HistoryState {
  raw: string;
  cursorPos: number;
}

export interface SlotMap {
  /**
   * Позиции пользовательских слотов в displayValue (при lazy=false, все плейсхолдеры видны).
   * mask="99.99" → userSlots=[0, 1, 3, 4]
   *               displayValue="_._._" (пустое поле, alwaysShowMask)
   */
  userSlots: number[];

  /**
   * maskedToRaw[maskedPos] → rawPos | null
   * null означает: позиция принадлежит фиксированному символу маски.
   *
   * mask="99.99": displayValue="_._._"
   * maskedToRaw = [0, 1, null, 2, 3]
   */
  maskedToRaw: Array<number | null>;

  /**
   * rawToMasked[rawPos] → maskedPos
   * Обратный maskedToRaw, только для пользовательских позиций.
   * mask="99.99": rawToMasked = [0, 1, 3, 4]
   */
  rawToMasked: number[];
}
