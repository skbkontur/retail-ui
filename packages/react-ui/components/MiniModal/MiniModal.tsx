import React, { useContext } from 'react';

import { forwardRefAndName } from '../../lib/forwardRefAndName.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import { Modal } from '../Modal/index.js';
import type { ModalProps } from '../Modal/index.js';
import { getMiniModalTheme } from './getMiniModalTheme.js';
import { MiniModalBody } from './MiniModalBody.js';
import { MiniModalFooter } from './MiniModalFooter.js';
import { MiniModalHeader } from './MiniModalHeader.js';
import { MiniModalIndent } from './MiniModalIndent.js';

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
>('MiniModal', ({ children, theme: propsTheme, mobileAppearance, ...rest }, ref) => {
  const contextTheme = useContext(ThemeContext);

  return (
    <ThemeContext.Provider value={getMiniModalTheme(contextTheme, propsTheme)}>
      <Modal width={400} mobileAppearance={mobileAppearance ?? 'center'} noClose ref={ref} {...rest}>
        {children}
      </Modal>
    </ThemeContext.Provider>
  );
});

MiniModal.Header = MiniModalHeader;
MiniModal.Footer = MiniModalFooter;
MiniModal.Indent = MiniModalIndent;
MiniModal.Body = MiniModalBody;
