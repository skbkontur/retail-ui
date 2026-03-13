export type InputSelectionDirection = 'forward' | 'backward' | 'none';

export interface InputSelection {
  start: number;
  end: number;
  direction: InputSelectionDirection;
}

/** Отступ в символах от края видимой области, чтобы каретка не прилипала к границе */
const PADDING = 1;
const SHIFT = 3;

/**
 * Прокручивает input по горизонтали так, чтобы каретка (или голова выделения) оставалась в видимой области.
 * Использует приближение средней ширины символа (scrollWidth / length).
 *
 * @param input — элемент input
 * @param selection — опционально: выделение { start, end, direction }. Если не передано, читается из input.
 */
export function scrollInputCaretIntoView(input: HTMLInputElement, selection?: InputSelection): void {
  if (input.scrollWidth <= input.clientWidth) {
    return;
  }

  const maxScroll = input.scrollWidth - input.clientWidth;

  const start = selection?.start ?? input.selectionStart ?? 0;
  const end = selection?.end ?? input.selectionEnd ?? 0;
  const direction = (selection?.direction ?? input.selectionDirection ?? 'none') as InputSelectionDirection;

  const selected = start !== end;
  const position = selected && direction === 'forward' ? end : start;

  const value = input.value;
  const charsCount = value.length;
  if (charsCount === 0) {
    return;
  }

  const charWidth = input.scrollWidth / charsCount;
  const frame = Math.ceil(input.clientWidth / charWidth);
  const frameStart = Math.ceil(input.scrollLeft / charWidth);
  const frameEnd = frameStart + frame;

  if (position < frameStart + PADDING) {
    input.scrollLeft = Math.max(0, (position - SHIFT) * charWidth);
  }
  if (position > frameEnd - PADDING) {
    input.scrollLeft = Math.min(maxScroll, (position - frame + SHIFT) * charWidth);
  }
}
