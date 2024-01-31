import React from 'react';

export type InputElement = HTMLInputElement | { input: HTMLInputElement | null };

export interface InputElementProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Обработчик неправильного ввода.
   * По-умолчанию, инпут вспыхивает акцентным цветом.
   * Если передан - вызывается переданный обработчик
   * в таком случае вспыхивание можно вызвать
   * публичным методом инстанса `blink()`.
   *
   * @param value значение инпута.
   */
  onUnexpectedInput?: (value: string) => void;
  onValueChange?: (value: string) => void;
}
