import React, { useContext } from 'react';

import { Modal, ModalProps } from '../Modal';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { forwardRefAndName } from '../../lib/forwardRefAndName';

import { getMiniModalTheme } from './getMiniModalTheme';
import { MiniModalFooter } from './MiniModalFooter';
import { MiniModalHeader } from './MiniModalHeader';
import { MiniModalBody } from './MiniModalBody';
import { MiniModalIndent } from './MiniModalIndent';
import { styles } from './MiniModal.styles';

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
>('MiniModal', ({ children, ...rest }, ref) => {
  const theme = useContext(ThemeContext);

  const className = styles.toModal();

  return (
    <ThemeContext.Provider value={getMiniModalTheme(theme)}>
      <Modal width={400} noClose ref={ref} className={className} {...rest}>
        {children}
      </Modal>
    </ThemeContext.Provider>
  );
});

MiniModal.__KONTUR_REACT_UI__ = 'MiniModal';

MiniModal.Header = MiniModalHeader;
MiniModal.Footer = MiniModalFooter;
MiniModal.Indent = MiniModalIndent;
MiniModal.Body = MiniModalBody;
