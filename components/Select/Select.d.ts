import * as React from 'react';
import MenuSeparator from '../MenuSeparator/MenuSeparator';

export interface SelectProps<Value, Item> {
  areValuesEqual?: (value: Value, item: Item) => boolean;
  defaultValue?: Value;
  diadocLinkIcon?: string;
  disablePortal?: boolean;
  disabled?: boolean;
  error?: boolean;
  filterItem?: (value: Value, item: Item, pattern: string) => boolean;
  items?: Array<Value | [Value, Item] | [Value, Item, React.ReactNode]>;
  maxMenuHeight?: number;
  maxWidth?: number | string;
  menuAlign?: 'left' | 'right';
  menuWidth?: number | string;
  onClose?: () => void;
  onOpen?: () => void;
  placeholder?: React.ReactNode;
  renderItem?: (value: Value, item: Item) => React.ReactNode;
  renderValue?: (value: Value, item: Item) => React.ReactNode;
  search?: boolean;
  value?: Value;
  width?: number | string;
  onChange?: (event: { target: { value: Value } }, value: Value) => void;
  onMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseOver?: (event: React.MouseEvent<HTMLElement>) => void;
}

export interface SelectState<Value> {
  opened: boolean;
  searchPattern?: string;
  value: Value;
}

export interface SelectItemProps {}

export interface SelectItemState {}

export class SelectItem extends React.Component<
  SelectItemProps,
  SelectItemState
> {}

interface SelectStaticItem {
  (value: React.ReactNode): React.ReactNode;
  (value: () => React.ReactNode): () => React.ReactNode;
}

export default class Select<Value = any, Item = Value> extends React.Component<
  SelectProps<Value, Item>,
  SelectState<Value>
> {
  static SEP: () => MenuSeparator;
  static Item: typeof SelectItem;
  static static: SelectStaticItem;
  open(): void;
  close(): void;
}
