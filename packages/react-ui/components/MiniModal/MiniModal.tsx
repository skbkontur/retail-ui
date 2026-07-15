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
import { MiniModalDataTids } from './tids.js';

export { MiniModalDataTids };

/**
 * Модальное диалоговое окно, которое предполагает обязательный отклик пользователя по одному из доступных действий. Обёртка над Modal.
 *
 * Состоит из набора подкомпонентов:
 * - `MiniModal.Header`
 * - `MiniModal.Body`
 * - `MiniModal.Footer`
 * - `MiniModal.Indent`
 *
 * Тот же набор доступен как `MiniModalHeader`, `MiniModalBody`, `MiniModalFooter`, `MiniModalIndent`.
 *
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
>('MiniModal', ({ children, theme: propsTheme, mobileAppearance, width, ...rest }, ref) => {
  const contextTheme = useContext(ThemeContext);

  return (
    <ThemeContext.Provider value={getMiniModalTheme(contextTheme, propsTheme)}>
      <Modal width={width ?? 400} mobileAppearance={mobileAppearance ?? 'center'} noClose ref={ref} {...rest}>
        {children}
      </Modal>
    </ThemeContext.Provider>
  );
});

MiniModal.Header = MiniModalHeader;
MiniModal.Footer = MiniModalFooter;
MiniModal.Indent = MiniModalIndent;
MiniModal.Body = MiniModalBody;
