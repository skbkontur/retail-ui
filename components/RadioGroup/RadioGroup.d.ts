import * as React from 'react';

import { SyntheticRadioEvent } from '../Radio';

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
  children?: React.ReactNode;
  renderItem?: (value: Value, data: Data) => React.ReactNode;
  onChange?: (event: SyntheticRadioEvent<Value>, value: Value) => void;
  onMouseEnter?: (e: SyntheticRadioEvent<Value>) => void;
  onMouseLeave?: (e: SyntheticRadioEvent<Value>) => void;
  onMouseOver?: (e: SyntheticRadioEvent<Value>) => void;
}

export interface RadioGroupState<T> {
  activeItem: T | null;
}

export default class RadioGroup<
  Value = any,
  Data = Value
> extends React.Component<
  RadioGroupProps<Value, Data>,
  RadioGroupState<Value>
> {
  static Prevent: React.ComponentType;
  focus(): void;
}
