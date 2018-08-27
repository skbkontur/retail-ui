import * as React from 'react';

/** Состояние */
export interface ElementStateProps {
  /** неактивное состояние */
  disabled?: boolean;
  /** состояние ошибки */
  error?: boolean;
  /** состояние предупреждения */
  warning?: boolean;
}

/** Размер */
export interface ElementSizeProp {
  size?: 'small' | 'medium' | 'large';
}

export interface BaseInputProps<T = HTMLInputElement>
  extends ElementStateProps {
  /** передеается в DOM-элемент */
  id?: string;
  /** передеается в DOM-элемент */
  name?: string;
  /** передеается в DOM-элемент */
  title?: string;
  /** передеается в DOM-элемент */
  tabIndex?: number;
  /** передеается в DOM-элемент */
  spellCheck?: boolean;
  /** передеается в DOM-элемент */
  placeholder?: string;
  /** передеается в DOM-элемент */
  role?: string;
  /** передеается в DOM-элемент */
  autoFocus?: boolean;
  /** передеается в DOM-элемент */
  maxLength?: number;
  checked?: boolean;

  /** передеается в DOM-элемент */
  onKeyDown?: React.KeyboardEventHandler<T>;
  /** передеается в DOM-элемент */
  onKeyPress?: React.KeyboardEventHandler<T>;
  /** передеается в DOM-элемент */
  onKeyUp?: React.KeyboardEventHandler<T>;
  /** передеается в DOM-элемент */
  onInput?: React.KeyboardEventHandler<T>;

  /** передеается в label-обертку */
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  /** передеается в label-обертку */
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
  /** передеается в label-обертку */
  onMouseMove?: React.MouseEventHandler<HTMLElement>;
  /** передеается в label-обертку */
  onMouseOut?: React.MouseEventHandler<HTMLElement>;
  /** передеается в label-обертку */
  onMouseOver?: React.MouseEventHandler<HTMLElement>;
  /** передеается в DOM-элемент */
  onMouseUp?: React.MouseEventHandler<T>;
  /** передеается в DOM-элемент */
  onMouseDown?: React.MouseEventHandler<T>;
  /** передеается в DOM-элемент */
  onClick?: React.MouseEventHandler<T>;
  /** передеается в DOM-элемент */
  onDoubleClick?: React.MouseEventHandler<T>;

  /** передеается в DOM-элемент */
  onFocus?: React.FocusEventHandler<T>;
  /** передеается в DOM-элемент */
  onBlur?: React.FocusEventHandler<T>;

  /** передеается в DOM-элемент */
  onScroll?: React.UIEventHandler<T>;
  /** передеается в DOM-элемент */
  onWheel?: React.WheelEventHandler<T>;
}

export interface BaseTextFieldProps<T = HTMLInputElement>
  extends BaseInputProps<T>,
    ElementSizeProp {
  /** передеается в DOM-элемент */
  onCopy?: React.ClipboardEventHandler<T>;
  /** передеается в DOM-элемент */
  onCut?: React.ClipboardEventHandler<T>;
  /** передеается в DOM-элемент */
  onPaste?: React.ClipboardEventHandler<T>;

  width?: React.CSSProperties['width'];

  /** убрать рамку */
  borderless?: boolean;
  /** Выравнивание содержимого */
  align?: 'left' | 'center' | 'right';
  /** Иконка слева */
  leftIcon?: React.ReactNode;
  /** Иксонка справа */
  rightIcon?: React.ReactNode;
}
