import * as React from 'react';

export interface TextareaProps {
  autoFocus?: boolean;
  autoResize?: boolean;
  defaultValue?: string;
  disabled?: boolean;
  /**
   * Визуально показать наличие ошибки.
   */
  error?: boolean;
  id?: string;
  maxLength?: number | string;
  maxRows?: number | string;
  placeholder?: string;
  resize?: string;
  /**
   * Количество строк
   */
  rows?: number | string;
  title?: string;
  value: string;
  width?: number | string;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
  onChange?: (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    value: string
  ) => void;
  onFocus?: React.FocusEventHandler<HTMLTextAreaElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLTextAreaElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLTextAreaElement>;
  onMouseOver?: React.MouseEventHandler<HTMLTextAreaElement>;
}

export interface TextareaState {}

export default class Textarea extends React.Component<
  TextareaProps,
  TextareaState
> {
  focus(): void;
  blur(): void;
}
