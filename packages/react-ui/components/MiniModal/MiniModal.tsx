import React, { useContext } from 'react';

import type { ModalProps } from '../Modal';
import { Modal } from '../Modal';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { forwardRefAndName } from '../../lib/forwardRefAndName';

import { getMiniModalTheme } from './getMiniModalTheme';
import { MiniModalFooter } from './MiniModalFooter';
import { MiniModalHeader } from './MiniModalHeader';
import { MiniModalBody } from './MiniModalBody';
import { MiniModalIndent } from './MiniModalIndent';

export const MiniModalDataTids = {
  icon: 'MiniModal__icon',
  title: 'MiniModal__title',
  description: 'MiniModal__description',
  actions: 'MiniModal__actions',
  indent: 'MiniModal__indent',
} as const;

/**
 * `MiniModal` — модальное диалоговое окно, которое предполагает обязательный отклик пользователя по одному из доступных действий. Обёртка над Modal.
 * Закрытие окна по клику на фон или "крестик" не рекомендуется, т.к. у этих действий нет однозначного описания в отличие от кнопок с названиями, наподобие "Сохранить", "Подтвердить" и т.п.
 *
 * По макету предполагается, что все кнопки должны быть среднего размера `size = medium`.
 */
export const MiniModal = forwardRefAndName<
  Modal,
  ModalProps,
  {
    Header: typeof MiniModalHeader;
    Indent: typeof MiniModalIndent;
    Footer: typeof MiniModalFooter;
    Body: typeof MiniModalBody;
  }
>('MiniModal', ({ children, theme: propsTheme, ...rest }, ref) => {
  const contextTheme = useContext(ThemeContext);

  return (
    <ThemeContext.Provider value={getMiniModalTheme(contextTheme, propsTheme)}>
      <Modal width={400} noClose ref={ref} {...rest}>
        {children}
      </Modal>
    </ThemeContext.Provider>
  );
});

MiniModal.Header = MiniModalHeader;
MiniModal.Footer = MiniModalFooter;
MiniModal.Indent = MiniModalIndent;
MiniModal.Body = MiniModalBody;
