import type { AriaAttributes, HTMLAttributes, ReactNode } from 'react';
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

import type { CommonProps } from '../../internal/CommonWrapper/index.js';
import { CommonWrapper } from '../../internal/CommonWrapper/index.js';
import type { NativeTimeInputRef } from '../../internal/NativeTimeInput/index.js';
import { NativeTimeInput } from '../../internal/NativeTimeInput/index.js';
import type { TimeInputRef } from '../../internal/TimeInput/index.js';
import { TimeInput } from '../../internal/TimeInput/index.js';
import { isIOS, isMobile } from '../../lib/client.js';
import {
  isKeyArrowDown,
  isKeyArrowLeft,
  isKeyArrowRight,
  isKeyArrowUp,
  isKeyBackspace,
  isKeyChar,
  isKeyDelete,
  isKeyEnter,
  isKeyEscape,
  isKeySpace,
  isKeyTab,
  isModShift,
  isShortcutSelectAll,
} from '../../lib/events/keyboard/identifiers.js';
import { forwardRefAndName } from '../../lib/forwardRefAndName.js';
import { useLocaleForControl } from '../../lib/locale/useLocaleForControl.js';
import { useStyles } from '../../lib/renderEnvironment/index.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import type { SizeProp } from '../../lib/types/props.js';
import { getRandomID } from '../../lib/utils.js';
import { scrollSelectedItemIntoView } from './helpers/scrollSelectedItemIntoView.js';
import { DIGIT_REGEXP, EMPTY_SEGMENT, EMPTY_VALUE, TimePickerDataTids } from './helpers/TimePicker.constants.js';
import {
  commitTimeSegmentOnLeave,
  deleteTimeSegmentDigit,
  formatDigitToTimeSegment,
  shiftTimeSegmentValue,
} from './helpers/TimePicker.editing.js';
import { getTimePickerPopupMaxHeight } from './helpers/TimePicker.layout.js';
import { getNextTimeSegment, getPreviousTimeSegment } from './helpers/TimePicker.selection.js';
import type { TimeFormat, TimeItem, TimeSegment } from './helpers/TimePicker.shared.js';
import {
  getEmptyDisplayValue,
  isTimeDisplayEmpty,
  isTimeValueOutOfRange,
  normalizeTimeValue,
  parsePastedTimeValue,
  replaceTimeSegment,
} from './helpers/TimePicker.value.js';
import { validateTimePicker } from './helpers/validateTimePicker.js';
import { useTimePickerDropdown } from './hooks/useTimePickerDropdown.js';
import { useTimePickerSelection } from './hooks/useTimePickerSelection.js';
import { useTimePickerValue } from './hooks/useTimePickerValue.js';
import { TimePickerLocaleHelper } from './locale/index.js';
import { getStyles } from './TimePicker.styles.js';
import { TimePickerMobilePopup } from './TimePickerMobilePopup.js';
import { TimePickerPopup } from './TimePickerPopup.js';

export interface TimePickerProps
  extends
    CommonProps,
    Pick<AriaAttributes, 'aria-describedby' | 'aria-label'>,
    Pick<HTMLAttributes<HTMLElement>, 'id'> {
  /** Устанавливает формат времени @default HH:mm */
  format?: TimeFormat;
  /** Определяет массив объектов с элементами в формате TimeItem. */
  items?: TimeItem[];
  /** Задает нижнюю границу времени. Элементы за границей становятся заблокированными. */
  minTime?: string;
  /** Задает верхнюю границу времени. Элементы за границей становятся заблокированными. */
  maxTime?: string;
  /** Значение поля @param value. */
  value?: string;
  /** Устанавливает фокус на поле ввода после окончания загрузки страницы @default false */
  autoFocus?: boolean;
  /** Делает компонент заблокированным. */
  disabled?: boolean;
  /** Переводит контрол в состояние валидации ошибки. */
  error?: boolean;
  /** Переводит контрол в состояние валидации предупреждения. */
  warning?: boolean;
  /** Включает нативный системный выбор времени на мобильных устройствах. */
  useMobileNativeTimePicker?: boolean;
  /** Расположение выпадающего меню. */
  menuPos?: 'top' | 'bottom';
  /** Выравнивание выпадающего меню. */
  menuAlign?: 'left' | 'right';
  /** Ширина выпадающего меню. По умолчанию — минимальная ширина поля ввода, расширяется по контенту. */
  menuWidth?: string | number;
  /** Задает ширину поля. */
  width?: string | number;
  /** Переопределяет иконку или скрывает, если передать `null`. */
  rightIcon?: React.ReactNode | (() => React.ReactNode);
  /** Устанавливает суффикс после значения и перед иконкой. */
  suffix?: ReactNode;
  /** Размер поля ввода и выпадающего меню. */
  size?: SizeProp;
  /** Устанавливает радиус скруглений углов.
   * @ignore */
  corners?: Partial<
    Pick<
      React.CSSProperties,
      'borderTopRightRadius' | 'borderBottomRightRadius' | 'borderBottomLeftRadius' | 'borderTopLeftRadius'
    >
  >;
  /** Задает функцию, которая вызывается при нажатии на контрол. */
  onClick?(event: React.MouseEvent<HTMLElement>): void;
  /**
   * Событие изменения значения `value` в поле.
   * Во процессе ввода значение частично нормализуется по сегментам, например `1` => `01`.
   * При потере фокуса возвращает полностью нормализованное значение в формате `HH:mm[:ss]`.
   */
  onValueChange?(value: string): void;
  /** Событие потери фокуса. */
  onBlur?(event: React.FocusEvent<HTMLElement>): void;
  /** Событие получения фокуса. */
  onFocus?(event: React.FocusEvent<HTMLElement>): void;
  /** Событие нажатия клавиши. */
  onKeyDown?(event: React.KeyboardEvent<HTMLElement>): void;
  /** Событие вставки из буфера. */
  onPaste?(event: React.ClipboardEvent<HTMLElement>): void;
}

export interface TimePickerRef {
  /** Устанавливает фокус на поле ввода. */
  focus(): void;
  /** Снимает фокус с поля ввода. */
  blur(): void;
  /** Закрывает выпадающее меню. */
  close(): void;
  /** Запускает анимацию blink у поля ввода времени. */
  blink(): void;
  /** Возвращает корневой DOM-узел компонента. */
  getRootNode(): HTMLElement | null;
}

export type TimePicker = TimePickerRef;

/** Поле с временем помогает пользователю быстро и удобно указать время в правильном формате.
 * В поле можно ввести время с клавиатуры, либо выбрать из выпадающего списка с помощью мыши (нужно активировать, см. примеры с пропом `items`).
 */
export const TimePicker = Object.assign(
  forwardRefAndName<TimePickerRef, TimePickerProps>('TimePicker', (props, ref) => {
    const {
      disabled,
      useMobileNativeTimePicker = false,
      format = 'HH:mm',
      size = 'small',
      items,
      menuPos,
      menuAlign,
      menuWidth,
      minTime,
      maxTime,
      rightIcon,
      suffix,
      corners,
      value,
      onValueChange,
      onFocus,
      onBlur,
      onClick,
      onKeyDown,
      onPaste,
      ...inputProps
    } = props;

    const theme = useContext(ThemeContext);

    const styles = useStyles(getStyles);
    const locale = useLocaleForControl('TimePicker', TimePickerLocaleHelper);

    const [isInputFocused, setIsInputFocused] = useState(false);

    const inputRef = useRef<TimeInputRef>(null);
    const mobileInputRef = useRef<TimeInputRef>(null);
    const nativeInputRef = useRef<NativeTimeInputRef>(null);
    const rootRef = useRef<HTMLSpanElement>(null);
    const itemRefs = useRef(new Map<number, HTMLSpanElement>());
    const isMouseFocusRef = useRef(false);
    const isMouseDownOnFragmentRef = useRef(false);
    const mouseDownSegmentRef = useRef<TimeSegment | null>(null);
    const popupIdRef = useRef(TimePickerDataTids.popup + getRandomID());

    const [isMobileDevice, setIsMobileDevice] = useState(false);
    const [canUseMobileNativeTimePicker, setCanUseMobileNativeTimePicker] = useState(false);

    const {
      editingValue,
      editingValueRef,
      setEditingValue,
      updateEditingValue,
      commitEditingValue,
      clearEditingValue,
    } = useTimePickerValue({ isInputFocused, format, value, onValueChange });

    const hasDropdown = (items?.length ?? 0) > 0;

    const resolvedItems = useMemo(
      () =>
        (items ?? []).map((item) => ({
          ...item,
          disabled: Boolean(item.disabled) || isTimeValueOutOfRange(item.value, format, minTime, maxTime),
        })),
      [maxTime, minTime, format, items],
    );

    const popupMaxHeight = getTimePickerPopupMaxHeight(size, theme);

    const ariaPlaceholder = format === 'HH:mm' ? locale.ariaPlaceholderHHMM : locale.ariaPlaceholderHHMMSS;

    const normalizedValue = normalizeTimeValue(editingValue, format);

    const selectedItemIndex = resolvedItems.findIndex(
      (item) => normalizeTimeValue(item.value, format) === normalizedValue,
    );

    const canUseMobileDropdownTimePicker = hasDropdown && isMobileDevice && !canUseMobileNativeTimePicker;

    let displayValue = editingValue;

    if (isInputFocused) {
      displayValue = editingValue === EMPTY_VALUE ? getEmptyDisplayValue(format) : editingValue;
    } else if (isTimeDisplayEmpty(editingValue)) {
      displayValue = EMPTY_VALUE;
    }

    const resetMouseInteractionState = useCallback(() => {
      isMouseFocusRef.current = false;
      isMouseDownOnFragmentRef.current = false;
      mouseDownSegmentRef.current = null;
    }, []);

    const normalizeCurrentSegmentIfNeeded = useCallback(
      (segment: TimeSegment) => {
        const nextDisplayValue = commitTimeSegmentOnLeave(
          editingValue === EMPTY_VALUE ? getEmptyDisplayValue(format) : editingValue,
          segment,
          format,
        );

        updateEditingValue(nextDisplayValue);
      },
      [editingValue, format, updateEditingValue],
    );

    const openNativeTimePicker = useCallback(() => {
      if (!canUseMobileNativeTimePicker || disabled) {
        return;
      }

      if (isIOS) {
        nativeInputRef.current?.focus();
      } else {
        nativeInputRef.current?.click();
      }
    }, [canUseMobileNativeTimePicker, disabled]);

    const {
      isDropdownOpened,
      highlightedItemIndex,
      openDropdown,
      closeDropdown,
      resetHighlightedItem,
      tryNavigateItems,
    } = useTimePickerDropdown({
      disabled,
      hasDropdown,
      items: resolvedItems,
      selectedItemIndex: selectedItemIndex >= 0 ? selectedItemIndex : null,
    });

    const popupId = popupIdRef.current;
    const activeDescendantId =
      hasDropdown && highlightedItemIndex !== null ? `${popupId}-item-${highlightedItemIndex}` : undefined;

    const getActiveInput = useCallback(
      () => (canUseMobileDropdownTimePicker && isDropdownOpened ? mobileInputRef.current : inputRef.current),
      [canUseMobileDropdownTimePicker, isDropdownOpened],
    );

    const { selection, selectedSegment, selectSegment, selectAll, syncSelectionWithDOM } = useTimePickerSelection({
      isInputFocused,
      format,
      displayValue,
      getInput: getActiveInput,
    });

    const closeOpenedDropdown = useCallback(() => {
      if (canUseMobileDropdownTimePicker && isDropdownOpened) {
        setIsInputFocused(false);
        resetMouseInteractionState();

        if (isTimeDisplayEmpty(editingValueRef.current)) {
          clearEditingValue();
        } else {
          commitEditingValue();
        }
      }

      closeDropdown();
    }, [
      canUseMobileDropdownTimePicker,
      clearEditingValue,
      closeDropdown,
      commitEditingValue,
      editingValueRef,
      isDropdownOpened,
      resetMouseInteractionState,
    ]);

    const selectItem = useCallback(
      (item: TimeItem) => {
        if (item.disabled) {
          return;
        }

        if (canUseMobileDropdownTimePicker) {
          setIsInputFocused(false);
          resetMouseInteractionState();
        }

        updateEditingValue(item.value);
        closeDropdown();
      },
      [canUseMobileDropdownTimePicker, closeDropdown, resetMouseInteractionState, updateEditingValue],
    );

    const isSelectHighlightedItem = useCallback(() => {
      if (highlightedItemIndex === null) {
        return false;
      }

      const item = resolvedItems[highlightedItemIndex];

      if (!item || item.disabled) {
        return true;
      }

      selectItem(item);
      return true;
    }, [highlightedItemIndex, resolvedItems, selectItem]);

    const focusInput = useCallback(() => {
      getActiveInput()?.focus();
    }, [getActiveInput]);

    const blurInput = useCallback(() => {
      getActiveInput()?.blur();
    }, [getActiveInput]);

    const closeInputDropdown = useCallback(() => {
      closeOpenedDropdown();
    }, [closeOpenedDropdown]);

    const blinkInput = useCallback(() => {
      getActiveInput()?.blink();
    }, [getActiveInput]);

    useImperativeHandle(
      ref,
      () => ({
        focus: focusInput,
        blur: blurInput,
        blink: blinkInput,
        close: closeInputDropdown,
        getRootNode: () => rootRef.current,
      }),
      [blinkInput, blurInput, closeInputDropdown, focusInput, getActiveInput],
    );

    useLayoutEffect(() => {
      if (!isDropdownOpened) {
        return;
      }

      const selectedIndex = highlightedItemIndex ?? selectedItemIndex;

      if (selectedIndex < 0) {
        return;
      }

      const targetNode = itemRefs.current.get(selectedIndex);

      if (targetNode) {
        scrollSelectedItemIntoView(targetNode);
      }
    }, [highlightedItemIndex, isDropdownOpened, selectedItemIndex]);

    useEffect(() => {
      if (disabled && isDropdownOpened) {
        closeOpenedDropdown();
      }
    }, [closeOpenedDropdown, disabled, isDropdownOpened]);

    useEffect(() => {
      setIsMobileDevice(Boolean(isMobile));
      setCanUseMobileNativeTimePicker(useMobileNativeTimePicker && Boolean(isMobile));
    }, [useMobileNativeTimePicker]);

    const handleCloseMobileDropdown = useCallback(() => {
      closeOpenedDropdown();
    }, [closeOpenedDropdown]);

    const handleFocusBySource = (event: React.FocusEvent<HTMLInputElement>, isMobilePopupInput: boolean) => {
      if (canUseMobileNativeTimePicker) {
        openNativeTimePicker();
        onFocus?.(event);
        return;
      }

      if (canUseMobileDropdownTimePicker && !isMobilePopupInput) {
        openDropdown();
        return;
      }

      setIsInputFocused(true);
      openDropdown();

      if (isMouseDownOnFragmentRef.current && !isInputFocused) {
        if (isTimeDisplayEmpty(editingValueRef.current)) {
          selectSegment('hours');
        } else if (mouseDownSegmentRef.current) {
          selectSegment(mouseDownSegmentRef.current);
        }
      } else {
        selectSegment('hours');
      }

      onFocus?.(event);
    };

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => handleFocusBySource(event, false);

    const handleMobileFocus = (event: React.FocusEvent<HTMLInputElement>) => handleFocusBySource(event, true);

    const handleBlurBySource = (event: React.FocusEvent<HTMLInputElement>, isMobilePopupInput: boolean) => {
      if (canUseMobileNativeTimePicker) {
        onBlur?.(event);
        return;
      }

      if (canUseMobileDropdownTimePicker && !isMobilePopupInput) {
        return;
      }

      setIsInputFocused(false);
      resetMouseInteractionState();

      if (isMobilePopupInput) {
        onBlur?.(event);
        return;
      }

      closeDropdown();

      if (isTimeDisplayEmpty(editingValueRef.current)) {
        clearEditingValue();
        onBlur?.(event);
        return;
      }

      commitEditingValue();
      onBlur?.(event);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => handleBlurBySource(event, false);

    const handleMobileBlur = (event: React.FocusEvent<HTMLInputElement>) => handleBlurBySource(event, true);

    const handleClickBySource = (event: React.MouseEvent<HTMLInputElement>, isMobilePopupInput: boolean) => {
      if (canUseMobileNativeTimePicker) {
        openNativeTimePicker();
        onClick?.(event);
        return;
      }

      if (canUseMobileDropdownTimePicker && !isMobilePopupInput) {
        openDropdown();
        onClick?.(event);
        return;
      }

      openDropdown();

      onClick?.(event);
    };

    const handleClick = (event: React.MouseEvent<HTMLInputElement>) => handleClickBySource(event, false);

    const handleMobileClick = (event: React.MouseEvent<HTMLInputElement>) => handleClickBySource(event, true);

    const handleMouseDownCaptureBySource = (event: React.MouseEvent<HTMLInputElement>, isMobilePopupInput: boolean) => {
      if (canUseMobileNativeTimePicker || (canUseMobileDropdownTimePicker && !isMobilePopupInput)) {
        return;
      }

      const currentInputRef = isMobilePopupInput ? mobileInputRef : inputRef;
      const segment = currentInputRef.current?.getSegment(event.target) ?? null;
      const isFragment = segment !== null;

      if (isInputFocused && !isFragment) {
        event.preventDefault();
      }

      isMouseFocusRef.current = !isInputFocused;
      isMouseDownOnFragmentRef.current = isFragment;
      mouseDownSegmentRef.current = segment;
    };

    const handleMouseDownCapture = (event: React.MouseEvent<HTMLInputElement>) =>
      handleMouseDownCaptureBySource(event, false);

    const handleMobileMouseDownCapture = (event: React.MouseEvent<HTMLInputElement>) =>
      handleMouseDownCaptureBySource(event, true);

    const handleMouseUpBySource = (_event: React.MouseEvent<HTMLInputElement>, isMobilePopupInput: boolean) => {
      if (disabled || canUseMobileNativeTimePicker || (canUseMobileDropdownTimePicker && !isMobilePopupInput)) {
        return;
      }

      syncSelectionWithDOM();
    };

    const handleMouseUp = (event: React.MouseEvent<HTMLInputElement>) => handleMouseUpBySource(event, false);

    const handleMobileMouseUp = (event: React.MouseEvent<HTMLInputElement>) => handleMouseUpBySource(event, true);

    const handleSelectSegmentByMouseBySource = (segment: TimeSegment, isMobilePopupInput: boolean) => {
      if (canUseMobileNativeTimePicker) {
        openNativeTimePicker();
        return;
      }

      if (canUseMobileDropdownTimePicker && !isMobilePopupInput) {
        openDropdown();
        return;
      }

      openDropdown();

      if (disabled) {
        return;
      }

      if (!(isMouseFocusRef.current && isTimeDisplayEmpty(editingValueRef.current)) && selectedSegment !== segment) {
        normalizeCurrentSegmentIfNeeded(selectedSegment);
        selectSegment(segment);
      }

      resetMouseInteractionState();
    };

    const handleSelectSegmentByMouse = (segment: TimeSegment) => handleSelectSegmentByMouseBySource(segment, false);

    const handleMobileSelectSegmentByMouse = (segment: TimeSegment) =>
      handleSelectSegmentByMouseBySource(segment, true);

    const handleKeyDownBySource = (event: React.KeyboardEvent<HTMLInputElement>, isMobilePopupInput: boolean) => {
      onKeyDown?.(event);

      if (event.defaultPrevented || disabled) {
        return;
      }

      if (canUseMobileNativeTimePicker) {
        openNativeTimePicker();
        return;
      }

      if (canUseMobileDropdownTimePicker && !isMobilePopupInput) {
        openDropdown();
        return;
      }

      if (isShortcutSelectAll(event)) {
        event.preventDefault();
        selectAll();
        return;
      }

      if (event.altKey || event.ctrlKey || event.metaKey) {
        return;
      }

      const currentDisplayValue = displayValue;
      const currentSegment = selectedSegment;
      const hasAllSelectionInState = selection === 'all';
      const hasAllSelectionInDOM = getActiveInput()?.isAllSelected() ?? false;
      const shouldHandleAsAllSelection = hasAllSelectionInState || hasAllSelectionInDOM;

      if (hasAllSelectionInDOM && !hasAllSelectionInState) {
        syncSelectionWithDOM();
      }

      if (shouldHandleAsAllSelection && (isKeyBackspace(event) || isKeyDelete(event))) {
        event.preventDefault();
        updateEditingValue(getEmptyDisplayValue(format));
        selectSegment('hours');
        return;
      }

      if (DIGIT_REGEXP.test(event.key)) {
        event.preventDefault();

        resetHighlightedItem();

        const nextDigitInputValue = shouldHandleAsAllSelection ? getEmptyDisplayValue(format) : currentDisplayValue;

        const nextDigitInputSegment = shouldHandleAsAllSelection ? 'hours' : currentSegment;

        const result = formatDigitToTimeSegment(nextDigitInputValue, nextDigitInputSegment, event.key, format);

        if (result.shouldBlink) {
          getActiveInput()?.blink();
          return;
        }

        updateEditingValue(result.nextValue);
        selectSegment(result.selectedSegment);
        return;
      }

      if (isKeyArrowLeft(event)) {
        event.preventDefault();
        normalizeCurrentSegmentIfNeeded(currentSegment);
        selectSegment(getPreviousTimeSegment(currentSegment) ?? currentSegment);
        return;
      }

      if (isModShift(isKeyTab)(event)) {
        const previousSegment = getPreviousTimeSegment(currentSegment);

        if (previousSegment) {
          event.preventDefault();
          normalizeCurrentSegmentIfNeeded(currentSegment);
          selectSegment(previousSegment);
        }
        return;
      }

      if (isKeyArrowRight(event)) {
        event.preventDefault();
        normalizeCurrentSegmentIfNeeded(currentSegment);
        selectSegment(getNextTimeSegment(currentSegment, format) ?? currentSegment);
        return;
      }

      if (isKeyTab(event)) {
        const nextSegment = getNextTimeSegment(currentSegment, format);

        if (nextSegment) {
          event.preventDefault();
          normalizeCurrentSegmentIfNeeded(currentSegment);
          selectSegment(nextSegment);
        }
        return;
      }

      if (isKeyArrowUp(event) || isKeyArrowDown(event)) {
        event.preventDefault();

        const itemStep = isKeyArrowUp(event) ? -1 : 1;

        if (tryNavigateItems(itemStep)) {
          return;
        }

        const step = isKeyArrowUp(event) ? 1 : -1;

        updateEditingValue(shiftTimeSegmentValue(currentDisplayValue, currentSegment, step, format));
        selectSegment(currentSegment);
        return;
      }

      if (isKeyBackspace(event)) {
        event.preventDefault();

        let nextDisplayValue = deleteTimeSegmentDigit(currentDisplayValue, currentSegment, format);
        let nextSegment = currentSegment;

        if (nextDisplayValue === currentDisplayValue) {
          const previousSegment = getPreviousTimeSegment(currentSegment);

          if (previousSegment) {
            nextSegment = previousSegment;
            nextDisplayValue = deleteTimeSegmentDigit(currentDisplayValue, previousSegment, format);
          }
        }

        updateEditingValue(nextDisplayValue);
        selectSegment(nextSegment);
        return;
      }

      if (isKeyDelete(event)) {
        event.preventDefault();
        updateEditingValue(replaceTimeSegment(currentDisplayValue, currentSegment, EMPTY_SEGMENT, format));
        selectSegment(currentSegment);
        return;
      }

      if (isKeyEscape(event)) {
        if (isDropdownOpened) {
          event.preventDefault();
          closeDropdown();
        }
        return;
      }

      if (isKeyEnter(event)) {
        if (isSelectHighlightedItem()) {
          event.preventDefault();
        }
        return;
      }

      if (isKeySpace(event)) {
        event.preventDefault();

        const nextSegment = getNextTimeSegment(currentSegment, format);
        const nextDisplayValue = commitTimeSegmentOnLeave(currentDisplayValue, currentSegment, format);

        updateEditingValue(nextDisplayValue);

        if (nextSegment) {
          selectSegment(nextSegment);
        } else {
          selectSegment(currentSegment);
        }
        return;
      }

      if (isKeyChar(event)) {
        event.preventDefault();
        getActiveInput()?.blink();
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => handleKeyDownBySource(event, false);

    const handleMobileKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => handleKeyDownBySource(event, true);

    const handlePasteBySource = (event: React.ClipboardEvent<HTMLInputElement>, isMobilePopupInput: boolean) => {
      onPaste?.(event);

      if (event.defaultPrevented || disabled) {
        return;
      }

      if (canUseMobileNativeTimePicker || (canUseMobileDropdownTimePicker && !isMobilePopupInput)) {
        return;
      }

      const pastedValue = event.clipboardData?.getData('text');
      const nextDisplayValue = parsePastedTimeValue(pastedValue, format);

      event.preventDefault();

      if (isTimeDisplayEmpty(nextDisplayValue)) {
        getActiveInput()?.blink();
        return;
      }

      updateEditingValue(nextDisplayValue);
      selectSegment('hours');
    };

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => handlePasteBySource(event, false);

    const handleMobilePaste = (event: React.ClipboardEvent<HTMLInputElement>) => handlePasteBySource(event, true);

    const handleNativeValueChange = useCallback(
      (nextValue: string) => {
        setEditingValue(nextValue);
        onValueChange?.(nextValue);
      },
      [onValueChange, setEditingValue],
    );

    return (
      <CommonWrapper {...props}>
        <span ref={rootRef} className={styles.root()} data-tid={TimePickerDataTids.root}>
          <TimeInput
            {...inputProps}
            data-tid={TimePickerDataTids.input}
            ref={inputRef}
            disabled={disabled}
            hasDropdown={hasDropdown}
            size={size}
            format={format}
            corners={corners}
            rightIcon={rightIcon}
            suffix={suffix}
            value={displayValue}
            aria-haspopup={hasDropdown ? 'listbox' : undefined}
            aria-expanded={hasDropdown && isDropdownOpened ? true : undefined}
            aria-controls={hasDropdown && isDropdownOpened ? popupId : undefined}
            aria-activedescendant={activeDescendantId}
            aria-placeholder={ariaPlaceholder}
            onClick={handleClick}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onMouseDownCapture={handleMouseDownCapture}
            onMouseUp={handleMouseUp}
            onKeyDown={handleKeyDown}
            onSelectSegment={handleSelectSegmentByMouse}
            onPaste={handlePaste}
          />

          {canUseMobileNativeTimePicker && (
            <NativeTimeInput
              data-tid={TimePickerDataTids.nativeInput}
              disabled={disabled}
              ref={nativeInputRef}
              format={format}
              minTime={minTime}
              maxTime={maxTime}
              value={editingValue}
              onValueChange={handleNativeValueChange}
            />
          )}

          {canUseMobileDropdownTimePicker && isDropdownOpened && (
            <TimePickerMobilePopup
              id={popupId}
              opened={isDropdownOpened}
              value={displayValue}
              inputRef={mobileInputRef}
              disabled={disabled}
              format={format}
              size={size}
              rightIcon={rightIcon}
              suffix={suffix}
              resolvedItems={resolvedItems}
              highlightedItemIndex={highlightedItemIndex}
              normalizedValue={normalizedValue}
              itemRefs={itemRefs}
              error={props.error}
              warning={props.warning}
              aria-describedby={props['aria-describedby']}
              aria-label={props['aria-label']}
              aria-placeholder={ariaPlaceholder}
              onFocus={handleMobileFocus}
              onBlur={handleMobileBlur}
              onClick={handleMobileClick}
              onKeyDown={handleMobileKeyDown}
              onMouseDownCapture={handleMobileMouseDownCapture}
              onMouseUp={handleMobileMouseUp}
              onPaste={handleMobilePaste}
              onSelectSegment={handleMobileSelectSegmentByMouse}
              onSelectItem={selectItem}
              onCloseRequest={handleCloseMobileDropdown}
            />
          )}

          {hasDropdown &&
            !canUseMobileNativeTimePicker &&
            !canUseMobileDropdownTimePicker &&
            isDropdownOpened &&
            rootRef.current && (
              <TimePickerPopup
                id={popupId}
                anchorElement={rootRef.current}
                menuPos={menuPos}
                menuAlign={menuAlign}
                menuWidth={menuWidth}
                popupMaxHeight={popupMaxHeight}
                format={format}
                size={size}
                resolvedItems={resolvedItems}
                highlightedItemIndex={highlightedItemIndex}
                normalizedValue={normalizedValue}
                itemRefs={itemRefs}
                onSelectItem={selectItem}
              />
            )}
        </span>
      </CommonWrapper>
    );
  }),
  { validate: validateTimePicker },
);
