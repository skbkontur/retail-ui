/* @flow */
/* global $Subtype, React$Element */
import React from 'react';

import createBehavior, {
  defaultBehaviorReducers,
  defaultState
} from './behavior';

import ComboBoxView from '../ComboBoxV2/ComboBoxView';
import type Input from '../Input';
import type Menu from '../Menu/Menu';

type Action = $Subtype<{ type: string }>;

type Props<T> = {|
  behavior: Function,

  debounceInterval: number,

  disabled?: boolean,

  error?: boolean,

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
   * Функция отрисовки выбранного значения
   */
  renderValue?: (T) => string | React$Element<*>,

  /**
   * Выбранное значение
   */
  value?: T,

  /**
   * Необходим, в случае если `onSearchRequest` возвращает элементы,
   * у которых тип отличается от `value`, для сравнения полученных
   * результатов с `value`
   */
  valueToItem?: (T) => any,

  /**
   * Необходим для преобразования `value` в строку при фокусировке
   */
  valueToString: (T) => string,

  /**
   * Необходим для работы `renderTotalCount`
   */
  totalCount?: number,

  /**
   * Функция отображающаяя сообщение об общем количестве элементе
   */
  renderTotalCount?: (found: number, total: number) =>
    | string
    | React$Element<*>,

  warning?: boolean,

  width?: string | number
|};

class ComboBoxV3 extends React.Component {
  static defaultProps = {
    behavior: createBehavior(defaultBehaviorReducers),
    debounceInterval: 300
  };

  state = defaultState;

  props: Props<any>;
  input: Input;
  menu: Menu;
  focused: boolean = false;

  componentDidMount() {
    this.dispatch({ type: 'Mount' });
  }

  componentDidUpdate(_: any, prevState: any) {
    if (prevState.editing && !this.state.editing) {
      this.handleBlur();
    }
  }

  dispatch = (action: Action) => {
    console.log(action);
    let effects;
    this.setState(
      state => {
        let nextState;
        let stateAndEffect = this.props.behavior(state, this.props, action);
        if (!Array.isArray(stateAndEffect)) {
          stateAndEffect = [stateAndEffect, []];
        }
        [nextState, effects] = stateAndEffect;
        return nextState;
      },
      () => {
        effects.forEach(this.handleEffect);
      }
    );
  };

  handleEffect = (effect: Function) => {
    effect(this.dispatch, this.getState, this.getProps, () => this);
  };

  getProps = () => this.props;

  getState = () => this.state;

  focus = () => {
    if (this.props.disabled) {
      return;
    }

    if (this.input) {
      this.input.focus();
      this.input.setSelectionRange(0, this.state.textValue.length);
    }
  };

  render() {
    const viewProps = {
      disabled: this.props.disabled,
      editing: this.state.editing,
      error: this.props.error,
      items: this.state.items,
      loading: this.state.loading,
      opened: this.state.opened,
      placeholder: this.props.placeholder,
      textValue: this.state.textValue,
      totalCount: this.props.totalCount,
      value: this.props.value,
      warning: this.props.warning,
      width: this.props.width,

      onChange: value => this.dispatch({ type: 'ValueChange', value }),
      onClickOutside: this.handleBlur,
      onFocus: this.handleFocus,
      onFocusOutside: this.handleBlur,
      onInputChange: (_, value) => this.dispatch({ type: 'TextChange', value }),
      onInputFocus: this.handleFocus,
      onInputKeyDown: ({ key }) => this.dispatch({ type: 'KeyPress', key }),
      renderItem: this.props.renderItem,
      renderNotFound: this.props.renderNotFound,
      renderValue: this.props.renderValue,
      renderTotalCount: this.props.renderTotalCount,

      refInput: input => {
        this.input = input;
      },
      refMenu: menu => {
        this.menu = menu;
      }
    };

    return <ComboBoxView {...viewProps} />;
  }

  handleFocus = () => {
    if (this.focused) {
      return;
    }
    this.focused = true;
    this.dispatch({ type: 'Focus' });
  }

  handleBlur = () => {
    if (!this.focused) {
      return;
    }
    this.focused = false;
    this.dispatch({ type: 'Blur' });
  }
}

export default ComboBoxV3;
