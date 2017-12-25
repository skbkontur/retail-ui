import * as React from 'react';

export interface ComboBoxProps<T> {
  autocomplete?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  error?: boolean;
  getItems?: (query: string) => Promise<T[]>;
  itemToValue: (item: T) => string | number;
  menuAlign?: 'left' | 'right';
  onBlur?: () => void;
  onChange?: (event: { target: { value: T } }, item: T) => void;
  onFocus?: () => void;
  onInputChange?: (query: string) => string | null | void;
  onUnexpectedInput?: (query: string) => boolean | null | void;
  placeholder?: string;
  renderItem?: (item: T, index?: number) => React.ReactNode;
  renderNotFound?: () => React.ReactNode;
  renderTotalCount?: (found: number, total: number) => React.ReactNode;
  renderValue?: (item: T) => React.ReactNode;
  totalCount?: number;
  value?: T | null;
  valueToString: (item: T) => string;
  size?: 'small' | 'medium' | 'large';
  warning?: boolean;
  width?: string | number;
}

export interface ComboBoxState {}

export default class ComboBox<T = any> extends React.Component<
  ComboBoxProps<T>,
  ComboBoxState
> {
  focus(): void;
}
