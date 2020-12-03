import React from 'react';

import { CustomComboBox } from '../../internal/CustomComboBox';
import { Nullable } from '../../typings/utility-types';
import { MenuItemState } from '../MenuItem';
import { InputIconType } from '../Input';

export interface ComboBoxProps<T> {
  align?: 'left' | 'center' | 'right';
  /**
   * Вызывает функцию поиска `getItems` при фокусе и очистке поля ввода
   * @default true
   */
  searchOnFocus?: boolean;
  /**
   * Рисует справа иконку в виде стрелки
   * @default true
   */
  drawArrow?: boolean;

  autoFocus?: boolean;

  borderless?: boolean;

  /**
   * Не использовать Portal для рендеринга меню.
   * См. https://github.com/skbkontur/retail-ui/issues/15
   * @default false
   */
  disablePortal?: boolean;

  disabled?: boolean;

  error?: boolean;

  leftIcon?: InputIconType;

  /**
   * Функция поиска элементов, должна возвращать Promise с массивом элементов.
   * По умолчанию ожидаются объекты с типом `{ value: string, label: string }`.
   *
   * Элементы могут быть любого типа. В этом случае необходимо определить
   * свойства `itemToValue`, `renderValue`, `renderItem`, `valueToString`
   */
  getItems: (query: string) => Promise<T[]>;

  /**
   * Необходим для сравнения полученных результатов с `value`
   * @default item => item.label
   */
  itemToValue: (item: T) => string | number;

  maxLength?: number;

  menuAlign?: 'left' | 'right';

  onBlur?: () => void;

  /** Вызывается при изменении `value` */
  onValueChange?: (value: T) => void;

  onFocus?: () => void;

  /**
   * Вызывается при изменении текста в поле ввода,
   * если результатом функции будет строка,
   * то она станет следующим состояним полем ввода
   */
  onInputValueChange?: (value: string) => Nullable<string> | void;

  /**
   * Функция для обработки ситуации, когда была введена
   * строка в инпут и был потерян фокус с элемента.
   *
   * Если при потере фокуса в выпадающем списке будет только один
   * элемент и  результат `renderValue` с этим элементом будет
   * совпадать со значение в текстовом поле, то
   * сработает onValueChange со значением данного элемента
   *
   * Сама функция также может вернуть значение,
   * неравное `undefined`,
   * с которым будет вызван onValueChange.
   */
  onUnexpectedInput?: (value: string) => void | null | T;

  placeholder?: string;

  /**
   * Функция отрисовки элементов результата поиска.
   * Не применяется если элемент является функцией или React-элементом
   * @default item => item.label
   */
  renderItem: (item: T, state?: MenuItemState) => React.ReactNode;

  /**
   * Функция для отрисовки сообщения о пустом результате поиска
   * Если есть renderAddButton - не работает
   */
  renderNotFound?: () => React.ReactNode;

  /**
   * Функция отображающаяя сообщение об общем количестве элементов
   */
  renderTotalCount?: (found: number, total: number) => React.ReactNode;

  /**
   * Функция отрисовки выбранного значения
   * @default item => item.label
   */
  renderValue: (item: T) => React.ReactNode;

  /**
   * Функция отрисовки кнопки добавления в выпадающем списке
   */
  renderAddButton?: (query?: string) => React.ReactNode;

  /**
   * Общее количество элементов.
   * Необходим для работы `renderTotalCount`
   */
  totalCount?: number;

  /**
   * Выбранное значение
   * Ожидается, что `value` того же типа что и элементы в массиве,
   * возвращаемом в `getItems`
   */
  value?: Nullable<T>;

  /**
   * Необходим для преобразования `value` в строку при фокусировке
   * @default item => item.label
   */
  valueToString: (item: T) => string;

  size?: 'small' | 'medium' | 'large';

  warning?: boolean;

  width?: string | number;

  maxMenuHeight?: number | string;

  onMouseEnter?: (e: React.MouseEvent) => void;

  onMouseOver?: (e: React.MouseEvent) => void;

  onMouseLeave?: (e: React.MouseEvent) => void;

  onInputKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => void;
}

export interface ComboBoxItem {
  value: string;
  label: string;
}

export class ComboBox<T = ComboBoxItem> extends React.Component<ComboBoxProps<T>> {
  public static __KONTUR_REACT_UI__ = 'ComboBox';

  public static defaultProps = {
    itemToValue: (item: ComboBoxItem) => item.value,
    valueToString: (item: ComboBoxItem) => item.label,
    renderValue: (item: ComboBoxItem) => item.label,
    renderItem: (item: ComboBoxItem) => item.label,
    menuAlign: 'left',
    searchOnFocus: true,
    drawArrow: true,
  };

  private comboboxElement: Nullable<CustomComboBox<T>> = null;

  /**
   * @public
   */
  public focus() {
    if (this.comboboxElement) {
      this.comboboxElement.focus();
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
   * @public Открывает выпадающий список и запускает поиск элементов
   * @param {string} [query] - Текст поиска. По умолчанию берется
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
    return <CustomComboBox {...this.props} ref={element => (this.comboboxElement = element)} />;
  }
}
