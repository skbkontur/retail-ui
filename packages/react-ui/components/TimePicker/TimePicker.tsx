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
import { extractCommonProps } from '../../internal/CommonWrapper/utils/extractCommonProps.js';
import { LoadingIcon } from '../../internal/icons2022/LoadingIcon.js';
import type { NativeTimeInputRef } from '../../internal/NativeTimeInput/index.js';
import { NativeTimeInput } from '../../internal/NativeTimeInput/index.js';
import type { TimeInputRef } from '../../internal/TimeInput/index.js';
import { TimeInput } from '../../internal/TimeInput/index.js';
import { useTimePickerDropdown } from '../../internal/TimePicker/useTimePickerDropdown.js';
import { useTimePickerSelection } from '../../internal/TimePicker/useTimePickerSelection.js';
import { useTimePickerSource } from '../../internal/TimePicker/useTimePickerSource.js';
import { useTimePickerValue } from '../../internal/TimePicker/useTimePickerValue.js';
import { isIOS } from '../../lib/client.js';
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
import type { MenuItemState } from '../MenuItem/index.js';
import { useResponsiveLayout } from '../ResponsiveLayout/index.js';
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
import {
  getTimeItemValue,
  isNavigableMenuElement,
  isTimeMenuItem,
  type TimeFormat,
  type TimeItem,
  type TimePickerMenuItem,
  type TimeItemValue,
  type TimePickerSource,
  type TimeSegment,
} from './helpers/TimePicker.shared.js';
import {
  filterTimeItems,
  getEmptyDisplayValue,
  getTimeFilterQuery,
  isTimeDisplayEmpty,
  normalizeTimeValue,
  parsePastedTimeValue,
  replaceTimeSegment,
  resolveTimeItems,
} from './helpers/TimePicker.value.js';
import { validateTimePicker } from './helpers/validateTimePicker.js';
import { TimePickerLocaleHelper } from './locale/index.js';
import { getStyles } from './TimePicker.styles.js';
import { TimePickerMobilePopup } from './TimePickerMobilePopup.js';
import { TimePickerPopup } from './TimePickerPopup.js';

/** Пустой список для клавиатуры: не создает новую ссылку на каждый рендер. */
const EMPTY_MENU_ITEMS: Array<TimePickerMenuItem<TimeItemValue>> = [];

export interface TimePickerProps<T extends TimeItemValue = string>
  extends
    CommonProps,
    Pick<AriaAttributes, 'aria-describedby' | 'aria-label'>,
    Pick<HTMLAttributes<HTMLElement>, 'id'> {
  /** Устанавливает формат времени @default HH:mm */
  format?: TimeFormat;
  /** Задает источник элементов выпадающего списка: массив либо функцию запроса,
   * которая возвращает массив или Promise с массивом.
   * Запрос — это введенные цифры сегментов с сохранением их позиций: `12`, `12:3`, а если заполнены только минуты — `:30`.
   * Элементы задаются либо строками со временем — `'09:00'`, — либо объектами `{ value, label?, disabled? }`
   * с любыми дополнительными полями; смешивать формы в одном источнике нельзя, это ошибка типов.
   * В `onValueChange` приходит только время выбранного элемента: сам элемент можно найти в `source` по нему.
   * Кроме значений времени можно передать React-элементы — например `MenuHeader` или `MenuItem`:
   * они отображаются в меню, но не участвуют в фильтрации и выборе значения.
   * Фильтрацию, индикацию загрузки и повторные запросы компонент берет на себя,
   * подробности — в разделе документации про выпадающий список.
   * Замена самой функции уже открытый список не перезапрашивает: как в `ComboBox`,
   * актуальная функция используется при следующем запросе. */
  source?: TimePickerSource<T>;
  /** Отрисовывает элемент со временем в выпадающем списке. Не применяется к React-элементам из `source`.
   * Время элемента приведено к формату поля, как и везде в компоненте:
   * элемент `'9:00'` приходит как `'09:00'`, а `{ value: '09:00:00' }` в формате `HH:mm` — как `{ value: '09:00' }`.
   * Остальные поля элемента сохраняются. */
  renderItem?: (item: T, state: MenuItemState) => ReactNode;
  /** Задает нижнюю границу времени. Элементы за границей становятся заблокированными. */
  minTime?: string;
  /** Задает верхнюю границу времени. Элементы за границей становятся заблокированными. */
  maxTime?: string;
  /** Задает значение поля: время в формате `HH:mm[:ss]`.
   * Пустое значение можно передать как `''` или `null`.
   * Если проп не задан, компонент неконтролируемый: он хранит значение сам и сообщает о нем через `onValueChange`. */
  value?: string | null;
  /** Устанавливает фокус на поле ввода после окончания загрузки страницы @default false */
  autoFocus?: boolean;
  /** Делает компонент заблокированным. */
  disabled?: boolean;
  /** Переводит контрол в состояние валидации ошибки. */
  error?: boolean;
  /** Переводит контрол в состояние валидации предупреждения. */
  warning?: boolean;
  /** Включает нативный системный выбор времени в мобильной верстке.
   * Мобильная верстка определяется медиавыражением темы, как в остальных адаптивных контролах. */
  useMobileNativeTimePicker?: boolean;
  /** Расположение выпадающего меню. */
  menuPos?: 'top' | 'bottom';
  /** Выравнивание выпадающего меню. */
  menuAlign?: 'left' | 'right';
  /** Ширина выпадающего меню. По умолчанию — минимальная ширина поля ввода, расширяется по контенту. */
  menuWidth?: string | number;
  /** Задает ширину поля. */
  width?: string | number;
  /** Переопределяет иконку или скрывает, если передать `null`.
   * Пока элементы уже показаны, а новый запрос к функции-источнику еще выполняется,
   * вместо иконки показывается индикатор загрузки. */
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
   * Событие изменения значения `value`.
   * Вызывается при коммите значения: потере фокуса, нажатии Enter, выборе элемента из списка
   * или изменении в нативном пикере.
   * Время полностью нормализовано до формата `HH:mm[:ss]`, а пустое значение приходит пустой строкой.
   * Элементы-объекты из `source` наружу не приходят: по времени их можно найти в самом `source`.
   */
  onValueChange?(time: string): void;
  /**
   * Событие изменения значения в процессе ввода.
   * Значение частично нормализуется по сегментам, например `1` => `01`, незаполненный хвост отбрасывается.
   * Промежуточное значение может не соответствовать полной форме `HH:mm[:ss]`, поэтому тип — произвольная строка.
   */
  onInputValueChange?(value: string): void;
  /**
   * Событие некорректного ввода: пользователь ввел или вставил значение, которое не может быть временем.
   * Вызывается с нажатой клавишей — например `а` или `,` — либо со значением из буфера,
   * из которого не получилось собрать время.
   * Значение вне диапазона `minTime`/`maxTime` некорректным вводом не считается,
   * его можно проверить через `TimePicker.validate`.
   * Вторым аргументом передается метод вспыхивания рамки поля.
   * Если обработчик не задан, поле вспыхивает само.
   * Обработчик может подставить значение вместо некорректного ввода — например разобрать вставку
   * в собственном формате: возвращенное время коммитится и приходит в `onValueChange`,
   * `null` очищает поле, а `undefined` оставляет значение прежним.
   */
  onUnexpectedInput?(value: string, blink: () => void): void | string | null;
  /**
   * Событие потери фокуса.
   * Вызывается после коммита значения и следующего за ним рендера,
   * поэтому обработчик видит уже измененное значение — например при выборе элемента в мобильном попапе.
   * Из-за этого событие приходит отложенно и его `currentTarget` уже пуст: элемент читайте из `target`.
   */
  onBlur?(event: React.FocusEvent<HTMLElement>): void;
  /** Событие получения фокуса. */
  onFocus?(event: React.FocusEvent<HTMLElement>): void;
  /** Событие нажатия клавиши. */
  onKeyDown?(event: React.KeyboardEvent<HTMLElement>): void;
  /** Событие вставки из буфера. */
  onPaste?(event: React.ClipboardEvent<HTMLElement>): void;
}

export interface TimePickerRef {
  /** Устанавливает фокус на поле ввода.
   * С опцией `withoutOpenDropdown` фокус не открывает выпадающее меню. */
  focus(options?: { withoutOpenDropdown?: boolean }): void;
  /** Снимает фокус с поля ввода. */
  blur(): void;
  /** Открывает выпадающее меню, установив фокус на поле.
   * В режиме нативного пикера открывает системный пикер. */
  open(): void;
  /** Закрывает выпадающее меню. */
  close(): void;
  /** Запускает анимацию blink у поля ввода времени. */
  blink(): void;
  /** Возвращает корневой DOM-узел компонента. */
  getRootNode(): HTMLElement | null;
}

export type TimePicker = TimePickerRef;

interface TimePickerComponent {
  /** Строковый режим: элементы source — строки со временем. */
  (props: TimePickerProps<string> & React.RefAttributes<TimePickerRef>): React.ReactElement | null;
  /** Объектный режим: элементы source — объекты, расширяющие `{ value: string }`. */
  <T extends TimeItem>(props: TimePickerProps<T> & React.RefAttributes<TimePickerRef>): React.ReactElement | null;
  displayName?: string;
  __KONTUR_REACT_UI__: string;
  /** Проверяет, что значение полностью заполнено, соответствует формату и попадает в диапазон `minTime`/`maxTime`. */
  validate: typeof validateTimePicker;
}

/** Поле с временем помогает пользователю быстро и удобно указать время в правильном формате.
 * В поле можно ввести время с клавиатуры либо выбрать из выпадающего списка,
 * передав массив или функцию в проп `source`.
 */
export const TimePicker = Object.assign(
  forwardRefAndName<TimePickerRef, TimePickerProps<TimeItemValue>>('TimePicker', (props, ref) => {
    // `className`, `style` и data-атрибуты применяет `CommonWrapper` к корневому элементу,
    // поэтому в поле ввода они не должны уехать повторно.
    const [, notCommonProps] = extractCommonProps(props);

    const {
      disabled,
      useMobileNativeTimePicker = false,
      format = 'HH:mm',
      size = 'small',
      source,
      renderItem,
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
      onInputValueChange,
      onUnexpectedInput,
      onFocus,
      onBlur,
      onClick,
      onKeyDown,
      onPaste,
      ...inputProps
    } = notCommonProps;

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
    /** Сегмент, по которому нажали мышью, или `null`, если нажали мимо сегментов. */
    const mouseDownSegmentRef = useRef<TimeSegment | null>(null);
    const mobileBlurEventRef = useRef<React.FocusEvent<HTMLInputElement> | null>(null);
    const shouldSkipOpenOnFocusRef = useRef(false);
    /**
     * Контрол считает себя сфокусированным: о фокусе сообщено наружу, а сессия ввода не закончена.
     * Внутри одной сессии фокус может переезжать между полем и инпутом мобильного попапа —
     * например вместе со сменой верстки, — и такой переезд не начинает сессию заново.
     */
    const isControlFocusedRef = useRef(false);
    /** Фокус, который контрол сам переводит в скрытый нативный инпут, открывая системный пикер. */
    const isMovingFocusToNativePickerRef = useRef(false);
    const popupIdRef = useRef(TimePickerDataTids.popup + getRandomID());

    /**
     * Мобильная версия включается медиавыражением темы, как в ComboBox:
     * поле переключается между мобильной и десктопной версией вместе с версткой страницы.
     */
    const { isMobile: isMobileLayout } = useResponsiveLayout();
    const canUseMobileNativeTimePicker = useMobileNativeTimePicker && isMobileLayout;

    const isSourceFunction = typeof source === 'function';
    const hasDropdown = isSourceFunction || (Array.isArray(source) && source.length > 0);

    const [isDropdownOpened, setIsDropdownOpened] = useState(false);
    const [isEditedAfterOpen, setIsEditedAfterOpen] = useState(false);

    const onBlurRef = useRef(onBlur);
    onBlurRef.current = onBlur;

    const pendingBlurEventRef = useRef<React.FocusEvent<HTMLInputElement> | null>(null);
    const [blurRequestId, setBlurRequestId] = useState(0);

    /**
     * Завершает сессию фокуса и откладывает `onBlur` до конца рендера, как это делает ComboBox.
     * Значение коммитится синхронно с потерей фокуса, поэтому вызванный тут же `onBlur`
     * попал бы в обработчик с состоянием родителя до изменения значения — например с пустым временем.
     * Событие может отсутствовать: сессия все равно закрывается, но наружу ничего не уходит.
     */
    const emitBlur = useCallback((event: React.FocusEvent<HTMLInputElement> | null) => {
      if (!isControlFocusedRef.current) {
        return;
      }

      isControlFocusedRef.current = false;

      if (!event || !onBlurRef.current) {
        return;
      }

      event.persist();
      pendingBlurEventRef.current = event;
      setBlurRequestId((currentId) => currentId + 1);
    }, []);

    const flushPendingBlur = useCallback(() => {
      const pendingBlurEvent = pendingBlurEventRef.current;

      if (!pendingBlurEvent) {
        return;
      }

      pendingBlurEventRef.current = null;
      onBlurRef.current?.(pendingBlurEvent);
    }, []);

    useEffect(flushPendingBlur, [blurRequestId, flushPendingBlur]);

    /** Родитель мог убрать поле в ответ на коммит значения — отложенное событие все равно должно уйти. */
    useEffect(() => flushPendingBlur, [flushPendingBlur]);

    const {
      editingValue,
      editingValueRef,
      committedValue,
      updateEditingValue,
      commitEditingValue,
      commitValue,
      commitSelectedValue,
    } = useTimePickerValue({
      isInputFocused,
      format,
      externalValue: value ?? EMPTY_VALUE,
      isValueControlled: value !== undefined,
      onCommitValue: onValueChange,
      onInputValueChange,
    });

    const filterQuery = isEditedAfterOpen ? getTimeFilterQuery(editingValue, format) : EMPTY_VALUE;

    const {
      items: sourceValueItems,
      fetchedQuery: fetchedItemsQuery,
      isLoading: isLoadingItems,
      isFailed: isSourceFailed,
      retry: retrySource,
    } = useTimePickerSource<TimeItemValue>({ source, format, isDropdownOpened, filterQuery });

    const resolvedItems = useMemo(
      () => resolveTimeItems(filterTimeItems(sourceValueItems, filterQuery, format), format, minTime, maxTime),
      [filterQuery, format, maxTime, minTime, sourceValueItems],
    );

    const popupMaxHeight = getTimePickerPopupMaxHeight(size, theme);

    const ariaPlaceholder = format === 'HH:mm' ? locale.ariaPlaceholderHHMM : locale.ariaPlaceholderHHMMSS;

    /**
     * Время, отмеченное в меню выбранным.
     * Пока пользователь не начал править значение при открытом меню, это то же время, что в поле.
     * С началом правки отмечено остается закоммиченное значение: набор фильтра — например `10` —
     * не должен отмечать элемент `10:00` как уже выбранный.
     */
    const selectedValue = normalizeTimeValue(isEditedAfterOpen ? committedValue : editingValue, format);

    const selectedItemIndex = resolvedItems.findIndex((item) => isTimeMenuItem(item) && item.value === selectedValue);

    let autoHighlightKey: string | null = null;

    if (filterQuery !== EMPTY_VALUE) {
      if (isSourceFunction) {
        if (!isLoadingItems && fetchedItemsQuery === filterQuery) {
          autoHighlightKey = `source-function:${filterQuery}`;
        }
      } else {
        autoHighlightKey = `source-array:${filterQuery}`;
      }
    }

    const canUseMobileDropdownTimePicker = hasDropdown && isMobileLayout && !canUseMobileNativeTimePicker;
    /** Ввод идет в мобильном попапе: он открыт, а нативного пикера в этом режиме нет. */
    const isMobileDropdownActive = canUseMobileDropdownTimePicker && isDropdownOpened;

    /**
     * Меню с одними лишь заголовками и разделителями показывать не о чем,
     * поэтому при активном фильтре нужен хотя бы один подошедший элемент со временем.
     */
    const hasDropdownContent =
      isLoadingItems ||
      isSourceFailed ||
      (filterQuery === EMPTY_VALUE ? resolvedItems.length > 0 : resolvedItems.some(isTimeMenuItem));

    /**
     * Элементы, с которыми работает клавиатура.
     * Пока меню скрыто, их нет: иначе стрелки ходили бы по невидимому списку,
     * а Enter выбирал бы невидимый элемент вместо коммита введенного времени.
     */
    const menuItems = hasDropdownContent ? resolvedItems : EMPTY_MENU_ITEMS;

    const inputRightIcon =
      isLoadingItems && resolvedItems.length > 0 ? (
        <span data-tid={TimePickerDataTids.inputLoading}>
          <LoadingIcon size={size} />
        </span>
      ) : (
        rightIcon
      );

    /** Сфокусированное поле всегда показывает сегменты, а пустое без фокуса — ничего. */
    const getDisplayValue = (): string => {
      if (isInputFocused) {
        return editingValue || getEmptyDisplayValue(format);
      }

      return isTimeDisplayEmpty(editingValue) ? EMPTY_VALUE : editingValue;
    };

    const displayValue = getDisplayValue();

    const resetMouseInteractionState = useCallback(() => {
      isMouseFocusRef.current = false;
      mouseDownSegmentRef.current = null;
    }, []);

    const updateEditingValueAfterUserEdit = useCallback(
      (nextEditingValue: string) => {
        if (hasDropdown && editingValueRef.current !== nextEditingValue) {
          setIsEditedAfterOpen(true);
        }

        updateEditingValue(nextEditingValue);
      },
      [editingValueRef, hasDropdown, updateEditingValue],
    );

    const normalizeCurrentSegmentIfNeeded = useCallback(
      (segment: TimeSegment) => {
        const nextDisplayValue = commitTimeSegmentOnLeave(
          editingValue === EMPTY_VALUE ? getEmptyDisplayValue(format) : editingValue,
          segment,
          format,
        );

        updateEditingValueAfterUserEdit(nextDisplayValue);
      },
      [editingValue, format, updateEditingValueAfterUserEdit],
    );

    const openNativeTimePicker = useCallback(() => {
      if (!canUseMobileNativeTimePicker || disabled) {
        return;
      }

      // На iOS системный пикер открывается только фокусом, поэтому фокус уходит из поля в скрытый инпут.
      isMovingFocusToNativePickerRef.current = true;

      if (isIOS) {
        nativeInputRef.current?.focus();
      } else {
        nativeInputRef.current?.click();
      }

      isMovingFocusToNativePickerRef.current = false;
    }, [canUseMobileNativeTimePicker, disabled]);

    /** Фокус ушел в скрытый нативный инпут: для внешнего мира контрол остается активным. */
    const isFocusMovedToNativePicker = (event: React.FocusEvent<HTMLInputElement>): boolean =>
      isMovingFocusToNativePickerRef.current ||
      (nativeInputRef.current !== null && event.relatedTarget === nativeInputRef.current.getNode());

    const { highlightedItemIndex, openDropdown, closeDropdown, resetHighlightedItem, tryNavigateItems } =
      useTimePickerDropdown({
        disabled,
        hasDropdown,
        items: menuItems,
        selectedItemIndex: selectedItemIndex >= 0 ? selectedItemIndex : null,
        autoHighlightKey,
        isDropdownOpened,
        setIsDropdownOpened,
      });

    /**
     * Фильтрация начинается только после правки значения при открытом меню.
     * Состояние живет ровно столько, сколько открыто меню: правка, которая заново открывает меню,
     * сохраняет свой запрос, а правка при закрытом меню — например стрелками — на список не влияет.
     */
    useEffect(() => {
      if (!isDropdownOpened && isEditedAfterOpen) {
        setIsEditedAfterOpen(false);
      }
    }, [isDropdownOpened, isEditedAfterOpen]);

    const popupId = popupIdRef.current;
    const highlightedMenuItem = highlightedItemIndex === null ? undefined : menuItems[highlightedItemIndex];

    /** Кастомный `MenuItem` может принести свой `id` — тогда указывать нужно именно на него. */
    const activeDescendantId = highlightedMenuItem
      ? ((isNavigableMenuElement(highlightedMenuItem) ? highlightedMenuItem.props.id : undefined) ??
        `${popupId}-item-${highlightedItemIndex}`)
      : undefined;

    const getActiveInput = useCallback(
      () => (isMobileDropdownActive ? mobileInputRef.current : inputRef.current),
      [isMobileDropdownActive],
    );

    const { selection, selectedSegment, selectSegment, selectAll, syncSelectionWithDOM } = useTimePickerSelection({
      isInputFocused,
      format,
      displayValue,
      getInput: getActiveInput,
    });

    const blinkInput = useCallback(() => {
      getActiveInput()?.blink();
    }, [getActiveInput]);

    const handleUnexpectedInput = useCallback(
      (unexpectedValue: string) => {
        if (!onUnexpectedInput) {
          blinkInput();
          return;
        }

        const returnedValue = onUnexpectedInput(unexpectedValue, blinkInput);

        if (returnedValue === undefined) {
          return;
        }

        if (returnedValue === null) {
          commitValue(EMPTY_VALUE);
          return;
        }

        commitSelectedValue(returnedValue);
      },
      [blinkInput, commitSelectedValue, commitValue, onUnexpectedInput],
    );

    /** Закрывает открытое меню: мобильный попап заодно завершает сессию ввода, как потеря фокуса. */
    const closeOpenedDropdown = useCallback(() => {
      if (isMobileDropdownActive) {
        // Фокус может остаться в любом из двух полей: инпут попапа не всегда получает его —
        // например мобильный браузер отказывается переводить фокус без жеста пользователя.
        // Гасим оба, чтобы закрытие попапа всегда давало событие потери фокуса.
        mobileInputRef.current?.blur();
        inputRef.current?.blur();
        setIsInputFocused(false);
        resetMouseInteractionState();
        closeDropdown();
        commitEditingValue();
        const blurEvent = mobileBlurEventRef.current;
        mobileBlurEventRef.current = null;
        emitBlur(blurEvent);
        return;
      }

      closeDropdown();
    }, [closeDropdown, commitEditingValue, emitBlur, isMobileDropdownActive, resetMouseInteractionState]);

    const selectItem = useCallback(
      (item: TimeItemValue) => {
        commitSelectedValue(getTimeItemValue(item));
        closeOpenedDropdown();
      },
      [closeOpenedDropdown, commitSelectedValue],
    );

    const isSelectHighlightedItem = useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (highlightedItemIndex === null) {
          return false;
        }

        const resolvedItem = menuItems[highlightedItemIndex];

        if (!resolvedItem) {
          return true;
        }

        if (isNavigableMenuElement(resolvedItem)) {
          resolvedItem.props.onClick?.(event);
          return true;
        }

        if (!isTimeMenuItem(resolvedItem) || resolvedItem.disabled) {
          return true;
        }

        selectItem(resolvedItem.item);
        return true;
      },
      [highlightedItemIndex, menuItems, selectItem],
    );

    const focusInput = useCallback(
      (options?: { withoutOpenDropdown?: boolean }) => {
        if (disabled) {
          return;
        }

        shouldSkipOpenOnFocusRef.current = Boolean(options?.withoutOpenDropdown);
        getActiveInput()?.focus();
        shouldSkipOpenOnFocusRef.current = false;
      },
      [disabled, getActiveInput],
    );

    /**
     * Открывает выпадающее меню так же, как это делает пользователь: через фокус в поле.
     * Меню закрывается по потере фокуса, поэтому открытое без фокуса меню было бы нечем закрыть.
     * В режиме нативного пикера открывается системный пикер — своего меню в этом режиме нет.
     */
    const openInputDropdown = useCallback(() => {
      if (disabled) {
        return;
      }

      if (canUseMobileNativeTimePicker) {
        openNativeTimePicker();
        return;
      }

      getActiveInput()?.focus();
      openDropdown();
    }, [canUseMobileNativeTimePicker, disabled, getActiveInput, openDropdown, openNativeTimePicker]);

    const blurInput = useCallback(() => {
      if (isMobileDropdownActive) {
        closeOpenedDropdown();
        return;
      }

      // В нативном режиме фокус держит скрытый инпут системного пикера.
      nativeInputRef.current?.blur();
      getActiveInput()?.blur();
    }, [closeOpenedDropdown, getActiveInput, isMobileDropdownActive]);

    useImperativeHandle(
      ref,
      () => ({
        focus: focusInput,
        blur: blurInput,
        blink: blinkInput,
        open: openInputDropdown,
        close: closeOpenedDropdown,
        getRootNode: () => rootRef.current,
      }),
      [blinkInput, blurInput, closeOpenedDropdown, focusInput, openInputDropdown],
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

    /**
     * Блокировка контрола посреди ввода завершает его так же, как потеря фокуса:
     * меню закрывается, а недоведенное значение коммитится, а не остается висеть в поле.
     */
    useEffect(() => {
      if (!disabled) {
        return;
      }

      if (isMobileDropdownActive) {
        closeOpenedDropdown();
        return;
      }

      if (isDropdownOpened) {
        closeDropdown();
      }

      if (isInputFocused) {
        setIsInputFocused(false);
        resetMouseInteractionState();
        commitEditingValue();
      }
    }, [
      closeDropdown,
      closeOpenedDropdown,
      commitEditingValue,
      disabled,
      isDropdownOpened,
      isInputFocused,
      isMobileDropdownActive,
      resetMouseInteractionState,
    ]);

    const previousIsMobileLayoutRef = useRef(isMobileLayout);

    /**
     * Смена верстки переносит открытое меню в нужную версию: как в ComboBox, меню не закрывается.
     * Начатый ввод переезжает вместе с ним, а если переезжать некуда — коммитится, как при потере фокуса.
     */
    useEffect(() => {
      if (previousIsMobileLayoutRef.current === isMobileLayout) {
        return;
      }

      previousIsMobileLayoutRef.current = isMobileLayout;
      // Запомненный blur остался от прошлой верстки: как потеря фокуса контрола он больше не годится.
      mobileBlurEventRef.current = null;

      if (isMobileLayout) {
        // Ввод продолжится в инпуте попапа, только если попап открывается вместе со сменой верстки.
        if (isInputFocused && !isMobileDropdownActive) {
          setIsInputFocused(false);
          resetMouseInteractionState();
          commitEditingValue();
        }

        // В режиме нативного пикера своего меню нет.
        if (isDropdownOpened && canUseMobileNativeTimePicker) {
          closeDropdown();
        }

        return;
      }

      /**
       * Десктопное меню закрывается по потере фокуса поля, поэтому без фокуса в контроле
       * его нечем было бы закрыть: мобильный попап мог быть открыт и без фокуса в своем инпуте.
       * Если же фокус был, его вернет в поле `useTimePickerSelection`.
       */
      if (isDropdownOpened && !isInputFocused) {
        closeDropdown();
      }
    }, [
      canUseMobileNativeTimePicker,
      closeDropdown,
      commitEditingValue,
      isDropdownOpened,
      isInputFocused,
      isMobileDropdownActive,
      isMobileLayout,
      resetMouseInteractionState,
    ]);

    /** Сообщает о фокусе один раз за сессию: переезд фокуса внутри контрола наружу не виден. */
    const emitFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      if (isControlFocusedRef.current) {
        return;
      }

      isControlFocusedRef.current = true;
      onFocus?.(event);
    };

    const handleFocusBySource = (event: React.FocusEvent<HTMLInputElement>, isMobilePopupInput: boolean) => {
      const shouldSkipOpenDropdown = shouldSkipOpenOnFocusRef.current;
      shouldSkipOpenOnFocusRef.current = false;
      const isFocusMovedInsideControl = isControlFocusedRef.current;

      if (canUseMobileNativeTimePicker) {
        // Фокус сообщается до открытия пикера: иначе увод фокуса в нативный инпут закрыл бы сессию.
        emitFocus(event);

        if (!shouldSkipOpenDropdown) {
          openNativeTimePicker();
        }
        return;
      }

      if (canUseMobileDropdownTimePicker && !isMobilePopupInput) {
        if (!shouldSkipOpenDropdown) {
          openDropdown();
        }
        // Дальше ввод идет в инпуте попапа, но фокус контрол получает здесь.
        emitFocus(event);
        return;
      }

      setIsInputFocused(true);

      if (!shouldSkipOpenDropdown) {
        openDropdown();
      }

      if (mouseDownSegmentRef.current && !isInputFocused) {
        // По пустому полю ввод всегда начинается с часов, а по заполненному — с сегмента под курсором.
        selectSegment(isTimeDisplayEmpty(editingValueRef.current) ? 'hours' : mouseDownSegmentRef.current);
      } else {
        // Переезд фокуса внутри контрола продолжает начатый ввод, поэтому сегмент сохраняется:
        // иначе следующая цифра ушла бы в часы и затерла бы набранное время.
        selectSegment(isFocusMovedInsideControl ? selectedSegment : 'hours');
      }

      emitFocus(event);
    };

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => handleFocusBySource(event, false);

    const handleMobileFocus = (event: React.FocusEvent<HTMLInputElement>) => handleFocusBySource(event, true);

    const handleBlurBySource = (event: React.FocusEvent<HTMLInputElement>, isMobilePopupInput: boolean) => {
      /**
       * Пока открыт мобильный попап, фокус ходит между полем и его инпутом: контрол остается активным,
       * поэтому наружу о таком blur сообщать нечего. Событие запоминается на случай,
       * если фокус в инпуте попапа так и не оказался — тогда именно оно уйдет в `onBlur` при закрытии.
       */
      if (isMobileDropdownActive) {
        event.persist();
        mobileBlurEventRef.current = event;
        return;
      }

      if (canUseMobileNativeTimePicker) {
        if (isFocusMovedToNativePicker(event)) {
          return;
        }

        // Ввод в мобильной версии не идет через поле, но незакоммиченное значение могло остаться
        // от десктопной версии, если верстка сменилась посреди ввода.
        if (isInputFocused) {
          setIsInputFocused(false);
          resetMouseInteractionState();
          commitEditingValue();
        }

        emitBlur(event);
        return;
      }

      // Инпут закрытого попапа фокуса уже не держит, но его blur может прийти на размонтировании.
      if (isMobilePopupInput) {
        return;
      }

      setIsInputFocused(false);
      resetMouseInteractionState();
      closeDropdown();
      commitEditingValue();
      emitBlur(event);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => handleBlurBySource(event, false);

    const handleMobileBlur = (event: React.FocusEvent<HTMLInputElement>) => handleBlurBySource(event, true);

    const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
      if (canUseMobileNativeTimePicker) {
        openNativeTimePicker();
      } else {
        openDropdown();
      }

      onClick?.(event);
    };

    const handleMouseDownCaptureBySource = (event: React.MouseEvent<HTMLInputElement>, isMobilePopupInput: boolean) => {
      if (canUseMobileNativeTimePicker || (canUseMobileDropdownTimePicker && !isMobilePopupInput)) {
        return;
      }

      const currentInputRef = isMobilePopupInput ? mobileInputRef : inputRef;
      const segment = currentInputRef.current?.getSegment(event.target) ?? null;

      if (isInputFocused && segment === null) {
        event.preventDefault();
      }

      isMouseFocusRef.current = !isInputFocused;
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
        openDropdown();
        updateEditingValueAfterUserEdit(getEmptyDisplayValue(format));
        selectSegment('hours');
        return;
      }

      if (DIGIT_REGEXP.test(event.key)) {
        event.preventDefault();

        openDropdown();

        const nextDigitInputValue = shouldHandleAsAllSelection ? getEmptyDisplayValue(format) : currentDisplayValue;

        const nextDigitInputSegment = shouldHandleAsAllSelection ? 'hours' : currentSegment;

        const result = formatDigitToTimeSegment(nextDigitInputValue, nextDigitInputSegment, event.key, format);

        // Отклоненная цифра не меняет ни значение, ни список, поэтому и подсветку трогать нельзя:
        // автоподсветка не восстановится, а Enter выбрал бы не тот элемент, который видит пользователь.
        if (result.shouldBlink) {
          handleUnexpectedInput(event.key);
          return;
        }

        resetHighlightedItem();

        updateEditingValueAfterUserEdit(result.nextValue);
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

        updateEditingValueAfterUserEdit(shiftTimeSegmentValue(currentDisplayValue, currentSegment, step, format));
        selectSegment(currentSegment);
        return;
      }

      if (isKeyBackspace(event)) {
        event.preventDefault();
        openDropdown();

        let nextDisplayValue = deleteTimeSegmentDigit(currentDisplayValue, currentSegment, format);
        let nextSegment = currentSegment;

        if (nextDisplayValue === currentDisplayValue) {
          const previousSegment = getPreviousTimeSegment(currentSegment);

          if (previousSegment) {
            nextSegment = previousSegment;
            nextDisplayValue = deleteTimeSegmentDigit(currentDisplayValue, previousSegment, format);
          }
        }

        updateEditingValueAfterUserEdit(nextDisplayValue);
        selectSegment(nextSegment);
        return;
      }

      if (isKeyDelete(event)) {
        event.preventDefault();
        openDropdown();
        updateEditingValueAfterUserEdit(replaceTimeSegment(currentDisplayValue, currentSegment, EMPTY_SEGMENT, format));
        selectSegment(currentSegment);
        return;
      }

      if (isKeyEscape(event)) {
        if (isDropdownOpened) {
          event.preventDefault();

          closeOpenedDropdown();
        }
        return;
      }

      if (isKeyEnter(event)) {
        if (isSourceFailed) {
          event.preventDefault();
          retrySource();
          return;
        }

        if (isSelectHighlightedItem(event)) {
          event.preventDefault();
          return;
        }

        if (isMobileDropdownActive) {
          event.preventDefault();
          closeOpenedDropdown();
          return;
        }

        // Enter не выбирает элемент, а лишь подтверждает введенное значение, как потеря фокуса.
        commitEditingValue();
        blinkInput();

        if (isDropdownOpened) {
          event.preventDefault();
          closeDropdown();
        }
        return;
      }

      if (isKeySpace(event)) {
        event.preventDefault();

        const nextSegment = getNextTimeSegment(currentSegment, format);
        const nextDisplayValue = commitTimeSegmentOnLeave(currentDisplayValue, currentSegment, format);

        updateEditingValueAfterUserEdit(nextDisplayValue);

        if (nextSegment) {
          selectSegment(nextSegment);
        } else {
          selectSegment(currentSegment);
        }
        return;
      }

      if (isKeyChar(event)) {
        event.preventDefault();
        handleUnexpectedInput(event.key);
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

      const pastedValue = event.clipboardData?.getData('text') ?? EMPTY_VALUE;

      event.preventDefault();

      if (pastedValue.trim() === EMPTY_VALUE) {
        return;
      }

      const nextDisplayValue = parsePastedTimeValue(pastedValue, format);

      if (isTimeDisplayEmpty(nextDisplayValue)) {
        handleUnexpectedInput(pastedValue);
        return;
      }

      openDropdown();
      updateEditingValueAfterUserEdit(nextDisplayValue);
      selectSegment('hours');
    };

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => handlePasteBySource(event, false);

    const handleMobilePaste = (event: React.ClipboardEvent<HTMLInputElement>) => handlePasteBySource(event, true);

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
            rightIcon={inputRightIcon}
            suffix={suffix}
            value={displayValue}
            aria-haspopup={hasDropdown ? 'listbox' : undefined}
            aria-expanded={
              !isMobileDropdownActive && hasDropdown && isDropdownOpened && hasDropdownContent ? true : undefined
            }
            aria-controls={
              !isMobileDropdownActive && hasDropdown && isDropdownOpened && hasDropdownContent ? popupId : undefined
            }
            aria-activedescendant={isMobileDropdownActive ? undefined : activeDescendantId}
            aria-placeholder={ariaPlaceholder}
            aria-busy={isLoadingItems || undefined}
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
              onValueChange={commitValue}
              onBlur={emitBlur}
            />
          )}

          {isMobileDropdownActive && (
            <TimePickerMobilePopup
              id={popupId}
              value={displayValue}
              inputRef={mobileInputRef}
              disabled={disabled}
              format={format}
              size={size}
              rightIcon={inputRightIcon}
              suffix={suffix}
              resolvedItems={resolvedItems}
              renderItem={renderItem}
              isLoading={isLoadingItems}
              isFailed={isSourceFailed}
              errorNetworkButton={locale.errorNetworkButton}
              errorNetworkMessage={locale.errorNetworkMessage}
              highlightedItemIndex={highlightedItemIndex}
              selectedValue={selectedValue}
              itemRefs={itemRefs}
              error={props.error}
              warning={props.warning}
              aria-describedby={props['aria-describedby']}
              aria-label={props['aria-label']}
              aria-placeholder={ariaPlaceholder}
              aria-haspopup={'listbox'}
              aria-expanded={resolvedItems.length > 0 || isLoadingItems || isSourceFailed ? true : undefined}
              aria-controls={resolvedItems.length > 0 || isLoadingItems || isSourceFailed ? popupId : undefined}
              aria-activedescendant={activeDescendantId}
              onFocus={handleMobileFocus}
              onBlur={handleMobileBlur}
              onClick={handleClick}
              onKeyDown={handleMobileKeyDown}
              onMouseDownCapture={handleMobileMouseDownCapture}
              onMouseUp={handleMobileMouseUp}
              onPaste={handleMobilePaste}
              onSelectSegment={handleMobileSelectSegmentByMouse}
              onRetry={retrySource}
              onSelectItem={selectItem}
              onCloseRequest={closeOpenedDropdown}
            />
          )}

          {hasDropdown &&
            !canUseMobileNativeTimePicker &&
            !canUseMobileDropdownTimePicker &&
            isDropdownOpened &&
            hasDropdownContent &&
            rootRef.current && (
              <TimePickerPopup
                id={popupId}
                anchorElement={rootRef.current}
                menuPos={menuPos}
                menuAlign={menuAlign}
                menuWidth={menuWidth}
                popupMaxHeight={popupMaxHeight}
                size={size}
                resolvedItems={resolvedItems}
                renderItem={renderItem}
                isLoading={isLoadingItems}
                isFailed={isSourceFailed}
                errorNetworkButton={locale.errorNetworkButton}
                errorNetworkMessage={locale.errorNetworkMessage}
                highlightedItemIndex={highlightedItemIndex}
                selectedValue={selectedValue}
                itemRefs={itemRefs}
                onRetry={retrySource}
                onSelectItem={selectItem}
              />
            )}
        </span>
      </CommonWrapper>
    );
  }),
  { validate: validateTimePicker },
) as unknown as TimePickerComponent;
