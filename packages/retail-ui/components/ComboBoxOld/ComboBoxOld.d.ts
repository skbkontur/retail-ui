import * as React from 'react';

export interface ComboBoxOldProps<T> {
  autoFocus?: boolean;

  borderless?: boolean;

  debounceInterval?: number;

  /**
   * Не использовать Portal для рендеринга меню.
   * По-умолчанию `false`.
   * См. https://github.com/skbkontur/retail-ui/issues/15
   */
  disablePortal?: boolean;

  disabled?: boolean;

  /**
   * Визуально показать наличие ошибки.
   */
  error?: boolean;

  /**
   * Данные, которые будут переданы в функции для отрисовки значений
   * (`renderValue` и `renderItem`).
   */
  info?: any | ((value: any) => any);

  menuAlign?: 'left' | 'right';

  /**
   * Показывать кнопку-треугольник для показа резаультатов.
   */
  openButton?: boolean;

  placeholder?: string;

  /**
   * Функция для обработки неожиданного ввода. Если пользователь ввел что-то в
   * строку поиска и нажал Enter или ушел из поля, не выбрав значение, то
   * будет вызвана эта функция, которая может вернуть значение, которое будет
   * использовано как будто оно было выбрано.
   *
   * Возвращаемое значение может быть `null`, либо объектом такой формы:
   * `{value: any, info?: any}`.
   *
   * Если задать это поле в `true`, то будет использована такая функция:
   * `(searchText) => searchText`.
   */
  recover?: boolean | (() => any);

  renderItem?: (value: any, info: any, state: any) => any;

  /**
   * Сообщение при отсутствии результатов
   *
   * `string | (searchText: string) => React$Element<*> | string`
   */
  renderNotFound?: string | (() => any);

  /**
   * Общее количество найденных элементов
   *
   * `(foundCount: number, totalCount: number) => React$Element<*> | string`
   */
  renderTotalCount?: () => any;

  renderValue?: (value: any, info: any) => any;

  valueToString?: (value: any, info: any) => any;

  source: (query: string) => any;

  value?: any;

  /**
   * Визуально показать наличие предупреждения.
   */
  warning?: boolean;

  width?: number | string;

  onBlur?: () => any;

  onChange?: (event: any, value: any) => any;

  onClose?: () => any;

  onFocus?: () => any;

  /**
   * Вызывается при изменении текста в поле ввода,
   * если результатом функции будет строка,
   * то она станет следующим состояним полем ввода
   *
   * `(value: string) => any`
   */
  onInputChange?: () => any;

  /**
   * Позволяет обработать нажатия клавиш.
   * Можно отменить стандартное поведение, используя `event.preventDefault()`
   *
   * `(event: KeyboardSyntheticEvent) => void`
   */
  onInputKeyDown?: () => any;

  onMouseEnter?: () => any;

  onMouseLeave?: () => any;

  onMouseOver?: () => any;

  onOpen?: () => any;
}

export interface ComboBoxOldState {}

export default class ComboBoxOld extends React.Component<ComboBoxOldProps<any>, ComboBoxOldState> {}
