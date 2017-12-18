import * as React from 'react';

export interface SyntheticRadioEvent<T> {
  target: {
    id: string | undefined;
    name: string | undefined;
    checked: string | undefined;
    disabled: string | undefined;
    value: T;
  };
}

export interface RadioProps<T, Data> {
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
  children?: React.ReactChildren;
  value: T;
  onChange?: (event: SyntheticRadioEvent<T>, value: T) => any;
  onMouseEnter?: (event: SyntheticRadioEvent<T>) => void;
  onMouseLeave?: (event: SyntheticRadioEvent<T>) => void;
  onMouseOver?: (event: SyntheticRadioEvent<T>) => void;
}

export default class RadioGroup<
  Value = any,
  Data = any
> extends React.Component<RadioProps<Value, Data>> {}
