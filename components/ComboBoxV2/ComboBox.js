// @flow
/* global React$Element */
import React from 'react';

import createReducer from '../CustomComboBox/reducer';
import { reducers as defaultReducers } from '../CustomComboBox/reducer/default';
import {
  reducers as autocompleteReducers
} from '../CustomComboBox/reducer/autocomplete';

import CustomComboBox from '../CustomComboBox';

type Item<T> = T;

export type ExternalProps<T> = {|
  autocomplete?: boolean,

  disabled?: boolean,

  error?: boolean,

  /**
   * Функция поиска эелементов, должна возвращать Promise с массивом элементов.
   * По умолчанию ожидаются объекты с типом `{ value: string, label: string }`.
   *
   * Элементы могут быть любого типа. В этом случае необходимо определить
   * свойства `itemToValue`, `renderValue`, `renderItem`
   */
  getItems?: (query: string) => Promise<Item<T>[]>,

  /**
   * Необходим для сравнения полученных результатов с `value`
   */
  itemToValue: (T) => string,

  onBlur?: () => void,

  onChange?: ({ target: { value: T } }, T) => void,

  onFocus?: () => void,

  /**
   * Вызывается при изменении текста в поле ввода,
   * если результатом функции будет строка,
   * то она станет следующим состояним полем ввода
   */
  onInputChange?: () => any,

  /**
   * Функция для обработки ситуации, когда было введена
   * строка в инпут и был потерян фокус с элемента
   */
  onUnexpectedInput?: (query: string) => ?boolean,

  placeholder?: string,

  /**
     * Функция отрисовки элементов результата поиска.
     * Не применяется если элемент является функцией или React-элементом.
     * По умолчанию `x => x`
     */
  renderItem?: (item: T, index: number) => string | React$Element<any>,

  /**
     * Функция для отрисовки сообщения о пустом результате поиска
     */
  renderNotFound?: () => string | React$Element<*>,

  /**
     * Функция отображающаяя сообщение об общем количестве элементе
     */
  renderTotalCount?: (found: number, total: number) =>
    string
    | React$Element<*>,

  /**
     * Функция отрисовки выбранного значения
     */
  renderValue?: (T) => string | React$Element<*>,

  /**
     * Необходим для работы `renderTotalCount`
     */
  totalCount?: number,

  /**
     * Выбранное значение
     */
  value?: T,

  /**
     * Необходим для преобразования `value` в строку при фокусировке
     */
  valueToString: (T) => string,

  warning?: boolean,

  width?: string | number
|};

const defaltReducer = createReducer(defaultReducers);
const autocompleteReducer = createReducer(autocompleteReducers);

class ComboBox extends React.Component {
  static defaultProps = {
    itemToValue: x => x.value,
    valueToString: x => x.label,
    renderValue: x => x.label,
    renderItem: x => x.label
  };

  props: ExternalProps<*>;

  render() {
    const { autocomplete, ...rest } = this.props;
    const props = {
      ...rest,
      openButton: !autocomplete,
      reducer: autocomplete ? autocompleteReducer : defaltReducer
    };
    return <CustomComboBox {...props} />;
  }
}

export default ComboBox;
