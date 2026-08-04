import type React from 'react';

import {
  isKeyArrowHorizontal,
  isKeyArrowLeft,
  isKeyArrowUp,
  isKeyHome,
  isModShift,
  isShortcutJumpCaret,
  someKeys,
} from '../../../lib/events/keyboard/identifiers.js';

type HeadDirection = 'left' | 'right';
type SelectionDirection = 'forward' | 'backward' | 'none';

/**
 * Вычисляет новое выделение при навигации стрелками, Home/End и Ctrl/Alt+стрелками.
 * Логика перенесена из FixedIMaskInput v1.
 *
 * @param e — keyboard event.
 * @param maxPos — максимальная позиция курсора (typedLength).
 * @param el — DOM input с текущим selection.
 * @returns кортеж `[start, end, direction]` для `setSelectionRange`.
 */
export function calcNavigationSelection(
  e: React.KeyboardEvent<HTMLInputElement>,
  maxPos: number,
  el: HTMLInputElement | null,
): [number, number, SelectionDirection] {
  if (!el) {
    return [0, 0, 'none'];
  }

  const start = el.selectionStart ?? 0;
  const end = el.selectionEnd ?? 0;
  const direction = (el.selectionDirection ?? 'none') as SelectionDirection;

  const isSelectionMode = isModShift()(e);
  let tail = start !== end && direction === 'backward' ? end : start;
  let head = start !== end && direction === 'backward' ? start : end;

  const headDirection: HeadDirection = someKeys(isKeyArrowLeft, isKeyArrowUp, isKeyHome)(e) ? 'left' : 'right';
  const step = isKeyArrowHorizontal(e) ? 1 : Infinity;
  const increment = headDirection === 'left' ? -step : step;

  const normalized = (v: number) => Math.min(maxPos, Math.max(0, v));

  if (isShortcutJumpCaret(e)) {
    head = jumpCaret(head, headDirection, el.value, maxPos);
  } else if (head !== tail && !isSelectionMode && isKeyArrowHorizontal(e)) {
    head = headDirection === 'right' ? Math.max(tail, head) : Math.min(tail, head);
  } else {
    head = head + increment;
  }

  if (isSelectionMode) {
    const s = Math.min(tail, head);
    const e2 = Math.max(tail, head);
    return [normalized(s), normalized(e2), e2 === head ? 'forward' : 'backward'];
  }

  tail = head;
  return [normalized(tail), normalized(head), 'none'];
}

/**
 * Перемещает курсор к началу/концу следующего «слова» при Ctrl/Alt+стрелка.
 *
 * @param prev — текущая позиция курсора.
 * @param headDirection — направление прыжка.
 * @param value — текущее value input.
 * @param maxPos — верхняя граница позиции курсора.
 */
function jumpCaret(prev: number, headDirection: HeadDirection, value: string, maxPos: number): number {
  // CODE-1 fix: используем .source вместо .valueOf() — иначе "/" попадает в символы слова
  const word = /а-яa-z0-9_/.source;
  const wordRegExp = new RegExp(`([${word}])+[\\s]*|([^${word}])+`, 'gi');
  const normalized = (v: number) => Math.min(maxPos, Math.max(0, v));

  let next = headDirection === 'right' ? prev : 0;
  value.match(wordRegExp)?.reduce<number[]>((s, a) => {
    const pos = a.length + (s.slice(-1)[0] || 0);
    if (headDirection === 'right' && next === prev && next < pos) {
      next = normalized(pos);
    } else if (headDirection === 'left' && prev > pos) {
      next = normalized(pos);
    }
    return [...s, pos];
  }, []);

  return next;
}
