import * as React from 'react';

export interface SelectProps {
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
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: any) => void;
  onMouseEnter?: (event: React.MouseEvent<HTMLInputElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLInputElement>) => void;
  onMouseOver?: (event: React.MouseEvent<HTMLInputElement>) => void;
}

export interface SelectState {
  opened: boolean;
  searchPattern?: string;
  value: any;
}

export default class Select extends React.Component<SelectProps, SelectState> {}
