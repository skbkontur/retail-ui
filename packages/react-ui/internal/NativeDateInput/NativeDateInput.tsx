import React from 'react';

import { Nullable } from '../../typings/utility-types';

import { getDateForNative, getDateForComponent } from './utils';
import { jsStyles } from './NativeDateInput.styles';

export interface NativeDateInputProps {
  onValueChange?: (value: string) => void;
  value: Nullable<string>;
  minDate?: Nullable<string>;
  maxDate?: Nullable<string>;
  disabled?: boolean;
}

const DEFAULT_MIN_DATE = '1900-01-01';
const DEFAULT_MAX_DATE = '2099-12-31';

export class NativeDateInput extends React.Component<NativeDateInputProps> {
  public static __KONTUR_REACT_UI__ = 'NativeDatePicker';
  private input = React.createRef<HTMLInputElement>();

  public render() {
    return (
      <input
        type={'date'}
        max={this.props.maxDate ? getDateForNative(this.props.maxDate) : DEFAULT_MAX_DATE}
        min={this.props.minDate ? getDateForNative(this.props.minDate) : DEFAULT_MIN_DATE}
        value={getDateForNative(this.props.value)}
        onChange={(e) => {
          if (this.props.onValueChange) {
            this.props.onValueChange(getDateForComponent(e.target.value));
          }
        }}
        className={jsStyles.inputTypeDate()}
        ref={this.input}
        disabled={this.props.disabled}
        tabIndex={-1}
      />
    );
  }

  /**
   * @public
   */
  public focus = () => {
    this.input.current?.focus();
  };

  /**
   * @public
   */
  public click = () => {
    this.input.current?.click();
  };
}
