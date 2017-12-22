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
  onMouseEnter?: (e: React.MouseEvent<HTMLLabelElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLLabelElement>) => void;
  onMouseOver?: (e: React.MouseEvent<HTMLLabelElement>) => void;
  warning?: boolean;
}

export interface CheckboxState {
  focusedByTab: boolean;
}

export default class Checkbox extends React.Component<
  CheckboxProps,
  CheckboxState
> {}
