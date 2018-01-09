import * as React from 'react';

export interface SyntheticRadioEvent<T> {
  target: {
    id?: string;
    name?: string;
    checked?: string;
    disabled?: string;
    value: T;
  };
}

export interface RadioProps<T> {
  id?: string;
  name?: string;
  tabIndex?: number;
  checked?: boolean;
  disabled?: boolean;
  error?: boolean;
  focused?: boolean;
  hovered?: boolean;
  pressed?: boolean;
  warning?: boolean;
  children?: React.ReactNode;
  value: T;
  onChange?: (event: SyntheticRadioEvent<T>, value: T) => any;
  onMouseEnter?: (event: SyntheticRadioEvent<T>) => void;
  onMouseLeave?: (event: SyntheticRadioEvent<T>) => void;
  onMouseOver?: (event: SyntheticRadioEvent<T>) => void;
}

export default class RadioGroup<Value = any> extends React.Component<
  RadioProps<Value>
> {
  focus(): void;
  blur(): void;
}
