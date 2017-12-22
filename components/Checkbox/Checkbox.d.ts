import * as React from 'react';

export interface CheckboxProps {
  checked?: boolean;
  children?: React.ReactNode;
  disabled?: boolean;
  error?: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: boolean
  ) => void;
  onMouseEnter?: React.MouseEventHandler<HTMLLabelElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLLabelElement>;
  onMouseOver?: React.MouseEventHandler<HTMLLabelElement>;
  warning?: boolean;
}

export interface CheckboxState {
  focusedByTab: boolean;
}

export default class Checkbox extends React.Component<
  CheckboxProps,
  CheckboxState
> {}
