import type { AriaAttributes, HTMLAttributes } from 'react';
import React from 'react';

import { CustomComboBox } from '../../internal/CustomComboBox';
import type { Nullable } from '../../typings/utility-types';
import type { MenuItemState } from '../MenuItem';
import type { ShowClearIcon, InputIconType } from '../Input';
import type { CommonProps } from '../../internal/CommonWrapper';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode';
import { rootNode } from '../../lib/rootNode';
import { createPropsGetter } from '../../lib/createPropsGetter';
import type { SizeProp } from '../../lib/types/props';
import type { MaskedInputOnBeforePasteValue, MaskedInputProps } from '../MaskedInput';

export type ComboBoxViewMode = 'singleline' | 'multiline' | 'multiline-editing';

export interface ComboBoxProps<T>
  extends Pick<AriaAttributes, 'aria-describedby' | 'aria-label'>,
    Pick<HTMLAttributes<HTMLElement>, 'id'>,
    Partial<Pick<MaskedInputProps, 'mask' | 'maskChar' | 'formatChars'>>,
    CommonProps {
  /** Показывает иконку очистки значения в заполненном поле.
   * @default never */
  showClearIcon?: ShowClearIcon;

  /** Ввыравнивание текста в поле. */
  align?: 'left' | 'center' | 'right';

  /** Вызывает функцию поиска `getItems` при фокусе и очистке поля ввода. */
  searchOnFocus?: boolean;

  /** Отображает справа иконку в виде стрелки. */
  drawArrow?: boolean;

  /** Устанавливает фокус на комбобоксе после окончания загрузки страницы. */
  autoFocus?: boolean;

  /** Убирает обводку поля. */
  borderless?: boolean;

  /** По умолчанию выпадающий список рендерится через [паттерн Portal](https://react.dev/reference/react-dom/createPortal). Проп отключает использование Portal и список рендерится как обычный блок с абсолютным позиционированием внутри компонента. */
  disablePortal?: boolean;

  /**  Поле становится недоступно для редактирования. */
  disabled?: boolean;

  /** Меняет визуальное отображение поля на состояние «ошибка». */
  error?: boolean;

  /** Добавляет иконку слева.
   При использовании `ReactNode` применяются дефолтные стили для иконки.
   При использовании `() => ReactNode` применяются только стили для позиционирования. */
  leftIcon?: InputIconType;

  /** Добавляет иконку справа.
   При использовании `ReactNode` применяются дефолтные стили для иконки.
   При использовании `() => ReactNode` применяются только стили для позиционирования. */
  rightIcon?: InputIconType;

  /** Задаёт функцию поиска элементов, которая должна возвращать Promise с массивом значений.
   * По умолчанию ожидаются объекты с типом `{ value: string, label: string }`.
   * Элементы могут быть любого типа. В этом случае необходимо определить свойства `itemToValue`, `renderValue`, `renderItem`, `valueToString`. */
  getItems: (query: string) => Promise<Array<ComboBoxExtendedItem<T>>>;

  /** Задаёт функцию сравнения полученных результатов с `value`. */
  itemToValue?: (item: T) => string | number;

  /** Mаксимальная длина значения, которое пользователь может ввести в поле. */
  maxLength?: number;

  /** Расположение выпадающего списка — над или под полем.
   */
  menuPos?: 'top' | 'bottom';

  /** Выравнивание выпадающего меню. */
  menuAlign?: 'left' | 'right';

  /** Задаёт функцию, которая вызывается при потере комбобоксом фокуса. */
  onBlur?: () => void;

  /** Задаёт функцию, которая вызывается при изменении значения (`value`) в поле. */
  onValueChange?: (value: T) => void;

  /** Задаёт функцию, которая вызывается при получении комбобоксом фокуса. */
  onFocus?: () => void;

  /** Задаёт функцию, которая вызывается при изменении текста в поле ввода, если результатом функции будет строка, то она станет следующим состоянием полем ввода.
   *
   * **Не рекомендуется менять значение, передаваемое в проп `value`, внутри этой функции. Используйте для этих целей `onValueChange` или `onUnexpectedInput`. Иначе возможно неожиданное поведение компонента.**
   */
  onInputValueChange?: (value: string) => Nullable<string> | void;

  /** Задаёт функцию для обработки ввода строки в поле ввода и последующей потерей фокуса компонентом.
   * Функция срабатывает с аргументом поля строки.
   * Если при потере фокуса в выпадающем списке будет только один элемент и результат `valueToString` с этим элементом будет совпадать со значение в текстовом поле, то сработает `onValueChange` со значением данного элемента.
   * Сама функция также может вернуть значение, не равное undefined, с которым будет вызван `onValueChange`. Если возвращаемое значение будет равно null, то сработает очистка текущего значения поля, а в режиме редактирования токен будет удален. */
  onUnexpectedInput?: (value: string) => void | null | T;

  /** Текст, который отображается если не введено никакое значение. */
  placeholder?: string;

  /** Задаёт функцию отрисовки элементов результата поиска.
   * Не применяется, если элемент является функцией или React-элементом.
   * @default item => item.label
   * @param {T} item - элемент из результата поиска.
   * @param {MenuItemState} state? - состояние элемента.
   * @returns {React.ReactNode} React-элемент. */
  renderItem?: (item: T, state?: MenuItemState) => React.ReactNode;

  /** Устанавливает компонент, заменяющий собой обёртку элементов результата поиска.
   * По умолчанию все элементы результата поиска оборачиваются в тег <button />.
   * @example
   * itemWrapper={(item) => {
   *    if (item.value === 3) {
   *      return (props) => {
   *        return <a {...props} />
   *      }
   *    }
   * }}
   */
  itemWrapper?: (item: T) => React.ComponentType;

  /** Задаёт функцию, которая отображает сообщение о пустом результате поиска. При `renderAddButton` не работает. */
  renderNotFound?: () => React.ReactNode;

  /** Задаёт функцию, которая отображает сообщение об общем количестве элементов.
   * @param {number} found - количество элементов по результатам поиска. Учитывает только компонент MenuItem. Им "оборачиваются" элементы, возвращаемые `getItems()`.
   * @param {number} total - количество всех элементов. */
  renderTotalCount?: (found: number, total: number) => React.ReactNode;

  /** Задаёт функцию, которая отображает выбранное значение.
   * @default item => item.label */
  renderValue?: (item: T) => React.ReactNode;

  /** Задаёт функцию отрисовки кнопки добавления в выпадающем списке. */
  renderAddButton?: (query?: string) => React.ReactNode;

  /** Определяет общее количество элементов. Необходим для работы renderTotalCount. */
  totalCount?: number;

  /** Устанавливает выбранное в комбобоксе значение. Тип `value` совпадает с типом элементов в массиве, возвращаемом в `getItems`. */
  value?: Nullable<T>;

  /** Задаёт функцию, которая возвращает строковое представление `value`. Необходимо при фокусировке. */
  valueToString?: (item: T) => string;

  /** Размер комбобокса. */
  size?: SizeProp;

  /** Меняет визуальное отображение поля на состояние «предупреждение». */
  warning?: boolean;

  /** Ширина комбобокса. */
  width?: string | number;

  /** Максимальная высота выпадающего списка. */
  maxMenuHeight?: number | string;

  /** Задаёт функцию, которая вызывается при наведении мышкой (событие `onmouseenter`). Смотрите разницу с `onMouseOver` в [документации](https://learn.javascript.ru/mousemove-mouseover-mouseout-mouseenter-mouseleave)  */
  onMouseEnter?: (e: React.MouseEvent) => void;

  /** Задаёт функцию, которая вызывается при наведении мышкой (событие `onmouseover`). */
  onMouseOver?: (e: React.MouseEvent) => void;

  /** Задаёт функцию, которая вызывается при уходе мышки с объекта (событие `onmouseleave`). */
  onMouseLeave?: (e: React.MouseEvent) => void;

  /** Задаёт функцию, которая вызывается при нажатии кнопки на клавиатуре. */
  onInputKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => void;

  /** Задаёт типы вводимых данных. */
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];

  /** Задаёт функцию, которая вызывается при вставке значения в поле с маской. */
  onBeforePasteInMask?: MaskedInputOnBeforePasteValue;

  /** Режим отображения комбобокса:
   * - `"singleline"` — однострочное поле;
   * - `"multiline"` — многострочное поле;
   * - `"multiline-editing"` — поле становится многострочным только при редактировании.
   *
   * Многострочные режимы не работают, если указан проп `mask`. В таком случае будет отображаться однострочное поле.
   * @default singleline */
  viewMode?: ComboBoxViewMode;

  /** Максимальное количество отображаемых строк, если для поля добавлен проп многострочного режима  — `"multiline"` или `"multiline-editing"`. */
  maxRows?: number;
}

export interface ComboBoxItem {
  value: string;
  label: string;
}

export type ComboBoxExtendedItem<T> = T | (() => React.ReactElement<T>) | React.ReactElement<T>;

type DefaultProps<T> = Required<
  Pick<
    ComboBoxProps<T>,
    | 'itemToValue'
    | 'valueToString'
    | 'renderValue'
    | 'renderItem'
    | 'menuAlign'
    | 'searchOnFocus'
    | 'drawArrow'
    | 'showClearIcon'
    | 'viewMode'
  >
>;

/**
 * Комбобокс — поле ввода с выпадающим списком подсказок, из которых пользователь может выбрать нужное. Открыть выпадающий список можно ещё до начала ввода значения, нажав на поле. */
@rootNode
export class ComboBox<T = ComboBoxItem> extends React.Component<ComboBoxProps<T>> {
  public static __KONTUR_REACT_UI__ = 'ComboBox';
  public static displayName = 'ComboBox';

  public static defaultProps: DefaultProps<any> = {
    itemToValue: (item: ComboBoxItem) => item.value,
    valueToString: (item: ComboBoxItem) => item.label,
    renderValue: (item: ComboBoxItem) => item.label,
    renderItem: (item: ComboBoxItem) => item.label,
    menuAlign: 'left',
    searchOnFocus: true,
    drawArrow: true,
    showClearIcon: 'never',
    viewMode: 'singleline',
  };

  private getProps = createPropsGetter(ComboBox.defaultProps);

  private comboboxElement: Nullable<CustomComboBox<T>> = null;
  public getRootNode!: TGetRootNode;
  private setRootNode!: TSetRootNode;

  /** Программно устанавливает фокус на комбобокс.
   * @public
   */
  public focus(opts?: { withoutOpenDropdown?: boolean }) {
    if (this.comboboxElement) {
      this.comboboxElement.focus(opts);
    }
  }

  /** Программно снимает фокус с комбобокса.
   * @public
   */
  public blur() {
    if (this.comboboxElement) {
      this.comboboxElement.blur();
    }
  }

  /** Открывает список значений и запускает поиск.
   *
   * По умолчанию для поиска используется введенное в поле значение или результат `valueToString(value)`.
   *
   * @public
   * @param {string} [query] Текст поиска.`
   */
  public search(query?: string) {
    if (this.comboboxElement) {
      this.comboboxElement.search(query);
    }
  }

  /** Отменяет текущий поиск — останавливает фильтрацию и очищает результаты поиска.
   * @public
   */
  public cancelSearch() {
    if (this.comboboxElement) {
      this.comboboxElement.cancelSearch();
    }
  }

  /** Открывает выпадающий список.
   * @public
   */
  public open() {
    if (this.comboboxElement) {
      this.comboboxElement.open();
    }
  }

  /** Закрывает выпадающий список.
   * @public
   */
  public close() {
    if (this.comboboxElement) {
      this.comboboxElement.close();
    }
  }

  /**
   * Переводит фокус в поле, если ещё не в фокусе, и выделяет весь текст в нём.
   * @public
   */
  public selectInputText() {
    if (this.comboboxElement) {
      this.comboboxElement.selectInputText();
    }
  }

  /**
   * Сбрасывает введённое пользователем значение без изменения `value`.
   * @public
   */
  public reset() {
    if (this.comboboxElement) {
      this.comboboxElement.reset();
    }
  }

  public render() {
    return <CustomComboBox {...this.getProps()} size={this.props.size} ref={this.customComboBoxRef} />;
  }

  private customComboBoxRef = (element: Nullable<CustomComboBox<T>>) => {
    this.setRootNode(element);
    this.comboboxElement = element;
  };
}
