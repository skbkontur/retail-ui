import * as React from 'react';

export interface DatePickerProps {
  autoFocus?: boolean;
  disabled?: boolean;
  enableTodayLink?: boolean;
  error?: boolean;
  minDate?: string;
  maxDate?: string;
  /** @ignore */
  maxYear?: number;
  /** @ignore */
  minYear?: number;
  menuAlign?: 'left' | 'right';
  size?: 'small' | 'medium' | 'large';
  value: string | null;
  warning?: boolean;
  width?: number | string;
  onBlur?: () => void;
  onChange: (e: { target: { value: string } }, v: string) => void;
  onFocus?: () => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
  onMouseOver?: React.MouseEventHandler<HTMLElement>;
}

export interface DatePickerState {}

export default class DatePicker extends React.Component<
  DatePickerProps,
  DatePickerState
> {
  static validate(value: string): boolean;

  focus(): void;
  blur(): void;
}
