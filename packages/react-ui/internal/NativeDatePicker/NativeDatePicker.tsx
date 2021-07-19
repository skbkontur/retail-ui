import React from 'react';

import { Nullable } from '../../typings/utility-types';
import { CalendarDateShape } from '../Calendar';
import { isIOS } from '../../lib/client';

import { getNativeDateFromShape, upMonthOfShape, getShapeFromNativeDate } from './utils';
import { jsStyles } from './NativeDatePicker.styles';

export interface NativeDatePickerProps {
  onValueChange: (value: CalendarDateShape | undefined) => void;
  value: Nullable<CalendarDateShape>;
  minDate?: CalendarDateShape | undefined;
  maxDate?: CalendarDateShape | undefined;
}

const INPUT_NAME = 'native datepicker input';
const DEFAULT_MIN_DATE = '1900-01-01';
const DEFAULT_MAX_DATE = '2099-12-31';

export class NativeDatePicker extends React.Component<NativeDatePickerProps> {
  public static __KONTUR_REACT_UI__ = 'NativeDatePicker';
  private input: Nullable<HTMLInputElement>;

  public render() {
    return (
      <input
        type="date"
        // в пикер minDate и maxDate приходят с заниженным месяцем (отсчет с 0),
        // но для натива это не нужно
        min={this.props.minDate ? getNativeDateFromShape(upMonthOfShape(this.props.minDate)) : DEFAULT_MIN_DATE}
        max={this.props.maxDate ? getNativeDateFromShape(upMonthOfShape(this.props.maxDate)) : DEFAULT_MAX_DATE}
        value={getNativeDateFromShape(this.props.value)}
        onChange={(e) => this.props.onValueChange(getShapeFromNativeDate(e.target.value))}
        ref={this.refInput}
        className={jsStyles.inputTypeDate()}
        tabIndex={-1}
        name={INPUT_NAME}
      />
    );
  }

  /**
   * @public
   */
  public open() {
    setTimeout(() => {
      this.input?.focus();
      if (!isIOS) {
        this.input?.click();
      }
    }, 10);
  }

  /**
   * @public
   */
  public isOpenend() {
    if (this.input) {
      return this.input === document.activeElement;
    }
  }

  private refInput = (input: Nullable<HTMLInputElement>) => {
    this.input = input;
  };
}
