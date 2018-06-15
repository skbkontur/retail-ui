import * as React from 'react';
import shallow from 'fbjs/lib/shallowEqual';

import ComboBoxView from './ComboBoxView';
import Input from '../Input';
import Menu from '../Menu/Menu';

export type Action<T> =
  | { type: 'ValueChange'; value: T }
  | { type: 'TextChange'; value: string }
  | { type: 'KeyPress'; event: React.KeyboardEvent }
  | {
      type: 'DidUpdate';
      prevProps: CustomComboBoxProps<T>;
      prevState: CustomComboBoxState<T>;
    }
  | { type: 'Mount' }
  | { type: 'Focus' }
  | { type: 'Blur' };

export interface CustomComboBoxProps<T> {
  align?: 'left' | 'center' | 'right';
  autoFocus?: boolean;
  borderless?: boolean;
  disablePortal?: boolean;
  disabled?: boolean;
  error?: boolean;
  maxLength?: number;
  menuAlign?: 'left' | 'right';
  openButton?: boolean;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseOver?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
  placeholder?: string;
  size?: 'small' | 'medium' | 'large';
  totalCount?: number;
  value?: Nullable<T>;
  warning?: boolean;
  width?: string | number;
  maxMenuHeight?: number | string;
  renderItem?: (x0: T, index?: number) => React.ReactNode;
  renderNotFound?: () => React.ReactNode;
  renderValue?: (x0: T) => React.ReactNode;
  renderTotalCount?: (x0: number, x1: number) => React.ReactNode;
  valueToString?: (x0: T) => string;
}

export interface CustomComboBoxState<T> {
  editing: boolean;
  loading: boolean;
  opened: boolean;
  textValue: string;
  items: Nullable<T[]>;
}

export type Effect<T> = (
  dispatch: (x0: Action<T>) => void,
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
  reducer: Reducer<T>;
} & CustomComboBoxProps<T>;

export const DefaultState = {
  editing: false,
  items: null,
  loading: false,
  opened: false,
  textValue: ''
};

class CustomComboBox extends React.Component<
  Props<any>,
  CustomComboBoxState<any>
> {
  public state: CustomComboBoxState<any> = DefaultState;
  private input: Nullable<Input>;
  private menu: Nullable<Menu>;
  private focused: boolean = false;

  public focus = () => {
    if (this.props.disabled) {
      return;
    }

    this.handleFocus();
  };

  public blur = () => {
    if (this.props.disabled) {
      return;
    }

    this.handleBlur();
  };

  public render() {
    const viewProps = {
      align: this.props.align,
      borderless: this.props.borderless,
      disabled: this.props.disabled,
      disablePortal: this.props.disablePortal,
      editing: this.state.editing,
      error: this.props.error,
      items: this.state.items,
      loading: this.state.loading,
      menuAlign: this.props.menuAlign,
      opened: this.state.opened,
      openButton: this.props.openButton,
      placeholder: this.props.placeholder,
      size: this.props.size,
      textValue: this.state.textValue,
      totalCount: this.props.totalCount,
      value: this.props.value,
      warning: this.props.warning,
      width: this.props.width,
      maxLength: this.props.maxLength,
      maxMenuHeight: this.props.maxMenuHeight,

      onChange: (value: any) => this.dispatch({ type: 'ValueChange', value }),
      onClickOutside: this.handleBlur,
      onFocus: this.handleFocus,
      onFocusOutside: this.handleBlur,
      onInputChange: (_: any, value: string) =>
        this.dispatch({ type: 'TextChange', value }),
      onInputFocus: this.handleFocus,
      onInputKeyDown: (event: React.KeyboardEvent) => {
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

      refInput: (input: Nullable<Input>) => {
        this.input = input;
      },
      refMenu: (menu: Nullable<Menu>) => {
        this.menu = menu;
      }
    };

    return <ComboBoxView {...viewProps} />;
  }

  public componentDidMount() {
    this.dispatch({ type: 'Mount' });
    if (this.props.autoFocus) {
      this.focus();
    }
  }

  public componentDidUpdate(prevProps: any, prevState: any) {
    if (prevState.editing && !this.state.editing) {
      this.handleBlur();
    }
    if (!shallow(prevProps, this.props)) {
      this.dispatch({ type: 'DidUpdate', prevProps, prevState });
    }
  }

  private dispatch = (action: Action<any>) => {
    let effects: Array<Effect<any>>;
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

  private handleEffect = (effect: Effect<any>) => {
    effect(this.dispatch, this.getState, this.getProps, () => this);
  };

  private getProps = () => this.props;

  private getState = () => this.state;

  private handleFocus = () => {
    if (this.focused) {
      return;
    }
    this.focused = true;
    this.dispatch({ type: 'Focus' });
  };

  private handleBlur = () => {
    if (!this.focused) {
      return;
    }
    this.focused = false;
    this.dispatch({ type: 'Blur' });
  };
}

export default CustomComboBox;
