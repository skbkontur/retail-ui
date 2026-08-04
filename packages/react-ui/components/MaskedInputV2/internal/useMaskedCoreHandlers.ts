import type React from 'react';
import { useCallback, useRef, useState } from 'react';

import {
  isKeyArrow,
  isKeyBackspace,
  isKeyDelete,
  isKeyEnd,
  isKeyHome,
  isShortcutRedo,
  isShortcutSelectAll,
  isShortcutUndo,
} from '../../../lib/events/keyboard/identifiers.js';
import { scrollInputCaretIntoView } from '../../../lib/scrollInputCaretIntoView.js';
import { ActionDetails } from '../react-imask/imask/core/action-details.js';
import { extractRaw } from './extractRaw.js';
import type { MaskedCoreProps, MaskedSelectionIntent } from './MaskedCore.types.js';
import { computeMaskedCut, getMaskedCopyText } from './maskedCoreClipboard.js';
import { computeMaskedDeletion } from './maskedCoreDeletion.js';
import { applyMaskedInputChange } from './maskedCoreInputChange.js';
import { calcNavigationSelection } from './maskedCoreNavigation.js';
import { setMaskInputSelectionRange } from './setMaskInputSelectionRange.js';

type MaskedCoreHandlerProps = Pick<
  MaskedCoreProps,
  | 'maskState'
  | 'slotMap'
  | 'engine'
  | 'currentRaw'
  | 'onRawChange'
  | 'onUnexpectedInput'
  | 'onUndo'
  | 'onRedo'
  | 'coreInputRef'
  | 'onKeyDown'
  | 'onMouseUp'
  | 'onInput'
  | 'onSelect'
  | 'onFocus'
  | 'onBlur'
  | 'onPaste'
  | 'selectAllOnFocus'
> & {
  syncOverlayScroll: () => void;
  requestSelectionIntent: (intent: MaskedSelectionIntent) => void;
};

/**
 * Собирает обработчики DOM-событий для {@link MaskedCore}.
 * Инкапсулирует логику ввода, навигации, clipboard и undo/redo.
 *
 * @param props — состояние маски, движок и колбэки от MaskedInputV2.
 * @returns refs и обработчики для прямого `<input>`.
 */
export function useMaskedCoreHandlers(props: MaskedCoreHandlerProps) {
  const {
    maskState,
    slotMap,
    engine,
    currentRaw,
    onRawChange,
    onUnexpectedInput,
    onUndo,
    onRedo,
    coreInputRef,
    onKeyDown: inputOnKeyDown,
    onMouseUp: inputOnMouseUp,
    onInput: inputOnInput,
    onSelect: inputOnSelect,
    onFocus: inputOnFocus,
    onBlur: inputOnBlur,
    onPaste: inputOnPaste,
    selectAllOnFocus,
    syncOverlayScroll,
    requestSelectionIntent,
  } = props;

  const pendingCursorRef = useRef<number | null>(null);
  const resetCaretOnMouseUpRef = useRef(false);
  const pointerFocusRef = useRef(false);
  /** Блокирует нативный change/input после нашего paste (beforeinput/input race в браузере). */
  const ignoreChangeFromPasteRef = useRef(false);
  const lastSelectionRef = useRef<{ start: number; end: number }>({ start: 0, end: 0 });
  const [selectionRange, setSelectionRange] = useState({ start: 0, end: 0 });

  const syncSelection = useCallback((el: HTMLInputElement) => {
    const start = el.selectionStart ?? 0;
    const end = el.selectionEnd ?? 0;
    lastSelectionRef.current = { start, end };
    setSelectionRange((prev) => (prev.start === start && prev.end === end ? prev : { start, end }));
  }, []);

  function getFocusedInputCaretPos() {
    return engine.compute(currentRaw, true).typedLength;
  }

  function scrollCaretIntoView(el: HTMLInputElement) {
    scrollInputCaretIntoView(el);
    syncOverlayScroll();
  }

  function resetCaretToInputStart(el: HTMLInputElement) {
    const pos = getFocusedInputCaretPos();
    pendingCursorRef.current = pos;
    setMaskInputSelectionRange(el, pos);
    scrollCaretIntoView(el);
    syncSelection(el);
  }

  function setPendingCursor(pos: number) {
    requestSelectionIntent(null);
    pendingCursorRef.current = pos;
    setMaskInputSelectionRange(coreInputRef.current, pos);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (ignoreChangeFromPasteRef.current) {
      return;
    }

    requestSelectionIntent(null);
    resetCaretOnMouseUpRef.current = false;

    const browserDraft = e.target.value;
    const cursorPos = e.target.selectionStart ?? 0;
    const oldSelection = lastSelectionRef.current;
    const inputType = (e.nativeEvent as InputEvent).inputType;
    const details = new ActionDetails({
      value: browserDraft,
      cursorPos,
      oldValue: maskState.typedValue,
      oldSelection: { ...oldSelection },
    });

    // Autofill / insertReplacementText / drop: нет clipboard paste-события,
    // но нужна та же нормализация, что и у onBeforePasteValue.
    // Всегда replace-all: повторный change (Яндекс.Браузер и др.) иначе вставляет
    // в позицию курсора поверх уже нормализованного raw → порча значения.
    const isBulkInsert = details.inserted.length > 1 || inputType === 'insertReplacementText';
    if (isBulkInsert) {
      ignoreChangeFromPasteRef.current = true;
      setTimeout(() => {
        ignoreChangeFromPasteRef.current = false;
      }, 0);

      if (coreInputRef.current) {
        setMaskInputSelectionRange(coreInputRef.current, 0, maskState.typedLength);
        lastSelectionRef.current = { start: 0, end: maskState.typedLength };
      }
      onRawChange(browserDraft, 'paste');
      return;
    }

    const result = applyMaskedInputChange({
      browserDraft,
      cursorPos,
      typedValue: maskState.typedValue,
      currentRaw,
      oldSelection,
      engine,
    });

    setPendingCursor(result.cursorPos);

    if (result.rejected) {
      onUnexpectedInput();
      return;
    }

    onRawChange(result.newRaw, 'input', result.cursorPos);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    requestSelectionIntent(null);
    resetCaretOnMouseUpRef.current = false;

    const el = coreInputRef.current;

    if (isShortcutSelectAll(e) || isKeyArrow(e) || isKeyEnd(e) || isKeyHome(e) || isKeyBackspace(e) || isKeyDelete(e)) {
      pendingCursorRef.current = null;
    }

    if (isShortcutSelectAll(e)) {
      e.preventDefault();
      setMaskInputSelectionRange(el, 0, maskState.typedLength);
      if (el) {
        scrollCaretIntoView(el);
        syncSelection(el);
      }
    } else if (isKeyArrow(e) || isKeyEnd(e) || isKeyHome(e)) {
      e.preventDefault();
      const [start, end, dir] = calcNavigationSelection(e, maskState.typedLength, el);
      setMaskInputSelectionRange(el, start, end, dir);
      if (el) {
        scrollCaretIntoView(el);
        syncSelection(el);
      }
    } else if (isKeyBackspace(e) || isKeyDelete(e)) {
      e.preventDefault();
      if (el) {
        // Cmd/Ctrl+Backspace — удалить до начала строки; Cmd/Ctrl+Delete — до конца.
        if (e.metaKey || e.ctrlKey) {
          handleLineDeletion(isKeyBackspace(e), el);
        } else {
          handleDeletion(isKeyBackspace(e), el);
        }
      }
    } else if (isShortcutUndo(e)) {
      e.preventDefault();
      onUndo?.();
    } else if (isShortcutRedo(e)) {
      e.preventDefault();
      onRedo?.();
    }

    inputOnKeyDown?.(e);
  }

  function handleDeletion(isBackspace: boolean, el: HTMLInputElement) {
    applyDeletion(isBackspace, el.selectionStart ?? 0, el.selectionEnd ?? 0);
  }

  function handleLineDeletion(isBackspace: boolean, el: HTMLInputElement) {
    const selStart = el.selectionStart ?? 0;
    const selEnd = el.selectionEnd ?? 0;

    if (selStart !== selEnd) {
      applyDeletion(isBackspace, selStart, selEnd);
      return;
    }

    const start = isBackspace ? 0 : selStart;
    const end = isBackspace ? selStart : maskState.typedLength;
    if (start === end) {
      return;
    }

    applyDeletion(isBackspace, start, end);
  }

  function applyDeletion(isBackspace: boolean, selStart: number, selEnd: number) {
    const result = computeMaskedDeletion({
      isBackspace,
      selStart,
      selEnd,
      currentRaw,
      slotMap,
    });

    if (!result) {
      onUnexpectedInput();
      return;
    }

    pendingCursorRef.current = result.cursorPos;
    onRawChange(result.newRaw, 'input', result.cursorPos);
  }

  function handleSelect(e?: React.SyntheticEvent<HTMLInputElement>) {
    const el = coreInputRef.current;
    if (!el) {
      return;
    }

    const max = maskState.typedLength;
    const start = el.selectionStart ?? 0;
    const end = el.selectionEnd ?? 0;
    lastSelectionRef.current = { start, end };

    if (end > max) {
      setMaskInputSelectionRange(el, Math.min(start, max), max, el.selectionDirection ?? 'none');
    }

    syncSelection(el);
    syncOverlayScroll();

    if (e) {
      inputOnSelect?.(e);
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    inputOnPaste?.(e);
    e.preventDefault();

    if (!e.clipboardData) {
      return;
    }

    // Игнорируем последующий input/change от браузера (beforeinput insertFromPaste и т.п.),
    // иначе controlled value перетирается ненормализованным черновиком.
    ignoreChangeFromPasteRef.current = true;
    setTimeout(() => {
      ignoreChangeFromPasteRef.current = false;
    }, 0);

    onRawChange(e.clipboardData.getData('text/plain'), 'paste');
  }

  function handleBeforeInput(e: React.FormEvent<HTMLInputElement>) {
    const nativeEvent = e.nativeEvent as InputEvent;
    if (nativeEvent.inputType === 'insertFromPaste') {
      e.preventDefault();
      ignoreChangeFromPasteRef.current = true;
      setTimeout(() => {
        ignoreChangeFromPasteRef.current = false;
      }, 0);
    }
  }

  function handleCopy(e: React.ClipboardEvent<HTMLInputElement>) {
    const el = coreInputRef.current;
    if (!el) {
      return;
    }

    const start = el.selectionStart ?? 0;
    const end = el.selectionEnd ?? 0;
    e.clipboardData.setData('text/plain', getMaskedCopyText(maskState.displayValue, start, end));
    e.preventDefault();
  }

  function handleCut(e: React.ClipboardEvent<HTMLInputElement>) {
    handleCopy(e);

    const el = coreInputRef.current;
    if (!el) {
      return;
    }

    const start = el.selectionStart ?? 0;
    const end = el.selectionEnd ?? 0;
    const { newRaw, cursorPos } = computeMaskedCut(start, end, currentRaw, slotMap);

    pendingCursorRef.current = cursorPos;
    onRawChange(newRaw, 'input', cursorPos);
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    inputOnInput?.(e);
  }

  function handleMouseDown() {
    requestSelectionIntent(null);
    pointerFocusRef.current = true;
  }

  function handleMouseUp(e: React.MouseEvent<HTMLInputElement>) {
    const el = e.currentTarget;

    if (resetCaretOnMouseUpRef.current && !selectAllOnFocus) {
      resetCaretOnMouseUpRef.current = false;
      resetCaretToInputStart(el);
    } else {
      resetCaretOnMouseUpRef.current = false;
      handleSelect();
    }

    inputOnMouseUp?.(e);
  }

  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    const domValue = e.currentTarget.value;
    if (domValue !== maskState.typedValue) {
      const syncedRaw = extractRaw(domValue, engine);
      if (syncedRaw !== currentRaw) {
        onRawChange(syncedRaw, 'input');
      }
    }

    if (selectAllOnFocus) {
      requestSelectionIntent('select-all');
      pointerFocusRef.current = false;
      resetCaretOnMouseUpRef.current = false;
    } else if (pointerFocusRef.current) {
      resetCaretOnMouseUpRef.current = currentRaw.length === 0;
      pointerFocusRef.current = false;
      requestSelectionIntent(null);
    } else {
      // Tab / programmatic focus() (в т.ч. ref.focus()): после актуализации
      // maskState каретка должна оказаться после typed / leading fixed.
      requestSelectionIntent('caret-end');
      pendingCursorRef.current = null;
    }

    inputOnFocus?.(e);
    syncSelection(e.currentTarget);
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    const pos = e.currentTarget.selectionStart ?? lastSelectionRef.current.start;
    const collapsed = { start: pos, end: pos };

    lastSelectionRef.current = collapsed;
    setSelectionRange(collapsed);
    pointerFocusRef.current = false;
    resetCaretOnMouseUpRef.current = false;
    requestSelectionIntent(null);

    inputOnBlur?.(e);
  }

  return {
    pendingCursorRef,
    selectionRange,
    syncSelection,
    handleChange,
    handleKeyDown,
    handleSelect,
    handlePaste,
    handleBeforeInput,
    handleCopy,
    handleCut,
    handleInput,
    handleMouseDown,
    handleMouseUp,
    handleFocus,
    handleBlur,
  };
}
