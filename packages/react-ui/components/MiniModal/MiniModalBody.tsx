import React from 'react';

import { forwardRefAndName } from '../../lib/forwardRefAndName';
import type { ModalBodyProps } from '../Modal';
import { Modal } from '../Modal';

import { MiniModalDataTids } from './MiniModal';
import { styles } from './MiniModal.styles';

/**
 * Обёртка над Modal.Body
 *
 * @visibleName MiniModal.Body
 */
export const MiniModalBody = forwardRefAndName<HTMLDivElement, ModalBodyProps>(
  'MiniModalBody',
  ({ children, ...rest }, ref) => {
    return (
      <Modal.Body {...rest}>
        <div data-tid={MiniModalDataTids.description} ref={ref} className={styles.description()}>
          {children}
        </div>
      </Modal.Body>
    );
  },
);
