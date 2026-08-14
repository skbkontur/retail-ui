import React, {
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { Ref } from 'react';
import warning from 'warning';

import { forwardRefAndName } from '../../lib/forwardRefAndName.js';
import { useEmotion, useStyles } from '../../lib/renderEnvironment/index.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import type { InputProps, InputType } from '../Input/index.js';
import { Input, selectionAllowedTypes } from '../Input/index.js';
import { extractRaw, findNearestRawLeft, computePasteMaskedCursor } from './internal/helpers.js';
import { MaskedCore } from './internal/MaskedCore.js';
import type { MaskedSelectionIntent } from './internal/MaskedCore.types.js';
import { getSelectionRawRange } from './internal/maskedCoreClipboard.js';
import { setMaskInputSelectionRange } from './internal/setMaskInputSelectionRange.js';
import { useMaskEngine } from './internal/useMaskEngine.js';
import { getDefinitions, getMaskChar } from './MaskedInputV2.helpers.js';
import { normalizeRussianPhonePaste } from './MaskedInputV2.phone.js';
import { getStyles, globalClasses } from './MaskedInputV2.styles.js';
import type { IMaskInputProps } from './react-imask/mixin.js';

export type MaskedInputV2OnBeforePasteValue = (value: string) => string;

export interface MaskedInputV2MaskedProps {
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
   * Вызывается с аргументом value — текст из буфера, браузерного autofill
   * или иной bulk-вставки без clipboard-события.
   *
   * Обработчик должен вернуть текст — он попадёт в поле.
   *
   * При `type="tel"` и отсутствии обработчика применяется
   * {@link normalizeRussianPhonePaste}.
   *
   * @param value значение вставки.
   */
  onBeforePasteValue?: MaskedInputV2OnBeforePasteValue;

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

const EMPTY_IMASK_PROPS = {};

export const getSafeMaskInputType = (type?: InputType | string): MaskInputType | undefined => {
  if (!type) {
    return undefined;
  }

  const normalizedType = type.trim() as InputType;

  if (normalizedType === 'password' || !selectionAllowedTypes.includes(normalizedType)) {
    return 'text';
  }

  return normalizedType as MaskInputType;
};

function getMaskInputMode(
  type: InputType | string | undefined,
  inputMode: React.InputHTMLAttributes<HTMLInputElement>['inputMode'],
): React.InputHTMLAttributes<HTMLInputElement>['inputMode'] {
  if (inputMode) {
    return inputMode;
  }

  if (type?.trim() === 'email') {
    return 'email';
  }

  return undefined;
}

export interface MaskedInputV2Props
  extends
    MaskedInputV2MaskedProps,
    Omit<InputProps, 'mask' | 'maxLength' | 'type' | 'alwaysShowMask' | 'onUnexpectedInput' | 'maskChar'> {
  type?: MaskInputType;

  /** @ignore */
  __fromMaskedInputFacade?: boolean;
}

/** @deprecated Используйте {@link MaskedInput}. Для legacy-поведения включите фичафлаг `maskedInputUseLegacyBehavior` в {@link ReactUIFeatureFlagsContext}. */
export const MaskedInputV2 = forwardRefAndName(
  'MaskedInputV2',
  function MaskedInputV2(props: MaskedInputV2Props, ref: Ref<Input | null>) {
    const {
      mask,
      maskChar,
      formatChars,
      alwaysShowMask = false,
      colored = true,
      imaskProps: customIMaskProps = EMPTY_IMASK_PROPS,
      unmask = false,
      onValueChange,
      onUnexpectedInput,
      onBeforePasteValue,
      // Значение меняет MaskedCore, поэтому onChange к Input не относится:
      // иначе потребитель получил бы внутреннее событие пересчёта крестика очистки.
      onChange: _onChange,
      element: _element,
      className,
      // @ts-expect-error: могут передавать игнорируя ошибку
      maxLength,
      showClearIcon,
      selectAllOnFocus,
      type,
      __fromMaskedInputFacade,
      ...inputProps
    } = props;

    useEffect(() => {
      if (!__fromMaskedInputFacade) {
        warning(false, '[MaskedInputV2]: This component is for internal use only. Please use MaskedInput instead.');
      }
    }, [__fromMaskedInputFacade]);

    const theme = useContext(ThemeContext);
    const { cx } = useEmotion();
    const styles = useStyles(getStyles);

    const inputRef = useRef<Input>(null);
    const coreInputRef = useRef<HTMLInputElement>(null);

    const [focused, setFocused] = useState(false);
    const [selectionIntent, setSelectionIntent] = useState<MaskedSelectionIntent>(null);

    const prevMaskRef = useRef(props.mask);
    const pendingCursorRestoreRef = useRef<number | null>(null);
    const lastCaretRef = useRef(0);

    const requestSelectionIntent = useCallback((intent: MaskedSelectionIntent) => {
      setSelectionIntent((current) => (current === 'select-all' && intent === 'caret-end' ? current : intent));
    }, []);

    const historyRef = useRef<Array<{ raw: string; cursorPos: number }>>([]);
    const historyIndexRef = useRef(-1);

    // Сохраняем позицию курсора перед сменой маски (render-phase read of stable ref).
    // При коммите DOM браузер сбросит курсор в конец из-за изменения value,
    // поэтому восстанавливаем его синхронно в useLayoutEffect ниже.
    if (prevMaskRef.current !== props.mask) {
      pendingCursorRestoreRef.current = lastCaretRef.current;
      prevMaskRef.current = props.mask;
      historyRef.current = [];
      historyIndexRef.current = -1;
    }

    // Движок: IMask как чистый калькулятор, не привязанный к DOM
    const engine = useMaskEngine({
      mask,
      maskChar,
      formatChars,
      unmask,
      alwaysShowMask,
      imaskProps: customIMaskProps,
    });

    // Единственный источник истины — raw (только то, что ввёл пользователь, без маски)
    const [raw, setRaw] = useState<string>(() =>
      extractRaw((props.value ?? props.defaultValue) as string | number | undefined, engine),
    );

    // MaskState вычисляется синхронно из raw — оба визуальных слоя читают из него
    const maskState = useMemo(() => engine.compute(raw, focused), [raw, focused, engine]);

    const syncedImaskRef = useRef(engine.imask);
    const prevSyncedValueRef = useRef(props.value);

    // Синхронизировать raw при изменении props.value или правил маски
    useEffect(() => {
      const engineChanged = syncedImaskRef.current !== engine.imask;
      const valueChanged = prevSyncedValueRef.current !== props.value;
      syncedImaskRef.current = engine.imask;
      prevSyncedValueRef.current = props.value;

      if (props.value !== undefined) {
        if (valueChanged || engineChanged) {
          setRaw(extractRaw(props.value, engine));
        }
        return;
      }

      if (engineChanged) {
        setRaw((prev) => {
          engine.imask.unmaskedValue = prev;
          return engine.imask.rawInputValue;
        });
      }
    }, [props.value, engine]);

    // Вызывать onValueChange только при реальном изменении outputValue,
    // и НЕ при первом рендере (воспроизводит нативное поведение onChange)
    const isFirstRender = useRef(true);
    const prevOutputValue = useRef<string>(maskState.outputValue);
    useEffect(() => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        prevOutputValue.current = maskState.outputValue;
        return;
      }
      if (maskState.outputValue !== prevOutputValue.current) {
        prevOutputValue.current = maskState.outputValue;
        onValueChange?.(maskState.outputValue);
      }
    }, [maskState.outputValue]);

    useImperativeHandle<Input | null, (Input & { selectAll: () => void }) | null>(ref, () => {
      if (!inputRef.current) {
        return null;
      }
      return Object.assign(inputRef.current, {
        selectAll: () => {
          requestSelectionIntent('select-all');
          inputRef.current?.focus();
          const el = coreInputRef.current;
          if (el && el.ownerDocument.activeElement !== el) {
            requestSelectionIntent(null);
          }
        },
      });
    }, [requestSelectionIntent]);

    useLayoutEffect(() => {
      if (pendingCursorRestoreRef.current !== null && coreInputRef.current) {
        setMaskInputSelectionRange(coreInputRef.current, pendingCursorRestoreRef.current);
        lastCaretRef.current = pendingCursorRestoreRef.current;
        pendingCursorRestoreRef.current = null;
      }
    });

    useEffect(() => {
      if (!focused) {
        return;
      }

      const el = coreInputRef.current;
      if (!el) {
        return;
      }

      const syncCaret = () => {
        if (document.activeElement === el) {
          lastCaretRef.current = el.selectionStart ?? 0;
        }
      };

      document.addEventListener('selectionchange', syncCaret);
      return () => document.removeEventListener('selectionchange', syncCaret);
    }, [focused]);

    return (
      <Input
        ref={inputRef}
        {...inputProps}
        type={getSafeMaskInputType(type)}
        inputMode={getMaskInputMode(type, inputProps.inputMode)}
        // Непустоту значения Input считает по value нативного инпута, где лежат символы маски,
        // поэтому на пустом значении крестик выключаем сами.
        showClearIcon={raw === '' ? 'never' : showClearIcon}
        onValueChange={handleInputValueChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onSelect={handleSelect}
        className={cx(globalClasses.root, className, styles.root(theme))}
        element={
          <MaskedCore
            maskState={maskState}
            slotMap={engine.slotMap}
            engine={engine}
            focused={focused}
            currentRaw={raw}
            onRawChange={handleRawChange}
            onUnexpectedInput={triggerUnexpectedInput}
            onUndo={handleUndo}
            onRedo={handleRedo}
            coreInputRef={coreInputRef}
            colored={colored}
            selectAllOnFocus={selectAllOnFocus}
            selectionIntent={selectionIntent}
            onSelectionIntentChange={requestSelectionIntent}
          />
        }
      />
    );

    // Клик по крестику очистки Input отдаёт наружу через onValueChange, а сам чистит поле
    // записью в DOM — мимо модели маски, из-за чего значение вернулось бы при следующем рендере.
    // Поэтому очищаем через raw, как при обычном вводе.
    function handleInputValueChange(value: string) {
      if (value !== '') {
        return;
      }

      // При очистке крестиком raw ещё не пуст — записываем шаг в историю, чтобы undo вернул значение.
      // При удалении с клавиатуры сюда приходит уже применённый пустой raw, шаг записан в handleRawChange.
      if (raw !== '') {
        pushHistory('', 0);
      }

      setRaw('');
      pendingCursorRestoreRef.current = 0;
    }

    function handleRawChange(input: string, source: 'input' | 'paste', cursorPos?: number) {
      if (source === 'paste') {
        handlePasteChange(input, cursorPos);
      } else {
        if (input !== raw && cursorPos !== undefined) {
          pushHistory(input, cursorPos);
        }
        setRaw(input);
      }
    }

    function handlePasteChange(pasted: string, _cursorPos?: number) {
      const el = coreInputRef.current;
      const selectionStart = el?.selectionStart ?? 0;
      const selectionEnd = el?.selectionEnd ?? selectionStart;

      // При непустом выделении сначала убираем попавший в него raw (в т.ч. если край на литерале `-`),
      // иначе paste склеивает старое значение с новым.
      const selectedRawRange =
        selectionEnd > selectionStart ? getSelectionRawRange(selectionStart, selectionEnd, engine.slotMap) : null;

      let baseRaw = raw;
      let rawCursorPos: number;
      if (selectedRawRange) {
        baseRaw = raw.slice(0, selectedRawRange.rawStart) + raw.slice(selectedRawRange.rawEnd);
        rawCursorPos = selectedRawRange.rawStart;
      } else {
        rawCursorPos =
          engine.slotMap.maskedToRaw[selectionStart] !== null &&
          engine.slotMap.maskedToRaw[selectionStart] !== undefined
            ? (engine.slotMap.maskedToRaw[selectionStart] as number)
            : findNearestRawLeft(selectionStart, engine.slotMap);
      }

      const rawBefore = baseRaw.slice(0, rawCursorPos);
      const rawAfter = baseRaw.slice(rawCursorPos);

      let transformed = pasted;
      if (onBeforePasteValue) {
        transformed = onBeforePasteValue(pasted);
      } else if (getSafeMaskInputType(type) === 'tel') {
        transformed = normalizeRussianPhonePaste(pasted);
      }

      const result = engine.applyPaste(baseRaw, rawCursorPos, transformed);
      if (result.overflow) {
        // IF-1157: paste с overflow → onUnexpectedInput
        triggerUnexpectedInput();
      }

      const postPasteMaskState = engine.compute(result.raw, true);
      const maskedCursorPos = computePasteMaskedCursor(
        rawBefore,
        rawAfter,
        result.raw,
        rawCursorPos,
        engine.slotMap,
        postPasteMaskState.typedLength,
      );

      if (result.raw !== raw) {
        pushHistory(result.raw, maskedCursorPos);
      }

      setRaw(result.raw);
      pendingCursorRestoreRef.current = maskedCursorPos;

      if (onBeforePasteValue && onValueChange) {
        // Legacy-контракт: при кастомной вставке наружу уходит результат onBeforePasteValue,
        // а не masked/unmasked outputValue (нужно для ComboBox и совместимости с IMaskInput).
        prevOutputValue.current = engine.compute(result.raw, focused).outputValue;
        onValueChange(transformed);
      }
    }

    function pushHistory(newRaw: string, cursorPos: number) {
      const MAX_HISTORY_LENGTH = 100;

      if (historyRef.current.length === 0) {
        historyRef.current.push({ raw, cursorPos: 0 });
        historyIndexRef.current = 0;
      }

      if (historyIndexRef.current < historyRef.current.length - 1) {
        historyRef.current = historyRef.current.slice(0, historyIndexRef.current + 1);
      }

      historyRef.current.push({ raw: newRaw, cursorPos });
      if (historyRef.current.length > MAX_HISTORY_LENGTH) {
        historyRef.current.shift();
      }
      historyIndexRef.current = historyRef.current.length - 1;
    }

    function handleUndo() {
      if (historyRef.current.length === 0) {
        return;
      }
      const nextIndex = Math.max(0, historyIndexRef.current - 1);
      if (nextIndex !== historyIndexRef.current) {
        historyIndexRef.current = nextIndex;
        const state = historyRef.current[nextIndex];
        setRaw(state.raw);
        pendingCursorRestoreRef.current = state.cursorPos;
      }
    }

    function handleRedo() {
      if (historyRef.current.length === 0) {
        return;
      }
      const nextIndex = Math.min(historyRef.current.length - 1, historyIndexRef.current + 1);
      if (nextIndex !== historyIndexRef.current) {
        historyIndexRef.current = nextIndex;
        const state = historyRef.current[nextIndex];
        setRaw(state.raw);
        pendingCursorRestoreRef.current = state.cursorPos;
      }
    }

    function triggerUnexpectedInput() {
      const blink = inputRef.current?.blink.bind(inputRef.current) ?? (() => undefined);
      onUnexpectedInput ? onUnexpectedInput(maskState.outputValue, blink) : blink();
    }

    function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
      setFocused(true);
      props.onFocus?.(e);
    }

    function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
      setFocused(false);
      props.onBlur?.(e);
    }

    function handleSelect(e: React.SyntheticEvent<HTMLInputElement>) {
      if (coreInputRef.current) {
        lastCaretRef.current = coreInputRef.current.selectionStart ?? 0;
      }
      inputProps.onSelect?.(e);
    }
  },
);

// Вспомогательные функции для совместимости (используются в стори и тестах)
export { getDefinitions, getMaskChar };
