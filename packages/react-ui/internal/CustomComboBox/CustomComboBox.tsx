import React from 'react';

import { Nullable } from '../../typings/utility-types';
import { Input } from '../../components/Input';
import { Menu } from '../Menu';
import { InputLikeText } from '../InputLikeText';
import { CancelationError, taskWithDelay } from '../../lib/utils';
import { fixClickFocusIE } from '../../lib/events/fixClickFocusIE';
import { ComboBoxProps } from '../../components/ComboBox';

import { ComboBoxRequestStatus } from './CustomComboBoxTypes';
import { CustomComboBoxAction, CustomComboBoxEffect, reducer } from './CustomComboBoxReducer';
import { ComboBoxView, ComboBoxViewProps } from './ComboBoxView';

export type CustomComboBoxProps<T> = ComboBoxProps<T>;

export interface CustomComboBoxState<T> {
  editing: boolean;
  loading: boolean;
  opened: boolean;
  textValue: string;
  items: Nullable<T[]>;
  inputChanged: boolean;
  focused: boolean;
  repeatRequest: () => void;
  requestStatus: ComboBoxRequestStatus;
}

export const DELAY_BEFORE_SHOW_LOADER = 300;
export const LOADER_SHOW_TIME = 1000;

export const DefaultState = {
  inputChanged: false,
  editing: false,
  items: null,
  loading: false,
  opened: false,
  focused: false,
  textValue: '',
  repeatRequest: () => undefined,
  requestStatus: ComboBoxRequestStatus.Unknown,
};

export class CustomComboBox<T> extends React.PureComponent<CustomComboBoxProps<T>, CustomComboBoxState<T>> {
  public static __KONTUR_REACT_UI__ = 'CustomComboBox';

  public state: CustomComboBoxState<T> = DefaultState;
  public input: Nullable<Input>;
  public menu: Nullable<Menu>;
  public inputLikeText: Nullable<InputLikeText>;
  public requestId = 0;
  public loaderShowDelay: Nullable<Promise<never>>;
  private focused = false;
  private cancelationToken: Nullable<(reason?: Error) => void> = null;

  private reducer = reducer;
  public cancelLoaderDelay: () => void = () => null;

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
    const { getItems } = this.props;

    const cancelPromise: Promise<never> = new Promise((_, reject) => (this.cancelationToken = reject));
    const expectingId = (this.requestId += 1);

    if (!this.loaderShowDelay) {
      this.loaderShowDelay = new Promise(resolve => {
        const cancelLoader = taskWithDelay(() => {
          this.dispatch({ type: 'RequestItems' });
          setTimeout(resolve, LOADER_SHOW_TIME);
        }, DELAY_BEFORE_SHOW_LOADER);

        cancelPromise.catch(() => cancelLoader());

        this.cancelLoaderDelay = () => {
          cancelLoader();
          resolve();
        };
      });
    }

    try {
      const items = await Promise.race([getItems(query), cancelPromise]);
      if (this.state.loading) {
        await Promise.race([this.loaderShowDelay, cancelPromise]);
      }
      if (expectingId === this.requestId) {
        this.dispatch({
          type: 'ReceiveItems',
          items,
        });
      }
    } catch (error) {
      if (error && error.code === 'CancelationError') {
        this.dispatch({ type: 'CancelRequest' });
      } else if (expectingId === this.requestId) {
        this.dispatch({
          type: 'RequestFailure',
          repeatRequest: () => {
            this.search(query);
            if (this.input) {
              this.input.focus();
            }
          },
        });
      }
    } finally {
      if (expectingId === this.requestId) {
        if (!this.state.loading) {
          this.cancelLoaderDelay();
        }
        this.cancelationToken = null;
        this.loaderShowDelay = null;
      }
    }
  }

  /**
   * @public
   */
  public cancelSearch() {
    if (this.cancelationToken) {
      this.cancelationToken(new CancelationError());
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
    const { itemToValue, valueToString, getItems, ...rest } = this.props;
    const viewProps: ComboBoxViewProps<T> = {
      ...rest,
      editing: this.state.editing,
      items: this.state.items,
      loading: this.state.loading,
      opened: this.state.opened,
      textValue: this.state.textValue,
      onValueChange: this.handleValueChange,
      onClickOutside: this.handleClickOutside,
      onFocus: this.handleFocus,
      onFocusOutside: this.handleBlur,
      onInputBlur: this.handleInputBlur,
      onInputValueChange: (value: string) => this.dispatch({ type: 'TextChange', value }),
      onInputFocus: this.handleFocus,
      onInputClick: this.handleInputClick,
      onInputKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
        event.persist();
        this.dispatch({ type: 'KeyPress', event });
      },
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
      },
    };

    return <ComboBoxView {...viewProps} />;
  }

  public componentDidMount() {
    this.dispatch({ type: 'Mount' });
    if (this.props.autoFocus) {
      this.focus();
    }
  }

  public componentDidUpdate(prevProps: CustomComboBoxProps<T>, prevState: CustomComboBoxState<T>) {
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

  private dispatch = (action: CustomComboBoxAction<T>) => {
    let effects: Array<CustomComboBoxEffect<T>>;
    let nextState: Pick<CustomComboBoxState<T>, never>;

    this.setState(
      state => {
        const stateAndEffect = this.reducer(state, this.props, action);

        [nextState, effects] = stateAndEffect instanceof Array ? stateAndEffect : [stateAndEffect, []];

        return nextState;
      },
      () => {
        effects.forEach(this.handleEffect);
      },
    );
  };

  private handleEffect = (effect: CustomComboBoxEffect<T>) => {
    effect(this.dispatch, this.getState, this.getProps, () => this);
  };

  private getProps = () => this.props;

  private getState = () => this.state;

  private handleValueChange = (value: T) => {
    this.dispatch({
      type: 'ValueChange',
      value,
      keepFocus: true,
    });
  };

  private handleFocus = () => {
    if (this.focused) {
      return;
    }
    this.focused = true;
    this.dispatch({ type: 'Focus' });
  };

  private handleClickOutside = (e: Event) => {
    fixClickFocusIE(e);
    this.handleBlur();
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

  private handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
    if (!this.cancelationToken) {
      this.dispatch({ type: 'InputClick' });
    }
    this.props.onClick?.(event);
  };
}
