import * as React from 'react';

export interface CurrencyInputProps {
  align?: 'left' | 'center' | 'right';
  autoFocus?: boolean;
  borderless?: boolean;
  disabled?: boolean;
  error?: boolean;
  fractionDigits?: number | null;
  onBlur?: () => void;
  onChange?: (
    e: { target: { value: number | null } },
    value: number | null
  ) => void;
  onFocus?: () => void;
  onSubmit?: () => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLLabelElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLLabelElement>;
  onMouseOver?: React.MouseEventHandler<HTMLLabelElement>;
  placeholder?: string;
  signed?: boolean;
  size?: 'small' | 'medium' | 'large';
  value?: number | null;
  warning?: boolean;
  width?: number | string;
}

export interface CurrencyInputState {}

export default class CurrencyInput extends React.Component<
  CurrencyInputProps,
  CurrencyInputState
> {}
