import * as React from 'react';

export interface InputProps {
  align?: 'left' | 'center' | 'right';
  alwaysShowMask?: boolean;
  borderless?: boolean;
  className?: string;
  disabled?: boolean;
  error?: boolean;
  id?: string;
  leftIcon?: React.ReactElement<any>;
  mask?: string;
  maskChar?: string;
  maxLength?: number | string;
  placeholder?: string;
  rightIcon?: React.ReactElement<any>;
  size?: 'small' | 'medium' | 'large';
  title?: string;
  type?: 'password' | 'text';
  value: string;
  warning?: boolean;
  width?: number | string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
  onCopy?: (event: React.ClipboardEvent<HTMLInputElement>) => void;
  onCut?: (event: React.ClipboardEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onPaste?: (event: React.ClipboardEvent<HTMLInputElement>) => void;
  onMouseEnter?: (event: React.MouseEvent<HTMLInputElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLInputElement>) => void;
  onMouseOver?: (event: React.MouseEvent<HTMLInputElement>) => void;
}

export interface InputState {
  polyfillPlaceholder: boolean;
}

export default class Input extends React.Component<InputProps, InputState> {}
