import React from 'react';

export type InputElement = (HTMLInputElement | { input: HTMLInputElement | null }) & {
  getRootNode: () => HTMLElement | null;
};

export interface InputElementProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Используйте если вам нужен обработчик неправильного ввода.
   * По-умолчанию, инпут вспыхивает акцентным цветом,
   * но поведение может быть переопределено в самом Input
   *
   * @param value значение инпута.
   */
  onUnexpectedInput?: (value: string) => void;
  /**
   *  Событие для изменения значения в инпуте.
   *  Простая альтернатива нативному событию onChange.
   *  Вызывайте в элементе, если нужно передать новое значение в Input,
   *  но нет необходимости генерировать полноценный ChangeEvent
   *
   *  @param value значение инпута.
   * */
  onValueChange?: (value: string) => void;
}
