import * as React from 'react';

export interface ButtonProps {
  active?: boolean;
  arrow?: boolean;
  autoFocus?: boolean;
  checked?: boolean;
  children?: any;
  disabled?: boolean;
  icon?: string;
  focused?: boolean;
  loading?: boolean;
  narrow?: boolean;
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit' | 'reset';
  use?: 'default' | 'primary' | 'success' | 'danger' | 'pay' | 'link';
  width?: number | string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseOver?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface ButtonState {
  focusedByTab: boolean;
}

export default class Button extends React.Component<ButtonProps, ButtonState> {}
