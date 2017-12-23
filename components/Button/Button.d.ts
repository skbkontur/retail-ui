import * as React from 'react';
import IconNames from '../Icon/IconNames';

export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonUse =
  | 'default'
  | 'primary'
  | 'success'
  | 'danger'
  | 'pay'
  | 'link';

export interface ButtonProps {
  active?: boolean;
  arrow?: boolean;
  autoFocus?: boolean;
  checked?: boolean;
  children?: React.ReactNode;
  disabled?: boolean;
  icon?: keyof IconNames;
  focused?: boolean;
  loading?: boolean;
  narrow?: boolean;
  size?: ButtonSize;
  type?: ButtonType;
  use?: ButtonUse;
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

export default class Button extends React.Component<ButtonProps, ButtonState> {
  focus(): void;
  blur(): void;
}
