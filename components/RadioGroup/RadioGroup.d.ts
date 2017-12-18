import * as React from 'react';

export interface RadioGroupProps<Value, Data> {
  disabled?: boolean;
  error?: boolean;
  inline?: boolean;
  items?: Array<[Value, Data] | Value>;
  name?: string;
  value?: Value;
  defaultValue?: Value;
  warning?: boolean;
  width?: number | string;
  children?: React.ReactChildren;
  renderItem?: (value: Value, data: Data) => React.ReactNode;
  onChange?: (
    event: React.SyntheticEvent<HTMLInputElement>,
    value: Value
  ) => void;
  onMouseEnter?: (e: React.SyntheticEvent<HTMLSpanElement>) => void;
  onMouseLeave?: (e: React.SyntheticEvent<HTMLSpanElement>) => void;
  onMouseOver?: (e: React.SyntheticEvent<HTMLSpanElement>) => void;
}

export interface RadioGroupState<T> {
  activeItem: T | null;
}

export default class RadioGroup<
  Value = any,
  Data = any
> extends React.Component<
  RadioGroupProps<Value, Data>,
  RadioGroupState<Value>
> {
  static Prevent: React.ComponentType;
}
