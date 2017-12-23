import * as React from 'react';

export type InputSize = 'small' | 'medium' | 'large';

export type InputAlign = 'left' | 'center' | 'right';

export type InputType = 'password' | 'text';

export interface InputProps {
  align?: InputAlign;
  alwaysShowMask?: boolean;
  autoFocus?: boolean;
  borderless?: boolean;
  className?: string;
  disabled?: boolean;
  error?: boolean;
  id?: string;
  leftIcon?: React.ReactNode;
  mask?: string;
  maskChar?: string;
  maxLength?: number | string;
  placeholder?: string;
  rightIcon?: React.ReactNode;
  size?: InputSize;
  title?: string;
  type?: InputType;
  value: string;
  warning?: boolean;
  width?: number | string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => void;
  onCopy?: React.ClipboardEventHandler<HTMLInputElement>;
  onCut?: React.ClipboardEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onInput?: React.FormEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
  onPaste?: React.ClipboardEventHandler<HTMLInputElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLInputElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLInputElement>;
  onMouseOver?: React.MouseEventHandler<HTMLInputElement>;
}

export interface InputState {
  polyfillPlaceholder: boolean;
}

export default class Input extends React.Component<InputProps, InputState> {
  focus(): void;
  blur(): void;
  setSelectionRange(start: number, end: number): void;
}
