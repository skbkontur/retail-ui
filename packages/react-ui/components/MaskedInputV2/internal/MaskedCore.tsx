import { cx } from '@emotion/css';
import React, {
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName.js';
import { useGlobal, useStyles } from '../../../lib/renderEnvironment/index.js';
import { scrollInputCaretIntoView } from '../../../lib/scrollInputCaretIntoView.js';
import { ThemeContext } from '../../../lib/theming/ThemeContext.js';
import type { InputElement } from '../../Input/Input.typings.js';
import { needsMaskAlignPadding } from './computeMaskAlignPadding.js';
import type { MaskedCoreProps } from './MaskedCore.types.js';
import { getStyles, globalClasses } from './MaskedInternal.styles.js';
import { MaskOverlay } from './MaskOverlay.js';
import { setMaskInputSelectionRange } from './setMaskInputSelectionRange.js';
import { getShowOverlay } from './showOverlay.js';
import { useInputOverflow } from './useInputOverflow.js';
import { useMaskAlignPadding } from './useMaskAlignPadding.js';
import { useMaskedCoreHandlers } from './useMaskedCoreHandlers.js';

export type { MaskedCoreProps } from './MaskedCore.types.js';

/**
 * Headless-слой MaskedInputV2: прозрачный `<input>` для ввода и {@link MaskOverlay} для отображения маски.
 * Управляется через {@link useMaskedCoreHandlers}.
 */
export const MaskedCore = forwardRefAndName(
  'MaskedCore',
  function MaskedCore(props: MaskedCoreProps, ref: React.ForwardedRef<InputElement | null>) {
    const {
      maskState,
      slotMap,
      engine,
      focused,
      currentRaw,
      onRawChange,
      onUnexpectedInput,
      onUndo,
      onRedo,
      coreInputRef,
      colored = true,
      selectAllOnFocus,
      selectionIntent: externalSelectionIntent,
      onSelectionIntentChange,
      onKeyDown,
      onMouseUp,
      onInput,
      onSelect,
      onFocus,
      onPaste,
      onBlur,
      onChange: inputOnChange,
      placeholder,
      className,
      disabled,
      ...rest
    } = props;

    const styles = useStyles(getStyles);
    const globalObject = useGlobal();
    const overlayRef = useRef<HTMLSpanElement>(null);
    const theme = useContext(ThemeContext);
    const textAlign = rest.style?.textAlign;
    const [internalSelectionIntent, setInternalSelectionIntent] = useState<NonNullable<
      MaskedCoreProps['selectionIntent']
    > | null>(null);
    const selectionIntent = externalSelectionIntent === undefined ? internalSelectionIntent : externalSelectionIntent;
    const selectionIntentRef = useRef(selectionIntent);
    selectionIntentRef.current = selectionIntent;

    const requestSelectionIntent = useCallback(
      (intent: NonNullable<MaskedCoreProps['selectionIntent']> | null) => {
        if (onSelectionIntentChange) {
          onSelectionIntentChange(intent);
          return;
        }
        setInternalSelectionIntent((current) =>
          current === 'select-all' && intent === 'caret-end' ? current : intent,
        );
      },
      [onSelectionIntentChange],
    );

    const syncOverlayScroll = useCallback(() => {
      if (overlayRef.current && coreInputRef.current) {
        overlayRef.current.style.transform = `translateX(-${coreInputRef.current.scrollLeft}px)`;
      }
    }, [coreInputRef]);

    const overflows = useInputOverflow(coreInputRef, maskState.displayValue, focused);
    const showOverlay = getShowOverlay(maskState, focused, overflows);

    const {
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
    } = useMaskedCoreHandlers({
      maskState,
      slotMap,
      engine,
      currentRaw,
      onRawChange,
      onUnexpectedInput,
      onUndo,
      onRedo,
      coreInputRef,
      selectAllOnFocus,
      onKeyDown,
      onMouseUp,
      onInput,
      onSelect,
      onFocus,
      onBlur,
      onPaste,
      syncOverlayScroll,
      requestSelectionIntent,
    });

    useImperativeHandle(
      ref,
      () => ({
        input: coreInputRef.current,
        getRootNode: () => coreInputRef.current,
      }),
      [coreInputRef],
    );

    const applySelectionIntent = useCallback(
      (intent: NonNullable<MaskedCoreProps['selectionIntent']>) => {
        const el = coreInputRef.current;
        if (!el || !focused) {
          return;
        }

        if (intent === 'select-all') {
          setMaskInputSelectionRange(el, 0, maskState.typedLength);
        } else {
          const start = el.selectionStart ?? 0;
          const end = el.selectionEnd ?? 0;
          if (start === end && start !== 0 && start !== maskState.typedLength) {
            return;
          }
          setMaskInputSelectionRange(el, maskState.typedLength);
        }
        scrollInputCaretIntoView(el);
        syncSelection(el);
      },
      [coreInputRef, focused, maskState.typedLength, syncSelection],
    );

    useLayoutEffect(() => {
      const el = coreInputRef.current;

      if (selectionIntent) {
        applySelectionIntent(selectionIntent);
      } else if (pendingCursorRef.current !== null && el) {
        const pos = pendingCursorRef.current;
        pendingCursorRef.current = null;
        setMaskInputSelectionRange(el, pos);
        scrollInputCaretIntoView(el);
        syncSelection(el);
      } else if (el && focused) {
        scrollInputCaretIntoView(el);
      }

      syncOverlayScroll();
      // typedValue в deps обязателен: после controlled-update React сбрасывает selection,
      // а typedLength при shift-перезаписи в полной маске может не измениться (1212 → 1251).
    }, [applySelectionIntent, focused, maskState.typedValue, selectionIntent, syncOverlayScroll, syncSelection]);

    // Браузер может применить свою Tab-selection после focus-хендлеров.
    // Один отменяемый retry после события оставляет последнее намерение победителем.
    useEffect(() => {
      if (!selectionIntent || !focused) {
        return;
      }

      const appliedIntent = selectionIntent;
      const setTimeout = globalObject.setTimeout;
      if (!setTimeout) {
        requestSelectionIntent(null);
        return;
      }
      const timer = setTimeout(() => {
        if (selectionIntentRef.current !== appliedIntent) {
          return;
        }
        const el = coreInputRef.current;
        if (!el || globalObject.document?.activeElement !== el) {
          requestSelectionIntent(null);
          return;
        }
        applySelectionIntent(appliedIntent);
        requestSelectionIntent(null);
      }, 0);

      return () => globalObject.clearTimeout?.(timer);
    }, [applySelectionIntent, coreInputRef, focused, globalObject, requestSelectionIntent, selectionIntent]);

    // Значение маски живёт в React-состоянии, а Input пересчитывает своё (показ крестика очистки)
    // только в onChange, которого при удалении и undo не бывает — они идут через keydown.
    // Поэтому дёргаем его сами на каждое изменение значения.
    useEffect(() => {
      const el = coreInputRef.current;
      if (el) {
        inputOnChange?.({ target: el, currentTarget: el } as React.ChangeEvent<HTMLInputElement>);
      }
    }, [maskState.typedValue]);

    useEffect(() => {
      if (!focused) {
        return;
      }

      const el = coreInputRef.current;
      if (!el) {
        return;
      }

      const handleSelectionChange = () => {
        if (document.activeElement === el) {
          handleSelect();
        }
      };

      document.addEventListener('selectionchange', handleSelectionChange);
      return () => document.removeEventListener('selectionchange', handleSelectionChange);
    }, [focused, handleSelect]);

    const alignPadding = useMaskAlignPadding(
      coreInputRef,
      overlayRef,
      maskState.displayValue,
      textAlign,
      focused && showOverlay && needsMaskAlignPadding(textAlign),
    );
    const inputStyle =
      alignPadding > 0 ? { ...rest.style, textAlign: 'left' as const, paddingLeft: alignPadding } : rest.style;

    return (
      <>
        <input
          {...rest}
          style={inputStyle}
          placeholder={showOverlay ? undefined : placeholder}
          aria-disabled={disabled}
          disabled={disabled}
          ref={coreInputRef}
          className={cx(globalClasses.input, styles.input(theme), showOverlay && globalClasses.masked, className)}
          value={maskState.typedValue}
          onChange={handleChange}
          onBeforeInput={handleBeforeInput}
          onKeyDown={handleKeyDown}
          onSelect={handleSelect}
          onPaste={handlePaste}
          onCopy={handleCopy}
          onCut={handleCut}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onInput={handleInput}
          onMouseDown={(e) => {
            handleMouseDown();
            rest.onMouseDown?.(e);
          }}
          onMouseUp={handleMouseUp}
          onScroll={syncOverlayScroll}
        />
        {showOverlay && (
          <MaskOverlay
            containerRef={overlayRef}
            typedValue={maskState.typedValue}
            displayValue={maskState.displayValue}
            selectionStart={selectionRange.start}
            selectionEnd={selectionRange.end}
            disabled={disabled}
            textAlign={rest.style?.textAlign}
            colored={colored}
          />
        )}
      </>
    );
  },
);
