/* @flow */
/* eslint-disable flowtype/no-weak-types */
import * as React from 'react';
import shallow from 'fbjs/lib/shallowEqual';

import ComboBoxView from './ComboBoxView';
import type Input from '../Input';
import type Menu from '../Menu/Menu';

export type Action<T> =
  | { type: 'ValueChange', value: T }
  | { type: 'TextChange', value: string }
  | { type: 'KeyPress', event: SyntheticKeyboardEvent<> }
  | {
      type: 'DidUpdate',
      prevProps: CustomComboBoxProps<T>,
      prevState: CustomComboBoxState<T>
    }
  | { type: 'Mount' }
  | { type: 'Focus' }
  | { type: 'Blur' };

export type CustomComboBoxProps<T> = {
  autoFocus?: boolean,
  disabled?: boolean,
  error?: boolean,
  menuAlign?: 'left' | 'right',
  openButton?: boolean,
  onMouseEnter?: (e: SyntheticMouseEvent<>) => void,
  onMouseOver?: (e: SyntheticMouseEvent<>) => void,
  onMouseLeave?: (e: SyntheticMouseEvent<>) => void,
  placeholder?: string,
  totalCount?: number,
  value?: ?T,
  warning?: boolean,
  width?: string | number,
  renderItem?: (T, index?: number) => React.Node,
  renderNotFound?: () => React.Node,
  renderValue?: T => React.Node,
  renderTotalCount?: (number, number) => React.Node
};

export type CustomComboBoxState<T> = {
  editing: boolean,
  loading: boolean,
  opened: boolean,
  textValue: string,
  items: ?Array<T>
};

export type Effect<T> = (
  dispatch: (Action<T>) => void,
  getState: () => CustomComboBoxState<T>,
  getProps: () => CustomComboBoxProps<T>,
  getInstance: () => CustomComboBox
) => void;

export type Reducer<T> = (
  state: CustomComboBoxState<T>,
  props: CustomComboBoxProps<T>,
  action: Action<T>
) => CustomComboBoxState<T> | [CustomComboBoxState<T>, Array<Effect<T>>];

export type Props<T> = {
  reducer: Reducer<T>
} & CustomComboBoxProps<T>;

export const DefaultState = {
  editing: false,
  items: null,
  loading: false,
  opened: false,
  textValue: ''
};

class CustomComboBox extends React.Component<Props<*>, CustomComboBoxState<*>> {
  state: CustomComboBoxState<*> = DefaultState;
  input: ?Input;
  menu: ?Menu;
  focused: boolean = false;

  dispatch = (action: Action<*>) => {
    let effects;
    this.setState(
      state => {
        let nextState;
        let stateAndEffect = this.props.reducer(state, this.props, action);
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

    this.handleFocus();
  };

  blur = () => {
    if (this.props.disabled) {
      return;
    }

    this.handleBlur();
  };

  render() {
    const viewProps = {
      disabled: this.props.disabled,
      editing: this.state.editing,
      error: this.props.error,
      items: this.state.items,
      loading: this.state.loading,
      menuAlign: this.props.menuAlign,
      opened: this.state.opened,
      openButton: this.props.openButton,
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
      onInputKeyDown: event => {
        event.persist();
        this.dispatch({ type: 'KeyPress', event });
      },
      onMouseEnter: this.props.onMouseEnter,
      onMouseOver: this.props.onMouseOver,
      onMouseLeave: this.props.onMouseLeave,
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

  componentDidMount() {
    this.dispatch({ type: 'Mount' });
    if (this.props.autoFocus) {
      this.focus();
    }
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (prevState.editing && !this.state.editing) {
      this.handleBlur();
    }
    if (!shallow(prevProps, this.props)) {
      this.dispatch({ type: 'DidUpdate', prevProps, prevState });
    }
  }

  handleFocus = () => {
    if (this.focused) {
      return;
    }
    this.focused = true;
    this.dispatch({ type: 'Focus' });
  };

  handleBlur = () => {
    if (!this.focused) {
      return;
    }
    this.focused = false;
    this.dispatch({ type: 'Blur' });
  };
}

export default CustomComboBox;
