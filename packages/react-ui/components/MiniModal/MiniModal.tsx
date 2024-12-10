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
