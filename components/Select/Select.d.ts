import * as React from 'react';
import MenuSeparator from '../MenuSeparator/MenuSeparator';

export interface SelectProps {
  areValuesEqual?: (value: any, item: any) => boolean;
  defaultValue?: any;
  diadocLinkIcon?: string;
  disablePortal?: boolean;
  disabled?: boolean;
  error?: boolean;
  filterItem?: (value: any, item: any, pattern: string) => boolean;
  items?: Array<any>;
  maxMenuHeight?: number;
  maxWidth?: number | string;
  menuAlign?: 'left' | 'right';
  menuWidth?: number | string;
  onClose?: () => void;
  onOpen?: () => void;
  placeholder?: React.ReactElement<any> | string;
  renderItem?: (value: any, item: any) => React.ReactElement<any> | string;
  renderValue?: (value: any, item: any) => React.ReactElement<any> | string;
  search?: boolean;
  value?: any;
  width?: number | string;
  onChange?: (event: React.ChangeEvent<HTMLElement>, value: any) => void;
  onMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseOver?: (event: React.MouseEvent<HTMLElement>) => void;
}

export interface SelectState {
  opened: boolean;
  searchPattern?: string;
  value: any;
}

export interface SelectItemProps {}

export interface SelectItemState {}

export class SelectItem extends React.Component<
  SelectItemProps,
  SelectItemState
> {}

interface SelectStaticItem {
  (value: React.ReactElement<any>): React.ReactElement<any>;
  (value: () => React.ReactElement<any>): () => React.ReactElement<any>;
}

export default class Select extends React.Component<SelectProps, SelectState> {
  static SEP: () => MenuSeparator;
  static Item: typeof SelectItem;
  static static: SelectStaticItem;
}
