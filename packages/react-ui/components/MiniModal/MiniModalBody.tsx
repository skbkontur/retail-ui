import React from 'react';

import { forwardRefAndName } from '../../lib/forwardRefAndName';
import { Modal, ModalBodyProps } from '../Modal';
import { EmotionConsumer } from '../../lib/theming/Emotion';

import { MiniModalDataTids } from './MiniModal';
import { getStyles } from './MiniModal.styles';

/**
 * Обёртка над Modal.Body
 *
 * @visibleName MiniModal.Body
 */
export const MiniModalBody = forwardRefAndName<HTMLDivElement, ModalBodyProps>(
  'MiniModalBody',
  ({ children, ...rest }, ref) => {
    return (
      <EmotionConsumer>
        {(emotion) => {
          const styles = getStyles(emotion);
          return (
            <Modal.Body {...rest}>
              <div data-tid={MiniModalDataTids.description} ref={ref} className={styles.description()}>
                {children}
              </div>
            </Modal.Body>
          );
        }}
      </EmotionConsumer>
    );
  },
);
