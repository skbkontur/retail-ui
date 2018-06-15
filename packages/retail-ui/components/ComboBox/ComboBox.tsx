import * as React from 'react';

import createReducer from '../CustomComboBox/reducer';
import { reducers as defaultReducers } from '../CustomComboBox/reducer/default';
import { reducers as autocompleteReducers } from '../CustomComboBox/reducer/autocomplete';

import CustomComboBox from '../CustomComboBox';

export interface ComboBoxProps<T> {
  align?: 'left' | 'center' | 'right';
  /**
   * Включает режим автокомплита
   */
  autocomplete?: boolean;

  autoFocus?: boolean;

  borderless?: boolean;

  /**
   * Не использовать Portal для рендеринга меню.
   * По-умолчанию `false`.
   * См. https://github.com/skbkontur/retail-ui/issues/15
   */
  disablePortal?: boolean;

  disabled?: boolean;

  error?: boolean;

  /**
   * Функция поиска эелементов, должна возвращать Promise с массивом элементов.
   * По умолчанию ожидаются объекты с типом `{ value: string, label: string }`.
   *
   * Элементы могут быть любого типа. В этом случае необходимо определить
   * свойства `itemToValue`, `renderValue`, `renderItem`, `valueToString`
   */
  getItems?: (query: string) => Promise<T[]>;

  /**
   * Необходим для сравнения полученных результатов с `value`
   */
  itemToValue: (item: T) => string | number;

  maxLength?: number;

  menuAlign: 'left' | 'right';

  onBlur?: () => void;

  onChange?: (event: { target: { value: T } }, item: T) => void;

  onFocus?: () => void;

  /**
   * Вызывается при изменении текста в поле ввода,
   * если результатом функции будет строка,
   * то она станет следующим состояним полем ввода
   */
  onInputChange?: (query: string) => any;

  /**
   * Функция для обработки ситуации, когда была введена
   * строка в инпут и был потерян фокус с элемента.
   *
   * Если при потере фокуса в выпадающем списке будет только один
   * элемент, то сработает onChange со значением данного элемента
   */
  onUnexpectedInput?: (query: string) => Nullable<boolean>;

  placeholder?: string;

  /**
   * Функция отрисовки элементов результата поиска.
   * Не применяется если элемент является функцией или React-элементом
   */
  renderItem?: (item: T, index?: number) => React.ReactNode;

  /**
   * Функция для отрисовки сообщения о пустом результате поиска
   */
  renderNotFound?: () => React.ReactNode;

  /**
   * Функция отображающаяя сообщение об общем количестве элементе
   */
  renderTotalCount?: (found: number, total: number) => React.ReactNode;

  /**
   * Функция отрисовки выбранного значения
   */
  renderValue?: (item: T) => React.ReactNode;

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
   */
  valueToString: (item: T) => string;

  size?: 'small' | 'medium' | 'large';

  warning?: boolean;

  width?: string | number;

  maxMenuHeight?: number | string;
}

const defaultReducer = createReducer(defaultReducers);
const autocompleteReducer = createReducer(autocompleteReducers);

class ComboBox<T> extends React.Component<ComboBoxProps<T>> {
  public static defaultProps = {
    // @ts-ignore
    itemToValue: x => x.value,
    // @ts-ignore
    valueToString: x => x.label,
    // @ts-ignore
    renderValue: x => x.label,
    // @ts-ignore
    renderItem: x => x.label,
    menuAlign: 'left'
  };

  private _cb: Nullable<CustomComboBox> = null;

  /**
   * @public
   */
  public focus() {
    if (this._cb) {
      this._cb.focus();
    }
  }

  public render() {
    const { autocomplete, ...rest } = this.props;
    const props = {
      ...rest,
      openButton: !autocomplete,
      reducer: autocomplete ? autocompleteReducer : defaultReducer
    };
    // @ts-ignore
    return <CustomComboBox {...props} ref={cb => (this._cb = cb)} />;
  }
}

export default ComboBox;
