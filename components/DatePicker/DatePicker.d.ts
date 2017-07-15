import * as React from 'react';

export interface DatePickerProps {
  className?: string;
  disabled?: boolean;
  error?: boolean;
  maxYear?: number;
  minYear?: number;
  onBlur?: () => void;
  onChange?: (e: { target: { value: Date } }, value: Date) => void;
  onFocus?: () => void;
  onInput?: React.FormEventHandler<HTMLElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  onKeyPress?: React.KeyboardEventHandler<HTMLElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
  onMouseOver?: React.MouseEventHandler<HTMLElement>;
  onUnexpectedInput?: (value: string) => void;
  placeholder?: string;
  size?: 'small' | 'medium' | 'large';
  value?: Date | string;
  warning?: boolean;
  width?: number | string;
  withMask?: boolean;
}

export interface DatePickerState {}

export default class DatePicker extends React.Component<
  DatePickerProps,
  DatePickerState
> {}
