import React from 'react';

import { useEmotion, useStyles } from '../../lib/renderEnvironment';
import { forwardRefAndName } from '../../lib/forwardRefAndName';
import type { ModalBodyProps } from '../Modal';
import { Modal } from '../Modal';
import { ThemeContext } from '../../lib/theming/ThemeContext';

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
    const { cx } = useEmotion();
    const styles = useStyles(getStyles);

    return (
      <Modal.Body {...rest}>
        <ThemeContext.Consumer>
          {(theme) => {
            return (
              <div data-tid={MiniModalDataTids.description} ref={ref} className={cx(styles.description(theme))}>
                {children}
              </div>
            );
          }}
        </ThemeContext.Consumer>
      </Modal.Body>
    );
  },
);
