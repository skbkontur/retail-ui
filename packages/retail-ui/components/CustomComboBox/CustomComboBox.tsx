import * as React from 'react';
import ComboBoxView from './ComboBoxView';
import { Nullable } from '../../typings/utility-types';
import Input from '../Input';
import Menu from '../Menu/Menu';
import InputLikeText from '../internal/InputLikeText';
import shallow from 'fbjs/lib/shallowEqual';
import { MenuItemState } from '../MenuItem';
import { ComboBoxRequestStatus } from './types';

export type Action<T> =
  | { type: 'ValueChange'; value: T; keepFocus: boolean }
  | { type: 'TextChange'; value: string }
  | { type: 'KeyPress'; event: React.KeyboardEvent }
  | {
      type: 'DidUpdate';
      prevProps: CustomComboBoxProps<T>;
      prevState: CustomComboBoxState<T>;
    }
  | { type: 'Mount' }
  | { type: 'Focus' }
  | { type: 'InputClick' }
  | { type: 'Blur' }
  | { type: 'Reset' }
  | { type: 'Open' }
  | { type: 'Close' }
  | { type: 'Search'; query: string }
  | { type: 'RequestItems' }
  | { type: 'ReceiveItems'; items: T[] }
  | { type: 'RequestFailure'; repeatRequest: () => void }
  | { type: 'FocusNextElement' };

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
  onChange?: (event: { target: { value: T } }, value: T) => {};
  onInputChange?: (textValue: string) => any;
  onUnexpectedInput?: (query: string) => Nullable<boolean>;
  onFocus?: () => {};
  onBlur?: () => {};
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
  renderNotFound?: () => React.ReactNode;
  renderTotalCount?: (found: number, total: number) => React.ReactNode;
  renderItem: (item: T, state?: MenuItemState) => React.ReactNode;
  renderValue: (value: T) => React.ReactNode;
  valueToString: (value: T) => string;
  itemToValue: (item: T) => string | number;
  getItems: (query: string) => Promise<T[]>;
  reducer: Reducer<T>;
}

export interface CustomComboBoxState<T> {
  editing: boolean;
  loading: boolean;
  opened: boolean;
  textValue: string;
  items: Nullable<T[]>;
  inputChanged?: boolean;
  focused?: boolean;
  repeatRequest: () => void;
  requestStatus: ComboBoxRequestStatus;
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

function taskWithDelay(task: () => void, delay: number) {
  let cancelationToken: (() => void) = () => null;

  new Promise((resolve, reject) => {
    cancelationToken = reject;
    setTimeout(resolve, delay);
  })
    .then(task)
    .catch(() => null);

  return cancelationToken;
}

export const DELAY_BEFORE_SHOW_LOADER = 300;
export const LOADER_SHOW_TIME = 1000;

export const DefaultState = {
  editing: false,
  items: null,
  loading: false,
  opened: false,
  textValue: '',
  repeatRequest: () => undefined,
  requestStatus: ComboBoxRequestStatus.Unknown
};

class CustomComboBox extends React.Component<
  CustomComboBoxProps<any>,
  CustomComboBoxState<any>
> {
  public state: CustomComboBoxState<any> = DefaultState;
  public input: Nullable<Input>;
  public menu: Nullable<Menu>;
  public inputLikeText: Nullable<InputLikeText>;
  public requestId = 0;
  public loaderShowDelay: Nullable<Promise<never>>;
  private focused: boolean = false;
  public cancelLoaderDelay: (() => void) = () => null;

  /**
   * @public
   */
  public focus = () => {
    if (this.props.disabled) {
      return;
    }

    this.handleFocus();
  };

  /**
   * @public
   */
  public selectInputText = () => {
    if (this.props.disabled) {
      return;
    }
    if (this.input) {
      this.input.selectAll();
    }
  };

  /**
   * @public
   */
  public blur = () => {
    if (this.props.disabled) {
      return;
    }

    this.handleBlur();
  };

  /**
   * @public
   */
  public async search(query: string = this.state.textValue) {
    let request = null;
    const { getItems } = this.props;

    const expectingId = (this.requestId += 1);

    if (!this.loaderShowDelay) {
      this.loaderShowDelay = new Promise(resolve => {
        const cancelLoader = taskWithDelay(() => {
          this.dispatch({ type: 'RequestItems' });
          setTimeout(resolve, LOADER_SHOW_TIME);
        }, DELAY_BEFORE_SHOW_LOADER);

        this.cancelLoaderDelay = () => {
          cancelLoader();
          resolve();
        };
      });
    }

    try {
      request = getItems(query);

      await request;
    } catch (error) {
      // NOTE Ignore error here
    } finally {
      if (!this.state.loading && expectingId === this.requestId) {
        this.cancelLoaderDelay();
      }
    }

    try {
      const [items] = await Promise.all([request || [], this.loaderShowDelay]);

      if (expectingId === this.requestId) {
        this.dispatch({ type: 'ReceiveItems', items });
      }
    } catch (error) {
      if (expectingId === this.requestId) {
        this.dispatch({
          type: 'RequestFailure',
          repeatRequest: () => {
            this.search(query);
            if (this.input) {
              this.input.focus();
            }
          }
        });
      }
    } finally {
      if (expectingId === this.requestId) {
        this.loaderShowDelay = null;
      }
    }
  }

  /**
   * @public
   */
  public open() {
    this.dispatch({ type: 'Open' });
  }

  /**
   * @public
   */
  public close() {
    this.dispatch({ type: 'Close' });
  }

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

      onChange: this.handleChange,
      onClickOutside: this.handleBlur,
      onFocus: this.handleFocus,
      onFocusOutside: this.handleBlur,
      onInputBlur: this.handleInputBlur,
      onInputChange: (_: any, value: string) =>
        this.dispatch({ type: 'TextChange', value }),
      onInputFocus: this.handleFocus,
      onInputClick: this.handleInputClick,
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
      repeatRequest: this.state.repeatRequest,
      requestStatus: this.state.requestStatus,

      refInput: (input: Nullable<Input>) => {
        this.input = input;
      },
      refMenu: (menu: Nullable<Menu>) => {
        this.menu = menu;
      },
      refInputLikeText: (inputLikeText: Nullable<InputLikeText>) => {
        this.inputLikeText = inputLikeText;
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

  public shouldComponentUpdate(
    nextProps: CustomComboBoxProps<any>,
    nextState: CustomComboBoxState<any>
  ) {
    return !shallow(nextProps, this.props) || !shallow(nextState, this.state);
  }

  public componentDidUpdate(prevProps: any, prevState: any) {
    if (prevState.editing && !this.state.editing) {
      this.handleBlur();
    }

    this.dispatch({ type: 'DidUpdate', prevProps, prevState });
  }

  /**
   * @public
   */
  public reset() {
    this.dispatch({ type: 'Reset' });
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

  private handleChange = (value: any, event: React.SyntheticEvent) => {
    const eventType = event.type;

    this.dispatch({
      type: 'ValueChange',
      value,
      keepFocus: eventType === 'click'
    });
  };

  private handleFocus = () => {
    if (this.focused) {
      return;
    }
    this.focused = true;
    this.dispatch({ type: 'Focus' });
  };

  private handleBlur = () => {
    if (!this.focused) {
      if (this.state.opened) {
        this.close();
      }
      return;
    }
    this.focused = false;
    this.dispatch({ type: 'Blur' });
  };

  private handleInputBlur = () => {
    // If menu opened, RenderLayer is active and
    // it would call handleFocusOutside
    // In that way handleBlur would be called
    if (this.state.opened) {
      return;
    }

    this.handleBlur();
  };

  private handleInputClick = () => {
    this.dispatch({ type: 'InputClick' });
  };
}

export default CustomComboBox;
