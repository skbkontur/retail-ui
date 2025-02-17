import React, { AriaAttributes, HTMLAttributes } from 'react';

import { CustomComboBox } from '../../internal/CustomComboBox';
import { Nullable } from '../../typings/utility-types';
import { MenuItemState } from '../MenuItem';
import { InputIconType } from '../Input';
import { CommonProps } from '../../internal/CommonWrapper';
import { rootNode, TSetRootNode } from '../../lib/rootNode';
import { createPropsGetter } from '../../lib/createPropsGetter';
import { SizeProp } from '../../lib/types/props';

export interface ComboBoxProps<T>
  extends Pick<AriaAttributes, 'aria-describedby' | 'aria-label'>,
    Pick<HTMLAttributes<HTMLElement>, 'id'>,
    CommonProps {
  /** Задает выравнивание контента. */
  align?: 'left' | 'center' | 'right';

  /** Вызывает функцию поиска getItems при фокусе и очистке поля ввода. */
  searchOnFocus?: boolean;

  /** Отображает справа иконку в виде стрелки. */
  drawArrow?: boolean;

  /** Устанавливает фокус на контроле после окончания загрузки страницы. */
  autoFocus?: boolean;

  /** Убирает обводку. */
  borderless?: boolean;

  /** Отключает использование портала для рендеринга меню.
   * См. https://github.com/skbkontur/retail-ui/issues/15 */
  disablePortal?: boolean;

  /** Делает компонент недоступным. */
  disabled?: boolean;

  /** Переводит контрол в состояние валидации "ошибка". */
  error?: boolean;

  /** Добавляет иконку слева.
   При использовании `ReactNode` применяются дефолтные стили для иконки.
   При использовании `() => ReactNode` применяются только стили для позиционирования. */
  leftIcon?: InputIconType;

  /** Добавляет иконку справа.
   При использовании `ReactNode` применяются дефолтные стили для иконки.
   При использовании `() => ReactNode` применяются только стили для позиционирования. */
  rightIcon?: InputIconType;

  /** Задает функцию поиска элементов, которая должна возвращать Promise с массивом элементов.
   * По умолчанию ожидаются объекты с типом `{ value: string, label: string }`.
   * Элементы могут быть любого типа. В этом случае необходимо определить свойства `itemToValue`, `renderValue`, `renderItem`, `valueToString`. */
  getItems: (query: string) => Promise<Array<ComboBoxExtendedItem<T>>>;

  /** Задает функцию сравнения полученных результатов с value. */
  itemToValue?: (item: T) => string | number;

  /** Задает максимальную длину инпута. */
  maxLength?: number;

  /** Задает текущую позицию выпадающего окна вручную.
   */
  menuPos?: 'top' | 'bottom';

  /** Задает выравнивание выпадающего меню. */
  menuAlign?: 'left' | 'right';

  /** Задает функцию, которая вызывается при потере комбобоксом фокуса. */
  onBlur?: () => void;

  /** Вызывается при изменении `value` */
  onValueChange?: (value: T) => void;

  /** Задает функцию, которая вызывается при получении комбобоксом фокуса. */
  onFocus?: () => void;

  /** Задает функцию, которая вызывается при изменении текста в поле ввода, если результатом функции будет строка, то она станет следующим состоянием полем ввода. */
  onInputValueChange?: (value: string) => Nullable<string> | void;

  /** Задает функцию для обработки ввода строки в инпут и последующей потерей фокуса компонентом.
   * Функция срабатывает с аргументом инпута строки.
   * Если при потере фокуса в выпадающем списке будет только один элемент и результат valueToString с этим элементом будет совпадать со значение в текстовом поле, то сработает onValueChange со значением данного элемента.
   * Сама функция также может вернуть значение, неравное undefined, с которым будет вызван onValueChange. Если возвращаемое значение будет равно null, то сработает очистка текущего значения инпута, а в режиме редактирования токен будет удален. */
  onUnexpectedInput?: (value: string) => void | null | T;

  /** Задает текст, который отображается если не введено никакое значение. */
  placeholder?: string;

  /** Задает функцию отрисовки элементов результата поиска.
   * Не применяется если элемент является функцией или React-элементом
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

  /** Задает функцию, которая отображает сообщение о пустом результате поиска. При renderAddButton не работает. */
  renderNotFound?: () => React.ReactNode;

  /** Задает функцию, которая отображает сообщение об общем количестве элементов.
   * @param {number} found - количество элементов по результатам поиска. Учитывает только компонент MenuItem. Им "оборачиваются" элементы, возвращаемые getItems().
   * @param {number} total - количество всех элементов. */
  renderTotalCount?: (found: number, total: number) => React.ReactNode;

  /** Задает функцию, которая отображает выбранное значение.
   * @default item => item.label */
  renderValue?: (item: T) => React.ReactNode;

  /** Задает функцию отрисовки кнопки добавления в выпадающем списке. */
  renderAddButton?: (query?: string) => React.ReactNode;

  /** Определяет общее количество элементов. Необходим для работы renderTotalCount. */
  totalCount?: number;

  /** Устанавливает выбранное в комбобоксе значение. Тип `value` совпадает с типом элементов в массиве, возвращаемом в `getItems`. */
  value?: Nullable<T>;

  /** Задает функцию, которая возвращает строковое представление value. Необходимо при фокусировке. */
  valueToString?: (item: T) => string;

  /** Задает размер компонента. */
  size?: SizeProp;

  /** Переводит контрол в состояние валидации "предупреждение". */
  warning?: boolean;

  /** Задает длину комбобокса. */
  width?: string | number;

  /** Задает максимальную высоту меню. */
  maxMenuHeight?: number | string;

  /** Задает функцию, которая вызывается при наведении мышкой (событие `onmouseenter`). См разницу с onMouseOver в [документации](https://learn.javascript.ru/mousemove-mouseover-mouseout-mouseenter-mouseleave)  */
  onMouseEnter?: (e: React.MouseEvent) => void;

  /** Задает функцию, которая вызывается при наведении мышкой (событие `onmouseover`). */
  onMouseOver?: (e: React.MouseEvent) => void;

  /** Задает функцию, которая вызывается при уходе мышки с объекта (событие `onmouseleave`). */
  onMouseLeave?: (e: React.MouseEvent) => void;

  /** Задает функцию, которая вызывается при нажатии кнопки на клавиатуре. */
  onInputKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => void;

  /** Задает типы вводимых данных. */
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
}

export interface ComboBoxItem {
  value: string;
  label: string;
}

export type ComboBoxExtendedItem<T> = T | (() => React.ReactElement<T>) | React.ReactElement<T>;

type DefaultProps<T> = Required<
  Pick<
    ComboBoxProps<T>,
    'itemToValue' | 'valueToString' | 'renderValue' | 'renderItem' | 'menuAlign' | 'searchOnFocus' | 'drawArrow'
  >
>;

/**
 * `ComboBox` — это поле ввода со списком подсказок.
 *
 * `ComboBox` используют:
 * * для выбора значения из справочника.
 * * для добавления своего значения в справочник.
 *
 * `ComboBox` может работать в двух режимах — обычном и в режиме автокомплита.
 * Основное их отличие в том, что в режиме автокомплита список вариантов появляется только после ввода первого символа или изменении уже введенного значения.
 */
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
  };

  private getProps = createPropsGetter(ComboBox.defaultProps);

  private comboboxElement: Nullable<CustomComboBox<T>> = null;
  private setRootNode!: TSetRootNode;

  /**
   * @public
   */
  public focus(opts?: { withoutOpenDropdown?: boolean }) {
    if (this.comboboxElement) {
      this.comboboxElement.focus(opts);
    }
  }

  /**
   * @public
   */
  public blur() {
    if (this.comboboxElement) {
      this.comboboxElement.blur();
    }
  }

  /**
   * Открывает выпадающий список и запускает поиск элементов
   *
   * @public
   * @param {string} [query] Текст поиска. По умолчанию берется
   * текст из инпута или результат `valueToString(value)`
   */
  public search(query?: string) {
    if (this.comboboxElement) {
      this.comboboxElement.search(query);
    }
  }

  /**
   * @public
   */
  public cancelSearch() {
    if (this.comboboxElement) {
      this.comboboxElement.cancelSearch();
    }
  }

  /**
   * @public Открывает выпадающий список
   */
  public open() {
    if (this.comboboxElement) {
      this.comboboxElement.open();
    }
  }

  /**
   * @public Закрывает выпадающий список
   */
  public close() {
    if (this.comboboxElement) {
      this.comboboxElement.close();
    }
  }

  /**
   * Выделяет текст внутри input
   * @public
   */
  public selectInputText() {
    if (this.comboboxElement) {
      this.comboboxElement.selectInputText();
    }
  }

  /**
   * Сбрасывает введенное пользователем значение
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
