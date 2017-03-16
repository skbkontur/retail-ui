// @flow
/* global React$Element */
import React from 'react';
import createReducer from '../CustomComboBox/reducer';
import { reducers as defaultReducers } from '../CustomComboBox/reducer/default';
import {
  reducers as autocompleteReducers
} from '../CustomComboBox/reducer/autocomplete';

import CustomComboBox from '../CustomComboBox';

const defaltReducer = createReducer(defaultReducers);
const autocompleteReducer = createReducer(autocompleteReducers);

export type ExternalProps<T> = {
  autocomplete?: boolean,

  disabled?: boolean,

  error?: boolean,

  /**
     * Необходим для сравнения полученных результатов с `value`
     */
  itemToValue: (T) => string,

  onBlur?: () => void,

  onChange?: (T) => void,

  onFocus?: () => void,

  /**
     * Вызывается при изменении текста в поле ввода,
     * если результатом функции будет строка,
     * то она станет следующим состояним полем ввода
     */
  onInputChange?: () => any,

  /**
     * Позволяет обработать нажатия клавиш.
     * Можно отменить стандартное поведение, используя `event.preventDefault()`
     */
  onInputKeyDown?: () => void,

  /**
     * Функция должна возвращать Promise с массивом элементов.
     * Элементы могут быть любого типа.
     */
  onSearchRequest?: (query: string) => Promise<T[]>,

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
    | string
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
};

class ComboBox extends React.Component {
  static defaultProps = {
    itemToValue: x => x.value,
    valueToString: x => x.label
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
