import React from 'react';

import { useEmotion, useStyles } from '../../lib/renderEnvironment/index.js';
import { forwardRefAndName } from '../../lib/forwardRefAndName.js';
import type { ModalBodyProps } from '../Modal/index.js';
import { Modal } from '../Modal/index.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';

import { MiniModalDataTids } from './MiniModal.js';
import { getStyles } from './MiniModal.styles.js';

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
