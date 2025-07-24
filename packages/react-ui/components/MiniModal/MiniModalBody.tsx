import React from 'react';

import { forwardRefAndName } from '../../lib/forwardRefAndName';
import type { ModalBodyProps } from '../Modal';
import { Modal } from '../Modal';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { isThemeGTE } from '../../lib/theming/ThemeHelpers';
import { cx } from '../../lib/theming/Emotion';

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
        <ThemeContext.Consumer>
          {(theme) => {
            return (
              <div
                data-tid={MiniModalDataTids.description}
                ref={ref}
                className={cx(styles.description(), {
                  [styles.description5_3(theme)]: isThemeGTE(theme, '5.3'),
                })}
              >
                {children}
              </div>
            );
          }}
        </ThemeContext.Consumer>
      </Modal.Body>
    );
  },
);
